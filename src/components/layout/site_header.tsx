"use client";

import { Container } from "@/components/ui/container";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language_switcher";
import { MainNav } from "./main_nav";
import { MobileNav } from "./mobile_nav";
import { SiteLogo } from "./site_logo";
import { ThemeToggle } from "./theme_toggle";
import styles from "./site_header.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={styles.header} data-home={isHome ? "" : undefined}>
      <div className={styles.topbar}>
        <Container className={styles.topbar_inner}>
          <SiteLogo />
          <div className={styles.mobile_actions}>
            <ThemeToggle />
            <MobileNav />
          </div>
        </Container>
      </div>
      <div className={styles.navigation}>
        <Container className={styles.navigation_inner}>
          <MainNav orientation="horizontal" />
          <div className={styles.desktop_actions}>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </Container>
      </div>
    </header>
  );
}
