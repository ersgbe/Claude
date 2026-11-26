import { Phone, Send, MessageCircle } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Section } from "./ui";
import { LeadForm } from "./LeadForm";
import { OpenStatus } from "./OpenStatus";

// Запись: слева быстрые способы связаться, справа короткая форма.
export function Booking({ service }: { service?: string }) {
  return (
    <Section id="booking" label="Запись" className="border-t border-line">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[46px]">Запись</h2>
          <p className="mt-3 max-w-[440px] text-[15px] leading-relaxed text-muted">{site.callback.text}</p>
          <a href={`tel:${site.phoneHref}`} className="tnum mt-8 block w-fit font-display text-[clamp(24px,7.4vw,44px)] leading-tight tracking-[-0.01em] underline decoration-accent/0 decoration-1 underline-offset-[10px] transition hover:text-accent hover:decoration-accent/60">
            {site.phone}
          </a>
          <p className="mt-2 text-[14px] text-muted">{site.hours}</p>
          <OpenStatus className="mt-1 text-[14px] text-fg/80" />
          <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-fg/80">{site.callback.photo}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:flex">
            <a href={site.telegram} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3 sm:px-5")}><Send size={17} aria-hidden /> Telegram</a>
            <a href={`${site.whatsapp}?text=${encodeURIComponent(site.photoText + (service ? `(услуга: ${service}) ` : ""))}`} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3 sm:px-5")}><MessageCircle size={17} aria-hidden /> WhatsApp</a>
            <a href={`tel:${site.phoneHref}`} className={cn(button({ variant: "ghost" }), "max-sm:hidden")}><Phone size={17} aria-hidden /> Позвонить</a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-5 sm:p-8">
          <h3 className="mb-5 text-[20px]">Заявка на запись</h3>
          <LeadForm full source={service ? `Запись: ${service}` : "Форма записи"} service={service} />
        </div>
      </div>
    </Section>
  );
}
