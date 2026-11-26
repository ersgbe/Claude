"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { button, Chips, Heading, Section } from "./ui";

export function Prices() {
  const [cls, setCls] = useState(0);
  return (
    <Section id="prices" className="pt-4 md:pt-8">
      <div className="grid gap-x-16 md:grid-cols-[320px_1fr]">
        <div>
          <Heading title="Цены" text="Цена от. Точную сумму назовём до начала работ." className="mb-5 md:mb-6" />
          <a href="#booking" className={cn(button({ size: "lg" }), "max-md:hidden")}>Узнать точную цену</a>
        </div>
        <div className="min-w-0">
          <Chips items={site.carClasses} value={cls} onChange={setCls} label="Класс автомобиля" />
          <div role="tabpanel">
            {site.prices.map((p) => (
              <div key={p.service} className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 last:border-b md:py-4">
                <div>
                  <p className="text-[15px] font-medium md:text-base">{p.service}</p>
                  <p className="text-[13px] text-muted">{p.time}</p>
                </div>
                <p className="whitespace-nowrap font-display text-[15px] md:text-lg">от {rub(p.values[cls])}</p>
              </div>
            ))}
          </div>
          <a href="#booking" className={cn(button({ size: "lg" }), "mt-5 w-full md:hidden")}>Узнать точную цену</a>
        </div>
      </div>
    </Section>
  );
}
