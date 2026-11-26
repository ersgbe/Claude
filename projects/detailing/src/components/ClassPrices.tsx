import { site } from "@/site.config";
import { rub } from "@/lib/utils";

// Базовая цена услуги по классу машины: три плитки в ряд
export function ClassPrices({ prices }: { prices: number[] }) {
  return (
    <div className="wrap -mt-6 pb-4 md:-mt-10">
      <p className="mb-3 text-[13px] text-muted">Базовая цена по классу машины</p>
      <ul className="grid grid-cols-3 gap-2 md:gap-4">
        {site.carClasses.map((c, i) => (
          <li key={c} className="rounded-[14px] bg-surface-2 px-3 py-3 md:rounded-[18px] md:px-5 md:py-4">
            <p className="text-[12px] text-muted md:text-[14px]">{c}</p>
            <p className="tnum mt-1 font-display text-[14px] sm:text-[17px] md:text-[22px]">{rub(prices[i])}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
