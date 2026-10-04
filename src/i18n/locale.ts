import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "./routing";

// Convertit le segment [locale] d'une URL en langue du site (le layout a déjà rejeté
// les valeurs inconnues ; le repli ne sert qu'à satisfaire le typage).
export function toAppLocale(value: string): AppLocale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
