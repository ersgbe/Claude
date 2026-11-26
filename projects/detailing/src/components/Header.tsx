"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/site.config";
import { button } from "./ui";
import { cn } from "@/lib/utils";

const nav = [
  ["Услуги", "#services"],
  ["Цены", "#prices"],
  ["Работы", "#works"],
  ["Вопросы", "#faq"],
  ["Контакты", "#booking"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex items-baseline gap-2" aria-label={`${site.name}, на главную`}>
          <span className="font-display text-xl font-bold tracking-tight">{site.name}</span>
          <span className="hidden text-xs text-muted uppercase tracking-widest sm:inline">{site.tagline}</span>
        </a>
        <nav aria-label="Основная" className="hidden items-center gap-7 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-[15px] text-muted transition hover:text-fg">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${site.phoneHref}`} className="hidden text-[15px] font-semibold hover:text-accent md:block">{site.phone}</a>
          <a href="#booking" className={cn(button({ size: "md" }), "hidden sm:inline-flex")}>Записаться</a>
          <a href={`tel:${site.phoneHref}`} aria-label="Позвонить" className={cn(button({ variant: "primary" }), "h-11 w-11 !p-0 md:hidden")}>
            <Phone size={18} aria-hidden />
          </a>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Мобильная"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
          >
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="flex h-14 items-center border-b border-line text-lg">{l}</a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className={cn(button({ size: "lg" }), "mt-5 w-full")}>Записаться</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
