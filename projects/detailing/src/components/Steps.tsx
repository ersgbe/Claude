import { site } from "@/site.config";
import { Head, Section } from "./ui";

// Как проходит работа. Это порядок действий, поэтому шаги пронумерованы.
export function Steps({ items = site.steps, title = "Как это работает" }: { items?: { title: string; text: string }[]; title?: string }) {
  return (
    <Section label={title} className="border-t border-line">
      <Head title={title} />
      <ol className="wrap relative grid gap-0 md:grid-cols-4 md:gap-8">
        <span aria-hidden className="absolute left-[calc(var(--pad)+60px)] right-[var(--pad)] top-[23px] hidden h-px bg-line md:block" />
        {items.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-6 last:pb-0 md:block md:pb-0">
            {i < items.length - 1 && <span aria-hidden className="absolute bottom-0 left-[23px] top-12 w-px bg-line md:hidden" />}
            <span className="tnum relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-line bg-surface font-display text-[15px] text-accent">{i + 1}</span>
            <div className="pt-2.5 md:pt-6">
              <h3 className="text-[19px] md:text-[22px]">{s.title}</h3>
              <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
