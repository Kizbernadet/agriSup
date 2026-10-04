import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 : « proxy » remplace l'ancienne convention « middleware ».
export default createMiddleware(routing);

export const config = {
  // Exclut les API, les fichiers internes de Next.js/Vercel et les fichiers statiques.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
