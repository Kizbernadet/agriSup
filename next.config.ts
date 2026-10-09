import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF en priorité (plus léger), WebP sinon : important sur connexions lentes.
    formats: ["image/avif", "image/webp"],
    // 90 pour les photos mises en avant (hero, galerie) : netteté avant légèreté.
    qualities: [75, 90],
  },
  // Service worker (PWA) : jamais mis en cache par le navigateur, pour que chaque
  // déploiement soit détecté ; il ne charge aucun script d'une autre origine.
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
