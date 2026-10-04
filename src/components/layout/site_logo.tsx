import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import logo from "../../../public/logo/logo_agrisup.png";
import styles from "./site_logo.module.css";

type SiteLogoProps = {
  // "header" : hauteur compacte ; "footer" : plus grand.
  size?: "header" | "footer";
};

// Logo fourni par la cliente (assets/logo/logo_1.jpg, recadré par scripts/prepare_images.ts).
// Pas encore de version « inversée » pour le thème sombre (charte §7) : le logo est alors
// posé sur une plaque claire, pour garder son contraste sans le recolorer.
// À remplacer par les SVG officiels (logo_original.svg / logo_inverse.svg) dès réception.
export function SiteLogo({ size = "header" }: SiteLogoProps) {
  const t = useTranslations("header");

  return (
    <Link href="/" className={`${styles.logo} ${styles[size]}`}>
      <Image
        src={logo}
        alt={t("home_link")}
        className={styles.image}
        sizes={size === "header" ? "180px" : "260px"}
        priority={size === "header"}
      />
    </Link>
  );
}
