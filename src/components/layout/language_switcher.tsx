"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./language_switcher.module.css";

// Renvoie vers la même page dans l'autre langue (URL traduite comprise).
export function LanguageSwitcher() {
  const t = useTranslations("language");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <nav aria-label={t("label")}>
      <ul className={styles.list}>
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              // @ts-expect-error -- pathname et params viennent de la route courante : ils sont
              // toujours cohérents, mais TypeScript ne peut pas le vérifier statiquement.
              href={{ pathname, params }}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === currentLocale ? "true" : undefined}
              className={styles.link}
            >
              <span aria-hidden="true">{locale.toUpperCase()}</span>
              <span className="visually_hidden">{t(locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
