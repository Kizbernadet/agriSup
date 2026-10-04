import styles from "./eyebrow.module.css";

// Surtitre court au-dessus d'un titre de section (ex. « Pédagogie »).
// onBand : sur bandeau coloré ou photo, l'or brillant remplace l'or foncé (contraste).
export function Eyebrow({ children, onBand }: { children: string; onBand?: boolean }) {
  return (
    <p className={[styles.eyebrow, onBand && styles.on_band].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
