import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Кнопка в стиле shadcn: один набор вариантов на весь сайт
export const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:brightness-110 hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgb(200_255_61/0.55)]",
        ghost: "border border-white/15 text-fg hover:bg-white/8 hover:border-white/30",
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

export function Heading({ kicker, title, text, className }: { kicker: string; title: string; text?: string; className?: string }) {
  return (
    <div className={cn("mb-10 max-w-2xl md:mb-14", className)}>
      <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">{kicker}</p>
      <h2 className="text-[28px] md:text-[40px]">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted">{text}</p>}
    </div>
  );
}
