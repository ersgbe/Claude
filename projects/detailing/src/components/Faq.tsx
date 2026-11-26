import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { Heading, Section } from "./ui";

export function Faq() {
  return (
    <Section id="faq" className="bg-surface/50">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Heading title="Частые вопросы" text="Не нашли ответ? Позвоните, ответим сразу." />
        <div>
          {site.faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-[68px] cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold md:text-lg">
                {f.q}
                <Plus className="faq-plus shrink-0 text-accent transition-transform" size={22} aria-hidden />
              </summary>
              <p className="pb-6 pr-10 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
