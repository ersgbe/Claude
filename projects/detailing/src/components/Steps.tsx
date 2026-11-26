import { site } from "@/site.config";
import { Heading, Section } from "./ui";

export function Steps() {
  return (
    <Section className="pt-4 md:pt-8">
      <Heading title="Как мы работаем" />
      <ol className="grid md:grid-cols-4 md:gap-6">
        {site.steps.map((s, i) => (
          <li key={s.title} className="flex gap-4 border-t border-line py-4 md:block md:py-5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-[13px] text-accent md:mb-4">{i + 1}</span>
            <div>
              <h3 className="text-base">{s.title}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
