import type { ReactNode } from "react";
import styles from "./badge.module.css";

// Étiquette courte (niveau de formation, catégorie d'actualité…).
export function Badge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>;
}
