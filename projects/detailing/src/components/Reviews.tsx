import { site } from "@/site.config";
import { Head, Section } from "./ui";
import { Rail } from "./Rail";

// Отзывы: лента карточек. Тексты в конфиге примерные, замените на настоящие.
export function Reviews() {
  return (
    <Section id="reviews" label="Отзывы" className="border-t border-line">
      <Head title="Отзывы" />
      <Rail label="Отзывы, листайте вправо">
        {site.reviews.map((r) => (
          <figure key={r.name} className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-5 md:p-7">
            <blockquote className="text-[16px] leading-relaxed md:text-[17px]">
              {r.text}
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-4 text-[14px]">
              <span className="font-medium">{r.name}</span>
              <span className="text-muted">{r.car}</span>
            </figcaption>
          </figure>
        ))}
      </Rail>
    </Section>
  );
}
