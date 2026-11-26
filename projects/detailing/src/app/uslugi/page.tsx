import type { Metadata } from "next";
import { site } from "@/site.config";
import { JsonLd, PageHero } from "@/components/ui";
import { Services } from "@/components/Services";
import { Packs } from "@/components/Packs";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";
import { crumbsLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Услуги и цены на детейлинг ${site.cityIn}`,
  description: `Мойка, полировка, керамика, химчистка салона, защитная плёнка ${site.cityIn}. Цены по классу машины, что входит, сроки. ${site.name}.`,
  alternates: { canonical: "/uslugi" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Услуги и цены", path: "/uslugi" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги и цены" }]} title="Услуги и цены" text="Нажмите на услугу, чтобы посмотреть варианты и этапы. Ниже можно посчитать цену для своей машины." />
      <Services head={false} />
      <Calculator />
      <Packs id="bundles" items={site.bundles} title="Комплексы" text="Несколько услуг за один визит. Выходит дешевле, чем по отдельности." />
      <Faq />
      <Booking />
    </>
  );
}
