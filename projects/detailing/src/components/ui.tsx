import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Кнопка в стиле shadcn: один набор вариантов на весь сайт
export const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold whitespace-nowrap transition duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:brightness-110 hover:-translate-y-0.5 shadow-[0_8px_30px_-10px_rgb(255_224_163/0.5)]",
        ghost: "border border-white/10 bg-surface-2 text-fg hover:bg-white/10 hover:border-white/30",
      },
      size: { md: "h-12 px-6 text-[15px]", lg: "h-14 px-8 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type ButtonProps = VariantProps<typeof button>;

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Heading({ title, text, className }: { kicker?: string; title: string; text?: string; className?: string }) {
  return (
    <div className={cn("mb-8 max-w-2xl md:mb-12", className)}>
      <div className="flex items-center gap-4">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="shrink-0 text-muted">
          <path d="M5 5l18 18M23 5L5 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h2 className="text-[26px] md:text-[38px]">{title}</h2>
      </div>
      {text && <p className="mt-4 text-lg text-muted md:pl-11">{text}</p>}
    </div>
  );
}
