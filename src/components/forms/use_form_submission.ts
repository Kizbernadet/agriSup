"use client";

import { useState, type FormEvent } from "react";
import type { z } from "zod";
import { toFieldErrors, type FieldErrors } from "@/lib/validation/form_fields";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
export type FormErrorKind =
  "validation" | "rate_limited" | "server_error" | "network_error";

type Options<Schema extends z.ZodType> = {
  endpoint: string;
  schema: Schema;
  // Convertit les champs du formulaire en objet à valider et envoyer.
  toPayload: (formData: FormData) => Record<string, unknown>;
  onSuccess?: (payload: Record<string, unknown>) => void;
};

// Validation immédiate dans le navigateur (mêmes schémas que le serveur), puis envoi JSON.
// Le serveur revalide toujours : la validation côté navigateur n'est qu'un confort.
export function useFormSubmission<Schema extends z.ZodType>({
  endpoint,
  schema,
  toPayload,
  onSuccess,
}: Options<Schema>) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<FormErrorKind | null>(null);

  function fail(kind: FormErrorKind, errors: FieldErrors = {}) {
    setFieldErrors(errors);
    setFormError(kind);
    setStatus("error");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const payload = toPayload(new FormData(form));
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      fail("validation", toFieldErrors(parsed.error));
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    setFormError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        onSuccess?.(payload);
        return;
      }

      const body = await response.json().catch(() => null);
      if (response.status === 400 && body?.error?.code === "validation") {
        fail("validation", body.error.fields ?? {});
      } else if (response.status === 429) {
        fail("rate_limited");
      } else {
        fail("server_error");
      }
    } catch {
      fail("network_error");
    }
  }

  return {
    status,
    fieldErrors,
    formError,
    handleSubmit,
    reset: () => setStatus("idle"),
  };
}

// Valeur textuelle d'un champ (chaîne vide si absent).
export function fieldValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}
