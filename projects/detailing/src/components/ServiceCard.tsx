import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/site.config";
import { rub } from "@/lib/utils";

// Плашка услуги: фото, название, цена. Ведёт на страницу услуги.
export function ServiceCard({ s, sizes = "(min-width: 1024px) 400px, 50vw" }: { s: Service; sizes?: string }) {
  return (
    <Link
      href={`/uslugi/${s.slug}`}
      className="zoom group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[18px] bg-surface outline-offset-4 transition-transform duration-300 hover:-translate-y-0.5 md:rounded-[22px]"
    >
      <Image src={s.image} alt="" fill sizes={sizes} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(9_9_8/0.3)_0%,rgb(9_9_8/0)_28%,rgb(9_9_8/0.15)_50%,rgb(9_9_8/0.95)_100%)]" />
      <span className="absolute left-2.5 top-2.5 rounded-[9px] bg-bg/60 px-2.5 py-1 text-[12px] text-fg/85 backdrop-blur-md md:left-4 md:top-4 md:px-3 md:text-[13px]">{s.time}</span>
      <div className="relative p-3.5 md:p-6">
        <h3 className="text-[15px] leading-[1.15] md:text-[22px]">{s.title}</h3>
        <p className="mt-2 hidden text-[14px] leading-snug text-fg/65 md:block">{s.text}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2 md:mt-5 md:border-t md:border-white/12 md:pt-4">
          <p className="tnum font-display text-[14px] text-accent md:text-[19px]"><span className="text-[11px] text-fg/60 md:text-[13px]">от </span>{rub(s.from)}</p>
          <span aria-hidden className="hidden h-11 w-11 place-items-center rounded-[12px] bg-accent text-accent-ink transition-transform duration-300 group-hover:rotate-45 md:grid"><ArrowUpRight size={20} /></span>
        </div>
      </div>
    </Link>
  );
}
