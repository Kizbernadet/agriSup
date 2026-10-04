import type { HTMLAttributes } from "react";
import styles from "./card.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  // "article" pour un contenu autonome (formation, actualité), "div" sinon.
  as?: "article" | "div" | "li";
};

export function Card({ as: Tag = "div", className, ...props }: CardProps) {
  return (
    <Tag className={[styles.card, className].filter(Boolean).join(" ")} {...props} />
  );
}
