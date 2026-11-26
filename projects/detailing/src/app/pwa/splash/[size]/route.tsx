import { ImageResponse } from "next/og";
import { BG, Mark } from "@/lib/brand-mark";
import { SPLASH } from "@/lib/splash";

// Заставки при запуске приложения на iPhone: /pwa/splash/1290x2796 и т.д.

export const dynamic = "force-static";
export function generateStaticParams() {
  return SPLASH.map(([w, h]) => ({ size: `${w}x${h}` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ size: string }> }) {
  const m = /^(\d+)x(\d+)$/.exec((await params).size);
  const hit = m && SPLASH.find(([w, h]) => w === +m[1] && h === +m[2]);
  if (!hit) return new Response("Not found", { status: 404 });
  const [w, h] = hit;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle at 50% 42%, #1d1a14 0%, ${BG} 62%)` }}>
        <Mark size={Math.round(w * 0.4)} />
      </div>
    ),
    { width: w, height: h },
  );
}
