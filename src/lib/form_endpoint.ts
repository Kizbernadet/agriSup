import { NextResponse, type NextRequest } from "next/server";
import type { z } from "zod";
import { apiServerError } from "@/lib/api_response";
import { checkRateLimit, getClientIp } from "@/lib/rate_limit";
import {
  HONEYPOT_FIELD,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/validation/form_fields";

// Taille maximale du corps JSON : largement au-dessus d'un formulaire rempli au maximum.
const MAX_BODY_BYTES = 16 * 1024;

type HandlerResult = { fieldErrors: FieldErrors } | void;

type FormEndpointOptions<Schema extends z.ZodType> = {
  request: NextRequest;
  // Identifie le formulaire pour la limitation de débit.
  scope: string;
  schema: Schema;
  // Enregistre la demande ; peut renvoyer des erreurs de champ (ex. formation inconnue).
  onValid: (data: z.output<Schema>) => Promise<HandlerResult>;
};

function errorResponse(
  status: number,
  code: string,
  extra?: object,
  headers?: HeadersInit,
) {
  return NextResponse.json({ error: { code, ...extra } }, { status, headers });
}

// Chaîne commune aux formulaires publics :
// type de contenu → taille → limitation de débit → JSON → champ piège → validation → traitement.
export async function handleFormPost<Schema extends z.ZodType>({
  request,
  scope,
  schema,
  onValid,
}: FormEndpointOptions<Schema>) {
  // Exiger du JSON bloque aussi les envois croisés depuis un autre site
  // (un formulaire HTML classique ne peut pas envoyer ce type de contenu).
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return errorResponse(415, "unsupported_media_type");
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return errorResponse(413, "payload_too_large");
    }

    const rateLimit = await checkRateLimit(scope, getClientIp(request.headers));
    if (!rateLimit.allowed) {
      return errorResponse(429, "rate_limited", undefined, {
        "Retry-After": String(rateLimit.retryAfter),
      });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return errorResponse(400, "invalid_json");
    }

    // Robot détecté : on répond comme un succès pour ne pas lui signaler le piège,
    // mais rien n'est enregistré.
    if (
      typeof body === "object" &&
      body !== null &&
      String((body as Record<string, unknown>)[HONEYPOT_FIELD] ?? "") !== ""
    ) {
      return NextResponse.json({ data: { received: true } }, { status: 201 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(400, "validation", { fields: toFieldErrors(parsed.error) });
    }

    const result = await onValid(parsed.data);
    if (result?.fieldErrors) {
      return errorResponse(400, "validation", { fields: result.fieldErrors });
    }

    return NextResponse.json({ data: { received: true } }, { status: 201 });
  } catch (error) {
    return apiServerError(error);
  }
}
