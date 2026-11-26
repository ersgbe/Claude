"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { site, type Service } from "@/site.config";
import { rub } from "@/lib/utils";
import { Crumbs } from "./ui";
import { LeadForm } from "./LeadForm";

const ease = [0.16, 1, 0.3, 1] as const;

// Первый экран страницы услуги: фото, название, цена, срок и форма с уже выбранной услугой.
export function ServiceHero({ s }: { s: Service }) {
  return (
    <section className="relative isolate overflow-hidden md:pt-[120px]">
      {/* Телефон: фото сверху на всю ширину, текст наезжает снизу */}
      <div className="relative aspect-[4/3] w-full md:hidden">
        <Image src={s.image} alt={s.title} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(9_9_8/0.6)_0%,rgb(9_9_8/0)_30%,rgb(9_9_8/0.2)_60%,#090908_100%)]" />
      </div>

      <div className="wrap relative -mt-16 grid gap-8 md:mt-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-16">
        <div>
          <Crumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги и цены", href: "/uslugi" }, { label: s.title }]} />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-[clamp(32px,8.5vw,80px)] uppercase leading-[0.98] tracking-[-0.01em]">
            {s.title}
          </motion.h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-fg/80 md:text-[17px]">{s.intro}</p>

          <dl className="mt-6 grid max-w-[520px] grid-cols-2 border-y border-line">
            <div className="py-4 pr-4">
              <dt className="text-[13px] text-muted">Цена</dt>
              <dd className="tnum mt-1 font-display text-[22px] text-accent md:text-[28px]"><span className="text-[13px] text-fg/60">от </span>{rub(s.from)}</dd>
            </div>
            <div className="border-l border-line py-4 pl-4">
              <dt className="text-[13px] text-muted">Срок</dt>
              <dd className="mt-1 flex items-center gap-2 font-display text-[22px] md:text-[28px]"><Clock size={18} className="text-accent" aria-hidden />{s.time}</dd>
            </div>
          </dl>

          <div className="mt-6 max-w-[520px]">
            <p className="mb-3 text-[14px] text-muted">{site.hero.lead}</p>
            <LeadForm source={`Страница услуги: ${s.title}`} service={s.title} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }}
          className="relative hidden aspect-[4/5] overflow-hidden rounded-[28px] bg-surface md:block"
        >
          <Image src={s.image} alt={s.title} fill priority sizes="(min-width: 1280px) 540px, 45vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
