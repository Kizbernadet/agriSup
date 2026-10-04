import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language_switcher";
import { MainNav } from "./main_nav";
import { MobileNav } from "./mobile_nav";
import { SiteLogo } from "./site_logo";
import { ThemeToggle } from "./theme_toggle";
import styles from "./site_header.module.css";

// < 640px  : logo, thème, menu (navigation, langue et préinscription dans le menu).
// 640-1023 : + langue et bouton Préinscription visibles.
// ≥ 1024px : deux rangées (logo + actions, puis navigation complète), plus de bouton menu.
//            Sur une seule rangée, le bouton Préinscription débordait à 1024px.
export function SiteHeader() {
  const t = useTranslations("header");

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.logo}>
          <SiteLogo />
        </div>
        <div className={styles.desktop_nav}>
          <MainNav orientation="horizontal" />
        </div>
        <div className={styles.actions}>
          <div className={styles.from_tablet}>
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <ButtonLink href="/preinscription" className={styles.from_tablet}>
            {t("cta_preinscription")}
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
