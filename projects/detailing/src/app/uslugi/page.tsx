import type { Metadata } from "next";
import { site } from "@/site.config";
import { JsonLd, PageHero } from "@/components/ui";
import { Services } from "@/components/Services";
import { Packs } from "@/components/Packs";
import { CallbackBand } from "@/components/CallbackBand";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";
import { crumbsLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Услуги детейлинга ${site.cityIn}: цены и сроки`,
  description: `Мойка, полировка, керамика, химчистка салона, защитная плёнка ${site.cityIn}. Цены по классу машины, что входит, сроки. ${site.name}.`,
  alternates: { canonical: "/uslugi" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Услуги", path: "/uslugi" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} title="Услуги" text="Выберите направление. На странице услуги цены по классу машины, варианты и этапы работы." />
      <Services head={false} />
      <Packs id="bundles" items={site.bundles} title="Комплексы" text="Несколько услуг за один визит. Выходит дешевле, чем по отдельности." />
      <CallbackBand />
      <Faq />
      <Booking />
    </>
  );
}
