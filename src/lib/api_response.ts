import { NextResponse } from "next/server";
import { z } from "zod";

// Contenu public : mis en cache 5 min par le CDN, puis resservi pendant la mise à jour.
export const PUBLIC_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
};

type ApiErrorCode = "invalid_query" | "not_found" | "server_error";

export function apiOk<T>(data: T, headers?: HeadersInit) {
  return NextResponse.json({ data }, { headers });
}

export function apiError(
  status: number,
  code: ApiErrorCode,
  message: string,
  details?: unknown,
) {
  return NextResponse.json({ error: { code, message, details } }, { status });
}

export function apiInvalidQuery(error: z.ZodError) {
  return apiError(400, "invalid_query", "Paramètres invalides.", z.flattenError(error));
}

export function apiNotFound() {
  return apiError(404, "not_found", "Ressource introuvable.");
}

// Les détails techniques restent dans les journaux serveur, jamais dans la réponse.
export function apiServerError(error: unknown) {
  console.error(error);
  return apiError(500, "server_error", "Erreur interne. Veuillez réessayer plus tard.");
}
