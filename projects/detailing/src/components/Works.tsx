"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ChevronsLeftRight } from "lucide-react";
import { site } from "@/site.config";
import { Head, Section } from "./ui";
import { Rail } from "./Rail";

// До и после: ползунок-полоса света. При первом показе он сам слегка сдвигается,
// чтобы было понятно, что его можно тянуть. Ниже лента фото работ.
export function Works() {
  const w = site.works;
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const seen = useInView(box, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const touched = useRef(false);

  useEffect(() => {
    if (!seen || reduce) return;
    const a = animate(50, [50, 30, 64, 50], {
      duration: 2.2, ease: "easeInOut", delay: 0.2,
      onUpdate: (v) => { if (!touched.current) setPos(v); },
    });
    return () => a.stop();
  }, [seen, reduce]);

  return (
    <Section id="works" label="Работы" className="border-t border-line">
      <Head title={w.title} text={w.text} />

      <div className="wrap max-md:px-0">
        <div ref={box} className="relative aspect-[5/4] select-none overflow-hidden bg-surface sm:aspect-[16/9] md:rounded-[24px]">
          <Image src="/images/after.jpg" alt="Машина после полировки" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src="/images/before.jpg" alt="Та же машина до полировки" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
          <span className="absolute left-3 top-3 rounded-[10px] bg-bg/70 px-3 py-1.5 text-[13px] font-medium backdrop-blur-md md:left-5 md:top-5">До</span>
          <span className="absolute right-3 top-3 rounded-[10px] bg-accent px-3 py-1.5 text-[13px] font-medium text-accent-ink md:right-5 md:top-5">После</span>
          <input
            type="range" min={0} max={100} step={1} value={Math.round(pos)}
            onChange={(e) => { touched.current = true; setPos(+e.target.value); }}
            onPointerDown={() => { touched.current = true; }}
            aria-label="Сравнить: до и после" aria-valuetext={`${Math.round(pos)}% до`}
            className="ba-range absolute inset-0 z-10 touch-pan-y"
          />
          <div className="ba-handle pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <span className="beam-y absolute inset-y-0 -translate-x-1/2" />
            <span className="ba-knob absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[14px] bg-accent text-accent-ink shadow-[0_8px_24px_rgb(0_0_0/0.45)]">
              <ChevronsLeftRight size={20} aria-hidden />
            </span>
          </div>
        </div>

        <ul className="mt-5 grid gap-x-8 gap-y-2 text-[14px] text-fg/75 sm:grid-cols-3 max-md:px-[var(--pad)] md:mt-8 md:text-[15px]">
          {w.facts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-5 shrink-0 bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 md:mt-16">
        <Rail label="Фото работ, листайте вправо">
          {w.photos.map((src, i) => (
            <div key={src} data-card className="zoom relative aspect-[4/5] w-[64vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-surface md:w-[300px]">
              <Image src={src} alt={`Работа ${i + 1}: детали после детейлинга`} fill sizes="(min-width: 768px) 300px, 64vw" className="object-cover" />
            </div>
          ))}
        </Rail>
      </div>
    </Section>
  );
}
