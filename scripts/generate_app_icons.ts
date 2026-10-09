/**
 * Icônes du site et de l'application installable (PWA), à partir du sceau officiel
 * (public/logo/sceau_agrisup.png, préparé par npm run images).
 * Usage : npm run icons
 *
 * - Onglet du navigateur (src/app/icon.png) : sceau seul, fond transparent.
 * - Application (public/icons/) et écran d'accueil iOS (src/app/apple-icon.png) : sceau
 *   cerclé de blanc sur fond Vert Terrain (#2A724F, charte §3), choix validé par la
 *   cliente. Le cercle blanc détache la couronne verte du sceau du fond.
 * - Icône « maskable » (Android) : sceau réduit dans la zone sûre (cercle de 80 %), car
 *   le système la découpe en cercle, en carré arrondi, etc.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SEAL = "public/logo/sceau_agrisup.png";
// Vert Terrain de la charte (--color-action, thème clair).
const BACKGROUND = "#2a724f";
const WHITE = "#ffffff";

// Sceau centré sur fond vert ; ratio = diamètre du sceau / côté de l'icône.
async function sealOnGreen(size: number, ratio: number, output: string) {
  const seal = Math.round(size * ratio);
  const ring = Math.max(2, Math.round(seal * 0.03));
  const disc = seal + ring * 2;
  const circle = Buffer.from(
    `<svg width="${disc}" height="${disc}"><circle cx="${disc / 2}" cy="${disc / 2}" r="${disc / 2}" fill="${WHITE}"/></svg>`,
  );
  const sealImage = await sharp(SEAL).resize(seal, seal).png().toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([
      { input: circle, left: Math.round((size - disc) / 2), top: Math.round((size - disc) / 2) },
      { input: sealImage, left: Math.round((size - seal) / 2), top: Math.round((size - seal) / 2) },
    ])
    .flatten({ background: BACKGROUND })
    .png()
    .toFile(output);
  console.log(`${output} (${size}×${size})`);
}

async function main() {
  mkdirSync("public/icons", { recursive: true });

  // Onglet : sceau seul, net à 32px sur écran haute densité.
  await sharp(SEAL).resize(96, 96).png().toFile("src/app/icon.png");
  console.log("src/app/icon.png (96×96)");

  await sealOnGreen(180, 0.84, "src/app/apple-icon.png");
  await sealOnGreen(192, 0.84, "public/icons/icone_192.png");
  await sealOnGreen(512, 0.84, "public/icons/icone_512.png");
  await sealOnGreen(512, 0.72, "public/icons/icone_maskable_512.png");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
