import type { Metadata } from "next";
import { site } from "@/site.config";
import { crumbsLd } from "@/lib/seo";
import { Head, JsonLd, PageHero, Section } from "@/components/ui";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Booking } from "@/components/Booking";

export const metadata: Metadata = {
  title: `Наши работы: фото до и после`,
  description: `Фото работ ${site.name}: полировка, керамика, химчистка салона, плёнка. Сравните машину до и после.`,
  alternates: { canonical: "/raboty" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Работы", path: "/raboty" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Работы" }]} title="Работы" text="Фото из нашей студии. Нажмите на фото, чтобы открыть крупно." />
      <Section label="До и после" className="pt-8 md:pt-12">
        <div className="wrap max-md:px-0"><BeforeAfter /></div>
      </Section>
      <Section label="Фото работ" className="border-t border-line">
        <Head title="Галерея" />
        <div className="wrap"><Gallery photos={site.works.photos} /></div>
      </Section>
      <Reviews />
      <Booking />
    </>
  );
}
