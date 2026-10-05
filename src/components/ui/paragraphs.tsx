// Texte long stocké en base : paragraphes séparés par une ligne vide.
export function Paragraphs({ text }: { text: string | null | undefined }) {
  if (!text?.trim()) return null;
  return text.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>);
}
