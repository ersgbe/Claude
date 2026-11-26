import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button } from "./ui";

// Липкая панель на телефоне: звонок и мессенджер всегда под большим пальцем.
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="flex gap-2 border-t border-line bg-bg/85 px-[var(--pad)] pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl">
        <a href={`tel:${site.phoneHref}`} className={cn(button({ size: "lg" }), "min-w-0 flex-[1.5] px-3")}><Phone size={18} aria-hidden /> Позвонить</a>
        <a href={site.whatsapp} target="_blank" rel="noopener" className={cn(button({ variant: "ghost", size: "lg" }), "min-w-0 flex-1 px-3")}><MessageCircle size={18} aria-hidden /> Написать</a>
      </div>
    </div>
  );
}
