"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Tiles } from "./ui";

const btn = "grid h-11 w-11 place-items-center rounded-[12px] bg-bg/70 text-fg backdrop-blur-md transition active:scale-95 hover:bg-bg/90";

// Сетка фото работ. Нажатие открывает фото в окне на 90% экрана.
// Закрыть: крестик, нажатие мимо фото, свайп вниз или Esc. Листать: стрелки или свайп вбок.
export function Gallery({ photos, cols = "[--n:2] md:[--n:3]" }: { photos: string[]; cols?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const n = photos.length;
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, go, close]);

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

      {/* Окно выносим в body: внутри страницы его перекрывали шапка и нижняя панель */}
      {mounted && createPortal(
      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Фото ${open + 1} из ${n}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/80 backdrop-blur-md"
            onClick={close}
          >
            {/* Окно на 90% экрана. Нажатие мимо фото закрывает, свайп вниз тоже */}
            <motion.div
              key="frame" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[90svh] w-[94vw] max-w-[1100px] overflow-hidden rounded-[22px] bg-surface"
              onClick={(e) => e.stopPropagation()}
              drag dragDirectionLock dragSnapToOrigin dragElastic={0.35} dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 600) close();
                else if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div key={open} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                  <Image src={photos[open]} alt={`Работа ${open + 1}`} fill sizes="94vw" className="pointer-events-none select-none object-contain" priority />
                </motion.div>
              </AnimatePresence>

              <button type="button" aria-label="Закрыть" autoFocus onClick={close} className={`${btn} absolute right-3 top-3 z-10`}><X size={20} aria-hidden /></button>
              <span className="tnum absolute left-3 top-3 z-10 grid h-11 place-items-center rounded-[12px] bg-bg/70 px-3 text-[14px] backdrop-blur-md">{open + 1} / {n}</span>
              <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between">
                <button type="button" aria-label="Предыдущее фото" onClick={() => go(-1)} className={btn}><ArrowLeft size={20} aria-hidden /></button>
                <button type="button" aria-label="Следующее фото" onClick={() => go(1)} className={btn}><ArrowRight size={20} aria-hidden /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body)}
    </>
  );
}
