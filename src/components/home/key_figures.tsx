import styles from "./key_figures.module.css";

export type KeyFigure = { value: number; label: string };

// Cahier §4.3 : uniquement des chiffres vérifiables. Ici ils sont calculés à partir
// des formations en base, sans aucune statistique inventée.
export function KeyFigures({ figures }: { figures: readonly KeyFigure[] }) {
  return (
    <ul className={styles.figures}>
      {figures.map((figure) => (
        <li key={figure.label} className={styles.figure}>
          <span className={styles.value}>{figure.value}</span>
          <span className={styles.label}>{figure.label}</span>
        </li>
      ))}
    </ul>
  );
}
