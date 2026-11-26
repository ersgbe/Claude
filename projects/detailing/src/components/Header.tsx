"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, tile } from "./ui";

// Шапка из плиток: логотип, меню, кремовая плитка-телефон, бургер.
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const active = (href: string) => path === href || path.startsWith(href + "/");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div aria-hidden className={cn("absolute inset-0 -z-10 border-b border-line bg-bg/80 backdrop-blur-xl transition-opacity duration-300", scrolled || open ? "opacity-100" : "opacity-0")} />
      <div className="wrap flex h-[72px] items-center justify-between gap-2">
        <Link href="/" onClick={() => setOpen(false)} className={cn(tile, "h-12 px-4")} aria-label={`${site.name}, на главную`}>
          <span className="font-display text-[15px] font-semibold tracking-[0.08em]">{site.name}</span>
        </Link>
        <nav aria-label="Разделы" className={cn(tile, "hidden h-12 grid-flow-col gap-1 px-2 lg:grid")}>
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={cn("grid h-10 place-items-center rounded-[10px] px-4 text-[14px] transition hover:bg-white/6 hover:text-fg", active(n.href) ? "bg-white/8 text-fg" : "text-fg/70")}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.phoneHref}`} className={cn(button(), "h-12 px-4 max-md:w-12 max-md:px-0")} aria-label={`Позвонить: ${site.phone}`}>
            <Phone size={18} aria-hidden />
            <span className="tnum hidden md:inline">{site.phone}</span>
          </a>
          <button
            type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls="menu"
            onClick={() => setOpen((v) => !v)} className={cn(tile, "h-12 w-12 lg:hidden")}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] -z-10 flex flex-col bg-bg/97 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Меню" className="wrap flex flex-1 flex-col justify-center">
              {site.nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <Link
                  href={n.href} onClick={() => setOpen(false)} aria-current={active(n.href) ? "page" : undefined}
                  className={cn("flex h-16 items-center justify-between border-b border-line font-display text-[26px] uppercase tracking-[-0.02em]", active(n.href) && "text-accent")}
                >
                  {n.label}
                </Link>
                </motion.div>
              ))}
            </nav>
            <div className="wrap pb-[max(20px,env(safe-area-inset-bottom))]">
              <p className="mb-3 text-[14px] text-muted">{site.address}. {site.hours}.</p>
              <a href={`tel:${site.phoneHref}`} className={cn(button({ size: "lg" }), "tnum w-full")}><Phone size={18} aria-hidden /> {site.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
