import { useTranslations } from "next-intl";
import { HONEYPOT_FIELD } from "@/lib/validation/form_fields";
import styles from "./honeypot_field.module.css";

// Champ piège : hors écran, ignoré des lecteurs d'écran et du clavier. Seuls les robots
// qui remplissent tous les champs le complètent (l'envoi est alors ignoré côté serveur).
export function HoneypotField() {
  const t = useTranslations("form");
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        {t("honeypot_label")}
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
