import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import styles from "./section.module.css";

type SectionProps = {
  id?: string;
  // Surtitre court au-dessus du titre (ex. « Pédagogie »).
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  // "surface" alterne le fond pour séparer visuellement deux sections consécutives.
  tone?: "default" | "surface";
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: SectionProps) {
  const titleId = id ? `${id}_titre` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={[styles.section, tone === "surface" && styles.surface]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className={styles.inner}>
        {(title || intro) && (
          <header className={styles.header} {...revealProps()}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 id={titleId}>{title}</h2>}
            {intro && <div className={styles.intro}>{intro}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
