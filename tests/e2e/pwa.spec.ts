import { expect, test } from "@playwright/test";

test.describe("Application installable (PWA)", () => {
  test("le manifeste, les icônes et les métadonnées sont servis", async ({ page, request }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.short_name).toBe("AGRI'SUP");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.some((icon: { purpose?: string }) => icon.purpose === "maskable")).toBe(
      true,
    );
    for (const icon of manifest.icons as { src: string }[]) {
      const response = await request.get(icon.src);
      expect(response.status(), icon.src).toBe(200);
    }

    await page.goto("/fr");
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", /manifest/);
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon/);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);

    const sw = await request.get("/sw.js");
    expect(sw.headers()["cache-control"]).toContain("no-cache");
  });

  test("hors ligne : pages consultées disponibles, page hors ligne sinon", async ({
    page,
    context,
  }) => {
    await page.goto("/fr");
    // Attend que le service worker contrôle la page (clients.claim à l'activation).
    await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
    // Visite mise en cache par le service worker (stratégie « réseau d'abord »).
    await page.goto("/fr/formations");
    await expect(page.locator("h1")).toBeVisible();

    await context.setOffline(true);

    await page.goto("/fr/formations");
    await expect(page.locator("h1")).not.toHaveText("Vous êtes hors ligne");

    await page.goto("/fr/contact");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vous êtes hors ligne");
    await expect(page.getByRole("link", { name: "+223 74 98 74 47" })).toBeVisible();

    await page.goto("/en/contact");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("You are offline");

    await context.setOffline(false);
  });
});
