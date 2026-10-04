import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sendNotification } from "@/lib/email";
import { handleFormPost } from "@/lib/form_endpoint";
import { contactSchema } from "@/lib/validation/contact_schema";

// POST /api/contact (cahier §14.1) : enregistre le message puis notifie l'établissement.
export async function POST(request: NextRequest) {
  return handleFormPost({
    request,
    scope: "contact",
    schema: contactSchema,
    onValid: async (data) => {
      await db.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          locale: data.locale,
          consentAt: new Date(),
        },
      });

      await sendNotification({
        subject: `[Site] Contact : ${data.subject}`,
        replyTo: data.email,
        text: [
          "Nouveau message reçu depuis le formulaire de contact du site.",
          "",
          `Nom : ${data.name}`,
          `Email : ${data.email ?? "—"}`,
          `Téléphone : ${data.phone ?? "—"}`,
          `Langue : ${data.locale}`,
          `Sujet : ${data.subject}`,
          "",
          data.message,
        ].join("\n"),
      });
    },
  });
}
