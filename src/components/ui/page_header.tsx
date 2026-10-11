import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { Container } from "./container";
import { RichText } from "./rich_text";
import styles from "./page_header.module.css";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
  breadcrumb?: readonly BreadcrumbItem[];
  // Éléments placés sous le titre (badges, boutons…).
  children?: ReactNode;
  // Boutons d'appel à l'action, sous l'introduction.
  actions?: ReactNode;
  // Photo de la thématique de la page (cadre or et sceau), à droite sur ordinateur.
  media?: { image: StaticImageData; alt: string };
  // Visuel libre (remplace media), à droite sur ordinateur, sous le texte sur mobile.
  aside?: ReactNode;
};

// En-tête des pages intérieures : fil d'Ariane, H1 unique de la page, introduction.
export function PageHeader({
  title,
  intro,
  breadcrumb,
  children,
  actions,
  media,
  aside,
}: PageHeaderProps) {
  const content = (
    <>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <h1>
        <RichText text={title} />
      </h1>
      {intro && (
        <div className={styles.intro}>
          {typeof intro === "string" ? <RichText text={intro} /> : intro}
        </div>
      )}
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </>
  );

  const visual =
    aside ??
    (media && (
      <figure className={styles.media}>
        <Image
          src={media.image}
          alt={media.alt}
          sizes="(min-width: 1024px) 560px, 100vw"
          className={styles.media_image}
          // Image principale de la page (LCP) : chargée en priorité.
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
        />
        <Image
          src="/logo/sceau_agrisup.png"
          alt=""
          width={96}
          height={96}
          className={styles.media_seal}
        />
      </figure>
    ));

  return (
    <div className={styles.header}>
      {visual ? (
        <Container className={styles.with_aside}>
          <div className={styles.inner}>{content}</div>
          <div className={styles.aside} data-parallax="float">
            {visual}
          </div>
        </Container>
      ) : (
        <Container className={styles.inner}>{content}</Container>
      )}
    </div>
  );
}
