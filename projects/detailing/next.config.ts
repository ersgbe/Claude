import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  async headers() {
    // Сервис-воркер не должен залипать в кэше браузера, иначе обновления сайта не доходят
    return [{ source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Content-Type", value: "application/javascript; charset=utf-8" }] }];
  },
  // Цены и запись теперь на странице «Услуги и цены»
  async redirects() {
    return [
      { source: "/ceny", destination: "/uslugi", permanent: true },
      { source: "/zapis", destination: "/uslugi", permanent: true },
    ];
  },
};

export default config;
