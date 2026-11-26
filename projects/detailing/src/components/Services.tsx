"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { rub } from "@/lib/utils";
import { Chips, Heading, Section } from "./ui";
import { Rail } from "./Rail";
import { BookLink } from "./BookLink";

export function Services() {
  const [i, setI] = useState(0);
  const cat = site.serviceCats[i];
  const list = site.services.filter((s) => cat === "Все" || s.cat === cat);
  return (
    <Section id="services">
      <Heading title="Услуги" />
      <Chips items={site.serviceCats} value={i} onChange={setI} label="Направление" />
      <Rail label="Услуги, листайте вправо" resetKey={cat}>
        {list.map((s) => (
          <BookLink key={s.slug} slug={s.slug} className="group relative aspect-[4/5] w-[74vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-surface md:w-[320px]">
            <Image src={s.image} alt="" fill sizes="320px" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="text-lg leading-tight">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-fg/70">{s.text}</p>
                <p className="mt-3 text-[15px] font-semibold text-accent">от {rub(s.from)}</p>
              </div>
              <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition group-hover:rotate-45"><ArrowUpRight size={18} /></span>
            </div>
            <span className="sr-only">Записаться: {s.title}</span>
          </BookLink>
        ))}
      </Rail>
    </Section>
  );
}
