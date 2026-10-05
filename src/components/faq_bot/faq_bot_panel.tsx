"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { CloseIcon, RestartIcon, SendIcon, SparklesIcon } from "@/components/ui/icons";
import { FAQ_BOT_ITEMS, type FaqItem } from "@/content/faq";
import { Link } from "@/i18n/navigation";
import { detectSmallTalk, findFaqAnswer } from "@/lib/faq_match";
import styles from "./faq_bot.module.css";

type BotReply =
  | { kind: "answer"; item: FaqItem }
  | { kind: "small_talk"; reply: "greeting" | "thanks" }
  | { kind: "not_found" };

type Message =
  { id: number; from: "user"; text: string } | ({ id: number; from: "bot" } & BotReply);

// Délai d'« écriture » de l'assistant : la réponse ne s'affiche pas instantanément,
// ce qui rend l'échange plus naturel et laisse le temps de lire la question.
const TYPING_DELAY_MS = 600;
// Après une réponse, quelques questions seulement : la réponse reste visible.
const FOLLOW_UP_COUNT = 3;

function replyTo(question: string, locale: "fr" | "en"): BotReply {
  const item = findFaqAnswer(question, FAQ_BOT_ITEMS, locale);
  if (item) return { kind: "answer", item };
  const smallTalk = detectSmallTalk(question);
  if (smallTalk) return { kind: "small_talk", reply: smallTalk };
  return { kind: "not_found" };
}

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
  const [showAll, setShowAll] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // À l'ouverture : focus sur le champ ; sur mobile, sur le panneau, pour ne pas ouvrir
  // le clavier par-dessus les suggestions. Échap ferme le panneau.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(min-width: 640px)").matches) inputRef.current?.focus();
    else panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Fait défiler jusqu'au début du dernier message : une longue réponse se lit depuis le haut.
  useEffect(() => {
    const body = bodyRef.current;
    const last = logRef.current?.lastElementChild;
    if (!body || !last || messages.length === 0) return;
    const top =
      last.getBoundingClientRect().top -
      body.getBoundingClientRect().top +
      body.scrollTop -
      parseFloat(getComputedStyle(body).paddingTop);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    body.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, typing]);

  function ask(question: string, reply: BotReply) {
    setMessages((list) => [
      ...list,
      { id: nextId.current++, from: "user", text: question },
    ]);
    setShowAll(false);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((list) => [...list, { id: nextId.current++, from: "bot", ...reply }]);
      setTyping(false);
    }, TYPING_DELAY_MS);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || typing) return;
    ask(question, replyTo(question, locale));
    setDraft("");
  }

  function restart() {
    setMessages([]);
    setShowAll(false);
    inputRef.current?.focus();
  }

  const askedIds = new Set(
    messages.flatMap((message) =>
      message.from === "bot" && message.kind === "answer" ? [message.item.id] : [],
    ),
  );
  const remaining = FAQ_BOT_ITEMS.filter((item) => !askedIds.has(item.id));
  const started = messages.length > 0;
  const suggestions =
    started && !showAll ? remaining.slice(0, FOLLOW_UP_COUNT) : remaining;

  return (
    <section
      ref={panelRef}
      id={id}
      className={styles.panel}
      aria-labelledby={`${id}_titre`}
      tabIndex={-1}
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
        <div className={styles.header_actions}>
          {started && (
            <button
              type="button"
              className={styles.icon_button}
              onClick={restart}
              disabled={typing}
              aria-label={t("restart")}
              title={t("restart")}
            >
              <RestartIcon />
            </button>
          )}
          <button
            type="button"
            className={styles.icon_button}
            onClick={onClose}
            aria-label={t("close")}
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      <div ref={bodyRef} className={styles.body}>
        <div ref={logRef} className={styles.log} role="log" aria-live="polite">
          <div className={`${styles.bubble} ${styles.bot}`}>
            <p>{t("greeting")}</p>
            <p className={styles.disclaimer}>{t("disclaimer")}</p>
          </div>

          {messages.map((message) =>
            message.from === "user" ? (
              <p key={message.id} className={`${styles.bubble} ${styles.user}`}>
                <span className="visually_hidden">{t("you")} : </span>
                {message.text}
              </p>
            ) : (
              <div key={message.id} className={`${styles.bubble} ${styles.bot}`}>
                <span className="visually_hidden">{t("bot")} : </span>
                <BotMessage message={message} locale={locale} onNavigate={onClose} />
              </div>
            ),
          )}

          {typing && (
            <p className={`${styles.bubble} ${styles.bot}`}>
              <span className="visually_hidden">{t("typing")}</span>
              <span aria-hidden="true" className={styles.dots}>
                <span />
                <span />
                <span />
              </span>
            </p>
          )}
        </div>

        {/* Hors du journal (role="log") : les suggestions ne sont pas relues à chaque réponse. */}
        {!typing && suggestions.length > 0 && (
          <div className={styles.suggestions}>
            <p className={styles.suggestions_title}>
              {started ? t("more") : t("suggestions")}
            </p>
            <ul>
              {suggestions.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={styles.suggestion}
                    onClick={() => ask(item.question[locale], { kind: "answer", item })}
                  >
                    {item.question[locale]}
                  </button>
                </li>
              ))}
            </ul>
            {suggestions.length < remaining.length && (
              <button
                type="button"
                className={styles.show_all}
                onClick={() => setShowAll(true)}
              >
                {t("show_all")}
              </button>
            )}
          </div>
        )}
      </div>

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
    </section>
  );
}

function BotMessage({
  message,
  locale,
  onNavigate,
}: {
  message: BotReply;
  locale: "fr" | "en";
  onNavigate: () => void;
}) {
  const t = useTranslations("faq_bot");

  if (message.kind === "answer") {
    const { item } = message;
    return (
      <>
        <p>{item.answer[locale]}</p>
        {item.link && (
          <Link href={item.link.href} className={styles.link} onClick={onNavigate}>
            {item.link.label[locale]} →
          </Link>
        )}
      </>
    );
  }

  if (message.kind === "small_talk") {
    return <p>{message.reply === "thanks" ? t("reply_thanks") : t("reply_greeting")}</p>;
  }

  return (
    <>
      <p>{t("not_found")}</p>
      <div className={styles.fallback}>
        <WhatsappButton variant="primary" />
        <Link href="/contact" className={styles.link} onClick={onNavigate}>
          {t("contact_link")} →
        </Link>
      </div>
    </>
  );
}
