import type { ReactNode } from "react";
import styles from "./alert.module.css";

type AlertVariant = "success" | "error" | "warning" | "info";

type AlertProps = {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
};

// Les erreurs sont annoncées immédiatement par les lecteurs d'écran (role="alert"),
// les autres messages poliment (role="status").
export function Alert({ variant, title, children }: AlertProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`${styles.alert} ${styles[variant]}`}
    >
      {title && <p className={styles.title}>{title}</p>}
      <div>{children}</div>
    </div>
  );
}
