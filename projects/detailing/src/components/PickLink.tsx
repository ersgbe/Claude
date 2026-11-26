"use client";
// Ссылка на форму записи, которая заодно выбирает услугу в форме
export function PickLink({ slug, className, children }: { slug?: string; className?: string; children: React.ReactNode }) {
  return (
    <a href="#booking" className={className} onClick={() => slug && window.dispatchEvent(new CustomEvent("select-service", { detail: slug }))}>
      {children}
    </a>
  );
}
