// Typographie française : espace insécable avant « : » et à l'intérieur des guillemets,
// espace fine insécable avant « ; ? ! ». Évite qu'un signe se retrouve seul en début
// de ligne. Sans effet sur un texte qui utilise déjà les bons espaces.
const NBSP = " ";
const NNBSP = " ";

export function frenchTypography(text: string): string {
  return text
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;?!])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`);
}
