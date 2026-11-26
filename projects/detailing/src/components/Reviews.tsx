import { Star } from "lucide-react";
import { site } from "@/site.config";
import { Heading, Section } from "./ui";
import { Rail } from "./Rail";

export function Reviews() {
  return (
    <Section className="pt-4 md:pt-8">
      <Heading title="Отзывы" />
      <Rail label="Отзывы, листайте вправо">
        {site.reviews.map((r) => (
          <figure key={r.name} className="flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-[22px] bg-surface p-5 md:w-[340px]">
            <div className="flex gap-0.5 text-accent" role="img" aria-label="5 из 5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden />)}
            </div>
            <blockquote className="mt-3 text-[15px] leading-relaxed">{r.text}</blockquote>
            <figcaption className="mt-5 text-[14px]">{r.name}<span className="text-muted">, {r.car}</span></figcaption>
          </figure>
        ))}
      </Rail>
    </Section>
  );
}
