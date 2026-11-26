"""Делает заглушки картинок в public/images. Codex заменяет их настоящими фото (см. IMAGES.md)."""
import os, random
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

# имя, ширина, высота, цвет подсветки, сторона света (0 слева, 1 справа), яркость
ITEMS = [
    ("hero", 2400, 1350, (255, 214, 140), 0.78, 1.0),
    ("service-wash", 1200, 900, (90, 170, 255), 0.5, 0.8),
    ("service-polish", 1200, 900, (255, 190, 90), 0.4, 0.8),
    ("service-ceramic", 1200, 900, (255, 214, 140), 0.6, 0.8),
    ("service-interior", 1200, 900, (255, 140, 110), 0.5, 0.8),
    ("service-film", 1200, 900, (120, 230, 200), 0.45, 0.8),
    ("service-presale", 1200, 900, (240, 240, 255), 0.55, 0.8),
    ("before", 1600, 1000, (130, 130, 130), 0.5, 0.45),
    ("after", 1600, 1000, (255, 214, 140), 0.5, 1.0),
    ("og", 1200, 630, (255, 214, 140), 0.75, 1.0),
]

random.seed(7)
for name, w, h, glow, cx, k in ITEMS:
    sw, sh = w // 4, h // 4
    img = Image.new("RGB", (sw, sh), (11, 12, 15))
    d = ImageDraw.Draw(img)
    for y in range(sh):
        t = y / sh
        c = int(14 + 14 * t)
        d.line([(0, y), (sw, y)], fill=(c, c + 1, c + 4))
    glow_layer = Image.new("RGB", (sw, sh), (0, 0, 0))
    g = ImageDraw.Draw(glow_layer)
    x0 = int(sw * cx)
    # световая полоса и «силуэт» кузова
    g.polygon([(x0 - sw * 0.25, sh), (x0 - sw * 0.05, 0), (x0 + sw * 0.05, 0), (x0 - sw * 0.1, sh)],
              fill=tuple(int(v * 0.5 * k) for v in glow))
    g.ellipse([sw * 0.12, sh * 0.5, sw * 0.9, sh * 1.25], fill=tuple(int(v * 0.3 * k) for v in glow))
    g.rounded_rectangle([sw * 0.2, sh * 0.42, sw * 0.8, sh * 0.78], radius=sh * 0.12,
                        fill=tuple(int(v * 0.2 * k) for v in glow))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(sw * 0.045))
    img = Image.blend(img, Image.composite(glow_layer, img, Image.new("L", (sw, sh), 255)), 0.0)
    px, gp = img.load(), glow_layer.load()
    for y in range(sh):
        for x in range(sw):
            r, gg, b = px[x, y]
            a, bb, c = gp[x, y]
            n = random.randint(-3, 3)
            px[x, y] = (min(255, r + a + n), min(255, gg + bb + n), min(255, b + c + n))
    img = img.resize((w, h), Image.LANCZOS)
    img.save(os.path.join(OUT, f"{name}.jpg"), quality=78, optimize=True)
    print(name, w, h)
