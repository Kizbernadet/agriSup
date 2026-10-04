"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { CloseIcon, SendIcon, SparklesIcon } from "@/components/ui/icons";
import { FAQ_ITEMS, type FaqItem } from "@/content/faq";
import { Link } from "@/i18n/navigation";
import { findFaqAnswer } from "@/lib/faq_match";
import styles from "./faq_bot.module.css";

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; kind: "answer"; item: FaqItem }
  | { id: number; from: "bot"; kind: "not_found" };

// Délai d'« écriture » de l'assistant : la réponse ne s'affiche pas instantanément,
// ce qui rend l'échange plus naturel et laisse le temps de lire la question.
const TYPING_DELAY_MS = 600;
const SUGGESTION_COUNT = 5;

type FaqBotPanelProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export function FaqBotPanel({ id, open, onClose }: FaqBotPanelProps) {
  const t = useTranslations("faq_bot");
  const locale = useLocale() === "en" ? "en" : "fr";
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Focus sur le champ à l'ouverture ; Échap ferme le panneau.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Défilement automatique vers le dernier message.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function ask(question: string, item: FaqItem | null) {
    const userMessage: Message = { id: nextId.current++, from: "user", text: question };
    setMessages((list) => [...list, userMessage]);
    setTyping(true);
    window.setTimeout(() => {
      const reply: Message = item
        ? { id: nextId.current++, from: "bot", kind: "answer", item }
        : { id: nextId.current++, from: "bot", kind: "not_found" };
      setMessages((list) => [...list, reply]);
      setTyping(false);
    }, TYPING_DELAY_MS);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || typing) return;
    ask(question, findFaqAnswer(question, FAQ_ITEMS, locale));
    setDraft("");
  }

  const askedIds = new Set(
    messages.flatMap((message) =>
      message.from === "bot" && message.kind === "answer" ? [message.item.id] : [],
    ),
  );
  const suggestions = FAQ_ITEMS.filter((item) => !askedIds.has(item.id)).slice(
    0,
    SUGGESTION_COUNT,
  );

  return (
    <section
      id={id}
      className={styles.panel}
      aria-labelledby={`${id}_titre`}
      hidden={!open}
    >
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          <SparklesIcon />
        </span>
        <div>
          <h2 id={`${id}_titre`} className={styles.title}>
            {t("title")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={t("close")}
        >
          <CloseIcon />
        </button>
      </header>

      <div ref={logRef} className={styles.log} role="log" aria-live="polite">
        <p className={`${styles.bubble} ${styles.bot}`}>{t("greeting")}</p>

        {messages.map((message) =>
          message.from === "user" ? (
            <p key={message.id} className={`${styles.bubble} ${styles.user}`}>
              <span className="visually_hidden">{t("you")} : </span>
              {message.text}
            </p>
          ) : message.kind === "answer" ? (
            <div key={message.id} className={`${styles.bubble} ${styles.bot}`}>
              <span className="visually_hidden">{t("bot")} : </span>
              <p>{message.item.answer[locale]}</p>
              {message.item.link && (
                <Link
                  href={message.item.link.href}
                  className={styles.link}
                  onClick={onClose}
                >
                  {message.item.link.label[locale]} →
                </Link>
              )}
            </div>
          ) : (
            <div key={message.id} className={`${styles.bubble} ${styles.bot}`}>
              <span className="visually_hidden">{t("bot")} : </span>
              <p>{t("not_found")}</p>
              <div className={styles.fallback}>
                <WhatsappButton variant="primary" />
                <Link href="/contact" className={styles.link} onClick={onClose}>
                  {t("contact_link")} →
                </Link>
              </div>
            </div>
          ),
        )}

        {typing && (
          <p className={`${styles.bubble} ${styles.bot} ${styles.typing}`}>
            <span className="visually_hidden">{t("typing")}</span>
            <span aria-hidden="true" className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </p>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <p className={styles.suggestions_title}>
            {messages.length > 0 ? t("more") : t("suggestions")}
          </p>
          <ul>
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.suggestion}
                  disabled={typing}
                  onClick={() => ask(item.question[locale], item)}
                >
                  {item.question[locale]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor={`${id}_champ`} className="visually_hidden">
          {t("input_label")}
        </label>
        <input
          ref={inputRef}
          id={`${id}_champ`}
          className={styles.input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t("placeholder")}
          maxLength={200}
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.send}
          aria-label={t("send")}
          disabled={typing}
        >
          <SendIcon />
        </button>
      </form>
      <p className={styles.disclaimer}>{t("disclaimer")}</p>
    </section>
  );
}
