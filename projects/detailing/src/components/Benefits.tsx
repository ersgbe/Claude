import { Camera, Clock, Home, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { site } from "@/site.config";
import { Head, Section, Tiles } from "./ui";

const icons = { clock: Clock, lock: Lock, camera: Camera, shield: ShieldCheck, home: Home, sparkles: Sparkles } as const;

// Почему мы: плитки с короткими фактами
export function Benefits({ title = "Почему мы" }: { title?: string }) {
  return (
    <Section label={title} className="border-t border-line">
      <Head title={title} />
      <div className="wrap">
        <Tiles cols="[--n:2] lg:[--n:3]">
          {site.benefits.map((b) => {
            const Icon = icons[b.icon as keyof typeof icons] ?? Sparkles;
            return (
              <li key={b.title} className="relative overflow-hidden rounded-[18px] border border-line bg-surface p-4 md:rounded-[22px] md:p-7">
                <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden />
                <h3 className="mt-4 text-[15px] leading-tight md:mt-8 md:text-[20px]">{b.title}</h3>
                <p className="mt-2 text-[13px] leading-snug text-muted md:text-[15px] md:leading-relaxed">{b.text}</p>
              </li>
            );
          })}
        </Tiles>
      </div>
    </Section>
  );
}
