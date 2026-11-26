"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { site } from "@/site.config";
import { button } from "./ui";
import { phoneOk, sendLead } from "@/lib/lead";

// Короткая форма: только телефон. Главное оружие против пропущенных звонков.
export function CallbackForm() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneOk(phone)) return setErr("Введите номер полностью, например +7 900 000 00 00");
    setErr("");
    setState("busy");
    setState((await sendLead({ phone, source: "Обратный звонок (первый экран)" })) ? "done" : "error");
  }

  if (state === "done")
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-[15px]">
        <Check className="shrink-0 text-accent" aria-hidden /> Заявка принята. Перезвоним в течение 10 минут.
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-line bg-bg/60 p-3 backdrop-blur-md">
      <label htmlFor="cb-phone" className="mb-2 block px-1 text-sm text-muted">{site.hero.callbackNote}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="cb-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__"
          value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!err} aria-describedby="cb-err"
          className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-surface px-5 text-base placeholder:text-muted/70 focus:border-accent focus:outline-none"
        />
        <button type="submit" disabled={state === "busy"} className={button({ size: "md" })}>
          {state === "busy" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null} Перезвоните мне
        </button>
      </div>
      <p id="cb-err" role="alert" className="mt-2 px-1 text-sm text-red-400 empty:hidden">
        {err || (state === "error" ? "Не получилось отправить. Позвоните нам: " + site.phone : "")}
      </p>
    </form>
  );
}
