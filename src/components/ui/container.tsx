import type { HTMLAttributes } from "react";
import styles from "./container.module.css";

// Centre le contenu et limite sa largeur à 1200px (charte §6), avec marges latérales.
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")} {...props} />
  );
}
