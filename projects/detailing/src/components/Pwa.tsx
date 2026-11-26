"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusSquare, Share, X } from "lucide-react";
import { site } from "@/site.config";
import { cn } from "@/lib/utils";
import { button } from "./ui";

type BeforeInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
type Ctx = { standalone: boolean; canInstall: boolean; install: () => void };
const PwaCtx = createContext<Ctx>({ standalone: false, canInstall: false, install: () => {} });
export const usePwa = () => useContext(PwaCtx);

// Приложение на телефоне: регистрирует сервис-воркер, узнаёт, открыт ли сайт как приложение,
// и умеет ставить его на экран «Домой» (Android сам, на iPhone показывает подсказку).
export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);
  const [prompt, setPrompt] = useState<BeforeInstall | null>(null);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    const check = () => setStandalone(mq.matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    check();
    mq.addEventListener("change", check);
    const ua = navigator.userAgent;
    // iPadOS притворяется Mac, поэтому проверяем ещё и касания
    setIos(/iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1));

    const onPrompt = (e: Event) => { e.preventDefault(); setPrompt(e as BeforeInstall); };
    const onInstalled = () => { setPrompt(null); setStandalone(true); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    return () => { mq.removeEventListener("change", check); window.removeEventListener("beforeinstallprompt", onPrompt); window.removeEventListener("appinstalled", onInstalled); };
  }, []);

  // Чтобы CSS мог отличать режим приложения
  useEffect(() => { document.documentElement.toggleAttribute("data-app", standalone); }, [standalone]);

  const install = useCallback(() => {
    if (prompt) { prompt.prompt(); prompt.userChoice.finally(() => setPrompt(null)); }
    else if (ios) setSheet(true);
  }, [prompt, ios]);

  const value = useMemo(() => ({ standalone, canInstall: !standalone && (!!prompt || ios), install }), [standalone, prompt, ios, install]);

  return (
    <PwaCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {sheet && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Как поставить приложение"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-end bg-black/60 backdrop-blur-sm" onClick={() => setSheet(false)}
          >
            <motion.div
              initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-t-[28px] border-t border-line bg-surface p-5 pb-[max(24px,env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[22px]">Приложение на экран «Домой»</h2>
                <button type="button" aria-label="Закрыть" onClick={() => setSheet(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-surface-2"><X size={18} aria-hidden /></button>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{site.name} откроется на весь экран, без адресной строки, как обычное приложение. Это бесплатно и занимает 10 секунд.</p>
              <ol className="mt-5 space-y-3 text-[15px]">
                <li className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface-2"><Share size={18} className="text-accent" aria-hidden /></span>Нажмите «Поделиться» внизу экрана Safari</li>
                <li className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface-2"><PlusSquare size={18} className="text-accent" aria-hidden /></span>Выберите «На экран “Домой”»</li>
                <li className="flex items-center gap-3"><span className="tnum grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface-2 font-display text-accent">3</span>Нажмите «Добавить». Значок появится среди приложений</li>
              </ol>
              <button type="button" onClick={() => setSheet(false)} className={cn(button({ size: "lg" }), "mt-6 w-full")}>Понятно</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PwaCtx.Provider>
  );
}
