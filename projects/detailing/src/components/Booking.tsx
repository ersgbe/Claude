"use client";
import { useEffect, useState } from "react";
import { Check, Clock, Loader2, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Heading, Section } from "./ui";
import { phoneOk, sendLead } from "@/lib/lead";

const field = "h-12 w-full rounded-2xl border border-white/10 bg-surface-2 px-4 text-base placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function Booking() {
  const [f, setF] = useState({ name: "", phone: "", service: "", car: "" });
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [dir, setDir] = useState(0);

  useEffect(() => {
    const on = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const s = site.services.find((x) => x.slug === slug);
      if (s) setF((p) => ({ ...p, service: s.title }));
    };
    window.addEventListener("select-service", on);
    return () => window.removeEventListener("select-service", on);
  }, []);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneOk(f.phone)) return setErr("Введите номер полностью, например +7 900 000 00 00");
    setErr("");
    setState("busy");
    setState((await sendLead({ ...f, source: "Форма записи" })) ? "done" : "error");
  }

  return (
    <Section id="booking">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-10">
          <Heading title="Запишитесь на удобное время" text="Перезвоним в течение 10 минут и подберём время." className="mb-8 md:mb-8" />
          {state === "done" ? (
            <p role="status" className="flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5">
              <Check className="mt-0.5 shrink-0 text-accent" aria-hidden /> Заявка принята. Мы перезвоним в течение 10 минут.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <div>
                <label htmlFor="b-name" className="mb-1.5 block text-sm text-muted">Имя</label>
                <input id="b-name" className={field} autoComplete="name" value={f.name} onChange={set("name")} placeholder="Как к вам обращаться" />
              </div>
              <div>
                <label htmlFor="b-phone" className="mb-1.5 block text-sm text-muted">Телефон</label>
                <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" required className={cn(field, err && "border-red-400")} value={f.phone} onChange={set("phone")} placeholder="+7 (___) ___-__-__" aria-invalid={!!err} aria-describedby="b-err" />
                <p id="b-err" role="alert" className="mt-1.5 text-sm text-red-400 empty:hidden">{err}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="b-service" className="mb-1.5 block text-sm text-muted">Услуга</label>
                  <select id="b-service" className={field} value={f.service} onChange={set("service")}>
                    <option value="">Пока не знаю</option>
                    {site.services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="b-car" className="mb-1.5 block text-sm text-muted">Автомобиль</label>
                  <input id="b-car" className={field} value={f.car} onChange={set("car")} placeholder="Марка и модель" />
                </div>
              </div>
              <button type="submit" disabled={state === "busy"} className={cn(button({ size: "lg" }), "w-full")}>
                {state === "busy" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null} Отправить заявку
              </button>
              {state === "error" && <p role="alert" className="text-sm text-red-400">Не получилось отправить. Позвоните нам: {site.phone}</p>}
              <p className="text-xs text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
            </form>
          )}
        </div>

        <div id="contacts" className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-10">
          <div>
            <p className="mb-3 text-lg font-semibold text-muted">Контакты</p>
            <a href={`tel:${site.phoneHref}`} className="font-display text-2xl font-semibold hover:text-accent md:text-4xl">{site.phone}</a>
            <ul className="mt-8 space-y-5 text-[15px]">
              <li className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden /><span>{site.address}<br /><a href={site.mapUrl} target="_blank" rel="noopener" className="text-muted underline underline-offset-4 hover:text-fg">Построить маршрут</a></span></li>
              <li className="flex gap-3"><Clock className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden />{site.hours}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-lg font-semibold">Как добраться</p>
            <div role="tablist" aria-label="Как добраться" className="mb-3 grid grid-cols-2 gap-3">
              {site.directions.map((d, i) => (
                <button key={d.tab} role="tab" aria-selected={dir === i} onClick={() => setDir(i)} className={cn("h-12 rounded-2xl text-[15px] font-medium transition", dir === i ? "bg-accent text-accent-ink" : "bg-surface-2 hover:bg-white/10")}>{d.tab}</button>
              ))}
            </div>
            <p role="tabpanel" className="text-[15px] leading-relaxed text-muted">{site.directions[dir].text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${site.phoneHref}`} className={cn(button({ size: "lg" }), "flex-1")}><Phone size={18} aria-hidden /> Позвонить</a>
            <a href={site.telegram} target="_blank" rel="noopener" className={cn(button({ variant: "ghost", size: "lg" }), "flex-1")}><Send size={18} aria-hidden /> Telegram</a>
          </div>
        </div>
      </div>
    </Section>
  );
}
