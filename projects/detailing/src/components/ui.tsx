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
