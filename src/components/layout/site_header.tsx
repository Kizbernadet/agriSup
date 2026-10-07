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
          {/* Ordinateur : menu sur la même ligne que le logo, dans un cadre transparent
              de même hauteur. */}
          <div className={styles.navigation}>
            <MainNav orientation="horizontal" />
          </div>
          <div className={styles.desktop_actions}>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <div className={styles.mobile_actions}>
            <ThemeToggle />
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
