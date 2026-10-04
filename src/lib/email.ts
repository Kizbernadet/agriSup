import { Resend } from "resend";

type Notification = {
  subject: string;
  text: string;
  // Adresse du visiteur, pour répondre directement depuis la messagerie.
  replyTo?: string;
};

export type NotificationStatus = "sent" | "skipped" | "failed";

// Expéditeur par défaut de Resend, utilisable sans domaine vérifié (envoi limité à
// l'adresse du compte Resend). À remplacer par une adresse du domaine d'AGRI'SUP.
const DEFAULT_FROM = "AGRI'SUP <onboarding@resend.dev>";

// Notification interne à l'établissement. Texte brut uniquement : aucun contenu saisi
// par un visiteur n'est interprété comme du HTML.
// Un échec d'envoi ne fait jamais échouer le formulaire : la demande est déjà en base.
export async function sendNotification({
  subject,
  text,
  replyTo,
}: Notification): Promise<NotificationStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.warn(
      "Notification email ignorée : RESEND_API_KEY ou FORMS_NOTIFICATION_EMAIL absente.",
    );
    return "skipped";
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to: [to],
      subject: subject.replace(/[\r\n]+/g, " ").slice(0, 200),
      text,
      replyTo,
    });
    if (error) {
      console.error("Échec de la notification email :", error);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("Échec de la notification email :", error);
    return "failed";
  }
}
