"use client";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, Check, ChevronDown, Loader2, X } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { formatPhone, phoneOk, sendLead, type Prefill } from "@/lib/lead";
import { button } from "./ui";

const field =
  "h-14 w-full rounded-[14px] border bg-[#100f0e]/80 px-4 text-[17px] text-fg backdrop-blur-md transition placeholder:text-muted/70 focus:outline-none focus:border-accent focus:bg-[#100f0e]";
const label = "mb-2 block text-[13px] text-fg/70";

// Короткая заявка. Главное поле одно: телефон. В полной версии можно выбрать услугу.
export function LeadForm({ full = false, source, service: preset }: { full?: boolean; source: string; service?: string }) {
  const id = useId();
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preset ?? "");
  const [comment, setComment] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [day, setDay] = useState(-1);
  const [slot, setSlot] = useState(-1);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  // Клик по карточке услуги выбирает её в форме записи
  useEffect(() => {
    if (!full) return;
    const on = (e: Event) => {
      const s = site.services.find((x) => x.slug === (e as CustomEvent<string>).detail);
      if (s) setService(s.title);
    };
    const pre = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      if (d.service !== undefined) setService(d.service);
      if (d.comment) setComment(d.comment);
    };
    window.addEventListener("select-service", on);
    window.addEventListener("prefill-lead", pre);
    // Ближайшие 7 дней для записи (считаем в браузере, у сервера другое «сегодня»)
    const fmt = new Intl.DateTimeFormat("ru-RU", { weekday: "short", day: "numeric", month: "short", timeZone: site.timezone });
    setDays(Array.from({ length: 6 }, (_, i) => (i === 0 ? "Сегодня" : i === 1 ? "Завтра" : fmt.format(new Date(Date.now() + i * 864e5)))));
    return () => { window.removeEventListener("select-service", on); window.removeEventListener("prefill-lead", pre); };
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
    const when = day >= 0 ? `${days[day]}${slot >= 0 ? `, ${site.slots[slot]}` : ""}` : undefined;
    setState((await sendLead({ phone, service: service || undefined, when, comment: comment || undefined, source })) ? "done" : "error");
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
              {comment && (
                <div className="flex items-start gap-3 rounded-[14px] border border-accent/30 bg-accent/10 p-3 text-[14px] leading-snug">
                  <Calculator size={18} className="mt-px shrink-0 text-accent" aria-hidden />
                  <span className="min-w-0 flex-1"><span className="text-muted">Ваш расчёт: </span>{comment}</span>
                  <button type="button" onClick={() => setComment("")} aria-label="Убрать расчёт" className="-m-1 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] hover:bg-white/10"><X size={16} aria-hidden /></button>
                </div>
              )}
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
              <fieldset className="min-w-0">
                <legend className={label}>Когда удобно приехать</legend>
                <div className="grid grid-cols-3 gap-2">
                  {(days.length ? days : ["Сегодня", "Завтра"]).map((d, i) => (
                    <button key={d} type="button" aria-pressed={day === i} onClick={() => setDay(day === i ? -1 : i)}
                      className={cn("h-11 min-w-0 truncate rounded-[12px] px-1 text-[13px] font-medium transition", day === i ? "bg-accent text-accent-ink" : "bg-surface-2 hover:bg-[#2d2c28]")}>{d}</button>
                  ))}
                </div>
                {day >= 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {site.slots.map((t, i) => (
                      <button key={t} type="button" aria-pressed={slot === i} onClick={() => setSlot(slot === i ? -1 : i)}
                        className={cn("tnum h-11 whitespace-nowrap rounded-[12px] px-1 text-[12px] font-medium transition sm:text-[13px]", slot === i ? "bg-accent text-accent-ink" : "bg-surface-2 hover:bg-[#2d2c28]")}>{t}</button>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-[12px] text-muted">Не обязательно. Администратор подтвердит время по телефону.</p>
              </fieldset>
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
