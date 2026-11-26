"use client";
import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";
import { site } from "@/site.config";
import { LeadForm } from "./LeadForm";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: d, ease },
});

// Первый экран: фото на весь экран, крупный заголовок внизу слева,
// полоса света «включается» при загрузке, под ней короткая форма.
export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden md:min-h-[max(680px,100svh)]">
      <motion.picture
        initial={{ scale: 1.08, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }}
        className="absolute inset-0 -z-20 block"
      >
        <source media="(min-width: 768px)" srcSet="/images/hero.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-m.jpg" alt="Автомобиль в студии после полировки" fetchPriority="high" className="h-full w-full object-cover" />
      </motion.picture>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(9_9_8/0.55)_0%,rgb(9_9_8/0)_22%,rgb(9_9_8/0.15)_45%,rgb(9_9_8/0.92)_78%,#090908_100%)] md:bg-[linear-gradient(90deg,rgb(9_9_8/0.88)_0%,rgb(9_9_8/0.4)_50%,rgb(9_9_8/0)_75%),linear-gradient(0deg,#090908_0%,rgb(9_9_8/0)_40%)]" />

      <div className="wrap pb-[104px] pt-28 md:pb-14">
        <h1 className="uppercase">
          <span style={{ animationDelay: "0.15s" }} className="rise block text-[clamp(36px,11vw,120px)] leading-[0.98] tracking-[-0.04em]">{site.hero.title}</span>
          <span style={{ animationDelay: "0.3s" }} className="rise mt-3 block text-[13px] font-medium tracking-[0.02em] text-accent sm:text-[15px] md:mt-5 md:text-[18px]">{site.hero.titleSmall}</span>
        </h1>

        <motion.div
          aria-hidden initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1.4, delay: 0.5, ease }}
          className="beam my-5 origin-left md:my-8"
        />

        <div className="grid gap-6 md:grid-cols-[minmax(0,560px)_1fr] md:items-end md:gap-16">
          <motion.div {...rise(0.6)}>
            <p className="mb-4 max-w-[440px] text-[15px] leading-relaxed text-fg/80 md:text-[17px]">{site.hero.lead}</p>
            <LeadForm source="Первый экран" />
          </motion.div>
          <motion.ul {...rise(0.75)} className="hidden space-y-2 justify-self-end text-[15px] text-fg/75 md:block">
            <li className="flex items-center gap-3"><MapPin size={17} className="text-accent" aria-hidden />{site.address}</li>
            <li className="flex items-center gap-3"><Clock size={17} className="text-accent" aria-hidden />{site.hours}</li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
