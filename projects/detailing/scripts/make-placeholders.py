"""Заглушки картинок в public/images (силуэт авто в студийном свете).
Codex заменяет их настоящими фото по IMAGES.md. Запуск: python3 scripts/make-placeholders.py"""
import os, random, math
from PIL import Image, ImageDraw, ImageFilter, ImageChops

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)
CREAM = (255, 224, 163)

# имя, w, h, цвет света, x центра авто (0..1), масштаб авто (от ширины), y земли (0..1), режим
ITEMS = [
    ("hero", 2400, 1350, CREAM, 0.68, 0.62, 0.80, "car"),
    ("hero-m", 1200, 1500, CREAM, 0.5, 1.05, 0.50, "car"),
    ("service-wash", 1200, 900, (110, 175, 255), 0.5, 1.15, 0.86, "car"),
    ("service-polish", 1200, 900, (255, 190, 110), 0.42, 1.5, 0.95, "car"),
    ("service-ceramic", 1200, 900, CREAM, 0.58, 1.3, 0.92, "car"),
    ("service-interior", 1200, 900, (255, 150, 120), 0.5, 1.6, 1.1, "car"),
    ("service-film", 1200, 900, (130, 235, 205), 0.45, 1.4, 0.95, "car"),
    ("service-presale", 1200, 900, (235, 235, 245), 0.5, 0.95, 0.82, "car"),
    ("before", 1600, 1000, (150, 150, 150), 0.5, 0.82, 0.84, "dull"),
    ("after", 1600, 1000, CREAM, 0.5, 0.82, 0.84, "car"),
    ("work-1", 1000, 1250, CREAM, 0.5, 1.9, 0.78, "car"),
    ("work-2", 1000, 1250, (130, 235, 205), 0.4, 2.0, 0.9, "car"),
    ("work-3", 1000, 1250, (255, 190, 110), 0.6, 1.8, 0.7, "car"),
    ("work-4", 1000, 1250, (110, 175, 255), 0.5, 2.1, 0.85, "car"),
    ("work-5", 1000, 1250, CREAM, 0.55, 1.7, 0.75, "car"),
    ("og", 1200, 630, CREAM, 0.7, 0.62, 0.82, "car"),
]
BODY = [(0.02,0.72),(0.04,0.6),(0.14,0.55),(0.27,0.5),(0.36,0.33),(0.46,0.22),(0.6,0.2),(0.72,0.27),(0.83,0.45),(0.95,0.52),(0.99,0.64),(0.98,0.78),(0.02,0.78)]
WIN = [(0.37,0.34),(0.46,0.245),(0.59,0.23),(0.7,0.29),(0.78,0.43),(0.4,0.43)]

def build(name, w, h, glow, cx, sc, gy, mode):
    S = 2
    W, H = w // S // 2, h // S // 2   # рисуем в малом размере, потом растягиваем
    rnd = random.Random(name)
    k = 0.5 if mode == "dull" else 1.0
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        c = int(10 + 12 * t)
        d.line([(0, y), (W, y)], fill=(c, c, c + 1))
    light = Image.new("RGB", (W, H), (0, 0, 0))
    l = ImageDraw.Draw(light)
    gx = int(W * cx)
    l.polygon([(gx - W*0.30, H), (gx - W*0.06, 0), (gx + W*0.06, 0), (gx - W*0.08, H)], fill=tuple(int(v*0.30*k) for v in glow))
    l.ellipse([gx - W*0.6, H*gy - H*0.1, gx + W*0.6, H*gy + H*0.3], fill=tuple(int(v*0.14*k) for v in glow))
    light = light.filter(ImageFilter.GaussianBlur(W * 0.05))
    img = ImageChops.add(bg, light)

    # студийный свет: тонкие световые линии и глянец пола, без рисованной машины
    ln = Image.new("RGB", (W, H), (0, 0, 0)); q = ImageDraw.Draw(ln)
    fy = int(H * gy)
    q.line([(0, fy), (W, fy)], fill=tuple(int(v * 0.35 * k) for v in glow), width=max(1, H // 160))
    for i in (-1, 0, 1):
        x = gx + i * W * 0.22
        q.line([(x - W*0.1, 0), (x + W*0.02, fy)], fill=tuple(int(v * 0.10 * k) for v in glow), width=max(1, W // 70))
    img = ImageChops.add(img, ln.filter(ImageFilter.GaussianBlur(W * 0.006)))
    rnd2 = rnd
    px = img.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]; n = rnd2.randint(-3, 3)
            px[x, y] = (max(0, r + n), max(0, g + n), max(0, b + n))
    return img.resize((w, h), Image.LANCZOS)
    car_w = W * sc
    ox, oy = gx - car_w / 2, H * gy - car_w * 0.78 * 0.5 - car_w * 0.0
    ground = H * gy
    def P(pts): return [(ox + x * car_w, ground - (0.78 - y) * car_w * 0.5 * 2 * 0.5 - (0.0)) for x, y in pts]
    # нормализация: y=0.78 это земля
    def Q(pts): return [(ox + x * car_w, ground + (y - 0.78) * car_w * 0.5) for x, y in pts]
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    body = Q(BODY)
    shade = (26, 27, 30, 255) if mode == "car" else (30, 30, 32, 255)
    ld.polygon(body, fill=shade)
    ld.polygon(Q(WIN), fill=(14, 15, 18, 255))
    for wx in (0.2, 0.8):
        r = car_w * 0.085
        x, y = ox + wx * car_w, ground + (0.78 - 0.78) * car_w * 0.5
        ld.ellipse([x - r, y - r, x + r, y + r], fill=(8, 8, 9, 255), outline=(60, 60, 64, 255))
    # световая кромка по крыше и линия плеча
    edge = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ed = ImageDraw.Draw(edge)
    ea = int(255 * (0.35 if mode == "dull" else 1.0))
    ed.line(Q(BODY[3:10]), fill=glow + (ea,), width=max(2, int(car_w * 0.006)))
    ed.line(Q([(0.05, 0.62), (0.5, 0.52), (0.97, 0.58)]), fill=glow + (int(ea * 0.55),), width=max(1, int(car_w * 0.004)))
    glow_edge = edge.filter(ImageFilter.GaussianBlur(car_w * 0.012))
    # отражение на полу
    refl = layer.transpose(Image.FLIP_TOP_BOTTOM)
    ry = int(ground * 2 - H)
    refl_full = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    refl_full.paste(refl, (0, int(2 * ground - H)))
    fade = Image.new("L", (W, H), 0)
    fd = ImageDraw.Draw(fade)
    for y in range(int(ground), H):
        fd.line([(0, y), (W, y)], fill=max(0, int(70 * (1 - (y - ground) / max(1, H - ground)))))
    refl_full.putalpha(ImageChops.multiply(refl_full.getchannel("A"), fade))
    out = img.convert("RGBA")
    out = Image.alpha_composite(out, refl_full.filter(ImageFilter.GaussianBlur(2)))
    out = Image.alpha_composite(out, layer)
    out = Image.alpha_composite(out, glow_edge)
    out = Image.alpha_composite(out, edge)
    out = out.convert("RGB")
    # зерно
    px = out.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]; n = rnd.randint(-3, 3)
            px[x, y] = (max(0, r + n), max(0, g + n), max(0, b + n))
    return out.resize((w, h), Image.LANCZOS)

for it in ITEMS:
    im = build(*it)
    im.save(os.path.join(OUT, it[0] + ".jpg"), quality=76, optimize=True)
    print(it[0], it[1], it[2])
