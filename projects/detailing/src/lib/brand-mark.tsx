// Знак для значка приложения и заставки: кольцо (колесо, линза) и полоса света.
// Не зависит от названия и шрифтов, поэтому подходит любому клиенту.
// Цвета те же, что в globals.css (--color-bg, --color-accent).
export const BG = "#090908";
export const ACCENT = "#ffe0a3";

export function Mark({ size }: { size: number }) {
  const d = Math.round(size * 0.62);
  const gap = Math.max(5, Math.round(d * 0.055));
  const strip = (top: number, w: number) => ({
    display: "flex" as const, position: "absolute" as const, left: -d * 0.2, top, width: d * 1.4, height: w, background: BG, transform: "rotate(-38deg)",
  });
  return (
    <div style={{ display: "flex", position: "relative", width: d, height: d, borderRadius: "50%", background: ACCENT, overflow: "hidden" }}>
      <div style={strip(d * 0.42, gap)} />
      <div style={strip(d * 0.56, gap * 2.6)} />
    </div>
  );
}
