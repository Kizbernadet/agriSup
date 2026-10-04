"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ChatIcon, CloseIcon } from "@/components/ui/icons";
import styles from "./faq_bot.module.css";

// Le panneau (conversation, données de la FAQ) n'est téléchargé qu'à la première
// ouverture : rien n'alourdit le chargement initial des pages.
const FaqBotPanel = dynamic(
  () => import("./faq_bot_panel").then((mod) => mod.FaqBotPanel),
  {
    ssr: false,
  },
);

const PANEL_ID = "assistant_faq";

// Assistant des questions fréquentes : réponses prédéterminées (src/content/faq.ts),
// sans IA ni service externe (le chatbot IA est hors périmètre du MVP).
export function FaqBot() {
  const t = useTranslations("faq_bot");
  const [open, setOpen] = useState(false);
  // Le panneau reste monté après la première ouverture pour garder la conversation.
  const [mounted, setMounted] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  return (
    <>
      {mounted && <FaqBotPanel id={PANEL_ID} open={open} onClose={close} />}
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-controls={mounted ? PANEL_ID : undefined}
        aria-label={open ? t("close") : t("open")}
        onClick={() => {
          setMounted(true);
          setOpen((value) => !value);
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span className={styles.launcher_text} aria-hidden="true">
          {t("launcher")}
        </span>
      </button>
    </>
  );
}
