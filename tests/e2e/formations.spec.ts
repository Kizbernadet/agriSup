import { expect, test } from "@playwright/test";

test.describe("Formations", () => {
  test("les filtres combinent niveau et domaine", async ({ page }) => {
    await page.goto("/fr/formations");
    const count = page.locator("[aria-live=polite]");
    const cards = page.locator("main article");
    const total = await cards.count();
    expect(total).toBeGreaterThan(0);

    await page.getByRole("button", { name: "DUT", exact: true }).click();
    const dutCount = await cards.count();
    expect(dutCount).toBeLessThan(total);
    await expect(page.getByRole("button", { name: "DUT", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.getByRole("button", { name: "Aquaculture" }).click();
    await expect(count).toHaveText("Aucune formation ne correspond à ces critères.");

    await page.getByRole("button", { name: "Réinitialiser les filtres" }).click();
    await expect(cards).toHaveCount(total);
  });

  test("la page détail propose une préinscription présélectionnée", async ({ page }) => {
    await page.goto("/fr/formations");
    await page.getByRole("link", { name: /Voir la formation : Agronomie/ }).click();
    await expect(page.locator("h1")).toHaveText("Agronomie");

    await page.getByRole("link", { name: "Se préinscrire" }).last().click();
    await expect(page).toHaveURL(/\/fr\/preinscription\?formation=licence-pro-agronomie/);
    await expect(page.getByLabel(/Formation souhaitée/)).toHaveValue(
      "licence-pro-agronomie",
    );
  });

  test("le bouton WhatsApp cite la formation", async ({ page }) => {
    await page.goto("/fr/formations/licence-pro-agronomie");
    const href = await page.locator("main a[href*='wa.me']").first().getAttribute("href");
    expect(decodeURIComponent(href ?? "").replace(/\+/g, " ")).toContain(
      "concernant la formation Agronomie",
    );
  });
});
