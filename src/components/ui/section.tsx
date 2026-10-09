import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { RichText } from "./rich_text";
import styles from "./section.module.css";

type SectionProps = {
  id?: string;
  // Surtitre court au-dessus du titre (ex. « Pédagogie »).
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  // "surface" alterne le fond ; "band" : bandeau coloré (Bleu Académie) pour rythmer la page.
  tone?: "default" | "surface" | "band";
  // Motif décoratif du thème en arrière-plan (appels à l'action).
  pattern?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  pattern = false,
  children,
}: SectionProps) {
  const titleId = id ? `${id}_titre` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={[
        styles.section,
        tone !== "default" && styles[tone],
        pattern && styles.pattern,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className={styles.inner}>
        {(title || intro) && (
          <header className={styles.header} {...revealProps()}>
            {eyebrow && <Eyebrow onBand={tone === "band"}>{eyebrow}</Eyebrow>}
            {title && (
              <h2 id={titleId}>
                <RichText text={title} />
              </h2>
            )}
            {intro && (
              <div className={styles.intro}>
                {typeof intro === "string" ? <RichText text={intro} /> : intro}
              </div>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
