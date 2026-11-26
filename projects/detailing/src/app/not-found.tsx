import Link from "next/link";
import { button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center pt-[calc(96px+env(safe-area-inset-top))]">
      <p className="tnum font-display text-[clamp(80px,22vw,220px)] leading-none tracking-[-0.01em] text-surface-2">404</p>
      <h1 className="mt-4 text-[28px] uppercase md:text-[44px]">Страница не найдена</h1>
      <p className="mt-3 max-w-[420px] text-[15px] text-muted">Возможно, ссылка устарела. Начните с главной или посмотрите услуги.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/" className={button({ size: "lg" })}>На главную</Link>
        <Link href="/uslugi" className={button({ variant: "ghost", size: "lg" })}>Услуги</Link>
      </div>
    </section>
  );
}
