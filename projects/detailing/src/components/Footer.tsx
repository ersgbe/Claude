import Link from "next/link";
import { site } from "@/site.config";

const col = "text-[13px] text-muted mb-3";
const link = "block py-1.5 text-[15px] text-fg/80 transition hover:text-accent";

// Подвал: ссылки на услуги и разделы, контакты, название крупно на всю ширину.
export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-12 md:pt-20">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <div>
            <p className={col}>Услуги</p>
            {site.services.map((s) => <Link key={s.slug} href={`/uslugi/${s.slug}`} className={link}>{s.title}</Link>)}
          </div>
          <div>
            <p className={col}>Разделы</p>
            <Link href="/" className={link}>Главная</Link>
            {site.nav.map((n) => <Link key={n.href} href={n.href} className={link}>{n.label}</Link>)}
          </div>
          <div className="col-span-2">
            <p className={col}>Связаться</p>
            <a href={`tel:${site.phoneHref}`} className="tnum block font-display text-[22px] transition hover:text-accent md:text-[28px]">{site.phone}</a>
            <p className="mt-2 text-[15px] text-fg/80">{site.address}</p>
            <p className="text-[15px] text-fg/80">{site.hours}</p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <a href={site.telegram} target="_blank" rel="noopener" className={link}>Telegram</a>
              <a href={site.whatsapp} target="_blank" rel="noopener" className={link}>WhatsApp</a>
              <a href={site.mapUrl} target="_blank" rel="noopener" className={link}>Маршрут</a>
            </div>
          </div>
        </div>
        <div className="mt-12 h-px bg-line md:mt-16" />
        <div className="flex flex-col gap-1 py-6 text-[13px] text-muted md:flex-row md:justify-between">
          <p>{site.name}, {site.tagline.toLowerCase()} {site.cityIn}</p>
          <p>© {new Date().getFullYear()} {site.legal}</p>
        </div>
      </div>
    </footer>
  );
}
