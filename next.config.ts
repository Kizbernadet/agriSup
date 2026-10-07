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
};

export default withNextIntl(nextConfig);
