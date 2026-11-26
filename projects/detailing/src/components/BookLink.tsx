"use client";
// Ссылка «Записаться»: прокручивает к форме и выбирает услугу в списке.
export function BookLink({ slug, className, children }: { slug: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#booking"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("select-service", { detail: slug }))}
    >
      {children}
    </a>
  );
}
