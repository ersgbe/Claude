import { site } from "@/site.config";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Prices } from "@/components/Prices";
import { Works } from "@/components/Works";
import { Steps } from "@/components/Steps";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";

// JSON-LD: автомойка/детейлинг, услуги и вопросы. Берётся из site.config.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoWash", "LocalBusiness"],
      "@id": `${site.url}/#business`,
      name: site.name,
      description: `${site.tagline} ${site.cityIn}`,
      url: site.url,
      telephone: site.phone,
      image: `${site.url}/images/og.jpg`,
      hasMap: site.mapUrl,
      priceRange: "₽₽",
      address: { "@type": "PostalAddress", streetAddress: site.addressFull, addressLocality: site.city, addressCountry: "RU" },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: site.hoursSchema.days, opens: site.hoursSchema.opens, closes: site.hoursSchema.closes },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги",
        itemListElement: site.services.map((s) => ({
          "@type": "Offer",
          priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "RUB" },
          itemOffered: { "@type": "Service", name: s.title, description: s.text },
        })),
      },
    },
    { "@type": "WebSite", "@id": `${site.url}/#site`, url: site.url, name: site.name, inLanguage: "ru" },
    {
      "@type": "FAQPage",
      mainEntity: site.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <Hero />
        <Services />
        <Prices />
        <Works />
        <Steps />
        <Reviews />
        <Booking />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
