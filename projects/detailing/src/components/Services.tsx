"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/site.config";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { button, Head, Section, Tiles } from "./ui";
import { Chips } from "./Chips";
import { ServiceCard } from "./ServiceCard";

// Услуги: вкладки-направления и сетка плашек. Неполный ряд встаёт по центру.
export function Services({ head = true }: { head?: boolean }) {
  const [i, setI] = useState(0);
  const cat = head ? "Все" : site.serviceCats[i];
  const list = site.services.filter((s) => cat === "Все" || s.cat === cat);
  return (
    <Section id="services" label="Услуги" className={head ? undefined : "pt-8 md:pt-12"}>
      {head && <Head title="Услуги" text="Нажмите на услугу: цены, что входит, сроки." />}
      {!head && <Chips id="svc" items={site.serviceCats} value={i} onChange={setI} label="Направление" className="mb-5 md:mb-8" />}
      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${i}`} className="wrap">
        <Tiles cols="[--n:2] lg:[--n:3]">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s) => (
              <motion.li
                key={s.slug} layout
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceCard s={s} />
              </motion.li>
            ))}
          </AnimatePresence>
        </Tiles>
        {head && (
          <div className="mt-5 grid gap-2 sm:grid-cols-2 md:mt-8">
            <Link href="/uslugi#calc" className={button({ size: "lg" })}><Calculator size={18} aria-hidden /> Рассчитать цену</Link>
            <a href="#booking" className={button({ variant: "ghost", size: "lg" })}>Записаться</a>
          </div>
        )}
      </div>
    </Section>
  );
}
