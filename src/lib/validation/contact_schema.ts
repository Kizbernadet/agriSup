import { z } from "zod";
import {
  consentField,
  localeField,
  optionalEmail,
  optionalPhone,
  requiredText,
} from "./form_fields";

// Formulaire de contact (cahier §9.2) : nom, email, téléphone, sujet, message.
export const contactSchema = z
  .object({
    name: requiredText(100, 2),
    email: optionalEmail,
    phone: optionalPhone,
    subject: requiredText(150, 3),
    message: requiredText(3000, 10),
    consent: consentField,
    locale: localeField,
  })
  // Il faut pouvoir répondre : email OU téléphone. `when` : la règle est vérifiée même si
  // d'autres champs sont en erreur, pour afficher toutes les erreurs en une fois.
  .refine((data) => Boolean(data.email || data.phone), {
    message: "contact_required",
    path: ["email"],
    when: (payload) => {
      const value = payload.value as { email?: unknown; phone?: unknown };
      return typeof value === "object" && value !== null;
    },
  });

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
