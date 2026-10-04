import type { FaqItem } from "@/content/faq";

// Mots trop courants pour aider à trouver une réponse (français et anglais).
const STOP_WORDS = new Set([
  "les",
  "des",
  "une",
  "est",
  "que",
  "qui",
  "quoi",
  "quel",
  "quelle",
  "quels",
  "quelles",
  "pour",
  "dans",
  "avec",
  "sur",
  "par",
  "pas",
  "vous",
  "nous",
  "mon",
  "mes",
  "comment",
  "combien",
  "faut",
  "peut",
  "puis",
  "agrisup",
  "agri",
  "sup",
  "the",
  "and",
  "for",
  "what",
  "how",
  "can",
  "does",
  "are",
  "you",
  "your",
  "which",
  "there",
]);

// Minuscules, sans accents ni ponctuation : « Préinscription ! » → « preinscription ».
export function normalize(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      // Retire les accents (diacritiques combinants U+0300 à U+036F).
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
  );
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

// Un mot de la question correspond à un mot-clé s'ils partagent leur début
// (« inscrire » ↔ « inscription », « frais » ↔ « frais »).
function matches(word: string, keyword: string): boolean {
  const length = Math.min(word.length, keyword.length, 6);
  return length >= 3 && word.slice(0, length) === keyword.slice(0, length);
}

// Réponse prédéterminée la plus proche de la question, ou null si aucune ne convient.
// Recherche par mots-clés : aucune IA, aucun service externe, rien n'est enregistré.
export function findFaqAnswer(
  question: string,
  items: readonly FaqItem[],
  locale: "fr" | "en",
): FaqItem | null {
  const words = tokens(question);
  if (words.length === 0) return null;

  let best: { item: FaqItem; score: number } | null = null;
  for (const item of items) {
    const questionWords = tokens(item.question[locale]);
    let score = 0;
    for (const word of words) {
      if (item.keywords.some((keyword) => matches(word, keyword))) score += 2;
      else if (questionWords.some((keyword) => matches(word, keyword))) score += 1;
    }
    if (score > (best?.score ?? 0)) best = { item, score };
  }
  return best && best.score >= 2 ? best.item : null;
}
