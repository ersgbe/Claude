import { Plus } from "lucide-react";
import { site, type QA } from "@/site.config";
import { Section } from "./ui";

export function Faq({ items = site.faq, title = "Вопросы" }: { items?: QA[]; title?: string }) {
  return (
    <Section id="faq" label={title} className="border-t border-line">
      <div className="wrap grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[46px]">{title}</h2>
          <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-muted">Не нашли ответ? Позвоните, ответим сразу.</p>
        </div>
        <div className="border-t border-line">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-medium transition-colors hover:text-accent md:text-[18px]">
                {f.q}
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-surface-2 transition group-open:bg-accent group-open:text-accent-ink">
                  <Plus className="faq-plus transition-transform duration-300" size={18} aria-hidden />
                </span>
              </summary>
              <p className="max-w-[620px] pb-6 pr-14 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
