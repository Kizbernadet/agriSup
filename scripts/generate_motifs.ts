/**
 * Génère les motifs décoratifs d'AGRI'SUP (thème clair et thème sombre).
 * Lancement : `npm run motifs`. Sortie : assets/motifs/.
 *
 * - motif_<theme>.svg : tuile de 480 × 480 px qui se répète sans raccord (fond inclus).
 * - motif_<theme>_transparent.svg : même tuile sans fond, pour un usage en CSS.
 * - motif_<theme>_1920x1080.png : la tuile répétée, prête pour un visuel ou une diapositive.
 * - motif_logo_<theme>[_transparent].png : tuile au sceau officiel, façon tampon
 *   (960px, à afficher à 480px), et motif_logo_<theme>_1920x1080.png.
 * - public/images/motifs/ : tuiles transparentes pour le site ; le motif au sceau
 *   (motif_logo_<theme>.webp) est celui de la variable CSS --pattern-image.
 *
 * Icônes : Font Awesome Free (licence CC BY 4.0, attribution dans les mentions légales).
 * Couleurs : valeurs de la charte (docs/charte_graphique.md §3).
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faCarrot } from "@fortawesome/free-solid-svg-icons/faCarrot";
import { faCow } from "@fortawesome/free-solid-svg-icons/faCow";
import { faDroplet } from "@fortawesome/free-solid-svg-icons/faDroplet";
import { faEgg } from "@fortawesome/free-solid-svg-icons/faEgg";
import { faFish } from "@fortawesome/free-solid-svg-icons/faFish";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { faSeedling } from "@fortawesome/free-solid-svg-icons/faSeedling";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { faTractor } from "@fortawesome/free-solid-svg-icons/faTractor";
import { faTree } from "@fortawesome/free-solid-svg-icons/faTree";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons/faWheatAwn";

const TILE = 480;
const OUTPUT_DIR = path.join(process.cwd(), "assets", "motifs");
const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "motifs");

type Theme = {
  name: "clair" | "sombre";
  background: string;
  green: string;
  gold: string;
  greenOpacity: number;
  goldOpacity: number;
};

// Charte §3 : Vert Terrain / Or Moisson et fonds de chaque thème.
const THEMES: Theme[] = [
  {
    name: "clair",
    background: "#f9fafb",
    green: "#2a724f",
    gold: "#c59b2e",
    greenOpacity: 0.12,
    goldOpacity: 0.22,
  },
  {
    name: "sombre",
    background: "#0c1410",
    green: "#2ecc71",
    gold: "#d4af37",
    greenOpacity: 0.1,
    goldOpacity: 0.16,
  },
];

type Motif = {
  icon: IconDefinition;
  x: number;
  y: number;
  size: number;
  rotate: number;
  color: "green" | "gold";
};

// Disposition volontairement irrégulière ; chaque motif reste entièrement dans la tuile
// (marge ≥ moitié de sa taille), d'où une répétition sans motif coupé.
const MOTIFS: Motif[] = [
  { icon: faSeedling, x: 72, y: 70, size: 52, rotate: -12, color: "green" },
  { icon: faWheatAwn, x: 222, y: 58, size: 58, rotate: 18, color: "gold" },
  { icon: faCow, x: 384, y: 84, size: 64, rotate: 0, color: "green" },
  { icon: faFish, x: 128, y: 196, size: 52, rotate: -14, color: "gold" },
  { icon: faTractor, x: 300, y: 204, size: 60, rotate: 4, color: "green" },
  { icon: faLeaf, x: 440, y: 230, size: 36, rotate: 32, color: "gold" },
  { icon: faTree, x: 58, y: 340, size: 56, rotate: 0, color: "green" },
  { icon: faDroplet, x: 196, y: 318, size: 30, rotate: -8, color: "gold" },
  { icon: faCarrot, x: 316, y: 356, size: 46, rotate: 22, color: "gold" },
  { icon: faSun, x: 426, y: 410, size: 46, rotate: 0, color: "gold" },
  { icon: faEgg, x: 176, y: 428, size: 30, rotate: -18, color: "green" },
];

// Petits points dorés pour donner du grain entre les motifs.
const DOTS: [number, number][] = [
  [30, 200],
  [160, 110],
  [270, 290],
  [360, 150],
  [250, 450],
  [100, 456],
  [460, 330],
  [390, 290],
  [20, 20],
];

function iconMarkup({ icon, x, y, size, rotate }: Motif, fill: string, opacity: number) {
  const [width, height, , , pathData] = icon.icon;
  const scale = size / Math.max(width, height);
  const paths = Array.isArray(pathData) ? pathData : [pathData];
  return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale.toFixed(4)}) translate(${-width / 2} ${-height / 2})" fill="${fill}" fill-opacity="${opacity}">${paths
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g>`;
}

function tileSvg(theme: Theme, withBackground: boolean) {
  const motifs = MOTIFS.map((motif) =>
    motif.color === "green"
      ? iconMarkup(motif, theme.green, theme.greenOpacity)
      : iconMarkup(motif, theme.gold, theme.goldOpacity),
  ).join("");
  const dots = DOTS.map(
    ([cx, cy]) =>
      `<circle cx="${cx}" cy="${cy}" r="3" fill="${theme.gold}" fill-opacity="${theme.goldOpacity}"/>`,
  ).join("");
  const background = withBackground
    ? `<rect width="${TILE}" height="${TILE}" fill="${theme.background}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}"><!-- Motif AGRI'SUP (${theme.name}). Icônes Font Awesome Free, CC BY 4.0. -->${background}${motifs}${dots}</svg>\n`;
}

// Visuel 1920 × 1080 : la tuile (PNG) répétée sur un fond uni.
async function writeWallpaper(
  tile: Buffer,
  tileSize: number,
  background: string,
  output: string,
) {
  const columns = Math.ceil(1920 / tileSize);
  const rows = Math.ceil(1080 / tileSize);
  const composites = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      composites.push({ input: tile, left: column * tileSize, top: row * tileSize });
    }
  }
  const canvas = await sharp({
    create: {
      width: columns * tileSize,
      height: rows * tileSize,
      channels: 3,
      background,
    },
  })
    .composite(composites)
    .png()
    .toBuffer();
  await sharp(canvas)
    .extract({ left: 0, top: 0, width: 1920, height: 1080 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

// ---------- Motif au sceau officiel ----------

const SEAL_PATH = path.join(process.cwd(), "public", "logo", "sceau_agrisup.png");
// Tuile de 480px, rendue en 960px pour rester nette sur les écrans haute densité.
const SEAL_TILE = 960;
const SEAL_INK_BOOST = 1.8;

type Stamp = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  color: "green" | "gold";
};

// Grands sceaux en quinconce, petits sceaux dans les intervalles ; chaque sceau reste
// entièrement dans la tuile, d'où un raccord invisible.
const STAMPS: Stamp[] = [
  { x: 250, y: 250, size: 300, rotate: -12, color: "green" },
  { x: 710, y: 710, size: 300, rotate: 10, color: "green" },
  { x: 730, y: 230, size: 170, rotate: 18, color: "gold" },
  { x: 230, y: 730, size: 170, rotate: -20, color: "gold" },
];

// Sceau monochrome façon tampon : l'encre (anneau, textes, dessins) prend la couleur
// demandée, les zones blanches deviennent transparentes.
async function stamp(size: number, rotate: number, hex: string, opacity: number) {
  const { data, info } = await sharp(SEAL_PATH)
    .resize(size, size)
    .flatten({ background: "#ffffff" })
    .greyscale()
    .negate()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const [r, g, b] = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    rgba[pixel * 4] = r;
    rgba[pixel * 4 + 1] = g;
    rgba[pixel * 4 + 2] = b;
    rgba[pixel * 4 + 3] = Math.round(data[pixel] * opacity);
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer({ resolveWithObject: true });
}

async function sealTile(theme: Theme) {
  const layers = [];
  for (const item of STAMPS) {
    const color = item.color === "green" ? theme.green : theme.gold;
    // Le sceau contient beaucoup de blanc (transparent ici) : encre renforcée pour une
    // présence comparable au motif d'icônes.
    const opacity =
      (item.color === "green" ? theme.greenOpacity : theme.goldOpacity) * SEAL_INK_BOOST;
    const { data, info } = await stamp(item.size, item.rotate, color, opacity);
    layers.push({
      input: data,
      left: Math.round(item.x - info.width / 2),
      top: Math.round(item.y - info.height / 2),
    });
  }
  return sharp({
    create: {
      width: SEAL_TILE,
      height: SEAL_TILE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(layers)
    .png()
    .toBuffer();
}

async function generateSealMotifs() {
  try {
    await access(SEAL_PATH);
  } catch {
    throw new Error("Sceau introuvable : lancer d'abord `npm run images`.");
  }
  for (const theme of THEMES) {
    const transparent = await sealTile(theme);
    await writeFile(
      path.join(OUTPUT_DIR, `motif_logo_${theme.name}_transparent.png`),
      transparent,
    );
    // Version utilisée par le site (variable CSS --pattern-image), en WebP : plus légère.
    await sharp(transparent)
      .webp({ quality: 90, alphaQuality: 90 })
      .toFile(path.join(PUBLIC_DIR, `motif_logo_${theme.name}.webp`));
    const withBackground = await sharp(transparent)
      .flatten({ background: theme.background })
      .png()
      .toBuffer();
    await writeFile(
      path.join(OUTPUT_DIR, `motif_logo_${theme.name}.png`),
      withBackground,
    );
    // Le visuel 1920 × 1080 utilise la tuile à sa taille d'affichage (480px).
    const displayTile = await sharp(withBackground).resize(TILE, TILE).png().toBuffer();
    await writeWallpaper(
      displayTile,
      TILE,
      theme.background,
      path.join(OUTPUT_DIR, `motif_logo_${theme.name}_1920x1080.png`),
    );
    console.log(`Motif au sceau ${theme.name} généré.`);
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  for (const theme of THEMES) {
    const tile = tileSvg(theme, true);
    await writeFile(path.join(OUTPUT_DIR, `motif_${theme.name}.svg`), tile);
    const transparent = tileSvg(theme, false);
    await writeFile(
      path.join(OUTPUT_DIR, `motif_${theme.name}_transparent.svg`),
      transparent,
    );
    await writeFile(path.join(PUBLIC_DIR, `motif_${theme.name}.svg`), transparent);

    // Tuile rendue en 2× puis réduite, pour un trait net.
    const tileBuffer = await sharp(Buffer.from(tile), { density: 144 })
      .resize(TILE, TILE)
      .png()
      .toBuffer();
    await writeWallpaper(
      tileBuffer,
      TILE,
      theme.background,
      path.join(OUTPUT_DIR, `motif_${theme.name}_1920x1080.png`),
    );
    console.log(`Motif ${theme.name} généré.`);
  }

  await generateSealMotifs();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
