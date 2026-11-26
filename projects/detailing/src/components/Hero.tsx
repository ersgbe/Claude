"use client";
import { motion } from "motion/react";
import { site } from "@/site.config";
import { CallbackForm } from "./CallbackForm";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section id="top" className="relative isolate flex h-[100svh] max-h-[920px] min-h-[600px] flex-col justify-end overflow-hidden">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/hero.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-m.jpg" alt="Автомобиль после детейлинга" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/10 md:bg-gradient-to-r md:from-bg/90 md:via-bg/40 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-bg to-transparent md:hidden" />

      <div className="mx-auto w-full max-w-[1200px] px-5 pb-6 md:px-8 md:pb-10">
        <div className="max-w-[640px]">
          <motion.h1 {...rise(0)} className="text-[27px] uppercase leading-[1.1] sm:text-4xl md:text-[44px]">{site.hero.title}</motion.h1>
          <motion.p {...rise(1)} className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-fg/75 md:mt-4 md:text-base">{site.hero.lead}</motion.p>
          <motion.div {...rise(2)} className="mt-5 max-w-[480px] md:mt-6"><CallbackForm /></motion.div>
        </div>
        <motion.dl {...rise(3)} className="mt-6 grid max-w-[640px] grid-cols-3 border-t border-white/10 pt-4 md:mt-8">
          {site.stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "border-l border-white/10 pl-4" : ""}>
              <dt className="font-display text-[17px] font-medium md:text-xl">{s.value}</dt>
              <dd className="text-[13px] text-muted">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
