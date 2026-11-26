"use client";
import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { site } from "@/site.config";
import { Heading, Section } from "./ui";
import { Rail } from "./Rail";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ba = site.beforeAfter;
  return (
    <Section id="works" className="pt-4 md:pt-8">
      <Heading title={ba.title} text={ba.text} />
      <div className="relative -mx-5 aspect-[4/3] select-none overflow-hidden sm:aspect-[16/9] md:mx-0 md:rounded-[22px]">
        <Image src="/images/after.jpg" alt="Автомобиль после работы" fill sizes="(min-width:1200px) 1136px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src="/images/before.jpg" alt="Автомобиль до работы" fill sizes="(min-width:1200px) 1136px, 100vw" className="object-cover" />
        </div>
        <span className="absolute left-4 top-4 rounded-lg bg-bg/80 px-3 py-1 text-xs font-semibold backdrop-blur">До</span>
        <span className="absolute right-4 top-4 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">После</span>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Сравнить до и после" className="ba-range absolute inset-0 z-10 touch-pan-y" />
        <div className="ba-handle pointer-events-none absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-ink shadow-lg"><MoveHorizontal size={20} aria-hidden /></span>
        </div>
      </div>

      <div className="mt-8">
        <Rail label="Фото работ, листайте вправо">
          {site.works.map((src, i) => (
            <div key={src} className="relative aspect-[4/5] w-[56vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-[18px] bg-surface md:w-[240px]">
              <Image src={src} alt={`Работа ${i + 1}`} fill sizes="260px" className="object-cover" />
            </div>
          ))}
        </Rail>
      </div>
    </Section>
  );
}
