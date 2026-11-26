import { Star } from "lucide-react";
import { site } from "@/site.config";
import { Heading, Section } from "./ui";

export function Reviews() {
  return (
    <Section>
      <Heading kicker="Отзывы" title="Что говорят клиенты" />
      <ul className="grid gap-5 md:grid-cols-3">
        {site.reviews.map((r) => (
          <li key={r.name} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <div className="flex gap-1 text-accent" role="img" aria-label="5 из 5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" aria-hidden />)}
            </div>
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fg/85">{r.text}</p>
            <p className="mt-6 text-sm"><span className="font-semibold">{r.name}</span> <span className="text-muted">· {r.car}</span></p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
