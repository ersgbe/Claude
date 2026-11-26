"use client";
import { useState } from "react";
import Image from "next/image";
import { site } from "@/site.config";
import { cn, rub } from "@/lib/utils";
import { Heading, Section, button } from "./ui";
import { BookLink } from "./BookLink";

export function Services() {
  const [cat, setCat] = useState("Все");
  const list = site.services.filter((s) => cat === "Все" || s.cat === cat);
  return (
    <Section id="services">
      <Heading title="Услуги" text="Выберите направление. Нужно что-то другое, позвоните, мы подберём решение." />
      <div role="tablist" aria-label="Направление" className="-mx-5 mb-8 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 [scrollbar-width:none]">
        {site.serviceCats.map((c) => (
          <button
            key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={cn("h-14 shrink-0 rounded-2xl px-7 text-base font-medium transition", cat === c ? "bg-accent text-accent-ink" : "bg-surface-2 text-fg hover:bg-white/10")}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.slug} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-3 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 md:p-4">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 370px, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-1 flex-col px-2 pt-6 pb-3">
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-3 flex-1 text-[15px] text-muted">{s.text}</p>
              <p className="mt-6 font-display text-lg">от {rub(s.from)}</p>
              <BookLink slug={s.slug} className={cn(button({ variant: "ghost" }), "mt-4 w-full")}>Записаться</BookLink>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
