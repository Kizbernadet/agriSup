import type { ReactNode } from "react";
import styles from "./accordion.module.css";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

// Basé sur <details>/<summary> : accessible au clavier et aux lecteurs d'écran,
// sans JavaScript (utile sur les connexions lentes).
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.id} id={item.id} className={styles.item}>
          <summary className={styles.summary}>
            <span>{item.question}</span>
            <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
