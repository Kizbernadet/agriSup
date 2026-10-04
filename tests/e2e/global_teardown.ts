import { execSync } from "node:child_process";

// Supprime les données écrites en base par les tests d'API.
export default function globalTeardown() {
  execSync("npm run test:cleanup", { stdio: "inherit" });
}
