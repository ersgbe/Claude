import { AlertCircle, Droplets } from "lucide-react";
import { Section } from "./ui";

// Страница услуги: «Когда пора» помогает понять, нужна ли услуга; «Уход после» — как сохранить результат.
export function SignsCare({ signs, care }: { signs: string[]; care: string[] }) {
  return (
    <Section label="Когда пора и уход после" className="border-t border-line">
      <div className="wrap grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-[22px] border border-line bg-surface p-5 md:p-8">
          <h2 className="text-[22px] md:text-[28px]">Когда пора</h2>
          <p className="mt-2 text-[14px] text-muted">Пора записываться, если узнали свою машину:</p>
          <ul className="mt-5 space-y-3">
            {signs.map((x) => (
              <li key={x} className="flex gap-3 text-[15px] leading-snug"><AlertCircle size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[22px] border border-line bg-surface p-5 md:p-8">
          <h2 className="text-[22px] md:text-[28px]">Уход после</h2>
          <p className="mt-2 text-[14px] text-muted">Чтобы результат держался дольше:</p>
          <ul className="mt-5 space-y-3">
            {care.map((x) => (
              <li key={x} className="flex gap-3 text-[15px] leading-snug"><Droplets size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
