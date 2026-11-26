"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { rub } from "@/lib/utils";
import { Head, Section } from "./ui";
import { Chips } from "./Chips";
import { Rail } from "./Rail";

// Клик по карточке: прокрутка к записи и выбор услуги в форме
const pick = (slug: string) => window.dispatchEvent(new CustomEvent("select-service", { detail: slug }));

export function Services() {
  const [i, setI] = useState(0);
  const cat = site.serviceCats[i];
  const list = site.services.filter((s) => cat === "Все" || s.cat === cat);
  return (
    <Section id="services" label="Услуги">
      <Head title="Услуги" text="Нажмите на услугу, чтобы записаться. Цена зависит от класса машины." />
      <Chips id="svc" items={site.serviceCats} value={i} onChange={setI} label="Направление" className="mb-5" />
      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${i}`}>
        <Rail label="Услуги, листайте вправо" resetKey={cat}>
          {list.map((s) => (
            <a
              key={s.slug} href="#booking" onClick={() => pick(s.slug)} data-card
              className="zoom group relative flex aspect-[4/5] w-[78vw] max-w-[360px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[20px] bg-surface outline-offset-4 transition-transform duration-300 hover:-translate-y-0.5 md:w-[360px]"
            >
              <Image src={s.image} alt="" fill sizes="(min-width: 768px) 360px, 78vw" className="-z-0 object-cover" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(9_9_8/0.35)_0%,rgb(9_9_8/0)_30%,rgb(9_9_8/0.2)_50%,rgb(9_9_8/0.94)_100%)]" />
              <span className="absolute left-4 top-4 rounded-[10px] bg-bg/60 px-3 py-1.5 text-[13px] text-fg/85 backdrop-blur-md">{s.time}</span>
              <div className="relative p-5">
                <h3 className="text-[21px] leading-[1.1]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-snug text-fg/65">{s.text}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/12 pt-4">
                  <p className="tnum font-display text-[19px] text-accent"><span className="text-[13px] text-fg/60">от </span>{rub(s.from)}</p>
                  <span aria-hidden className="grid h-11 w-11 place-items-center rounded-[12px] bg-accent text-accent-ink transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={20} /></span>
                </div>
              </div>
              <span className="sr-only">. Записаться</span>
            </a>
          ))}
        </Rail>
      </div>
    </Section>
  );
}
