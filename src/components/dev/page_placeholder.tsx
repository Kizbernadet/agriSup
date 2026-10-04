import { getTranslations } from "next-intl/server";
import type messages from "../../../messages/fr.json";

type PageKey = keyof typeof messages.pages;

// Composant temporaire : chaque page le remplace par son vrai contenu
// en phases 5 et 7, puis ce fichier est supprimé.
export async function PagePlaceholder({ page }: { page: PageKey }) {
  const t = await getTranslations();

  return (
    <main>
      <h1>{t(`pages.${page}.title`)}</h1>
      <p>{t("placeholder.in_progress")}</p>
    </main>
  );
}
