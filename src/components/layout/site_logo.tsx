import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import logo from "../../../public/logo/sceau_agrisup.png";
import styles from "./site_logo.module.css";

type SiteLogoProps = {
  // "header" : hauteur compacte ; "footer" : plus grand.
  size?: "header" | "footer";
};

// Sceau officiel d'AGRI'SUP (assets/logo/agrisup_2.jpg, détouré par scripts/prepare_images.ts).
export function SiteLogo({ size = "header" }: SiteLogoProps) {
  const t = useTranslations("header");

  return (
    <Link href="/" className={`${styles.logo} ${styles[size]}`}>
      <Image
        src={logo}
        alt={t("home_link")}
        className={styles.image}
        sizes={size === "header" ? "64px" : "160px"}
        loading={size === "header" ? "eager" : "lazy"}
      />
    </Link>
  );
}
