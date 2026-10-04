"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { applyTheme, getActiveTheme, getStoredTheme, type Theme } from "@/lib/theme";
import styles from "./theme_toggle.module.css";

const DARK_QUERY = "(prefers-color-scheme: dark)";

// Le thème vit sur <html data-theme> (posé par ThemeScript) : on observe cet attribut
// plutôt que de dupliquer l'état dans React.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const t = useTranslations("theme");
  const theme = useSyncExternalStore<Theme | null>(subscribe, getActiveTheme, () => null);

  // Tant que l'utilisateur n'a rien choisi, le site suit les changements du système.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const followSystem = () => {
      if (getStoredTheme() === null) applyTheme(media.matches ? "dark" : "light", false);
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => applyTheme(nextTheme, true)}
      aria-label={nextTheme === "dark" ? t("activate_dark") : t("activate_light")}
      // Avant l'hydratation, le thème réel est inconnu côté serveur.
      disabled={theme === null}
    >
      <svg className={styles.icon_moon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className={styles.icon_sun} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
