"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { tile, Tiles } from "./ui";

// Сетка фото работ. Нажатие открывает просмотр на весь экран: стрелки, свайп, Esc.
export function Gallery({ photos, cols = "[--n:2] md:[--n:3]" }: { photos: string[]; cols?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, go]);

  return (
    <>
      <Tiles cols={cols}>
        {photos.map((src, i) => (
          <li key={src}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Открыть фото ${i + 1} из ${n}`} className="zoom group relative block aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-surface md:rounded-[20px]">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 400px, 50vw" className="object-cover" />
              <span aria-hidden className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-[10px] bg-bg/60 opacity-0 backdrop-blur-md transition group-hover:opacity-100 max-md:opacity-100"><Expand size={16} /></span>
            </button>
          </li>
        ))}
      </Tiles>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Фото ${open + 1} из ${n}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg/97 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <div className="wrap flex h-[var(--hdr)] shrink-0 items-end justify-between pb-2">
              <span className="tnum text-[14px] text-muted">{open + 1} / {n}</span>
              <button type="button" aria-label="Закрыть" autoFocus onClick={() => setOpen(null)} className={cn(tile, "h-12 w-12")}><X size={20} aria-hidden /></button>
            </div>
            <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={open} className="absolute inset-0 px-[var(--pad)]"
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
                  onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                >
                  <div className="relative h-full w-full">
                    <Image src={photos[open]} alt={`Работа ${open + 1}`} fill sizes="100vw" className="pointer-events-none object-contain" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="wrap flex h-[88px] shrink-0 items-center justify-center gap-3 pb-[env(safe-area-inset-bottom)]" onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-label="Предыдущее фото" onClick={() => go(-1)} className={cn(tile, "h-12 w-12")}><ArrowLeft size={20} aria-hidden /></button>
              <button type="button" aria-label="Следующее фото" onClick={() => go(1)} className={cn(tile, "h-12 w-12")}><ArrowRight size={20} aria-hidden /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
