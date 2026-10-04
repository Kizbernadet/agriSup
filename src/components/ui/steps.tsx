import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import styles from "./steps.module.css";

export type StepItem = {
  label: ReactNode;
  description?: string;
  icon?: ReactNode;
};

// Liste ordonnée d'étapes numérotées (procédure, parcours pédagogique…).
export function Steps({ items }: { items: readonly StepItem[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((item, index) => (
        <li key={index} className={styles.step} {...revealProps(index)}>
          <div className={styles.marker}>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            {item.icon && (
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
            )}
          </div>
          <div className={styles.text}>
            <span className={styles.label}>{item.label}</span>
            {item.description && <p className={styles.description}>{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
