import { expect, test, type APIRequestContext } from "@playwright/test";

const randomIp = () =>
  `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.2`;

const validContact = {
  name: "TEST-AUTO Api",
  email: "api@example.com",
  phone: "",
  subject: "Information",
  message: "Bonjour, je voudrais des informations.",
  consent: true,
  locale: "fr",
  website: "",
};

function post(request: APIRequestContext, path: string, data: unknown, ip = randomIp()) {
  return request.post(path, { data, headers: { "x-forwarded-for": ip } });
}

test.describe("API en lecture", () => {
  test("liste et filtre les formations", async ({ request }) => {
    const all = await (await request.get("/api/formations")).json();
    const duts = await (await request.get("/api/formations?level=DUT&locale=en")).json();
    expect(all.data.length).toBeGreaterThan(duts.data.length);
    expect(duts.data.every((f: { level: string }) => f.level === "DUT")).toBe(true);
    expect(
      all.data
        .filter((formation: { verified: boolean }) => !formation.verified)
        .every(
          (formation: { durationSemesters: number | null; credits: number | null }) =>
            formation.durationSemesters === null && formation.credits === null,
        ),
    ).toBe(true);
    const detail = await (
      await request.get("/api/formations/licence-pro-agronomie")
    ).json();
    if (!detail.data.verified) {
      expect(detail.data.durationSemesters).toBeNull();
      expect(detail.data.credits).toBeNull();
    }
  });

  test("refuse les paramètres invalides et les identifiants inconnus", async ({
    request,
  }) => {
    expect((await request.get("/api/formations?level=DOCTORAT")).status()).toBe(400);
    expect((await request.get("/api/formations/inconnue")).status()).toBe(404);
    expect((await request.get("/api/actualites?page=0")).status()).toBe(400);
  });

  test("expose un cache CDN", async ({ request }) => {
    const response = await request.get("/api/actualites");
    expect(response.headers()["cache-control"]).toContain("s-maxage=300");
  });

  test("ne publie que les actualités vérifiées", async ({ request }) => {
    const response = await request.get("/api/actualites");
    const body = await response.json();
    expect(
      body.data.items.every((actualite: { verified: boolean }) => actualite.verified),
    ).toBe(true);
    expect(
      (await request.get("/api/actualites/sortie-pedagogique-visite-de-ferme")).status(),
    ).toBe(404);
  });
});

test.describe("API des formulaires", () => {
  test("enregistre un message valide", async ({ request }) => {
    expect((await post(request, "/api/contact", validContact)).status()).toBe(201);
  });

  test("ignore silencieusement un robot (champ piège rempli)", async ({ request }) => {
    const response = await post(request, "/api/contact", {
      ...validContact,
      website: "x",
    });
    expect(response.status()).toBe(201);
  });

  test("refuse un autre type de contenu que JSON", async ({ request }) => {
    const response = await request.post("/api/contact", {
      form: { name: "x" },
      headers: { "x-forwarded-for": randomIp() },
    });
    expect(response.status()).toBe(415);
  });

  test("renvoie les erreurs par champ", async ({ request }) => {
    const response = await post(request, "/api/preinscriptions", {
      locale: "fr",
      formation: "master-inconnu",
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.fields).toMatchObject({ firstName: "required", phone: "required" });
  });

  test("bloque le 6e envoi d'une même IP (429 + Retry-After)", async ({ request }) => {
    const ip = randomIp();
    const statuses: number[] = [];
    let retryAfter: string | undefined;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const response = await post(request, "/api/contact", { locale: "fr" }, ip);
      statuses.push(response.status());
      retryAfter = response.headers()["retry-after"];
    }
    expect(statuses).toEqual([400, 400, 400, 400, 400, 429]);
    expect(Number(retryAfter)).toBeGreaterThan(0);
  });
});
