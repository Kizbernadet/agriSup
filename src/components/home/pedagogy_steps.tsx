import { Steps } from "@/components/ui/steps";
import { PEDAGOGY_DETAILS } from "@/content/domains";
import { INSTITUTION } from "@/content/placeholders";
import type { AppLocale } from "@/i18n/routing";

// Parcours pédagogique (presentation_projet.md §6), affiché sur l'accueil et la page AGRI'SUP.
export function PedagogySteps({ locale }: { locale: AppLocale }) {
  return (
    <Steps
      showConnectors={false}
      items={INSTITUTION.pedagogy.map((step, index) => {
        return {
          label: step[locale],
          description: PEDAGOGY_DETAILS[index]?.[locale],
        };
      })}
    />
  );
}
