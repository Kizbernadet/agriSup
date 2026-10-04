import { describe, expect, it } from "vitest";
import { FAQ_ITEMS } from "@/content/faq";
import { findFaqAnswer, normalize } from "@/lib/faq_match";

const answerId = (question: string, locale: "fr" | "en" = "fr") =>
  findFaqAnswer(question, FAQ_ITEMS, locale)?.id ?? null;

describe("assistant FAQ : normalisation", () => {
  it("retire accents, majuscules et ponctuation", () => {
    expect(normalize("  Préinscription : ÉTÉ ! ")).toBe("preinscription ete");
  });
});

describe("assistant FAQ : recherche de réponse", () => {
  it.each([
    ["Comment je peux m'inscrire ?", "preinscription"],
    ["Où se trouve l'école ?", "localisation"],
    ["c'est combien les frais de scolarité", "frais"],
    ["Quels papiers dois-je fournir ?", "documents"],
    ["numéro de téléphone", "contact"],
    ["vous avez une brochure pdf ?", "brochure"],
    ["c'est quoi le système LMD", "lmd"],
    ["quelles sont les conditions d'admission", "conditions"],
  ])("« %s » → %s", (question, expected) => {
    expect(answerId(question)).toBe(expected);
  });

  it("comprend les questions en anglais", () => {
    expect(answerId("How much are the tuition fees?", "en")).toBe("frais");
    expect(answerId("Where is the school located?", "en")).toBe("localisation");
  });

  it("ne répond pas au hasard à une question hors sujet", () => {
    expect(answerId("Quel temps fera-t-il demain ?")).toBeNull();
    expect(answerId("")).toBeNull();
  });
});
