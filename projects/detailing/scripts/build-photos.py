"""Собирает все картинки сайта из бесплатных фото Pexels (лицензия Pexels: можно в коммерческих проектах, указывать автора не обязательно).

Запуск: python3 scripts/build-photos.py [папка-кэш]
Скрипт скачивает исходники с images.pexels.com (если их ещё нет в кэше), режет под нужные пропорции и кладёт в public/images.
Список исходников и где они использованы: PHOTOS.md. Чтобы заменить фото на своё, положи файл в public/images под тем же именем.
"""
import os, random, sys, urllib.request
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public", "images")
CACHE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, ".photo-cache")
os.makedirs(OUT, exist_ok=True); os.makedirs(CACHE, exist_ok=True)


def src(pid):
    p = os.path.join(CACHE, f"{pid}.jpg")
    if not os.path.exists(p):
        url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=2600"
        req = urllib.request.Request(url, headers={"User-Agent": "photo-build/1.0"})
        open(p, "wb").write(urllib.request.urlopen(req, timeout=60).read())
    return Image.open(p).convert("RGB")


def crop(im, w, h, fx=0.5, fy=0.5, zoom=1.0):
    """Вырезает кадр нужной пропорции вокруг точки (fx, fy), потом уменьшает до w×h."""
    W, H = im.size
    a = w / h
    cw, ch = (H * a, H) if W / H > a else (W, W / a)
    cw, ch = cw / zoom, ch / zoom
    x = min(max(fx * W - cw / 2, 0), W - cw)
    y = min(max(fy * H - ch / 2, 0), H - ch)
    return im.crop((int(x), int(y), int(x + cw), int(y + ch))).resize((w, h), Image.LANCZOS)


def hide_plate(im, box):
    """Закрашиваем номерной знак: размытая заплатка цвета бампера с мягким краем."""
    x0, y0, x1, y1 = [int(v) for v in box]
    pad = 14
    x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
    patch = im.crop((x0 - 60, y0 - 40, x1 + 60, y1 + 40)).filter(ImageFilter.GaussianBlur(26)).crop((60, 40, 60 + x1 - x0, 40 + y1 - y0))
    patch = ImageEnhance.Brightness(patch).enhance(0.82)
    mask = Image.new("L", patch.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((pad // 2, pad // 2, patch.size[0] - pad // 2, patch.size[1] - pad // 2), radius=10, fill=255)
    im.paste(patch, (x0, y0), mask.filter(ImageFilter.GaussianBlur(pad // 2)))
    return im


def save(im, name, q=80):
    path = os.path.join(OUT, name + ".jpg")
    im.save(path, quality=q, optimize=True, progressive=True)
    while os.path.getsize(path) > 480_000 and q > 55:
        q -= 5
        im.save(path, quality=q, optimize=True, progressive=True)
    print(name, im.size, os.path.getsize(path) // 1024, "КБ")


# --- Номерные знаки на двух кадрах BMW (координаты для файлов шириной 2600)
bmw_wide = hide_plate(src(26936251), (1575, 905, 1730, 1000))
bmw_tall = hide_plate(src(26936248), (750, 2290, 1000, 2430))

# --- Первый экран, компьютер: машина крупно справа, слева тёмное поле под заголовок
src_h = src(8664298)
sc = 1.0
bw, bh = 2531, 1688                       # фото чуть увеличено, чтобы машина была крупнее
big = src_h.resize((bw, bh), Image.LANCZOS)
canvas = Image.new("RGB", (2400, 1350), (9, 9, 8))
canvas.paste(big, (640, -200))
fade = Image.new("L", (2400, 1350), 255)
d = ImageDraw.Draw(fade)
for x in range(0, 1400):
    d.line([(x, 0), (x, 1350)], fill=int(255 * min(1, max(0, (x - 640) / 650))))
canvas = Image.composite(canvas, Image.new("RGB", canvas.size, (9, 9, 8)), fade)
save(canvas, "hero")
save(crop(canvas, 1200, 630, 0.62, 0.55), "og")

# --- Первый экран, телефон: машина в верхней половине
W, H = bmw_tall.size
save(crop(bmw_tall.crop((430, 1000, 430 + 1631, 3900)), 1080, 1920), "hero-m")

# --- До и после: одна машина, один кадр. «После» это фото, «до» то же фото с тусклой краской.
base = crop(bmw_wide, 1600, 1000, 0.5, 0.52)
after = ImageEnhance.Contrast(base).enhance(1.08)
after = ImageEnhance.Color(after).enhance(1.06)
after = after.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=2))
save(after, "after")
rnd = random.Random(5)
# «До»: то же фото, но краска тусклая и в дорожной плёнке (демонстрация, замените на настоящее фото клиента)
before = ImageEnhance.Color(base).enhance(0.5)
before = ImageEnhance.Contrast(before).enhance(0.7)
before = before.point(lambda v: int(min(v, 196) * 0.96))  # блики и свет фар теряют яркость
# мягкая «грязевая» плёнка: крупный размытый шум, сильнее по кузову
film = Image.effect_noise((160, 100), 70).resize(before.size, Image.BICUBIC).filter(ImageFilter.GaussianBlur(14))
film = ImageEnhance.Contrast(film).enhance(1.8)
mask = Image.new("L", before.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((330, 380, 1300, 760), radius=120, fill=90)
mask = mask.filter(ImageFilter.GaussianBlur(40))
before = Image.composite(Image.merge("RGB", (film, film, film)).point(lambda v: 120 + v // 4), before, mask)
before = Image.blend(before, Image.new("RGB", before.size, (132, 128, 120)), 0.14)
before = before.filter(ImageFilter.GaussianBlur(0.6))
save(before, "before")

# --- Карточки услуг 4:5
for name, pid, fx, fy, z in [
    ("service-wash", 6872575, 0.5, 0.5, 1.0),
    ("service-polish", 5233259, 0.62, 0.5, 1.0),
    ("service-ceramic", 6872572, 0.5, 0.55, 1.0),
    ("service-interior", 5233285, 0.45, 0.5, 1.0),
    ("service-film", 10126663, 0.75, 0.5, 1.0),
    ("service-presale", 6873177, 0.45, 0.5, 1.0),
    # --- Фото работ 4:5
    ("work-1", 11139239, 0.5, 0.45, 1.0),
    ("work-2", 9604948, 0.42, 0.5, 1.0),
    ("work-3", 6873020, 0.62, 0.5, 1.0),
    ("work-4", 18318590, 0.42, 0.5, 1.0),
    ("work-5", 4870664, 0.5, 0.45, 1.0),
    ("work-6", 17641807, 0.5, 0.5, 1.0),
]:
    save(crop(src(pid), 1000, 1250, fx, fy, z), name)

# --- Студия (блок «Как добраться»)
save(crop(src(10126665), 1600, 1000, 0.5, 0.5), "studio")
