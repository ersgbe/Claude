import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Одна пара кнопок на весь сайт: кремовая (главное действие) и тёмная плитка.
export const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-[14px] font-medium whitespace-nowrap transition duration-200 ease-out active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-[#ffe9bd] hover:-translate-y-px",
        ghost: "bg-surface-2 text-fg hover:bg-[#2d2c28] hover:-translate-y-px",
      },
      size: { md: "h-12 px-5 text-[15px]", lg: "h-14 px-6 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const tile = "grid place-items-center rounded-[14px] bg-surface-2/80 backdrop-blur-xl transition hover:bg-[#2d2c28]";

export function Section({ id, className, children, label }: { id?: string; className?: string; children: React.ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={cn("py-14 md:py-24", className)}>
      {children}
    </section>
  );
}

// Заголовок блока: слева название, справа короткий текст или кнопка
export function Head({ title, text, aside, className }: { title: string; text?: string; aside?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("wrap mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-10", className)}>
      <h2 className="text-[32px] uppercase sm:text-[44px] lg:text-[64px]">{title}</h2>
      {(text || aside) && (
        <div className="flex flex-col gap-4 md:max-w-[380px] md:items-end md:text-right">
          {text && <p className="text-[15px] leading-relaxed text-muted">{text}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}

// Сетка плашек. cols — классы с числом колонок, например "[--n:2] lg:[--n:3]".
export function Tiles({ cols = "[--n:2] lg:[--n:3]", className, children }: { cols?: string; className?: string; children: React.ReactNode }) {
  return <ul className={cn("tiles", cols, className)}>{children}</ul>;
}

// Хлебные крошки над заголовком внутренней страницы
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Навигация по сайту" className="mb-4 md:mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden className="opacity-50" />}
            {c.href ? <Link href={c.href} className="rounded-md py-1 transition hover:text-fg">{c.label}</Link> : <span aria-current="page" className="text-fg/80">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Шапка внутренней страницы: крошки, крупный заголовок, короткий текст, полоса света
export function PageHero({ crumbs, title, text, children }: { crumbs: { label: string; href?: string }[]; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-[104px] md:pt-[136px]">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-20%] h-[420px] w-[70%] rotate-[-12deg] bg-[radial-gradient(closest-side,rgb(255_224_163/0.10),transparent)]" />
      <div className="wrap">
        <Crumbs items={crumbs} />
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h1 className="text-[clamp(34px,9vw,96px)] uppercase leading-[0.98] tracking-[-0.04em]">{title}</h1>
          {text && <p className="max-w-[420px] text-[15px] leading-relaxed text-muted md:pb-2 md:text-right md:text-[16px]">{text}</p>}
        </div>
        {children}
        <div aria-hidden className="beam mt-8 opacity-60 md:mt-12" />
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
