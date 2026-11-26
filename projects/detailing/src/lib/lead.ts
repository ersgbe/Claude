export type LeadInput = { phone: string; name?: string; service?: string; car?: string; when?: string; comment?: string; source: string };

// Событие: заполнить форму записи (из калькулятора, карточки пакета)
export type Prefill = { service?: string; comment?: string };
export const prefillLead = (d: Prefill) => window.dispatchEvent(new CustomEvent("prefill-lead", { detail: d }));

export async function sendLead(data: LeadInput): Promise<boolean> {
  try {
    const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return r.ok;
  } catch {
    return false;
  }
}

export const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 11;

// Маска ввода: +7 (900) 123-45-67. Восьмёрку в начале меняем на семёрку.
export function formatPhone(v: string): string {
  let d = v.replace(/\D/g, "");
  if (!d) return "";
  if (d[0] === "8") d = "7" + d.slice(1);
  if (d[0] !== "7") d = "7" + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  let out = "+7";
  if (p[0]) out += ` (${p[0]}`;
  if (p[0].length === 3 && p[1]) out += `) ${p[1]}`;
  if (p[2]) out += `-${p[2]}`;
  if (p[3]) out += `-${p[3]}`;
  return out;
}
