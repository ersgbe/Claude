"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, ShieldCheck, Clock, Award } from "lucide-react";
import { site } from "@/site.config";
import { CallbackForm } from "./CallbackForm";

const icons = [Clock, Star, Star, ShieldCheck];
const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden pt-[84px]">
      <Image src="/images/hero.jpg" alt="Автомобиль после детейлинга" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/90 via-bg/50 to-transparent max-md:bg-gradient-to-t max-md:from-bg max-md:via-bg/60 max-md:to-bg/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto flex min-h-[calc(100svh-84px)] max-w-[1200px] flex-col justify-end gap-8 px-5 py-10 md:px-8">
        <div className="max-w-[680px]">
          <motion.p {...rise(0)} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-4 py-2 text-sm text-muted">
            <Award size={16} className="text-accent" aria-hidden /> {site.city}, рейтинг 4,9 на картах
          </motion.p>
          <motion.h1 {...rise(1)} className="text-[28px] uppercase leading-[1.1] sm:text-[38px] md:text-[48px]">{site.hero.title}</motion.h1>
          <motion.p {...rise(2)} className="mt-5 max-w-[520px] text-lg text-fg/75">{site.hero.lead}</motion.p>
          <motion.div {...rise(4)} className="mt-7 max-w-[520px]">
            <CallbackForm />
          </motion.div>
        </div>

        <motion.ul {...rise(5)} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {site.stats.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.label} className="rounded-2xl border border-line bg-bg/60 p-3 backdrop-blur-md md:p-4">
                <Icon size={16} className="mb-1.5 text-accent max-md:hidden" aria-hidden />
                <p className="font-display text-lg font-semibold md:text-xl">{s.value}</p>
                <p className="text-[13px] leading-snug text-muted md:text-sm">{s.label}</p>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
