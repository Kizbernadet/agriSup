import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import { CountUp } from "./count_up";
import styles from "./key_figures.module.css";

export type KeyFigure = { value: number; label: string; icon: ReactNode };

// Cahier §4.3 : uniquement des chiffres vérifiables. Ici ils sont calculés à partir
// des formations en base, sans aucune statistique inventée.
export function KeyFigures({ figures }: { figures: readonly KeyFigure[] }) {
  return (
    <ul className={styles.figures}>
      {figures.map((figure, index) => (
        <li key={figure.label} className={styles.figure} {...revealProps(index)}>
          <span className={styles.icon} aria-hidden="true">
            {figure.icon}
          </span>
          <span className={styles.value}>
            {/* Valeur lue par les lecteurs d'écran ; le compteur animé est masqué. */}
            <span className="visually_hidden">{figure.value}</span>
            <CountUp value={figure.value} />
          </span>
          <span className={styles.label}>{figure.label}</span>
        </li>
      ))}
    </ul>
  );
}
