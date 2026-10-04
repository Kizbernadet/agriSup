import { FloatingWhatsappButton } from "@/components/contact/whatsapp_button";
import { FaqBot } from "@/components/faq_bot/faq_bot";
import styles from "./floating_actions.module.css";

// Boutons flottants en bas à droite : assistant FAQ au-dessus, WhatsApp en dessous
// (CTA persistant demandé par le cahier §20).
export function FloatingActions() {
  return (
    <div className={styles.stack}>
      <FaqBot />
      <FloatingWhatsappButton />
    </div>
  );
}
