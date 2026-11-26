import type { Metadata } from "next";
import { site } from "@/site.config";
import { crumbsLd } from "@/lib/seo";
import { JsonLd, PageHero } from "@/components/ui";
import { Contacts } from "@/components/Contacts";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: `Контакты и адрес`,
  description: `${site.name}: ${site.addressFull}. ${site.hours}. Телефон ${site.phone}, Telegram, WhatsApp.`,
  alternates: { canonical: "/kontakty" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Контакты", path: "/kontakty" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} title="Контакты" text={`${site.address}. ${site.hours}.`} />
      <Contacts />
      <Booking />
      <Faq items={site.faq.slice(3)} />
    </>
  );
}
