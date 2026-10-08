import type { StaticImageData } from "next/image";
import type { FormationDomain } from "@/generated/prisma/enums";
import elevage from "../../assets/photos/elevage_1.jpeg";
import travauxElevage from "../../assets/photos/elevage_2.jpeg";
import charrue from "../../assets/photos/equipement_1.jpeg";
import couveuse from "../../assets/photos/equipement_2.jpeg";
import microscopeEtudiants from "../../assets/photos/etudiants_2.jpg";
import champ from "../../assets/photos/etudiants_3.webp";
import laboratoire from "../../assets/photos/labo_1.jpeg";
import laboratoireMateriel from "../../assets/photos/labo_5.jpeg";

// Photos réelles de l'établissement associées aux domaines et aux formations.
// null = pas encore de photo : une illustration aux couleurs de la charte est affichée
// (aquaculture, agribusiness, agroforesterie : photos à fournir par la cliente).
export const DOMAIN_PHOTOS: Record<FormationDomain, StaticImageData | null> = {
  PRODUCTION_VEGETALE: champ,
  ELEVAGE_SANTE_ANIMALE: elevage,
  AQUACULTURE: null,
  AGRIBUSINESS: null,
  AGROFORESTERIE: null,
};

// Photo propre à une formation, quand une photo du domaine ne suffit pas à les
// distinguer. Choix proposés, à valider par la cliente.
export const FORMATION_PHOTOS: Partial<Record<string, StaticImageData>> = {
  "licence-pro-agronomie": champ,
  "licence-pro-zootechnie": elevage,
  "licence-pro-medecine-veterinaire": microscopeEtudiants,
  "dut-production-maraichere": charrue,
  "dut-production-lait-viande": travauxElevage,
  "dut-technico-commercial-pharmacie-veterinaire": laboratoireMateriel,
  "dut-production-semence-agricole": laboratoire,
  "dut-insemination-artificielle": couveuse,
};

export function formationPhoto(slug: string, domain: FormationDomain) {
  return FORMATION_PHOTOS[slug] ?? DOMAIN_PHOTOS[domain];
}
