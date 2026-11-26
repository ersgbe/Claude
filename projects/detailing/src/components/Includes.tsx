import { Check } from "lucide-react";
import { Head, Section, Tiles } from "./ui";

// Что входит в услугу: компактные плитки с галочкой
export function Includes({ items, title = "Что входит" }: { items: string[]; title?: string }) {
  return (
    <Section label={title} className="border-t border-line">
      <Head title={title} />
      <div className="wrap">
        <Tiles cols="[--n:2] lg:[--n:4]">
          {items.map((it) => (
            <li key={it} className="flex min-h-[88px] flex-col justify-between gap-3 rounded-[16px] border border-line bg-surface p-4 md:min-h-[120px] md:rounded-[20px] md:p-5">
              <Check size={20} className="text-accent" aria-hidden />
              <p className="text-[14px] leading-snug md:text-[16px]">{it}</p>
            </li>
          ))}
        </Tiles>
      </div>
    </Section>
  );
}
