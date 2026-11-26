import { Phone, Send, MessageCircle } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Section } from "./ui";
import { LeadForm } from "./LeadForm";

// Запись: слева быстрые способы связаться, справа короткая форма.
export function Booking({ service }: { service?: string }) {
  return (
    <Section id="booking" label="Запись" className="border-t border-line">
      <div className="wrap grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Телефон: сначала заголовок, потом форма, потом способы связи. На компьютере слева текст и контакты, справа форма */}
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[46px]">Запись</h2>
          <p className="mt-2 max-w-[440px] text-[15px] leading-relaxed text-muted">{site.callback.text}</p>
        </div>
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface p-4 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <h3 className="mb-4 text-[20px]">Заявка на запись</h3>
          <LeadForm full source={service ? `Запись: ${service}` : "Форма записи"} service={service} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <a href={`tel:${site.phoneHref}`} className="tnum block w-fit font-display text-[clamp(24px,7.4vw,40px)] leading-tight tracking-[-0.01em] transition hover:text-accent">
            {site.phone}
          </a>
          <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-fg/80">{site.callback.photo}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:flex">
            <a href={site.telegram} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3 sm:px-5")}><Send size={17} aria-hidden /> Telegram</a>
            <a href={`${site.whatsapp}?text=${encodeURIComponent(site.photoText + (service ? `(услуга: ${service}) ` : ""))}`} target="_blank" rel="noopener" className={cn(button({ variant: "ghost" }), "min-w-0 px-3 sm:px-5")}><MessageCircle size={17} aria-hidden /> WhatsApp</a>
            <a href={`tel:${site.phoneHref}`} className={cn(button({ variant: "ghost" }), "max-sm:hidden")}><Phone size={17} aria-hidden /> Позвонить</a>
          </div>
        </div>
      </div>
    </Section>
  );
}
