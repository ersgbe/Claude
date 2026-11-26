"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";

const nav = [
  ["Услуги", "#services"],
  ["Цены", "#prices"],
  ["Работы", "#works"],
  ["Вопросы", "#faq"],
  ["Контакты", "#booking"],
];
const tile = "grid h-11 place-items-center rounded-[14px] bg-surface-2/85 backdrop-blur-xl";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-2 px-4 md:px-8">
        <a href="#top" className={cn(tile, "px-4")} aria-label={`${site.name}, на главную`}>
          <span className="font-display text-[17px] font-semibold tracking-tight">{site.name}</span>
        </a>
        <nav aria-label="Основная" className={cn(tile, "hidden gap-7 px-6 lg:flex")}>
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-[14px] text-muted transition hover:text-fg">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.phoneHref}`} className={cn(tile, "hidden px-4 text-[14px] font-semibold hover:text-accent md:grid")}>{site.phone}</a>
          <a href={`tel:${site.phoneHref}`} aria-label="Позвонить" className={cn(tile, "w-11 !bg-accent text-accent-ink")}><Phone size={18} aria-hidden /></a>
          <button type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} className={cn(tile, "w-11 lg:hidden")}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu" aria-label="Мобильная"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
            className="mx-4 rounded-3xl border border-line bg-surface/95 px-5 py-2 backdrop-blur-xl lg:hidden"
          >
            {nav.map(([l, h], i) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className={cn("flex h-14 items-center text-lg", i > 0 && "border-t border-line")}>{l}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
