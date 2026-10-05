"use client";

import { useTranslations } from "next-intl";
import { MAIN_NAV, type NavItem } from "@/content/site_config";
import { Link, usePathname } from "@/i18n/navigation";
import {
  BookIcon,
  ChatIcon,
  ClipboardIcon,
  HelpIcon,
  HomeIcon,
  InstitutionIcon,
  NewsIcon,
} from "@/components/ui/icons";
import styles from "./main_nav.module.css";

type MainNavProps = {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

const NAV_ICONS = {
  home: HomeIcon,
  agrisup: InstitutionIcon,
  formations: BookIcon,
  admission: ClipboardIcon,
  actualites: NewsIcon,
  faq: HelpIcon,
  contact: ChatIcon,
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
      <ul key={pathname} className={`${styles.list} ${styles[orientation]}`}>
        {MAIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = NAV_ICONS[item.labelKey];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                <Icon className={styles.icon} />
                <span>{t(item.labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
