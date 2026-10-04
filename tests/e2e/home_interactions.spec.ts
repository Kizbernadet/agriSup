import { expect, test } from "@playwright/test";

test.describe("Carrousel de l'accueil", () => {
  test("se pilote avec les boutons et peut être mis en pause", async ({ page }) => {
    await page.goto("/fr");
    const carousel = page.getByRole("region", { name: "Présentation d'AGRI'SUP" });
    const current = carousel.locator("[aria-roledescription=diapositive]:not([inert])");
    await expect(current).toHaveAttribute("aria-label", "1 sur 3");

    await carousel.getByRole("button", { name: "Diapositive suivante" }).click();
    await expect(current).toHaveAttribute("aria-label", "2 sur 3");

    await carousel.getByRole("button", { name: "Aller à la diapositive 3" }).click();
    await expect(current).toHaveAttribute("aria-label", "3 sur 3");

    const toggle = carousel.getByRole("button", { name: /défilement/ });
    await toggle.click();
    await expect(
      carousel.getByRole("button", { name: "Reprendre le défilement" }),
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
    await expect(panel.getByRole("log")).toContainText(
      "DUT et des licences professionnelles",
    );

    await panel.getByLabel("Votre question").fill("combien coûtent les études ?");
    await panel.getByRole("button", { name: "Envoyer" }).click();
    await expect(panel.getByRole("log")).toContainText("frais de scolarité");

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
    await expect(dialog).toContainText("1 / 4");
    await dialog.getByRole("button", { name: "Image suivante" }).click();
    await expect(dialog).toContainText("2 / 4");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
