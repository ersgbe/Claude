import { ImageResponse } from "next/og";
import { ACCENT, BG, Mark } from "@/lib/brand-mark";

// Значки приложения: /pwa/icon/192, /512, /180 (для iPhone), /maskable (для Android, знак с запасом по краям)
const SIZES: Record<string, { px: number; mark: number; radius: number }> = {
  "192": { px: 192, mark: 1.1, radius: 0 },
  "512": { px: 512, mark: 1.1, radius: 0 },
  "180": { px: 180, mark: 1.1, radius: 0 },
  maskable: { px: 512, mark: 0.8, radius: 0 },
};

export const dynamic = "force-static";
export function generateStaticParams() {
  return Object.keys(SIZES).map((kind) => ({ kind }));
}

export async function GET(_: Request, { params }: { params: Promise<{ kind: string }> }) {
  const s = SIZES[(await params).kind];
  if (!s) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle at 50% 38%, #1d1a14 0%, ${BG} 70%)`, color: ACCENT }}>
        <Mark size={Math.round(s.px * s.mark)} />
      </div>
    ),
    { width: s.px, height: s.px },
  );
}
