"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { button, Section } from "./ui";
import { Chips } from "./Chips";

// Прайс по классу машины. Строка ведёт на страницу услуги.
// full: на компьютере таблица сразу со всеми классами (страница /ceny).
export function Prices({ full = false }: { full?: boolean }) {
  const [cls, setCls] = useState(0);
  return (
    <Section id="prices" label="Цены" className={full ? "pt-8 md:pt-12" : "border-t border-line"}>
      <div className={cn("wrap", !full && "grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]")}>
        {!full && (
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[32px] uppercase sm:text-[44px] lg:text-[64px]">Цены</h2>
            <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-muted">{site.pricesNote}</p>
            <div className="mt-8 flex gap-2 max-lg:hidden">
              <a href="#booking" className={button({ size: "lg" })}>Узнать точную цену</a>
              <Link href="/ceny" className={button({ variant: "ghost", size: "lg" })}>Все цены</Link>
            </div>
          </div>
        )}

        {/* Таблица со всеми классами: компьютер, страница цен */}
        {full && (
          <table className="hidden w-full md:table">
            <thead>
              <tr className="border-b border-line text-left text-[13px] text-muted">
                <th className="py-3 font-normal">Услуга</th>
                <th className="py-3 font-normal">Срок</th>
                {site.carClasses.map((c) => <th key={c} className="py-3 text-right font-normal">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {site.services.map((s) => (
                <tr key={s.slug} className="group border-b border-line">
                  <td className="py-5">
                    <Link href={`/uslugi/${s.slug}`} className="inline-flex items-center gap-2 text-[18px] font-medium transition group-hover:text-accent">{s.title}<ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" aria-hidden /></Link>
                  </td>
                  <td className="py-5 text-[14px] text-muted">{s.time}</td>
                  {s.prices.map((v, i) => <td key={i} className="tnum py-5 text-right font-display text-[20px]"><span className="text-[13px] text-muted">от </span>{rub(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className={cn("mt-6 min-w-0 lg:mt-2", full && "mt-0 md:hidden")}>
          <Chips id="cls" flush items={site.carClasses} value={cls} onChange={setCls} label="Класс автомобиля" className="mb-2" />
          <ul id="cls-panel" role="tabpanel" aria-labelledby={`cls-tab-${cls}`}>
            {site.services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/uslugi/${s.slug}`} className="group flex items-center justify-between gap-4 py-4 md:py-5">
                  <div className="min-w-0">
                    <p className="text-[16px] font-medium leading-snug transition group-hover:text-accent md:text-[18px]">{s.title}</p>
                    <p className="mt-0.5 text-[13px] text-muted">{s.time}</p>
                  </div>
                  <p className="tnum relative flex shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap font-display text-[17px] md:text-[24px]">
                    <span className="text-[12px] text-muted md:text-[14px]">от</span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={s.prices[cls]} className="inline-block"
                        initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {rub(s.prices[cls])}
                      </motion.span>
                    </AnimatePresence>
                    <ArrowRight size={16} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          {!full && (
            <div className="mt-6 grid grid-cols-2 gap-2 lg:hidden">
              <a href="#booking" className={button({ size: "lg" })}>Точная цена</a>
              <Link href="/ceny" className={button({ variant: "ghost", size: "lg" })}>Все цены</Link>
            </div>
          )}
        </div>
        {full && <p className="mt-5 text-[14px] text-muted">{site.pricesNote}</p>}
      </div>
    </Section>
  );
}
