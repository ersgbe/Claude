import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-[14px] font-semibold whitespace-nowrap transition duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:brightness-110",
        ghost: "bg-surface-2 text-fg hover:bg-white/12",
      },
      size: { md: "h-12 px-5 text-[15px]", lg: "h-[52px] px-7 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("py-12 md:py-20", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Heading({ title, text, className }: { title: string; text?: string; className?: string }) {
  return (
    <div className={cn("mb-6 max-w-xl md:mb-10", className)}>
      <h2 className="text-2xl md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">{text}</p>}
    </div>
  );
}

// Чипы-вкладки: одна строка, листаются пальцем
export function Chips({ items, value, onChange, label }: { items: string[]; value: number; onChange: (i: number) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="no-bar -mx-5 mb-6 flex gap-2 overflow-x-auto overscroll-x-contain px-5 md:mx-0 md:px-0">
      {items.map((c, i) => (
        <button
          key={c} role="tab" aria-selected={value === i} onClick={() => onChange(i)}
          className={cn("h-11 shrink-0 rounded-[14px] px-5 text-[15px] font-medium transition", value === i ? "bg-accent text-accent-ink" : "bg-surface-2 hover:bg-white/12")}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
