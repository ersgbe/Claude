"use client";
import { useEffect, useState } from "react";
import { Check, Clock, Loader2, MapPin, Send } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Heading, Section } from "./ui";
import { phoneOk, sendLead } from "@/lib/lead";

const field = "h-12 w-full rounded-[14px] border border-white/10 bg-surface-2 px-4 text-base placeholder:text-muted focus:border-accent focus:outline-none";

export function Booking() {
  const [f, setF] = useState({ name: "", phone: "", service: "", car: "" });
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [dir, setDir] = useState(0);

  useEffect(() => {
    const on = (e: Event) => {
      const s = site.services.find((x) => x.slug === (e as CustomEvent<string>).detail);
      if (s) setF((p) => ({ ...p, service: s.title }));
    };
    window.addEventListener("select-service", on);
    return () => window.removeEventListener("select-service", on);
  }, []);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneOk(f.phone)) return setErr("Введите номер полностью");
    setErr("");
    setState("busy");
    setState((await sendLead({ ...f, source: "Форма записи" })) ? "done" : "error");
  }

  return (
    <Section id="booking" className="pt-4 md:pt-8">
      <div className="grid gap-8 rounded-[28px] bg-surface p-5 md:grid-cols-2 md:gap-14 md:p-10">
        <div>
          <Heading title="Запись" text="Перезвоним за 10 минут и подберём время." className="mb-5 md:mb-6" />
          {state === "done" ? (
            <p role="status" className="flex items-start gap-3 rounded-[14px] bg-accent/15 p-4 text-[15px]">
              <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden /> Заявка принята. Перезвоним за 10 минут.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label htmlFor="b-name" className="sr-only">Имя</label><input id="b-name" className={field} autoComplete="name" value={f.name} onChange={set("name")} placeholder="Имя" /></div>
                <div>
                  <label htmlFor="b-phone" className="sr-only">Телефон</label>
                  <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" required className={cn(field, err && "border-red-400")} value={f.phone} onChange={set("phone")} placeholder="Телефон" aria-invalid={!!err} aria-describedby="b-err" />
                </div>
              </div>
              <p id="b-err" role="alert" className="text-sm text-red-400 empty:hidden">{err}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="b-service" className="sr-only">Услуга</label>
                  <select id="b-service" className={field} value={f.service} onChange={set("service")}>
                    <option value="">Услуга: пока не знаю</option>
                    {site.services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  </select>
                </div>
                <div><label htmlFor="b-car" className="sr-only">Автомобиль</label><input id="b-car" className={field} value={f.car} onChange={set("car")} placeholder="Марка и модель" /></div>
              </div>
              <button type="submit" disabled={state === "busy"} className={cn(button({ size: "lg" }), "w-full")}>
                {state === "busy" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null} Отправить заявку
              </button>
              {state === "error" && <p role="alert" className="text-sm text-red-400">Не получилось отправить. Позвоните: {site.phone}</p>}
              <p className="text-xs text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
            </form>
          )}
        </div>

        <div id="contacts" className="md:border-l md:border-line md:pl-14">
          <p className="text-[13px] text-muted">Телефон</p>
          <a href={`tel:${site.phoneHref}`} className="font-display text-2xl font-medium hover:text-accent md:text-3xl">{site.phone}</a>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden /><span>{site.address}. <a href={site.mapUrl} target="_blank" rel="noopener" className="text-muted underline underline-offset-4 hover:text-fg">Маршрут</a></span></li>
            <li className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{site.hours}</li>
          </ul>
          <div role="tablist" aria-label="Как добраться" className="mt-6 grid grid-cols-2 gap-2">
            {site.directions.map((d, i) => (
              <button key={d.tab} role="tab" aria-selected={dir === i} onClick={() => setDir(i)} className={cn("h-11 rounded-[14px] text-[15px] font-medium transition", dir === i ? "bg-accent text-accent-ink" : "bg-surface-2 hover:bg-white/12")}>{d.tab}</button>
            ))}
          </div>
          <p role="tabpanel" className="mt-3 text-[14px] leading-relaxed text-muted">{site.directions[dir].text}</p>
          <a href={site.telegram} target="_blank" rel="noopener" className={cn(button({ variant: "ghost", size: "lg" }), "mt-5 w-full sm:w-auto")}><Send size={18} aria-hidden /> Написать в Telegram</a>
        </div>
      </div>
    </Section>
  );
}
