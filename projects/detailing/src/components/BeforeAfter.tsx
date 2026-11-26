"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ChevronsLeftRight } from "lucide-react";

// Ползунок «до и после» с полосой света. При первом показе сам слегка сдвигается,
// чтобы было понятно, что его можно тянуть.
export function BeforeAfter({ before = "/images/before.jpg", after = "/images/after.jpg" }: { before?: string; after?: string }) {
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
    <div ref={box} className="relative aspect-[5/4] select-none overflow-hidden bg-surface sm:aspect-[16/9] md:rounded-[24px]">
      <Image src={after} alt="Машина после работы" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt="Та же машина до работы" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
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
  );
}
