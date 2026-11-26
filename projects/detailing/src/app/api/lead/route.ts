import { NextResponse } from "next/server";

// Заявки уходят в Telegram. В Vercel задай переменные TG_BOT_TOKEN и TG_CHAT_ID.
// Без них форма работает в демо-режиме: заявка не теряется молча, а пишется в лог.
export async function POST(req: Request) {
  const d = await req.json().catch(() => null);
  const digits = String(d?.phone ?? "").replace(/\D/g, "");
  if (digits.length < 10) return NextResponse.json({ error: "phone" }, { status: 400 });

  const clean = (v: unknown) => String(v ?? "").slice(0, 200).replace(/[<>&]/g, "");
  const text = [
    "🔔 Новая заявка с сайта",
    `Телефон: ${clean(d.phone)}`,
    d.name && `Имя: ${clean(d.name)}`,
    d.service && `Услуга: ${clean(d.service)}`,
    d.car && `Авто: ${clean(d.car)}`,
    d.when && `Когда удобно: ${clean(d.when)}`,
    d.comment && `Расчёт: ${clean(d.comment)}`,
    `Форма: ${clean(d.source)}`,
  ].filter(Boolean).join("\n");

  const token = process.env.TG_BOT_TOKEN;
  const chat = process.env.TG_CHAT_ID;
  if (!token || !chat) {
    console.log("[lead:demo]", text);
    return NextResponse.json({ ok: true, demo: true });
  }
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text }),
  });
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "send" }, { status: 502 });
}
