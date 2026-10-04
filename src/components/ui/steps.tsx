import type { ReactNode } from "react";
import styles from "./steps.module.css";

// Liste ordonnée d'étapes numérotées (procédure, parcours pédagogique…).
export function Steps({ items }: { items: readonly ReactNode[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((item, index) => (
        <li key={index} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {index + 1}
          </span>
          <span className={styles.label}>{item}</span>
        </li>
      ))}
    </ol>
  );
}
