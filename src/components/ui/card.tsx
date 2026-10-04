import type { HTMLAttributes } from "react";
import styles from "./card.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  // "article" pour un contenu autonome (formation, actualité), "div" sinon.
  as?: "article" | "div" | "li";
  // Carte cliquable : effet d'élévation au survol et au focus.
  interactive?: boolean;
};

export function Card({ as: Tag = "div", interactive, className, ...props }: CardProps) {
  return (
    <Tag
      className={[styles.card, interactive && styles.interactive, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
