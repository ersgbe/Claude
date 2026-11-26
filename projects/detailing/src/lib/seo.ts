import { site } from "@/site.config";

// Хлебные крошки для поисковиков (BreadcrumbList)
export const crumbsLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Главная", path: "" }, ...items].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${site.url}${c.path}` })),
});
