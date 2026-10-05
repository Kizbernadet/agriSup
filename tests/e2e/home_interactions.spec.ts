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

test.describe("Carrousel des partenaires", () => {
  test("avance automatiquement en boucle, sans IER, et peut être mis en pause", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/fr");
    const carousel = page.getByRole("region", {
      name: "Carrousel des partenaires cités",
    });
    await carousel.scrollIntoViewIfNeeded();

    const activeSlide = carousel.locator('[aria-current="true"]');
    const initialSlide = "Organisation 1 sur 2";
    await expect(activeSlide).toHaveAttribute("aria-label", initialSlide);
    // Seule commande : le bouton pause (WCAG 2.2.2).
    await expect(carousel.getByRole("button")).toHaveCount(1);
    await expect(carousel).not.toContainText("IER");
    await expect
      .poll(
        async () => carousel.locator('[aria-current="true"]').getAttribute("aria-label"),
        { timeout: 9000 },
      )
      .not.toBe(initialSlide);
    await expect
      .poll(
        async () => carousel.locator('[aria-current="true"]').getAttribute("aria-label"),
        { timeout: 9000 },
      )
      .toBe(initialSlide);

    // Après une pause, plus aucun défilement.
    await page.mouse.move(0, 0);
    await carousel.getByRole("button", { name: /Mettre en pause/ }).click();
    await page.mouse.move(0, 0);
    await carousel.blur();
    const pausedAt = await activeSlide.getAttribute("aria-label");
    await page.waitForTimeout(8000);
    expect(
      await carousel.locator('[aria-current="true"]').getAttribute("aria-label"),
    ).toBe(pausedAt);
    await expect(carousel.getByRole("button", { name: /Reprendre/ })).toBeVisible();
  });

  test("ne lance pas le défilement si le mouvement réduit est demandé", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr");
    const carousel = page.getByRole("region", {
      name: "Carrousel des partenaires cités",
    });
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel.getByRole("button")).toHaveCount(0);
    await expect(carousel.locator('[aria-current="true"]')).toHaveAttribute(
      "aria-label",
      "Organisation 1 sur 2",
    );
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
      "Les intitulés, niveaux et ouvertures du catalogue restent à valider",
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
