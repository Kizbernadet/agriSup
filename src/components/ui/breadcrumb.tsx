import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  // Absent pour la page courante (dernier élément).
  href?: ComponentProps<typeof Link>["href"];
};

export function Breadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  const t = useTranslations("common");

  return (
    <nav aria-label={t("breadcrumb")}>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.label} className={styles.item}>
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
