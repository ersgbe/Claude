import { site } from "@/site.config";
import { FitText } from "./FitText";

// Подвал: название крупно на всю ширину, ниже одна строка с данными.
export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-12 md:pt-20">
      <div className="wrap">
        <div aria-hidden className="select-none overflow-hidden">
          <FitText className="font-display font-medium uppercase leading-[0.8] tracking-[-0.05em] text-surface-2">{site.name}</FitText>
        </div>
        <div className="beam mt-6 opacity-50" />
        <div className="flex flex-col gap-1 py-6 text-[13px] text-muted md:flex-row md:justify-between">
          <p>{site.name}, {site.tagline.toLowerCase()} {site.cityIn}. {site.hours}.</p>
          <p>© {new Date().getFullYear()} {site.legal}</p>
        </div>
      </div>
    </footer>
  );
}
