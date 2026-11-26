import type { MetadataRoute } from "next";
import { site } from "@/site.config";

// Манифест: из него телефон узнаёт, что сайт можно поставить как приложение без адресной строки.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name}, ${site.tagline.toLowerCase()} ${site.cityIn}`,
    short_name: site.name,
    description: `${site.tagline} ${site.cityIn}: запись, цены, адрес и телефон.`,
    lang: "ru",
    start_url: "/?source=app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#090908",
    theme_color: "#090908",
    categories: ["auto", "shopping", "lifestyle"],
    icons: [
      { src: "/pwa/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Услуги и цены", url: "/uslugi?source=shortcut", icons: [{ src: "/pwa/icon/192", sizes: "192x192", type: "image/png" }] },
      { name: "Как добраться", url: "/kontakty?source=shortcut", icons: [{ src: "/pwa/icon/192", sizes: "192x192", type: "image/png" }] },
    ],
  };
}
