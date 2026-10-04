import { ToProvide } from "./to_provide";

// Texte long stocké en base : paragraphes séparés par une ligne vide.
// Texte vide : marqueur [À FOURNIR].
export function Paragraphs({ text }: { text: string | null | undefined }) {
  if (!text?.trim()) return <ToProvide />;
  return text.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>);
}
