"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { button, Heading, Section } from "./ui";

export function Prices() {
  const [cls, setCls] = useState(0);
  return (
    <Section id="prices" className="bg-surface/50">
      <Heading kicker="Цены" title="Сколько это стоит" text="Выберите класс автомобиля. Цена указана от. Точную сумму назовём до начала работ." />
      <div role="tablist" aria-label="Класс автомобиля" className="mb-6 inline-flex w-full max-w-md rounded-full border border-line bg-bg p-1 sm:w-auto">
        {site.carClasses.map((c, i) => (
          <button
            key={c} role="tab" aria-selected={cls === i} onClick={() => setCls(i)}
            className={cn("h-11 flex-1 rounded-full px-4 text-[15px] font-semibold transition sm:flex-none sm:px-6", cls === i ? "bg-accent text-accent-ink" : "text-muted hover:text-fg")}
          >
            {c}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg">
        {site.prices.map((p, i) => (
          <div key={p.service} className={cn("flex items-center justify-between gap-4 px-5 py-5 md:px-8", i > 0 && "border-t border-line")}>
            <div>
              <p className="text-base font-semibold md:text-lg">{p.service}</p>
              <p className="text-sm text-muted">Срок: {p.time}</p>
            </div>
            <p className="font-display text-lg whitespace-nowrap md:text-2xl">от {rub(p.values[cls])}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <a href="#booking" className={button({ size: "lg" })}>Узнать точную цену</a>
        <p className="text-sm text-muted">Пришлите фото в мессенджер, и мы рассчитаем за 10 минут.</p>
      </div>
    </Section>
  );
}
