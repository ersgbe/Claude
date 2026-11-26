"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { tile } from "./ui";

// Горизонтальная лента: карточки прилипают к краю сетки, следующая выглядывает,
// снизу полоса прогресса со световой меткой, на компьютере стрелки.
export function Rail({ label, children, resetKey, id }: { label: string; children: React.ReactNode; resetKey?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ pos: 0, size: 100, can: false, atStart: true, atEnd: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setM({
      pos: max > 0 ? el.scrollLeft / max : 0,
      size: Math.max(12, Math.min(100, (el.clientWidth / el.scrollWidth) * 100)),
      can: max > 4,
      atStart: el.scrollLeft < 4,
      atEnd: el.scrollLeft > max - 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [resetKey, update]);

  const go = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: d * step * Math.max(1, Math.floor(el.clientWidth / step) - 1), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref} id={id} onScroll={update} role="region" aria-label={label} tabIndex={0}
        className="no-bar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth md:gap-4"
        style={{ paddingInline: "var(--edge)", scrollPaddingInline: "var(--edge)" }}
      >
        {children}
      </div>
      <div className={cn("wrap mt-5 flex h-11 items-center gap-5", !m.can && "invisible")} aria-hidden={!m.can}>
        <div className="relative h-px flex-1 bg-white/12">
          <span
            className="beam absolute -top-px !h-[3px] rounded-full transition-[left] duration-150 ease-out"
            style={{ width: `${m.size}%`, left: `${m.pos * (100 - m.size)}%` }}
          />
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" aria-label="Листать назад" disabled={m.atStart} onClick={() => go(-1)} className={cn(tile, "h-11 w-11 disabled:pointer-events-none disabled:opacity-30")}><ArrowLeft size={18} aria-hidden /></button>
          <button type="button" aria-label="Листать вперёд" disabled={m.atEnd} onClick={() => go(1)} className={cn(tile, "h-11 w-11 disabled:pointer-events-none disabled:opacity-30")}><ArrowRight size={18} aria-hidden /></button>
        </div>
      </div>
    </div>
  );
}
