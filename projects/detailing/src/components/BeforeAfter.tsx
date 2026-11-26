"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, MoveHorizontal } from "lucide-react";
import { site } from "@/site.config";
import { button, Heading, Section } from "./ui";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ba = site.beforeAfter;
  return (
    <Section id="works">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div>
          <Heading kicker="Работы" title={ba.title} text={ba.text} className="mb-8 md:mb-8" />
          <ul className="mb-8 space-y-3">
            {ba.facts.map((f) => (
              <li key={f} className="flex gap-3 text-[15px]">
                <Check size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {f}
              </li>
            ))}
          </ul>
          <a href="#booking" className={button({ size: "lg" })}>Хочу так же</a>
        </div>

        <div className="relative aspect-[16/10] select-none overflow-hidden rounded-[var(--radius-card)] border border-line">
          <Image src="/images/after.jpg" alt="Автомобиль после работы" fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src="/images/before.jpg" alt="Автомобиль до работы" fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover" />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs font-semibold backdrop-blur">До</span>
          <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">После</span>
          <input
            type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)}
            aria-label="Сравнить до и после" className="ba-range absolute inset-0 z-10"
          />
          <div className="ba-handle pointer-events-none absolute inset-y-0 z-0 w-0.5 bg-accent transition-shadow" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-ink shadow-lg">
              <MoveHorizontal size={20} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
