import { expect, test } from "@playwright/test";

test.describe("Navigation et langues", () => {
  test("la racine redirige vers la langue du navigateur", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("toutes les pages du menu répondent, avec un seul H1", async ({ page }) => {
    await page.goto("/fr");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    const links = await nav.getByRole("link").all();
    const hrefs = await Promise.all(links.map((link) => link.getAttribute("href")));

    for (const href of hrefs) {
      const response = await page.goto(href!);
      expect(response?.status(), href!).toBe(200);
      await expect(page.locator("h1"), href!).toHaveCount(1);
    }
  });

  test("le sélecteur de langue garde la même page (URL traduite)", async ({ page }) => {
    await page.goto("/fr/formations");
    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/en\/programs$/);
    await expect(page.locator("h1")).toHaveText("Programs");
  });

  test("le thème choisi est mémorisé après rechargement", async ({ page }) => {
    await page.goto("/fr");
    const html = page.locator("html");
    const initial = await html.getAttribute("data-theme");
    const next = initial === "dark" ? "light" : "dark";

    await page.locator("header").getByRole("button", { name: /mode/ }).click();
    await expect(html).toHaveAttribute("data-theme", next);
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", next);
  });

  test("le lien d'évitement est le premier élément au clavier", async ({ page }) => {
    await page.goto("/fr");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  });

  test("une URL inconnue affiche la page 404 traduite", async ({ page }) => {
    const response = await page.goto("/en/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("Page not found");
  });
});

test.describe("Menu mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("s'ouvre, se ferme avec Échap et rend le focus", async ({ page }) => {
    await page.goto("/fr");
    const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Fermer le menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  for (const path of ["/fr", "/fr/formations"]) {
    test(`la barre et le bouton du menu restent visibles au défilement (${path})`, async ({
      page,
    }) => {
      await page.goto(path);
      await page.mouse.wheel(0, 2000);
      const header = page.locator("header").first();
      await expect.poll(async () => (await header.boundingBox())?.y ?? -1).toBe(0);
      const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
      await expect(toggle).toBeInViewport();
      // Menu ouvert pendant le défilement : il reste utilisable.
      await toggle.click();
      await page.mouse.wheel(0, 600);
      await expect(page.getByRole("link", { name: "Contact" }).first()).toBeInViewport();
    });
  }
});
