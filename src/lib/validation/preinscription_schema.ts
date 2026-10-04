import { z } from "zod";
import { EDUCATION_LEVELS } from "@/content/site_config";
import { slugSchema } from "./api_queries";
import {
  consentField,
  localeField,
  optionalEmail,
  optionalText,
  requiredPhone,
  requiredText,
} from "./form_fields";

// Formulaire de préinscription (cahier §8.2). L'existence de la formation et la validité
// de l'année académique sont vérifiées en plus côté serveur.
export const preinscriptionSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  phone: requiredPhone,
  email: optionalEmail,
  city: requiredText(100, 2),
  educationLevel: z
    .string("required")
    .min(1, "required")
    .pipe(z.enum(EDUCATION_LEVELS, "invalid_choice")),
  formation: z.string("required").min(1, "required").pipe(slugSchema),
  academicYear: z.string("required").regex(/^\d{4}-\d{4}$/, "required"),
  message: optionalText(2000),
  consent: consentField,
  locale: localeField,
});

export type PreinscriptionInput = z.input<typeof preinscriptionSchema>;
export type PreinscriptionData = z.output<typeof preinscriptionSchema>;
