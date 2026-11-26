"use client";
import { prefillLead } from "@/lib/lead";

// Ссылка на форму записи: заодно выбирает услугу и переносит выбранный пакет в заявку
export function PickLink({ service, comment, className, children }: { service?: string; comment?: string; className?: string; children: React.ReactNode }) {
  return (
    <a href="#booking" className={className} onClick={() => prefillLead({ service, comment })}>
      {children}
    </a>
  );
}
