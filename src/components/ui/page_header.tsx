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
  // Photo de la thématique de la page, en fond de tout l'en-tête (à la place du motif).
  media?: { image: StaticImageData; alt: string };
  // Visuel affiché à droite sur ordinateur, sous le texte sur mobile.
  aside?: ReactNode;
};

// En-tête des pages intérieures : fil d'Ariane, H1 unique de la page, introduction.
// Avec une photo : fond photographique sous un voile sombre ; data-theme="dark" applique
// à l'en-tête seul la palette sombre de la charte (tokens.css), dont les contrastes
// sont vérifiés, quel que soit le thème choisi par le visiteur.
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

  return (
    <div
      className={[styles.header, media ? styles.with_photo : styles.with_pattern].join(
        " ",
      )}
      data-theme={media ? "dark" : undefined}
    >
      {media && (
        <div className={styles.backdrop}>
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes="100vw"
            quality={90}
            className={styles.backdrop_image}
            // Image principale de la page (LCP) : chargée en priorité.
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
          />
        </div>
      )}
      {aside ? (
        <Container className={styles.with_aside}>
          <div className={styles.inner}>{content}</div>
          <div className={styles.aside} data-parallax="float">
            {aside}
          </div>
        </Container>
      ) : (
        <Container className={styles.inner}>{content}</Container>
      )}
    </div>
  );
}
