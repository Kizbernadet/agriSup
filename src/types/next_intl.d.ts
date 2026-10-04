import type messages from "../../messages/fr.json";

// Les clés de traduction sont typées d'après le fichier français (langue de référence).
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}
