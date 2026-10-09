/**
 * Prépare les images du site à partir des sources de assets/ (ne modifie jamais les sources).
 * Usage : npm run images
 *
 * - Logo : marges blanches retirées (aucune retouche du dessin).
 * - Sceau officiel (assets/logo/agrisup_2.jpg) : détouré en cercle sur fond transparent,
 *   logo du site depuis le 2026-10-07.
 * - Icône d'onglet : emblème seul (partie gauche du logo), comme le prévoit la charte §7.
 * - Diaporama : scènes photographiques extraites des affiches de assets/annonces/,
 *   SANS leurs textes (l'affiche « Formez-vous aujourd'hui » porte un numéro erroné).
 *   Images générées par IA, fournies par la cliente : à remplacer par de vraies photos.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

type Crop = { left: number; top: number; width: number; height: number };

const SLIDES: { source: string; output: string; crop: Crop }[] = [
  {
    source: "assets/annonces/affiche_sortie_pedagogique.jpg",
    output: "public/images/slider/slide_terrain.jpg",
    crop: { left: 27, top: 362, width: 969, height: 545 },
  },
  {
    source: "assets/annonces/affiche_inscriptions_continuent.jpg",
    output: "public/images/slider/slide_etudiants.jpg",
    crop: { left: 85, top: 518, width: 853, height: 480 },
  },
  {
    source: "assets/annonces/affiche_formez_vous_aujourdhui.jpg",
    output: "public/images/slider/slide_agriculture.jpg",
    crop: { left: 75, top: 527, width: 937, height: 527 },
  },
];

async function prepareLogo() {
  mkdirSync("public/logo", { recursive: true });
  // Retire le fond blanc autour du logo (seuil bas pour garder l'anti-crénelage).
  const trimmed = sharp("assets/logo/logo_1.jpg").trim({
    background: "#ffffff",
    threshold: 12,
  });
  const { data, info } = await trimmed.png().toBuffer({ resolveWithObject: true });
  await sharp(data).toFile("public/logo/logo_agrisup.png");

  // Emblème : carré de gauche (le cercle occupe toute la hauteur du logo recadré).
  await sharp(data)
    .extract({ left: 0, top: 0, width: info.height, height: info.height })
    .resize(512, 512, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile("public/logo/emblem_agrisup.png");
  await sharp("public/logo/emblem_agrisup.png")
    .resize(180, 180)
    .toFile("src/app/apple-icon.png");
  await sharp("public/logo/emblem_agrisup.png").resize(64, 64).toFile("src/app/icon.png");
  console.log(`Logo : ${info.width}×${info.height} px après recadrage.`);
}

async function prepareSeal() {
  mkdirSync("public/logo", { recursive: true });
  // Recadrage sur le cercle (marges blanches retirées), puis masque circulaire : les
  // coins blancs deviennent transparents, le dessin n'est pas retouché.
  const { data, info } = await sharp("assets/logo/agrisup_2.jpg")
    .trim({ background: "#ffffff", threshold: 12 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const diameter = Math.min(info.width, info.height);
  const mask = Buffer.from(
    `<svg width="${diameter}" height="${diameter}"><circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="#fff"/></svg>`,
  );
  await sharp(data)
    .extract({
      left: Math.floor((info.width - diameter) / 2),
      top: Math.floor((info.height - diameter) / 2),
      width: diameter,
      height: diameter,
    })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile("public/logo/sceau_agrisup.png");
  console.log(`Sceau : ${diameter}×${diameter} px.`);
}

async function prepareSlides() {
  mkdirSync("public/images/slider", { recursive: true });
  for (const slide of SLIDES) {
    await sharp(slide.source)
      .extract(slide.crop)
      .jpeg({ quality: 88 })
      .toFile(slide.output);
    console.log(`Diaporama : ${slide.output}`);
  }
}

// Kakémono : seule photo réelle fournie. On ne garde que la bannière (sans les sacs de riz).
async function prepareGallery() {
  mkdirSync("public/images/galerie", { recursive: true });
  await sharp("assets/photos/non_classes/kakemono_offre_formations.jpg")
    .extract({ left: 22, top: 250, width: 772, height: 1650 })
    .jpeg({ quality: 88 })
    .toFile("public/images/galerie/kakemono_offre_formations.jpg");
  console.log("Galerie : public/images/galerie/kakemono_offre_formations.jpg");
}

async function main() {
  await prepareLogo();
  await prepareSeal();
  await prepareSlides();
  await prepareGallery();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
