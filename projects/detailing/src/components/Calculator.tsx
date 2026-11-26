"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { prefillLead } from "@/lib/lead";
import { button, Head, Section } from "./ui";
import { Chips } from "./Chips";

// Калькулятор: класс машины + услуги → итоговая цена «от».
// Кнопка переносит расчёт в форму записи, администратор сразу видит, что нужно клиенту.
export function Calculator({ id = "calc", border = true }: { id?: string; border?: boolean }) {
  const [cls, setCls] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const { from, percent } = site.calcDiscount;

  const sel = site.services.filter((s) => picked.includes(s.slug));
  const sum = sel.reduce((a, s) => a + s.prices[cls], 0);
  const off = percent > 0 && sel.length >= from ? Math.round((sum * percent) / 100 / 100) * 100 : 0;
  const total = sum - off;

  const summary = useMemo(
    () => `${sel.map((s) => s.title).join(" + ")}; ${site.carClasses[cls].toLowerCase()}; от ${rub(total)}${off ? ` (скидка ${percent}%)` : ""}`,
    [sel, cls, total, off, percent],
  );
  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));

  return (
    <Section id={id} label="Калькулятор" className={border ? "border-t border-line" : "pt-8 md:pt-12"}>
      <Head title="Расчёт цены" text={percent ? `Выберите машину и услуги. От ${from} услуг скидка ${percent}%.` : "Выберите машину и услуги."} />
      <div className="wrap">
        <p className="mb-2 text-[13px] text-muted">Класс машины</p>
        <Chips id={`${id}-cls`} flush items={site.carClasses} value={cls} onChange={setCls} label="Класс машины" className="mb-6" />

        <p className="mb-2 text-[13px] text-muted">Услуги</p>
        <ul id={`${id}-cls-panel`} role="tabpanel" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s) => {
            const on = picked.includes(s.slug);
            return (
              <li key={s.slug}>
                <button
                  type="button" aria-pressed={on} onClick={() => toggle(s.slug)}
                  className={cn(
                    "flex min-h-[64px] w-full items-center justify-between gap-3 rounded-[16px] border px-4 py-3 text-left transition",
                    on ? "border-accent/60 bg-accent/10" : "border-line bg-surface hover:border-white/20",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium leading-tight">{s.title}</span>
                    <span className="mt-0.5 block text-[13px] text-muted">{s.time}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="tnum font-display text-[15px]">{rub(s.prices[cls])}</span>
                    <span className={cn("grid h-8 w-8 place-items-center rounded-[10px] transition", on ? "bg-accent text-accent-ink" : "bg-surface-2 text-fg/70")}>
                      {on ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Итог */}
        <div className="relative mt-4 overflow-hidden rounded-[20px] border border-line bg-surface p-4 md:mt-6 md:flex md:items-center md:justify-between md:gap-8 md:p-6">
          <div aria-live="polite">
            <p className="text-[13px] text-muted">{sel.length ? `Выбрано: ${sel.length}` : "Выберите хотя бы одну услугу"}</p>
            <p className="tnum mt-1 flex items-baseline gap-3 font-display text-[30px] leading-none md:text-[40px]">
              {sel.length ? <span className="text-[14px] text-muted">от</span> : null}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={total} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.25 }}>{sel.length ? rub(total) : "—"}</motion.span>
              </AnimatePresence>
              {off > 0 && <span className="tnum text-[15px] text-muted line-through">{rub(sum)}</span>}
            </p>
            {off > 0 && <p className="mt-2 text-[13px] text-accent">Скидка {percent}%: −{rub(off)}</p>}
          </div>
          <a
            href="#booking" aria-disabled={!sel.length}
            onClick={(e) => { if (!sel.length) { e.preventDefault(); return; } prefillLead({ service: sel.length === 1 ? sel[0].title : undefined, comment: summary }); }}
            className={cn(button({ size: "lg" }), "mt-4 w-full md:mt-0 md:w-auto", !sel.length && "pointer-events-none opacity-40")}
          >
            Записаться с этим расчётом
          </a>
        </div>
        <p className="mt-3 text-[13px] text-muted">{site.pricesNote}</p>
      </div>
    </Section>
  );
}
