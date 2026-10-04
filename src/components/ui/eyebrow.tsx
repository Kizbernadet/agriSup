import styles from "./eyebrow.module.css";

// Surtitre court au-dessus d'un titre de section (ex. « Pédagogie »).
export function Eyebrow({ children }: { children: string }) {
  return <p className={styles.eyebrow}>{children}</p>;
}
