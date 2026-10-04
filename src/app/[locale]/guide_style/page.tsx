import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ThemeToggle } from "@/components/layout/theme_toggle";
import styles from "./guide_style.module.css";

// Page de contrôle visuel réservée au développement : 404 en production.
// Textes volontairement non traduits (outil interne, jamais visible des visiteurs).

export const metadata: Metadata = { title: "Guide de style", robots: { index: false } };

const COLOR_TOKENS = [
  "--color-bg",
  "--color-surface",
  "--color-surface-raised",
  "--color-text",
  "--color-text-muted",
  "--color-border",
  "--color-brand",
  "--color-action",
  "--color-action-hover",
  "--color-on-action",
  "--color-accent",
  "--color-accent-text",
  "--color-link",
  "--color-focus",
  "--color-success",
  "--color-error",
  "--color-warning",
  "--color-info",
] as const;

const STATE_TOKENS = ["success", "error", "warning", "info"] as const;

export default async function GuideStylePage({
  params,
}: PageProps<"/[locale]/guide_style">) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Outil de développement</p>
        <ThemeToggle />
      </header>

      <section className={styles.section} aria-labelledby="typo">
        <h2 id="typo">Typographie</h2>
        <h1>Titre H1 — Montserrat 700</h1>
        <h2>Titre H2 — Montserrat 700</h2>
        <h3>Titre H3 — Montserrat 600</h3>
        <h4>Titre H4 — Montserrat 600</h4>
        <p>
          Texte courant en Inter 400. La longueur de ligne est limitée à environ 70
          caractères pour rester confortable à lire, y compris sur un grand écran. Voici{" "}
          <a href="#typo">un lien dans le texte</a>, du <strong>texte en gras</strong> et
          des accents : é è à ç ô ï.
        </p>
        <p>
          <small>Petit texte en Inter 400 (métadonnées, légendes).</small>
        </p>
        <p className={styles.accent_text}>Texte or (--color-accent-text)</p>
      </section>

      <section className={styles.section} aria-labelledby="couleurs">
        <h2 id="couleurs">Couleurs du thème actif</h2>
        <ul className={styles.swatches}>
          {COLOR_TOKENS.map((token) => (
            <li key={token} className={styles.swatch}>
              <span
                className={styles.swatch_color}
                style={{ backgroundColor: `var(${token})` }}
              />
              <code>{token}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="etats">
        <h2 id="etats">Messages d&apos;état</h2>
        <ul className={styles.states}>
          {STATE_TOKENS.map((state) => (
            <li
              key={state}
              className={styles.state}
              style={{ color: `var(--color-${state})` }}
            >
              Message : {state}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="surfaces">
        <h2 id="surfaces">Surfaces et focus</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Carte</h3>
            <p>Surface avec ombre en clair, sans ombre en sombre.</p>
          </div>
          <div className={styles.card_raised}>
            <h3>Surface surélevée</h3>
            <p>Menus déroulants, modales.</p>
          </div>
        </div>
        <p>
          Appuyez sur Tab pour vérifier le contour de focus : <a href="#surfaces">lien</a>{" "}
          <button type="button" className={styles.demo_button}>
            Bouton de démonstration
          </button>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="photo">
        <h2 id="photo">Texte sur photo</h2>
        <div className={styles.photo_demo}>
          <p className={styles.photo_text}>
            Texte posé sur le dégradé --photo-text-gradient (un aplat vert simule ici la
            photo).
          </p>
        </div>
      </section>
    </main>
  );
}
