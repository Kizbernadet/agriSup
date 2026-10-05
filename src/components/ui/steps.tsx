import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import styles from "./steps.module.css";

export type StepItem = {
  label: ReactNode;
  description?: string;
  icon?: ReactNode;
};

// Liste ordonnée d'étapes numérotées (procédure, parcours pédagogique…).
export function Steps({
  items,
  layout = "default",
  showConnectors = true,
}: {
  items: readonly StepItem[];
  layout?: "default" | "wrapped";
  showConnectors?: boolean;
}) {
  return (
    <ol
      className={[
        styles.steps,
        layout === "wrapped" ? styles.wrapped : "",
        showConnectors ? "" : styles.without_connectors,
      ]
        .filter(Boolean)
        .join(" ")}
    >
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
