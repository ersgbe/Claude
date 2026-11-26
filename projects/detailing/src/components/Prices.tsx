"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { button, Section } from "./ui";
import { Chips } from "./Chips";

// Прайс: выбираете класс машины, цены меняются на месте.
export function Prices() {
  const [cls, setCls] = useState(0);
  return (
    <Section id="prices" label="Цены" className="border-t border-line">
      <div className="wrap grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[32px] uppercase sm:text-[44px] lg:text-[64px]">Цены</h2>
          <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-muted">{site.pricesNote}</p>
          <a href="#booking" className={cn(button({ size: "lg" }), "mt-8 max-lg:hidden")}>Узнать точную цену</a>
        </div>

        <div className="mt-6 min-w-0 lg:mt-2">
          <Chips id="cls" flush items={site.carClasses} value={cls} onChange={setCls} label="Класс автомобиля" className="mb-2" />
          <ul id="cls-panel" role="tabpanel" aria-labelledby={`cls-tab-${cls}`}>
            {site.prices.map((p) => (
              <li key={p.service} className="flex items-center justify-between gap-4 border-b border-line py-4 md:py-5">
                <div className="min-w-0">
                  <p className="text-[16px] font-medium leading-snug md:text-[18px]">{p.service}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{p.time}</p>
                </div>
                <p className="tnum relative shrink-0 overflow-hidden whitespace-nowrap font-display text-[17px] md:text-[24px]">
                  <span className="text-[12px] text-muted md:text-[14px]">от </span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={p.values[cls]} className="inline-block"
                      initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {rub(p.values[cls])}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </li>
            ))}
          </ul>
          <a href="#booking" className={cn(button({ size: "lg" }), "mt-6 w-full lg:hidden")}>Узнать точную цену</a>
        </div>
      </div>
    </Section>
  );
}
