import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { site } from "@/site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import "./globals.css";

const title = `${site.tagline} ${site.cityIn}: полировка, керамика, химчистка | ${site.name}`;
const description = `${site.name}, ${site.tagline.toLowerCase()} ${site.cityIn}. Полировка, керамика, химчистка салона, защитная плёнка. Цену называем до начала работ. Перезвоним за 10 минут: ${site.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: site.name, locale: "ru_RU", type: "website", images: [{ url: "/images/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#090908", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[14px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">К содержимому</a>
        <MotionConfig reducedMotion="user">
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
        </MotionConfig>
      </body>
    </html>
  );
}
