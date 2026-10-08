import Image, { type StaticImageData } from "next/image";
import styles from "./poster_fan.module.css";

export type Poster = {
  id: string;
  image: StaticImageData;
  alt: string;
  // Largeur maximale affichée : le navigateur télécharge la bonne résolution.
  sizes: string;
};

// Supports officiels en éventail : la pièce centrale devant, les deux autres décalées et
// inclinées. Purement visuel (pas de clic) ; au survol, la pièce passe devant.
export function PosterFan({ posters }: { posters: readonly Poster[] }) {
  return (
    <ul className={styles.fan}>
      {posters.map((poster, index) => (
        <li key={poster.id} className={styles.poster}>
          <Image
            src={poster.image}
            alt={poster.alt}
            sizes={poster.sizes}
            quality={90}
            className={styles.image}
            placeholder="blur"
            loading="eager"
            // Affiche centrale (la plus grande) : élément principal de l'en-tête.
            fetchPriority={index === 1 ? "high" : "auto"}
          />
        </li>
      ))}
    </ul>
  );
}
