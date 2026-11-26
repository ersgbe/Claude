import type { Metadata } from "next";
import { site } from "@/site.config";
import { crumbsLd } from "@/lib/seo";
import { Head, JsonLd, PageHero, Section, Tiles } from "@/components/ui";
import { Prices } from "@/components/Prices";
import { Packs } from "@/components/Packs";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";

export const metadata: Metadata = {
  title: `Цены на детейлинг ${site.cityIn}`,
  description: `Прайс ${site.name}: мойка, полировка, керамика, химчистка, плёнка. Цены для седана, кроссовера и внедорожника. Цена не меняется после осмотра.`,
  alternates: { canonical: "/ceny" },
};

const how = [
  { title: "Класс машины", text: "Седан, кроссовер или внедорожник. Чем больше площадь, тем больше работы." },
  { title: "Состояние", text: "Глубина царапин и степень загрязнения. Смотрим при осмотре или по фото." },
  { title: "Вариант услуги", text: "Например, сколько слоёв керамики или какие детали клеим плёнкой." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Цены", path: "/ceny" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Цены" }]} title="Цены" text={site.pricesNote} />
      <Prices full />
      <Calculator />
      <Section label="Из чего складывается цена" className="border-t border-line">
        <Head title="Из чего цена" />
        <div className="wrap">
          <Tiles cols="[--n:1] md:[--n:3]">
            {how.map((h, i) => (
              <li key={h.title} className="flex gap-4 rounded-[20px] border border-line bg-surface p-5 md:block md:p-7">
                <span className="tnum font-display text-[28px] leading-none text-accent md:text-[40px]">{i + 1}</span>
                <div className="min-w-0 flex-1 md:mt-6">
                  <h3 className="text-[17px] md:text-[20px]">{h.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted md:text-[15px]">{h.text}</p>
                </div>
              </li>
            ))}
          </Tiles>
        </div>
      </Section>
      <Packs id="bundles" items={site.bundles} title="Комплексы" text="Несколько услуг за один визит. Выходит дешевле, чем по отдельности." />
      <Faq items={site.faq.slice(0, 3)} />
      <Booking />
    </>
  );
}
