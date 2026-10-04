import { expect, test, type Page } from "@playwright/test";

// IP fictive différente à chaque test : la limitation de débit (5 envois / 10 min)
// ne doit pas perturber les tests. Les données « TEST-AUTO » sont supprimées à la fin.
async function useRandomIp(page: Page) {
  const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.1`;
  await page.setExtraHTTPHeaders({ "x-forwarded-for": ip });
}

test.describe("Formulaire de préinscription", () => {
  test.beforeEach(({ page }) => useRandomIp(page));

  test("un envoi vide liste les erreurs et place le focus sur le récapitulatif", async ({
    page,
  }) => {
    await page.goto("/fr/preinscription");
    await page.getByRole("button", { name: "Envoyer ma préinscription" }).click();

    const summary = page.getByRole("alert").filter({ hasText: "contient des erreurs" });
    await expect(summary).toBeVisible();
    await expect(summary.locator("li").first()).toHaveText(/^Nom :/);
    await expect(page.getByLabel(/^Téléphone/)).toHaveAttribute("aria-invalid", "true");
    // Le lien du récapitulatif mène au champ concerné.
    await summary.getByRole("link", { name: /^Nom :/ }).click();
    await expect(page).toHaveURL(/#champ_lastName$/);
  });

  test("un envoi complet est enregistré et confirmé", async ({ page }) => {
    await page.goto("/fr/preinscription?formation=dut-agroforesterie");
    await page.getByLabel(/^Nom/).fill("Traoré");
    await page.getByLabel(/^Prénom/).fill("TEST-AUTO E2E");
    await page.getByLabel(/^Téléphone/).fill("(+223) 66-72-43-89");
    await page.getByLabel(/^Ville/).fill("Bamako");
    await page.getByLabel(/Niveau d'études/).selectOption("BAC");
    await page.getByLabel(/Année académique/).selectOption({ index: 1 });
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Envoyer ma préinscription" }).click();

    await expect(
      page.getByRole("status").filter({ hasText: "Préinscription envoyée" }),
    ).toBeVisible();
    await expect(page.getByText(/Merci TEST-AUTO E2E/)).toBeVisible();
  });
});

test.describe("Formulaire de contact", () => {
  test.beforeEach(({ page }) => useRandomIp(page));

  test("exige un email ou un téléphone, puis confirme l'envoi (en anglais)", async ({
    page,
  }) => {
    await page.goto("/en/contact");
    await page.getByLabel(/^Full name/).fill("TEST-AUTO Contact");
    await page.getByLabel(/^Subject/).fill("Question");
    await page
      .getByRole("textbox", { name: /^Message/ })
      .fill("Hello, when does the academic year start?");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByText("Email : Provide an email or a phone number."),
    ).toBeVisible();

    await page.getByLabel(/^Phone/).fill("76 12 34 56");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByRole("status").filter({ hasText: "Message sent" }),
    ).toBeVisible();
  });

  test("la carte n'est chargée qu'au clic", async ({ page }) => {
    await page.goto("/fr/contact");
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "Afficher la carte" }).click();
    await expect(page.locator("iframe[title^='Carte']")).toHaveAttribute("src", /hl=fr/);
  });
});
