import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { rub } from "@/lib/utils";
import { Heading, Section } from "./ui";
import { BookLink } from "./BookLink";

export function Services() {
  return (
    <Section id="services">
      <Heading kicker="Услуги" title="Что мы делаем" text="Шесть основных услуг. Нужно что-то другое, позвоните, мы подберём решение." />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s) => (
          <li key={s.slug}>
            <BookLink slug={s.slug} className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{s.text}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display text-lg text-accent">от {rub(s.from)}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-fg/80 group-hover:text-fg">Записаться <ArrowUpRight size={16} aria-hidden /></span>
                </div>
              </div>
            </BookLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
