"use client";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Горизонтальная лента для телефона. На компьютере (desktopGrid) превращается в сетку.
// Карточки прилипают к краю, следующая выглядывает, снизу полоса прогресса.
// Одна карточка — без ленты, по центру.
export function Rail({ label, children, desktopGrid = "md:grid-cols-2 lg:grid-cols-4" }: { label: string; children: React.ReactNode; desktopGrid?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ pos: 0, size: 100, can: false });
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setM({ pos: max > 0 ? el.scrollLeft / max : 0, size: Math.max(14, Math.min(100, (el.clientWidth / el.scrollWidth) * 100)), can: max > 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  if (count <= 1) return <div className="wrap flex justify-center [&>*]:w-full [&>*]:max-w-[420px]">{children}</div>;

  return (
    <div>
      <div
        ref={ref} onScroll={update} role="region" aria-label={label} tabIndex={0}
        className={cn(
          "no-bar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [&>*]:w-[84vw] [&>*]:max-w-[400px] [&>*]:shrink-0 [&>*]:snap-start [&>*]:snap-always",
          "md:grid md:gap-4 md:overflow-visible md:pr-[var(--edge)] md:[&>*]:w-auto md:[&>*]:max-w-none",
          desktopGrid,
        )}
        style={{ paddingLeft: "var(--edge)", scrollPaddingLeft: "var(--edge)" }}
      >
        {children}
        {/* Отступ справа: Safari игнорирует padding-right в прокручиваемом flex */}
        <span aria-hidden className="!w-[calc(var(--edge)-12px)] !max-w-none md:hidden" />
      </div>
      <div className={cn("wrap mt-5 md:hidden", !m.can && "invisible")} aria-hidden>
        <div className="relative h-px bg-white/12">
          <span className="beam absolute -top-px !h-[3px] rounded-full transition-[left] duration-150 ease-out" style={{ width: `${m.size}%`, left: `${m.pos * (100 - m.size)}%` }} />
        </div>
      </div>
    </div>
  );
}
