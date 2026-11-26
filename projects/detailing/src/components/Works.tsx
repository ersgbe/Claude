import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button, Head, Section } from "./ui";
import { BeforeAfter } from "./BeforeAfter";
import { Gallery } from "./Gallery";

// До и после + сетка фото работ. На главной показываем 4 фото и ссылку на все работы.
export function Works({ limit, more = true }: { limit?: number; more?: boolean }) {
  const w = site.works;
  const photos = limit ? w.photos.slice(0, limit) : w.photos;
  return (
    <Section id="works" label="Работы" className="border-t border-line">
      <Head title={w.title} text={w.text} />
      <div className="wrap max-md:px-0">
        <BeforeAfter />
        <ul className="mt-5 grid gap-x-8 gap-y-2 text-[14px] text-fg/75 sm:grid-cols-3 max-md:px-[var(--pad)] md:mt-8 md:text-[15px]">
          {w.facts.map((f) => (
            <li key={f} className="flex items-center gap-3"><span aria-hidden className="h-px w-5 shrink-0 bg-accent" />{f}</li>
          ))}
        </ul>
      </div>
      <div className="wrap mt-6 md:mt-12">
        <Gallery photos={photos} cols={limit === 4 ? "[--n:2] md:[--n:4]" : "[--n:2] md:[--n:3]"} />
        {more && (
          <div className="mt-6 flex justify-center">
            <Link href="/raboty" className={cn(button({ variant: "ghost" }), "w-full sm:w-auto")}>Все работы <ArrowRight size={17} aria-hidden /></Link>
          </div>
        )}
      </div>
    </Section>
  );
}
