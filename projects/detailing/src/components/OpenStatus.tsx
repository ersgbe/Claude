"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";

// «Открыто до 21:00» или «Закрыто, откроемся в 9:00» по часам из конфига (время города клиента).
// Считается в браузере после загрузки, чтобы не было рассинхрона с сервером.
function status() {
  const { opens, closes, days } = site.hoursSchema;
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday").slice(0, 2);
  const now = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const short = (t: string) => t.replace(/^0/, "");
  const open = days.includes(day) && now >= toMin(opens) && now < toMin(closes);
  return open ? { open, text: `Открыто до ${short(closes)}` } : { open, text: `Закрыто, откроемся в ${short(opens)}` };
}

export function OpenStatus({ className }: { className?: string }) {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    setS(status());
    const t = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={cn("inline-flex min-h-5 items-center gap-2", className)} aria-live="polite">
      <span aria-hidden className={cn("h-2 w-2 rounded-full transition-colors", !s ? "bg-white/20" : s.open ? "bg-[#7ee08a] shadow-[0_0_10px_#7ee08a]" : "bg-danger")} />
      {s ? s.text : site.hoursShort}
    </span>
  );
}
