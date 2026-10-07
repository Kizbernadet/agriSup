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
  // Visuel affiché à droite sur ordinateur, sous le texte sur mobile.
  aside?: ReactNode;
};

// En-tête des pages intérieures : fil d'Ariane, H1 unique de la page, introduction.
export function PageHeader({
  title,
  intro,
  breadcrumb,
  children,
  aside,
}: PageHeaderProps) {
  const content = (
    <>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <h1>{title}</h1>
      {intro && <div className={styles.intro}>{intro}</div>}
      {children}
    </>
  );

  return (
    <div className={styles.header}>
      {aside ? (
        <Container className={styles.with_aside}>
          <div className={styles.inner}>{content}</div>
          <div className={styles.aside}>{aside}</div>
        </Container>
      ) : (
        <Container className={styles.inner}>{content}</Container>
      )}
    </div>
  );
}
