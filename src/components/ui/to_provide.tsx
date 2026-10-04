import { useTranslations } from "next-intl";
import styles from "./to_provide.module.css";

// Marqueur visible d'un contenu manquant, à fournir par AGRI'SUP.
export function ToProvide() {
  const t = useTranslations("common");
  return <span className={styles.to_provide}>{t("to_provide")}</span>;
}
