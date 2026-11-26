"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Плавное появление блоков при прокрутке: заголовки, плашки, шаги, вопросы.
// Всё, что уже видно при открытии страницы, не трогаем (без вспышек). Без JS всё видно сразу.
// Стили в globals.css (data-rv). При «уменьшить движение» в настройках телефона отключается.
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = "main h2, main .tiles > *, main ol > li, main details, main [data-reveal]";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter(
      (el) => !el.closest('[role="region"], [role="dialog"]') && el.getBoundingClientRect().top > window.innerHeight * 0.92,
    );
    const seen = new Map<Element, number>();
    els.forEach((el) => {
      const i = seen.get(el.parentElement!) ?? 0;
      seen.set(el.parentElement!, i + 1);
      el.style.setProperty("--rv-d", `${Math.min(i, 5) * 70}ms`);
      el.setAttribute("data-rv", "0");
    });
    const show = (el: Element) => el.setAttribute("data-rv", "1");
    const io = new IntersectionObserver(
      (list) => list.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    const safety = window.setTimeout(() => els.forEach(show), 6000); // на случай, если что-то не сработало
    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, [path]);
  return null;
}
