import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/uslugi", "/ceny", "/raboty", "/kontakty", ...site.services.map((s) => `/uslugi/${s.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p.startsWith("/uslugi/") ? 0.8 : 0.6 }));
}
