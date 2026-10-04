import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation/contact_schema";
import {
  optionalEmail,
  requiredPhone,
  toFieldErrors,
} from "@/lib/validation/form_fields";
import { preinscriptionSchema } from "@/lib/validation/preinscription_schema";

const validContact = {
  name: "Awa Diarra",
  email: "awa@example.com",
  phone: "",
  subject: "Information",
  message: "Bonjour, je voudrais des informations.",
  consent: true,
  locale: "fr",
};

const validPreinscription = {
  firstName: "Moussa",
  lastName: "Traoré",
  phone: "+223 70 00 00 00",
  email: "",
  city: "Bamako",
  educationLevel: "BAC",
  formation: "licence-pro-agronomie",
  academicYear: "2026-2027",
  message: "",
  consent: true,
  locale: "fr",
};

function errorsOf(result: { success: boolean; error?: unknown }) {
  if (result.success) return {};
  return toFieldErrors(result.error as Parameters<typeof toFieldErrors>[0]);
}

describe("téléphone", () => {
  it.each(["+223 70 00 00 00", "76123456", "(+223) 66-72-43-89", "+34 613 52 17 22"])(
    "accepte %s",
    (phone) => expect(requiredPhone.safeParse(phone).success).toBe(true),
  );

  it.each(["123", "abc defg hij", "+223 70 00 00 00 00 00 00", "12345678901234567"])(
    "refuse %s",
    (phone) => expect(requiredPhone.safeParse(phone).success).toBe(false),
  );
});

describe("email facultatif", () => {
  it("normalise (espaces, majuscules)", () => {
    expect(optionalEmail.parse("  Awa@Example.COM ")).toBe("awa@example.com");
  });

  it("transforme une chaîne vide en undefined", () => {
    expect(optionalEmail.parse("")).toBeUndefined();
  });

  it("refuse une adresse invalide", () => {
    expect(optionalEmail.safeParse("awa@").success).toBe(false);
  });
});

describe("formulaire de contact", () => {
  it("accepte un message valide", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepte un téléphone seul", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "",
      phone: "76123456",
    });
    expect(result.success).toBe(true);
  });

  it("exige un email ou un téléphone, en même temps que les autres erreurs", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "",
      consent: false,
    });
    expect(errorsOf(result)).toMatchObject({
      email: "contact_required",
      consent: "consent_required",
    });
  });

  it("refuse un message trop court et un nom manquant", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      name: " ",
      message: "Salut",
    });
    expect(errorsOf(result)).toMatchObject({ name: "required", message: "too_short" });
  });

  it("garde le HTML comme du texte brut (pas de nettoyage destructeur)", () => {
    const result = contactSchema.parse({ ...validContact, subject: "<b>Info</b>" });
    expect(result.subject).toBe("<b>Info</b>");
  });

  it("refuse une langue non prise en charge", () => {
    expect(
      errorsOf(contactSchema.safeParse({ ...validContact, locale: "bm" })),
    ).toHaveProperty("locale");
  });
});

describe("formulaire de préinscription", () => {
  it("accepte une préinscription valide", () => {
    expect(preinscriptionSchema.safeParse(validPreinscription).success).toBe(true);
  });

  it("distingue niveau vide (obligatoire) et niveau inconnu (choix invalide)", () => {
    expect(
      errorsOf(
        preinscriptionSchema.safeParse({ ...validPreinscription, educationLevel: "" }),
      ),
    ).toMatchObject({ educationLevel: "required" });
    expect(
      errorsOf(
        preinscriptionSchema.safeParse({
          ...validPreinscription,
          educationLevel: "DOCTORAT",
        }),
      ),
    ).toMatchObject({ educationLevel: "invalid_choice" });
  });

  it("refuse un identifiant de formation malformé", () => {
    const result = preinscriptionSchema.safeParse({
      ...validPreinscription,
      formation: "../../etc",
    });
    expect(errorsOf(result)).toMatchObject({ formation: "invalid_choice" });
  });

  it("exige le téléphone et le consentement", () => {
    const result = preinscriptionSchema.safeParse({
      ...validPreinscription,
      phone: "",
      consent: false,
    });
    expect(errorsOf(result)).toMatchObject({
      phone: "required",
      consent: "consent_required",
    });
  });
});
