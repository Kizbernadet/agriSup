import type { ReactNode } from "react";
import { Container } from "./container";
import styles from "./section.module.css";

type SectionProps = {
  id?: string;
  title?: string;
  intro?: ReactNode;
  // "surface" alterne le fond pour séparer visuellement deux sections consécutives.
  tone?: "default" | "surface";
  children: ReactNode;
};

export function Section({ id, title, intro, tone = "default", children }: SectionProps) {
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
          <header className={styles.header}>
            {title && <h2 id={titleId}>{title}</h2>}
            {intro && <div className={styles.intro}>{intro}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
