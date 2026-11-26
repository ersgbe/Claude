import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  // Цены и запись теперь на странице «Услуги и цены»
  async redirects() {
    return [
      { source: "/ceny", destination: "/uslugi", permanent: true },
      { source: "/zapis", destination: "/uslugi", permanent: true },
    ];
  },
};

export default config;
