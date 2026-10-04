import { THEME_STORAGE_KEY } from "@/lib/theme";

// Exécuté dans le <head> avant le premier affichage, pour éviter un flash de thème :
// choix mémorisé en priorité, sinon préférence système, sinon thème clair.
const script = `(function () {
  var theme = "light";
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  } catch (e) {}
  document.documentElement.dataset.theme = theme;
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
