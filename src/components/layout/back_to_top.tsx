"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpIcon } from "@/components/ui/icons";
import styles from "./back_to_top.module.css";

// Le bouton apparaît après trois quarts d'écran de défilement, ou plus tôt sur les pages
// courtes (40 % de la distance de défilement) : il est ainsi présent sur toutes les pages
// qui défilent.
const SHOW_AFTER_VIEWPORTS = 0.75;
const SHOW_AFTER_SHARE = 0.4;

// Bouton « Haut de page », en bas à gauche (les actions WhatsApp et FAQ occupent la
// droite). Une barre or indique la progression de la lecture (CSS seul, back_to_top.module.css).
export function BackToTop() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = Math.min(
        window.innerHeight * SHOW_AFTER_VIEWPORTS,
        scrollable * SHOW_AFTER_SHARE,
      );
      setVisible(scrollable > 0 && window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollToTop(event: MouseEvent<HTMLButtonElement>) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // Au clavier (detail = 0), le focus suit : il revient au premier lien de la page
    // (lien d'évitement), sans quoi il resterait en bas sur un bouton masqué.
    if (event.detail === 0) {
      document.querySelector<HTMLElement>("body a[href]")?.focus({ preventScroll: true });
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible ? "" : undefined}
      aria-label={t("back_to_top")}
      title={t("back_to_top")}
      onClick={scrollToTop}
    >
      <ArrowUpIcon aria-hidden="true" />
      <span className={styles.progress} aria-hidden="true" />
    </button>
  );
}
