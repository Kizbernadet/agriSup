import type { StaticImageData } from "next/image";
import type { FormationDomain } from "@/generated/prisma/enums";
import agribusiness from "../../assets/site/domaines/agribusiness_chambre_froide.jpg";
import transformation from "../../assets/site/domaines/agribusiness_unite_transformation.jpg";
import agroforesterie from "../../assets/site/domaines/agroforesterie_haie.jpg";
import aquaculture from "../../assets/site/domaines/aquaculture_bassins.jpg";
import couveuse from "../../assets/site/domaines/aviculture_couveuse.jpg";
import compostage from "../../assets/site/domaines/compostage_atelier.jpg";
import elevage from "../../assets/site/domaines/elevage_bovins.jpg";
import ecurie from "../../assets/site/domaines/elevage_ecurie_visite.jpg";
import travauxElevage from "../../assets/site/domaines/elevage_travaux_pratiques.jpg";
import maraichage from "../../assets/site/domaines/maraichage_aubergines.jpg";
import tracteur from "../../assets/site/domaines/tracteur_champ.jpg";
import sortieTerrain from "../../assets/site/etudiants/sortie_terrain.jpg";
import microscopeGroupe from "../../assets/site/etudiants/tp_microscope_groupe.jpg";
import microscopeObservation from "../../assets/site/etudiants/tp_microscope_observation.jpg";
import laboratoire from "../../assets/site/salles/laboratoire_microscopes.jpg";
import laboratoireMateriel from "../../assets/site/salles/laboratoire_materiel.jpg";

// Photos réelles de l'établissement (assets/site, préparées par npm run photos),
// associées aux domaines et aux formations selon leur thème. Choix à valider par la
// cliente ; null = illustration aux couleurs de la charte.
export const DOMAIN_PHOTOS: Record<FormationDomain, StaticImageData | null> = {
  PRODUCTION_VEGETALE: maraichage,
  ELEVAGE_SANTE_ANIMALE: elevage,
  AQUACULTURE: aquaculture,
  AGRIBUSINESS: agribusiness,
  AGROFORESTERIE: agroforesterie,
};

// Photo propre à une formation, quand celle du domaine ne suffit pas à la distinguer.
export const FORMATION_PHOTOS: Partial<Record<string, StaticImageData>> = {
  "licence-pro-agronomie": tracteur,
  "master-agronomie": sortieTerrain,
  "dut-production-semence-agricole": laboratoire,
  "dut-production-fumure-organique": compostage,
  "licence-pro-zootechnie": ecurie,
  "licence-pro-medecine-veterinaire": microscopeGroupe,
  "dut-production-lait-viande": travauxElevage,
  "dut-production-aviaire": couveuse,
  "dut-insemination-artificielle": microscopeObservation,
  "dut-technico-commercial-pharmacie-veterinaire": laboratoireMateriel,
  "dut-technico-commercial-agricole": transformation,
};

export function formationPhoto(slug: string, domain: FormationDomain) {
  return FORMATION_PHOTOS[slug] ?? DOMAIN_PHOTOS[domain];
}
