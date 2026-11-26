"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Чипы-вкладки: одна строка, листаются пальцем. Активная подсвечена кремовым.
export function Chips({ items, value, onChange, label, id, className, flush = false }: { items: string[]; value: number; onChange: (i: number) => void; label: string; id: string; className?: string; flush?: boolean }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    onChange(n);
    refs.current[n]?.focus();
  };
  // Вкладки не прокручиваются. До трёх штук делим ширину поровну, больше переносим на вторую строку.
  const equal = items.length <= 3;
  return (
    <div
      role="tablist" aria-label={label}
      className={cn(flush ? "" : "wrap", className)}
    >
      <div className={cn(equal ? "grid gap-2" : "flex flex-wrap gap-2")} style={equal ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined}>
        {items.map((c, i) => (
          <button
            key={c} ref={(el) => { refs.current[i] = el; }} id={`${id}-tab-${i}`}
            role="tab" type="button" aria-selected={value === i} aria-controls={`${id}-panel`} tabIndex={value === i ? 0 : -1}
            onClick={() => onChange(i)} onKeyDown={(e) => key(e, i)}
            className={cn(
              "relative h-11 min-w-0 rounded-[14px] px-2 text-[14px] max-[360px]:text-[12.5px] font-medium transition-colors duration-200 sm:px-5 sm:text-[15px] min-[400px]:px-3",
              equal ? "" : "shrink-0 px-4",
              value === i ? "text-accent-ink" : "bg-surface-2 text-fg/85 hover:bg-[#2d2c28] hover:text-fg",
            )}
          >
            {value === i && <motion.span layoutId={`${id}-chip`} className="absolute inset-0 rounded-[14px] bg-accent" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
            <span className="relative truncate">{c}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
