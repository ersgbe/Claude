import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findService, site } from "@/site.config";
import { rub } from "@/lib/utils";
import { crumbsLd } from "@/lib/seo";
import { Head, JsonLd, Section, Tiles } from "@/components/ui";
import { ServiceHero } from "@/components/ServiceHero";
import { Includes } from "@/components/Includes";
import { SignsCare } from "@/components/SignsCare";
import { Packs } from "@/components/Packs";
import { ClassPrices } from "@/components/ClassPrices";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Steps } from "@/components/Steps";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";
import { ServiceCard } from "@/components/ServiceCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findService((await params).slug);
  if (!s) return {};
  const title = `${s.title} ${site.cityIn}: цена от ${rub(s.from)}`;
  return {
    title,
    description: `${s.intro} Цена от ${rub(s.from)}, срок ${s.time}.`.slice(0, 165),
    alternates: { canonical: `/uslugi/${s.slug}` },
    openGraph: { title, images: [{ url: s.image }] },
  };
}

export default async function Page({ params }: Props) {
  const s = findService((await params).slug);
  if (!s) notFound();
  const others = site.services.filter((x) => x.slug !== s.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.intro,
    url: `${site.url}/uslugi/${s.slug}`,
    image: `${site.url}${s.image}`,
    areaServed: site.city,
    provider: { "@id": `${site.url}/#business` },
    offers: s.packages.map((p) => ({ "@type": "Offer", name: p.name, price: p.price, priceCurrency: "RUB" })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbsLd([{ name: "Услуги и цены", path: "/uslugi" }, { name: s.title, path: `/uslugi/${s.slug}` }])} />
      <ServiceHero s={s} />
      <SignsCare signs={s.signs} care={s.care} />
      <Includes items={s.includes} />
      <Packs id="packages" items={s.packages} title="Варианты" text="Цены указаны для седана. Для кроссовера и внедорожника немного выше." service={s.title} />
      <ClassPrices prices={s.prices} />
      <Section label="Результат" className="border-t border-line">
        <Head title="Результат" text="Потяните ползунок, чтобы сравнить до и после." />
        <div className="wrap max-md:px-0"><BeforeAfter /></div>
      </Section>
      <Steps items={s.process} title="Как делаем" />
      <Faq items={[...s.faq, ...site.faq.slice(2, 4)]} />
      <Section label="Другие услуги" className="border-t border-line">
        <Head title="Другие услуги" />
        <div className="wrap">
          <Tiles cols="[--n:2] md:[--n:3] lg:[--n:5]">
            {others.map((o) => <li key={o.slug}><ServiceCard s={o} sizes="(min-width: 1024px) 240px, 50vw" /></li>)}
          </Tiles>
        </div>
      </Section>
      <Booking service={s.title} />
    </>
  );
}
