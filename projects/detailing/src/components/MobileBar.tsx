import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/site.config";
import { button } from "./ui";
import { cn } from "@/lib/utils";

// Липкая панель на телефоне: звонок и мессенджер всегда под большим пальцем.
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-bg/90 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <a href={`tel:${site.phoneHref}`} className={cn(button({ size: "lg" }), "flex-1")}><Phone size={18} aria-hidden /> Позвонить</a>
      <a href={site.whatsapp} target="_blank" rel="noopener" className={cn(button({ variant: "ghost", size: "lg" }), "flex-1")}><MessageCircle size={18} aria-hidden /> Написать</a>
    </div>
  );
}
