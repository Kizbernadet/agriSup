import type { NextRequest } from "next/server";
import { academicYearOptions } from "@/lib/academic_year";
import { db } from "@/lib/db";
import { sendNotification } from "@/lib/email";
import { handleFormPost } from "@/lib/form_endpoint";
import { preinscriptionSchema } from "@/lib/validation/preinscription_schema";

// POST /api/preinscriptions (cahier §8.3 et §14.2) : vérifie la formation,
// enregistre la préinscription (statut NEW) puis notifie l'établissement.
export async function POST(request: NextRequest) {
  return handleFormPost({
    request,
    scope: "preinscription",
    schema: preinscriptionSchema,
    onValid: async (data) => {
      if (!academicYearOptions().includes(data.academicYear)) {
        return { fieldErrors: { academicYear: "invalid_choice" } };
      }

      const formation = await db.formation.findFirst({
        where: { slug: data.formation, published: true },
        select: {
          id: true,
          level: true,
          translations: { where: { locale: "fr" }, select: { name: true } },
        },
      });
      if (!formation) {
        return { fieldErrors: { formation: "invalid_choice" } };
      }

      await db.preinscription.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          educationLevel: data.educationLevel,
          formationId: formation.id,
          academicYear: data.academicYear,
          message: data.message,
          locale: data.locale,
          consentAt: new Date(),
        },
      });

      const formationName = formation.translations[0]?.name ?? data.formation;
      await sendNotification({
        subject: `[Site] Préinscription : ${data.firstName} ${data.lastName} — ${formationName}`,
        replyTo: data.email,
        text: [
          "Nouvelle préinscription reçue depuis le site.",
          "",
          `Nom : ${data.lastName}`,
          `Prénom : ${data.firstName}`,
          `Téléphone : ${data.phone}`,
          `Email : ${data.email ?? "—"}`,
          `Ville : ${data.city}`,
          `Niveau d'études : ${data.educationLevel}`,
          `Formation souhaitée : ${formationName} (${formation.level})`,
          `Année académique : ${data.academicYear}`,
          `Langue : ${data.locale}`,
          "",
          `Message : ${data.message ?? "—"}`,
        ].join("\n"),
      });
    },
  });
}
