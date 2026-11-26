import { site } from "@/site.config";
import { Heading, Section } from "./ui";

export function Steps() {
  return (
    <Section className="bg-surface/50">
      <Heading title="Четыре шага от звонка до ключей" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.steps.map((s, i) => (
          <li key={s.title} className="rounded-[var(--radius-card)] border border-line bg-bg p-6">
            <span className="font-display text-4xl font-semibold text-accent">0{i + 1}</span>
            <h3 className="mt-4 text-lg">{s.title}</h3>
            <p className="mt-2 text-[15px] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
