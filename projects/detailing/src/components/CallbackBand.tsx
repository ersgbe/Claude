import { Camera, PhoneCall, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { button } from "./ui";
import { site } from "@/site.config";
import { LeadForm } from "./LeadForm";

// «Не дозвонились? Перезвоним сами» — главная боль клиента, отдельным блоком
export function CallbackBand({ service }: { service?: string }) {
  return (
    <section aria-label="Обратный звонок" className="py-6 md:py-10">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[24px] border border-accent/25 bg-[linear-gradient(135deg,#1c1a15_0%,#121110_60%)] p-5 md:rounded-[28px] md:p-12">
          <div aria-hidden className="beam absolute inset-x-10 top-0" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(255_224_163/0.16),transparent)]" />
          <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] md:items-end md:gap-12">
            <div>
              <PhoneCall size={26} strokeWidth={1.5} className="text-accent" aria-hidden />
              <h2 className="mt-4 text-[24px] uppercase leading-[1.05] sm:text-[32px] md:text-[44px]">{site.callback.title}</h2>
              <p className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-muted">{site.callback.text}</p>
            </div>
            <div>
              <LeadForm source="Блок «Перезвоним сами»" service={service} />
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="mb-3 text-[14px] leading-snug text-fg/80">{site.callback.photo}</p>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`${site.whatsapp}?text=${encodeURIComponent(site.photoText + (service ? `(услуга: ${service}) ` : ""))}`} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3")}><Camera size={17} aria-hidden /> WhatsApp</a>
                  <a href={site.telegram} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3")}><Send size={17} aria-hidden /> Telegram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
