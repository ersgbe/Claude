"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { site } from "@/site.config";
import { button } from "./ui";
import { phoneOk, sendLead } from "@/lib/lead";

// Одно поле: телефон. Главная защита от потерянных звонков.
export function CallbackForm() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneOk(phone)) return setErr("Введите номер полностью");
    setErr("");
    setState("busy");
    setState((await sendLead({ phone, source: "Обратный звонок (первый экран)" })) ? "done" : "error");
  }

  if (state === "done")
    return (
      <p role="status" className="flex h-[52px] items-center gap-3 rounded-[14px] bg-accent/15 px-4 text-[15px]">
        <Check size={18} className="shrink-0 text-accent" aria-hidden /> Заявка принята, перезвоним за 10 минут
      </p>
    );

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="cb-phone" className="sr-only">Номер телефона</label>
      <div className="flex gap-2">
        <input
          id="cb-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__"
          value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!err} aria-describedby="cb-err"
          className="h-[52px] min-w-0 flex-1 rounded-[14px] border border-white/10 bg-bg/70 px-4 text-base backdrop-blur-md placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <button type="submit" disabled={state === "busy"} className={button({ size: "lg" })}>
          {state === "busy" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null}
          <span className="sm:hidden">Звонок</span><span className="max-sm:hidden">{site.hero.callbackNote}</span>
        </button>
      </div>
      <p id="cb-err" role="alert" className="mt-2 text-sm text-red-400 empty:hidden">
        {err || (state === "error" ? "Не получилось отправить. Позвоните: " + site.phone : "")}
      </p>
    </form>
  );
}
