import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Audit automatique WCAG 2.1 A/AA (axe-core) de chaque page, dans les deux thèmes.
// Ne remplace pas un test manuel (clavier, lecteur d'écran), mais détecte contrastes,
// libellés manquants, rôles ARIA invalides, etc.
const PAGES = [
  "/fr",
  "/en",
  "/fr/agrisup",
  "/fr/formations",
  "/fr/formations/licence-pro-agronomie",
  "/fr/admission",
  "/fr/preinscription",
  "/fr/actualites",
  "/fr/actualites/sortie-pedagogique-visite-de-ferme",
  "/fr/faq",
  "/fr/contact",
  "/fr/mentions-legales",
];

for (const theme of ["light", "dark"] as const) {
  test.describe(`Accessibilité — thème ${theme === "light" ? "clair" : "sombre"}`, () => {
    test.beforeEach(async ({ page }) => {
      // Mouvement réduit : aucun élément n'est masqué en attente d'apparition, l'audit
      // porte donc sur l'état final de chaque page.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((value) => {
        localStorage.setItem("agrisup_theme", value);
      }, theme);
    });

    for (const path of PAGES) {
      test(path, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const summary = results.violations.map(
          (violation) =>
            `${violation.id} (${violation.impact}) : ${violation.nodes
              .slice(0, 3)
              .map((node) => node.target.join(" "))
              .join(" | ")}`,
        );
        expect(summary).toEqual([]);
      });
    }
  });
}
