import Image, { type StaticImageData } from "next/image";
import { DomainIcon } from "@/components/formations/domain_icon";
import type { FormationDomain } from "@/generated/prisma/enums";
import styles from "./domain_cover.module.css";

type DomainCoverProps = {
  domain: FormationDomain;
  photo: StaticImageData | null;
  // Largeur affichée, pour que le navigateur télécharge la bonne résolution.
  sizes: string;
  priority?: boolean;
  // Léger effet de profondeur au défilement (CSS seul, désactivé si mouvement réduit).
  parallax?: boolean;
  // Zoom léger quand l'élément parent est survolé ou contient le focus.
  zoomOnHover?: boolean;
  className?: string;
};

// Couverture d'un domaine ou d'une formation : photo réelle avec voile en dégradé, ou
// illustration aux couleurs de la charte (dégradé, motif au sceau, icône du domaine)
// tant qu'aucune photo n'est disponible. Purement décorative : le titre est à côté.
export function DomainCover({
  domain,
  photo,
  sizes,
  priority = false,
  parallax = false,
  zoomOnHover = false,
  className,
}: DomainCoverProps) {
  const classes = [
    styles.cover,
    photo ? "" : styles.illustrated,
    parallax ? styles.parallax : "",
    zoomOnHover ? styles.zoomable : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {photo ? (
        <>
          <div className={styles.layer}>
            <Image
              src={photo}
              alt=""
              fill
              sizes={sizes}
              quality={90}
              priority={priority}
              placeholder="blur"
              className={styles.image}
            />
          </div>
          <span className={styles.veil} />
        </>
      ) : (
        <span className={styles.emblem}>
          <DomainIcon domain={domain} variant="inline" />
        </span>
      )}
    </div>
  );
}
