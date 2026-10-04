"use client";

import { useTranslations } from "next-intl";
import { MAIN_NAV, type NavItem } from "@/content/site_config";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./main_nav.module.css";

type MainNavProps = {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function isActive(pathname: string, href: NavItem["href"]) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNav({ orientation, onNavigate }: MainNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("main_label")}>
      <ul className={`${styles.list} ${styles[orientation]}`}>
        {MAIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
