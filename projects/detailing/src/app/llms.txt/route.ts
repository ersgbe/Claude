import { site } from "@/site.config";
import { rub } from "@/lib/utils";

// Короткое описание бизнеса для ИИ-поиска (ChatGPT, Perplexity). Собирается из site.config.ts.
export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name}`,
    `> ${site.tagline} ${site.cityIn}. ${site.services.map((s) => s.title.toLowerCase()).join(", ")}.`,
    "",
    `Адрес: ${site.addressFull}`,
    `Телефон: ${site.phone}`,
    `Часы работы: ${site.hours}`,
    "",
    "## Услуги и цены",
    ...site.services.map((s) => `- [${s.title}](${site.url}/uslugi/${s.slug}): от ${rub(s.from)}, срок ${s.time}. ${s.text}`),
    "",
    "## Условия",
    "- Точную цену называем до начала работ, потом она не меняется.",
    "- На керамику и плёнку выдаём гарантийный талон.",
    "- Запись по телефону, в мессенджерах и на сайте.",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
