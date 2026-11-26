"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Горизонтальная лента: прилипает к карточкам, следующая карточка выглядывает,
// снизу полоса прогресса, на десктопе стрелки. Лента выходит к краю экрана.
export function Rail({ label, children, resetKey }: { label: string; children: React.ReactNode; resetKey?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ pos: 0, size: 100, can: false, atStart: true, atEnd: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setM({
      pos: max > 0 ? el.scrollLeft / max : 0,
      size: Math.min(100, (el.clientWidth / el.scrollWidth) * 100),
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

  const go = (d: number) => ref.current?.scrollBy({ left: d * Math.max(280, ref.current.clientWidth * 0.6), behavior: "smooth" });

  return (
    <div>
      <div
        ref={ref} onScroll={update} role="region" aria-label={label} tabIndex={0}
        className="no-bar relative left-1/2 flex w-screen -translate-x-1/2 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 md:gap-4"
        style={{ paddingInline: "var(--edge)", scrollPaddingInline: "var(--edge)" }}
      >
        {children}
        <span aria-hidden className="w-px shrink-0" />
      </div>
      {m.can && (
        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-[3px] flex-1 rounded-full bg-white/10" aria-hidden>
            <span className="absolute inset-y-0 rounded-full bg-accent transition-[left] duration-100" style={{ width: `${m.size}%`, left: `${m.pos * (100 - m.size)}%` }} />
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label="Назад" disabled={m.atStart} onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-[14px] bg-surface-2 transition hover:bg-white/12 disabled:opacity-30"><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Вперёд" disabled={m.atEnd} onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-[14px] bg-surface-2 transition hover:bg-white/12 disabled:opacity-30"><ChevronRight size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
