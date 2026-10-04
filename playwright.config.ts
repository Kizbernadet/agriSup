import { defineConfig } from "@playwright/test";

const PORT = 3200;

// Tests de bout en bout sur le build de production (lancer `npm run build` avant).
// Navigateur : le Chrome installé sur le poste (pas de téléchargement de navigateur).
export default defineConfig({
  testDir: "tests/e2e",
  // Séquentiel : certains tests écrivent en base puis nettoient leurs données.
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  globalTeardown: "./tests/e2e/global_teardown.ts",
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: "chrome",
    locale: "fr-FR",
  },
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}/fr`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
