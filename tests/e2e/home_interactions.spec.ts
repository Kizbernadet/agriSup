import { expect, test } from "@playwright/test";

test.describe("Carrousel de l'accueil", () => {
  test("se pilote avec des indicateurs accessibles, sans défilement automatique", async ({
    page,
  }) => {
    await page.goto("/fr");
    // Attendre le chargement du JavaScript : avant, les indicateurs sont inactifs.
    await page.waitForLoadState("networkidle");
    const carousel = page.getByRole("region", { name: "Présentation d'AGRI'SUP" });
    const current = carousel.locator("[aria-roledescription=diapositive]:not([inert])");
    await expect(current).toHaveAttribute("aria-label", "1 sur 4");

    await carousel.getByRole("button", { name: "Aller à la diapositive 3" }).click();
    await expect(current).toHaveAttribute("aria-label", "3 sur 4");
    await expect(carousel.getByRole("button", { name: /défilement/ })).toHaveCount(0);
    await expect(
      carousel.getByRole("button", { name: "Aller à la diapositive 4" }),
    ).toBeVisible();
  });

  test("les diapositives masquées ne reçoivent pas le focus clavier", async ({
    page,
  }) => {
    await page.goto("/fr");
    const hiddenLinks = page.locator("[aria-roledescription=diapositive][inert] a");
    expect(await hiddenLinks.count()).toBeGreaterThan(0);
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

// Partenaires du ruban (src/content/placeholders.ts, INSTITUTION.partners).
const PARTNER_COUNT = 9;

test.describe("Ruban des partenaires", () => {
  test("défile en continu, sans bouton, et ne lit chaque partenaire qu'une fois", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/fr");
    const section = page.locator("#partenaires");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("button")).toHaveCount(0);
    // Doublons du ruban masqués aux lecteurs d'écran : chaque partenaire exposé une fois.
    const headings = section.getByRole("heading", { level: 3 });
    await expect(section.getByRole("listitem")).toHaveCount(PARTNER_COUNT);
    await expect(headings).toHaveCount(PARTNER_COUNT);
    await expect(headings.first()).toHaveText("IPR/IFRA de Katibougou");

    const track = section.getByRole("list");
    const position = () =>
      track.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41);
    const start = await position();
    await expect.poll(position, { timeout: 5000 }).toBeLessThan(start);
  });

  test("reste immobile si le mouvement réduit est demandé", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr");
    const section = page.locator("#partenaires");
    await section.scrollIntoViewIfNeeded();
    const track = section.getByRole("list");
    expect(
      await track.evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("none");
    await expect(section.locator("li:visible")).toHaveCount(PARTNER_COUNT);
  });
});

test.describe("Assistant FAQ", () => {
  test("répond à une question suggérée, à une question libre et propose un repli", async ({
    page,
  }) => {
    await page.goto("/fr");
    await page
      .getByRole("button", { name: "Ouvrir l'assistant des questions fréquentes" })
      .click();
    const panel = page.getByRole("region", { name: "Assistant AGRI'SUP" });
    await expect(panel.getByLabel("Votre question")).toBeFocused();

    await panel
      .getByRole("button", { name: "Quelles formations propose AGRI'SUP ?" })
      .click();
    await expect(panel.getByRole("log")).toContainText("seize formations");

    await panel.getByLabel("Votre question").fill("combien coûtent les études ?");
    await panel.getByRole("button", { name: "Envoyer" }).click();
    await expect(panel.getByRole("log")).toContainText("FCFA de formation");

    await panel.getByLabel("Votre question").fill("quel temps fera-t-il ?");
    await panel.getByRole("button", { name: "Envoyer" }).click();
    await expect(panel.getByRole("log")).toContainText("Je n'ai pas trouvé de réponse");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Ouvrir l'assistant des questions fréquentes" }),
    ).toBeFocused();
  });
});

test.describe("Galerie", () => {
  test("ouvre la visionneuse et navigue entre les images", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: /Agrandir l'image : Le kakémono/ }).click();
    const dialog = page.getByRole("dialog", { name: "Visionneuse d'images" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("2 / 9");
    await dialog.getByRole("button", { name: "Image suivante" }).click();
    await expect(dialog).toContainText("3 / 9");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
