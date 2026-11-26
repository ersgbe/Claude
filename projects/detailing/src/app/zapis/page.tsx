import type { Metadata } from "next";
import { site } from "@/site.config";
import { crumbsLd } from "@/lib/seo";
import { JsonLd, PageHero } from "@/components/ui";
import { Calculator } from "@/components/Calculator";
import { Booking } from "@/components/Booking";
import { Contacts } from "@/components/Contacts";

export const metadata: Metadata = {
  title: `Онлайн-запись на детейлинг`,
  description: `Запишитесь в ${site.name} без звонка: рассчитайте цену, выберите день и время. Администратор подтвердит запись за 10 минут.`,
  alternates: { canonical: "/zapis" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Запись", path: "/zapis" }])} />
      <PageHero crumbs={[{ label: "Главная", href: "/" }, { label: "Запись" }]} title="Онлайн-запись" text="Посчитайте цену, выберите день и время. Администратор перезвонит за 10 минут и подтвердит запись." />
      <Calculator border={false} />
      <Booking />
      <Contacts />
    </>
  );
}
