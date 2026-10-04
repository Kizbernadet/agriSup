import { z } from "zod";
import { routing } from "@/i18n/routing";

// Les messages d'erreur sont des CLÉS de traduction (messages > form_errors),
// pour que le navigateur et le serveur partagent les mêmes schémas.
export const FORM_ERRORS = [
  "required",
  "too_long",
  "too_short",
  "invalid_email",
  "invalid_phone",
  "invalid_choice",
  "consent_required",
  "contact_required",
] as const;
export type FormErrorKey = (typeof FORM_ERRORS)[number];

export function requiredText(max: number, min = 1) {
  return z
    .string("required")
    .trim()
    .min(1, "required")
    .min(min, "too_short")
    .max(max, "too_long");
}

// Champ facultatif : une chaîne vide devient undefined.
export function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max, "too_long")
    .optional()
    .transform((value) => value || undefined);
}

// 8 à 15 chiffres (norme E.164), avec +, espaces, points, tirets ou parenthèses.
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
function isPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(value) && digits >= 8 && digits <= 15;
}

export const requiredPhone = z
  .string("required")
  .trim()
  .min(1, "required")
  .max(25, "too_long")
  .refine(isPhone, "invalid_phone");

export const optionalPhone = z
  .string()
  .trim()
  .max(25, "too_long")
  .refine((value) => value === "" || isPhone(value), "invalid_phone")
  .optional()
  .transform((value) => value || undefined);

export const optionalEmail = z
  .string()
  .trim()
  .max(254, "too_long")
  .refine((value) => value === "" || z.email().safeParse(value).success, "invalid_email")
  .optional()
  .transform((value) => value?.toLowerCase() || undefined);

// Case à cocher d'acceptation de la politique de confidentialité.
export const consentField = z.literal(true, "consent_required");

export const localeField = z.enum(routing.locales);

// Champ piège invisible pour les humains : s'il est rempli, l'envoi vient d'un robot.
export const HONEYPOT_FIELD = "website";

export type FieldErrors = Partial<Record<string, FormErrorKey>>;

// Première erreur de chaque champ, au format attendu par les formulaires.
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    const key = FORM_ERRORS.includes(issue.message as FormErrorKey)
      ? (issue.message as FormErrorKey)
      : "invalid_choice";
    result[field] ??= key;
  }
  return result;
}
