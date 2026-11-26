"use client";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { formatPhone, phoneOk, sendLead } from "@/lib/lead";
import { button } from "./ui";

const field =
  "h-14 w-full rounded-[14px] border bg-[#100f0e]/80 px-4 text-[17px] text-fg backdrop-blur-md transition placeholder:text-muted/70 focus:outline-none focus:border-accent focus:bg-[#100f0e]";
const label = "mb-2 block text-[13px] text-fg/70";

// Короткая заявка. Главное поле одно: телефон. В полной версии можно выбрать услугу.
export function LeadForm({ full = false, source, service: preset }: { full?: boolean; source: string; service?: string }) {
  const id = useId();
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preset ?? "");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  // Клик по карточке услуги выбирает её в форме записи
  useEffect(() => {
    if (!full) return;
    const on = (e: Event) => {
      const s = site.services.find((x) => x.slug === (e as CustomEvent<string>).detail);
      if (s) setService(s.title);
    };
    window.addEventListener("select-service", on);
    return () => window.removeEventListener("select-service", on);
  }, [full]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneOk(phone)) {
      setErr("Введите номер целиком: 10 цифр после +7");
      document.getElementById(`${id}-phone`)?.focus();
      return;
    }
    setErr("");
    setState("busy");
    setState((await sendLead({ phone, service: service || undefined, source })) ? "done" : "error");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "done" ? (
        <motion.p
          key="done" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="flex items-start gap-3 rounded-[14px] border border-accent/30 bg-accent/10 p-4 text-[15px] leading-snug"
        >
          <Check size={20} className="mt-px shrink-0 text-accent" aria-hidden />
          <span>Заявка отправлена. Перезвоним за 10 минут с номера {site.phone}.</span>
        </motion.p>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className={cn(full ? "space-y-4" : "")}>
          <div className={cn(!full && "flex flex-col gap-2 sm:flex-row sm:items-end")}>
            <div className="min-w-0 flex-1">
              <label htmlFor={`${id}-phone`} className={label}>Телефон</label>
              <input
                id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__"
                value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); if (err) setErr(""); }}
                aria-invalid={!!err} aria-describedby={`${id}-err`}
                className={cn(field, "tnum", err ? "border-danger" : "border-white/12")}
              />
            </div>
            {!full && (
              <button type="submit" disabled={state === "busy"} className={cn(button({ size: "lg" }), "w-full sm:w-auto")}>
                {state === "busy" && <Loader2 className="animate-spin" size={18} aria-hidden />}
                {site.hero.button}
              </button>
            )}
          </div>
          <p id={`${id}-err`} role="alert" className={cn("text-[14px] text-danger empty:hidden", full ? "-mt-2" : "mt-2")}>
            {err || (state === "error" ? `Не отправилось. Позвоните нам: ${site.phone}` : "")}
          </p>

          {full && (
            <>
              <div>
                <label htmlFor={`${id}-service`} className={label}>Услуга, если уже знаете</label>
                <div className="relative">
                  <select id={`${id}-service`} value={service} onChange={(e) => setService(e.target.value)} className={cn(field, "appearance-none border-white/12 pr-12")}>
                    <option value="">Пока не знаю, подскажите</option>
                    {site.services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  </select>
                  <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </div>
              <button type="submit" disabled={state === "busy"} className={cn(button({ size: "lg" }), "w-full")}>
                {state === "busy" && <Loader2 className="animate-spin" size={18} aria-hidden />}
                Записаться
              </button>
              <p className="text-[12px] leading-relaxed text-muted">Отправляя номер, вы соглашаетесь на обработку персональных данных.</p>
            </>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
