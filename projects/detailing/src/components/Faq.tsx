import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { Heading, Section } from "./ui";

export function Faq() {
  return (
    <Section id="faq" className="pt-4 md:pt-8">
      <div className="grid gap-x-16 md:grid-cols-[320px_1fr]">
        <Heading title="Вопросы" text="Не нашли ответ? Позвоните, ответим сразу." className="mb-4 md:mb-0" />
        <div>
          {site.faq.map((f) => (
            <details key={f.q} className="border-t border-line last:border-b">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-[15px] font-medium md:text-base">
                {f.q}
                <Plus className="faq-plus shrink-0 text-accent transition-transform" size={20} aria-hidden />
              </summary>
              <p className="pb-5 pr-8 text-[14px] leading-relaxed text-muted md:text-[15px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
