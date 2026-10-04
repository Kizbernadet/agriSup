"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LanguageSwitcher } from "./language_switcher";
import { MainNav } from "./main_nav";
import styles from "./mobile_nav.module.css";

const PANEL_ID = "menu_mobile";

// Menu des écrans < 1024px : panneau déroulant sous le header.
// Se ferme avec Échap, au clic à l'extérieur ou en choisissant un lien.
export function MobileNav() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? t("menu_close") : t("menu_open")}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span className={styles.toggle_text} aria-hidden="true">
          {t("menu")}
        </span>
      </button>

      <div id={PANEL_ID} className={styles.panel} hidden={!open}>
        <MainNav orientation="vertical" onNavigate={close} />
        <div className={styles.panel_footer}>
          <LanguageSwitcher />
          <ButtonLink href="/preinscription" className={styles.cta} onClick={close}>
            {t("cta_preinscription")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
