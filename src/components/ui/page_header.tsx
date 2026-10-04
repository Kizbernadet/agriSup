import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { Container } from "./container";
import styles from "./page_header.module.css";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
  breadcrumb?: readonly BreadcrumbItem[];
  // Éléments placés sous le titre (badges, boutons…).
  children?: ReactNode;
};

// En-tête des pages intérieures : fil d'Ariane, H1 unique de la page, introduction.
export function PageHeader({ title, intro, breadcrumb, children }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <Container className={styles.inner}>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <h1>{title}</h1>
        {intro && <div className={styles.intro}>{intro}</div>}
        {children}
      </Container>
    </div>
  );
}
