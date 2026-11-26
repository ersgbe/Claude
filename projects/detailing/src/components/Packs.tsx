import { Check } from "lucide-react";
import type { Pack } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { button, Head, Section, Tiles } from "./ui";
import { PickLink } from "./PickLink";

// Пакеты или комплексы: 1 колонка на телефоне, 3 на компьютере. Выделенный пакет с полосой света.
export function Packs({ items, title, text, slug, id }: { items: Pack[]; title: string; text?: string; slug?: string; id?: string }) {
  return (
    <Section id={id} label={title} className="border-t border-line">
      <Head title={title} text={text} />
      <div className="wrap">
        <Tiles cols="[--n:1] md:[--n:3]">
          {items.map((p) => (
            <li key={p.name} className={cn("relative flex flex-col overflow-hidden rounded-[22px] border bg-surface p-5 md:p-7", p.featured ? "border-accent/40" : "border-line")}>
              {p.featured && <div aria-hidden className="beam absolute inset-x-6 top-0" />}
              <h3 className="text-[20px] md:text-[24px]">{p.name}</h3>
              <p className="mt-1.5 text-[14px] text-muted">{p.text}</p>
              <div className="mt-3 flex items-center justify-between gap-3 md:mt-6">
                <p className="tnum font-display text-[24px] md:text-[32px]"><span className="text-[14px] text-muted">от </span>{rub(p.price)}</p>
                {p.featured && <span className="shrink-0 rounded-[9px] bg-accent px-2.5 py-1 text-[12px] font-medium text-accent-ink">Чаще выбирают</span>}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-line pt-4 text-[13px] text-fg/85 md:block md:space-y-2 md:text-[15px]">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />{it}</li>
                ))}
              </ul>
              <div aria-hidden className="min-h-5 flex-1" />
              <PickLink slug={slug} className={cn(button({ variant: p.featured ? "primary" : "ghost" }), "w-full")}>Записаться</PickLink>
            </li>
          ))}
        </Tiles>
      </div>
    </Section>
  );
}
