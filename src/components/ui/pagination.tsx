import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./pagination.module.css";

type PaginationProps = {
  page: number;
  pageCount: number;
  // Construit le lien d'une page donnée.
  hrefFor: (page: number) => ComponentProps<typeof Link>["href"];
  labels: { nav: string; previous: string; next: string; status: string };
};

export function Pagination({ page, pageCount, hrefFor, labels }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label={labels.nav} className={styles.pagination}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={styles.link} rel="prev">
          ← {labels.previous}
        </Link>
      ) : (
        <span />
      )}
      <span className={styles.status}>{labels.status}</span>
      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} className={styles.link} rel="next">
          {labels.next} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
