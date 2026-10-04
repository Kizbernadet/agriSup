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
  // Il faut pouvoir répondre : email OU téléphone.
  .refine((data) => data.email || data.phone, {
    message: "contact_required",
    path: ["email"],
  });

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
