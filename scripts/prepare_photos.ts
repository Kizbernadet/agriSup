/**
 * Prépare les photos et logos affichés sur le site à partir des sources de
 * assets/photos/ (classées par la cliente) ; les sources ne sont jamais modifiées.
 * Usage : npm run photos
 *
 * Chaque photo est redressée (orientation EXIF), limitée à 2048px, légèrement corrigée
 * (niveaux étirés, saturation +6 %, netteté douce) puis enregistrée en JPEG de qualité
 * dans assets/site/, sous un nom en snake_case. next/image produit ensuite les versions
 * WebP/AVIF à la bonne taille. Les logos sont seulement détourés de leurs marges blanches.
 *
 * Pour ajouter une photo : une ligne dans PHOTOS, puis npm run photos.
 */
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const SOURCE = "assets/photos";
const OUTPUT = "assets/site";
const MAX_SIZE = 2048;

// [source (relative à assets/photos), nom de sortie (relatif à assets/site)]
const PHOTOS: [string, string][] = [
  // Bâtiment et campus
  ["batiments/batiment_1.jpg", "campus/batiment_facade.jpg"],
  ["batiments/batiment_2.jpeg", "campus/enseigne_entree.jpg"],
  ["batiments/batiment_3.jpeg", "campus/batiment_entree.jpg"],
  ["batiments/bibliotheq2.jpg", "campus/bibliotheque.jpg"],
  ["equipements/P29.jpg", "campus/bus_ecole.jpg"],
  // Salles et laboratoire
  ["equipements/labo_1.jpeg", "salles/laboratoire_microscopes.jpg"],
  ["equipements/labo_3.jpeg", "salles/laboratoire_loupes.jpg"],
  ["non_classes/labo_5.jpeg", "salles/laboratoire_materiel.jpg"],
  ["non_classes/salle_cours_1.jpeg", "salles/salle_cours.jpg"],
  ["non_classes/salle_informatique_2.jpeg", "salles/salle_informatique.jpg"],
  // Étudiants
  ["etudiants/etudiants_1.png", "etudiants/promotion_campus.jpg"],
  ["etudiants/etudiants_2.jpg", "etudiants/tp_microscope_binome.jpg"],
  ["etudiants/etudiants_5.jpg", "etudiants/promotion_encadrants.jpg"],
  ["non_classes/P11.jpg", "etudiants/tp_microscopes_salle.jpg"],
  ["non_classes/P14.jpg", "etudiants/tp_microscope_groupe.jpg"],
  ["non_classes/P17.jpg", "etudiants/tp_microscope_observation.jpg"],
  ["non_classes/foto agr.jpg", "etudiants/salle_informatique_cours.jpg"],
  ["non_classes/P5.jpg", "etudiants/sortie_terrain.jpg"],
  ["non_classes/photo de groupe.jpg", "etudiants/photo_groupe_entree.jpg"],
  // Élevage et production
  ["activites/elevage_1.jpeg", "domaines/elevage_bovins.jpg"],
  ["etudiants/elevage_2.jpeg", "domaines/elevage_travaux_pratiques.jpg"],
  ["activites/FB_IMG_1791288891191.jpg", "domaines/elevage_ecurie_visite.jpg"],
  ["equipements/equipement_2.jpeg", "domaines/aviculture_couveuse.jpg"],
  ["non_classes/photo expert agi biologique.jpg", "domaines/maraichage_aubergines.jpg"],
  ["non_classes/FB_IMG_1791289069597.jpg", "domaines/tracteur_champ.jpg"],
  ["non_classes/FB_IMG_1791289019700.jpg", "domaines/compostage_atelier.jpg"],
  ["non_classes/FB_IMG_1791288943292.jpg", "domaines/aquaculture_bassins.jpg"],
  ["non_classes/FB_IMG_1791288929030.jpg", "domaines/agribusiness_chambre_froide.jpg"],
  ["activites/FB_IMG_1791288925817.jpg", "domaines/agribusiness_unite_transformation.jpg"],
  ["activites/FB_IMG_1791288888844.jpg", "domaines/agroforesterie_haie.jpg"],
];

// Logos des partenaires : marges blanches retirées, PNG sans perte.
const LOGOS: [string, string][] = [
  ["partenaires/ipr_ifra_logo.jpg", "partenaires/ipr_ifra.png"],
  ["partenaires/ier_logo.jpg", "partenaires/ier.png"],
  ["partenaires/carf_logo.jpg", "partenaires/carfs.png"],
  ["partenaires/afg_bank_logo_2.png", "partenaires/afg_bank.png"],
];

async function preparePhoto(source: string, output: string) {
  const target = `${OUTPUT}/${output}`;
  mkdirSync(dirname(target), { recursive: true });
  const info = await sharp(`${SOURCE}/${source}`)
    .rotate()
    .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
    // Niveaux étirés entre les 1 % les plus sombres et les plus clairs : photos de
    // téléphone souvent voilées, sans effet sur une image déjà bien exposée.
    .normalise({ lower: 1, upper: 99 })
    .modulate({ saturation: 1.06 })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(target);
  console.log(`${target} (${info.width}×${info.height})`);
}

async function prepareLogo(source: string, output: string) {
  const target = `${OUTPUT}/${output}`;
  mkdirSync(dirname(target), { recursive: true });
  const info = await sharp(`${SOURCE}/${source}`)
    .trim({ background: "#ffffff", threshold: 20 })
    .resize(512, 512, { fit: "inside", withoutEnlargement: true })
    .png()
    .toFile(target);
  console.log(`${target} (${info.width}×${info.height})`);
}

async function main() {
  for (const [source, output] of PHOTOS) await preparePhoto(source, output);
  for (const [source, output] of LOGOS) await prepareLogo(source, output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
