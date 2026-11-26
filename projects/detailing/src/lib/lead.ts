export type LeadInput = { phone: string; name?: string; service?: string; car?: string; source: string };

export async function sendLead(data: LeadInput): Promise<boolean> {
  try {
    const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return r.ok;
  } catch {
    return false;
  }
}

export const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 10;
