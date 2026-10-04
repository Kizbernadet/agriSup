"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@/components/ui/alert";
import type { FieldErrors } from "@/lib/validation/form_fields";
import type { FormErrorKind } from "./use_form_submission";
import styles from "./form_feedback.module.css";

type FormErrorSummaryProps = {
  kind: FormErrorKind | null;
  fieldErrors: FieldErrors;
  // Libellés des champs, pour lister les erreurs en clair.
  fieldLabels: Record<string, string>;
};

// Récapitulatif placé en haut du formulaire : reçoit le focus après un envoi en erreur
// (annoncé par les lecteurs d'écran), avec un lien vers chaque champ à corriger.
export function FormErrorSummary({
  kind,
  fieldErrors,
  fieldLabels,
}: FormErrorSummaryProps) {
  const t = useTranslations("form");
  const tErrors = useTranslations("form_errors");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (kind) ref.current?.focus();
  }, [kind, fieldErrors]);

  if (!kind) return null;

  // Ordre d'affichage = ordre des champs dans le formulaire (ordre de fieldLabels).
  const fields = Object.keys(fieldLabels)
    .filter((field) => fieldErrors[field])
    .map((field) => [field, fieldErrors[field]] as const);

  return (
    <div ref={ref} tabIndex={-1} className={styles.focus_target}>
      {kind === "validation" ? (
        <Alert variant="error" title={t("error_title")}>
          <p>{t("error_intro")}</p>
          <ul className={styles.error_list}>
            {fields.map(([field, error]) => (
              <li key={field}>
                <a href={`#champ_${field}`}>
                  {fieldLabels[field]} : {error && tErrors(error)}
                </a>
              </li>
            ))}
          </ul>
        </Alert>
      ) : (
        <Alert variant="error">{t(kind)}</Alert>
      )}
    </div>
  );
}

// Message de réussite : reçoit le focus pour être annoncé.
export function FormSuccess({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div ref={ref} tabIndex={-1} className={styles.focus_target}>
      {children}
    </div>
  );
}
