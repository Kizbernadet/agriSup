import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./site_logo.module.css";

// EMPLACEMENT PROVISOIRE, volontairement identifiable (contour pointillé + mention).
// Les logos officiels (assets/logo/logo_original.svg pour le thème clair,
// logo_inverse.svg pour le sombre) ne sont pas encore fournis. À leur réception,
// remplacer ce rendu par les deux <img>, affichées selon [data-theme].
export function SiteLogo() {
  const t = useTranslations("header");

  return (
    <Link href="/" className={styles.logo} aria-label={t("home_link")}>
      <span className={styles.placeholder} aria-hidden="true">
        <span className={styles.name}>AGRI&apos;SUP</span>
        <span className={styles.notice}>{t("logo_placeholder")}</span>
      </span>
    </Link>
  );
}
