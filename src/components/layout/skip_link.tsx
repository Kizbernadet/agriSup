import { useTranslations } from "next-intl";
import styles from "./skip_link.module.css";

export const MAIN_CONTENT_ID = "contenu";

// Premier élément focusable de la page : permet de sauter le menu au clavier.
export function SkipLink() {
  const t = useTranslations("header");
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.skip_link}>
      {t("skip_link")}
    </a>
  );
}
