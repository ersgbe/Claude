"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Section } from "./ui";
import { Chips } from "./Chips";
import { OpenStatus } from "./OpenStatus";

// Как добраться: фото студии, вкладки «От метро / На машине», адрес и маршрут.
export function Contacts() {
  const [i, setI] = useState(0);
  return (
    <Section id="contacts" label="Как добраться" className="border-t border-line">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="zoom relative order-2 -mx-[var(--pad)] aspect-[4/3] lg:order-1 overflow-hidden bg-surface sm:mx-0 sm:rounded-[24px]">
          <Image src={site.studioImage} alt={`Вход в студию ${site.name}`} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-[32px] uppercase sm:text-[44px] lg:text-[56px]">Как добраться</h2>
          <ul className="mt-5 space-y-2 text-[15px] text-fg/85">
            <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{site.address}</li>
            <li className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{site.hours}</li>
            <li className="pl-[30px] text-[14px]"><OpenStatus /></li>
          </ul>
          <Chips id="dir" flush items={site.directions.map((d) => d.tab)} value={i} onChange={setI} label="Как добраться" className="mt-7" />
          <div id="dir-panel" role="tabpanel" aria-labelledby={`dir-tab-${i}`} className="mt-4 min-h-[72px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="max-w-[460px] text-[15px] leading-relaxed text-muted">
                {site.directions[i].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <a href={site.mapUrl} target="_blank" rel="noopener" className={cn(button({ size: "lg" }), "mt-4 w-full sm:w-auto")}><Navigation size={18} aria-hidden /> Построить маршрут</a>
        </div>
      </div>
    </Section>
  );
}
