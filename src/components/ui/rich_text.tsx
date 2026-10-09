import { Fragment } from "react";

// Mots clés entourés de ** dans les textes (traductions, contenus) : « Former les
// **professionnels** ». Ce n'est pas du Markdown complet : seul ce marqueur est reconnu.
const KEYWORD = /\*\*(.+?)\*\*/g;

// Rendu : <strong class="keyword"> (couleur dans les titres, surligneur dans le texte,
// voir typography.css).
export function RichText({ text }: { text: string }) {
  const parts = text.split(KEYWORD);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="keyword">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

// Texte sans marqueurs (attributs, métadonnées, lecteurs de texte brut).
export function plainText(text: string): string {
  return text.replace(KEYWORD, "$1");
}
