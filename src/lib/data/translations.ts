import type { Locale } from "@/generated/prisma/enums";
import { routing } from "@/i18n/routing";

export const FALLBACK_LOCALE: Locale = routing.defaultLocale;

// Langues à charger : celle demandée, et le français en secours si une traduction manque.
export function localesToLoad(locale: Locale): Locale[] {
  return locale === FALLBACK_LOCALE ? [locale] : [locale, FALLBACK_LOCALE];
}

export function pickTranslation<T extends { locale: Locale }>(
  translations: readonly T[],
  locale: Locale,
): T | undefined {
  return (
    translations.find((translation) => translation.locale === locale) ??
    translations.find((translation) => translation.locale === FALLBACK_LOCALE)
  );
}
