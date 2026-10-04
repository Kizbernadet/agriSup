import type { ComponentProps, ButtonHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary";

export function buttonClassName(variant: ButtonVariant = "primary", extra?: string) {
  return [styles.button, styles[variant], extra].filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };

export function Button({ variant, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClassName(variant, className)} {...props} />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant };

// Lien interne (traduit selon la langue) présenté comme un bouton.
export function ButtonLink({ variant, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}
