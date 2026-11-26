"use client";
import { useEffect, useRef } from "react";

// Подгоняет размер шрифта так, чтобы строка заняла всю ширину блока.
export function FitText({ children, className, max = 320 }: { children: string; className?: string; max?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const k = box.clientWidth / el.scrollWidth;
      el.style.fontSize = `${Math.min(max, Math.floor(100 * k * 0.995))}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [max]);
  return <span ref={ref} className={className} style={{ fontSize: "18vw", whiteSpace: "nowrap", display: "inline-block" }}>{children}</span>;
}
