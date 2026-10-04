import type { CSSProperties } from "react";

// Attributs d'un élément qui apparaît au défilement (voir reveal_script.tsx).
// index : décalage dans une grille, pour une apparition en cascade.
// suppressHydrationWarning : le script peut marquer l'élément avant l'hydratation React.
export function revealProps(index = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-index": index } as CSSProperties,
    suppressHydrationWarning: true,
  };
}
