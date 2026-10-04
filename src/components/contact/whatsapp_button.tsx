import { useTranslations } from "next-intl";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button";
import { ChatIcon } from "@/components/ui/icons";
import { CONTACT } from "@/content/placeholders";
import { buildWhatsappLink } from "@/lib/whatsapp_link";
import styles from "./whatsapp_button.module.css";

type WhatsappButtonProps = {
  // Message pré-rempli, contextualisé selon la page (ex. nom de la formation).
  message?: string;
  variant?: ButtonVariant;
};

// N'affiche rien tant qu'aucun numéro n'est configuré (NEXT_PUBLIC_WHATSAPP_NUMBER).
export function WhatsappButton({ message, variant = "secondary" }: WhatsappButtonProps) {
  const t = useTranslations("whatsapp");
  if (!CONTACT.whatsappNumber) return null;

  return (
    <a
      href={buildWhatsappLink(CONTACT.whatsappNumber, message ?? t("default_message"))}
      className={buttonClassName(variant)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ChatIcon />
      {t("button")}
    </a>
  );
}

// Bouton flottant présent sur toutes les pages (CTA persistant demandé par le cahier §20).
export function FloatingWhatsappButton() {
  const t = useTranslations("whatsapp");
  if (!CONTACT.whatsappNumber) return null;

  return (
    <a
      href={buildWhatsappLink(CONTACT.whatsappNumber, t("default_message"))}
      className={styles.floating}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
    >
      <ChatIcon />
    </a>
  );
}
