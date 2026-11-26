"""Заглушки картинок в public/images: тёмная студия, свет софтбоксов и блики на лаке.
Никаких рисованных машин, только свет. Codex потом заменит их фото по IMAGES.md.
Список файлов и размеры должны совпадать с IMAGES.md и scripts/check-images.py.
Запуск: python3 scripts/make-placeholders.py  (нужны Pillow и numpy)"""
import os
import numpy as np
from PIL import Image, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

CREAM = (1.0, 0.88, 0.64)
WHITE = (1.0, 0.97, 0.9)
COOL = (0.72, 0.8, 0.95)
TEAL = (0.62, 0.9, 0.85)
AMBER = (1.0, 0.72, 0.42)

# имя, ширина, высота, сцена, цвет света, где свет по горизонтали (0..1), высота блика (0..1), сид
ITEMS = [
    ("hero", 2400, 1350, "paint", CREAM, 0.68, 0.52, 1),
    ("hero-m", 1080, 1920, "paint", CREAM, 0.5, 0.36, 2),
    ("service-wash", 1000, 1250, "drops", COOL, 0.5, 0.42, 3),
    ("service-polish", 1000, 1250, "paint", AMBER, 0.45, 0.44, 4),
    ("service-ceramic", 1000, 1250, "drops", CREAM, 0.55, 0.40, 5),
    ("service-interior", 1000, 1250, "soft", AMBER, 0.5, 0.45, 6),
    ("service-film", 1000, 1250, "paint", TEAL, 0.5, 0.46, 7),
    ("service-presale", 1000, 1250, "paint", WHITE, 0.5, 0.40, 8),
    ("before", 1600, 1000, "dull", (0.75, 0.75, 0.75), 0.5, 0.5, 9),
    ("after", 1600, 1000, "paint", CREAM, 0.5, 0.5, 9),
    ("work-1", 1000, 1250, "paint", CREAM, 0.4, 0.38, 11),
    ("work-2", 1000, 1250, "soft", TEAL, 0.6, 0.5, 12),
    ("work-3", 1000, 1250, "paint", AMBER, 0.55, 0.3, 13),
    ("work-4", 1000, 1250, "drops", COOL, 0.5, 0.5, 14),
    ("work-5", 1000, 1250, "soft", CREAM, 0.45, 0.42, 15),
    ("work-6", 1000, 1250, "drops", AMBER, 0.55, 0.45, 17),
    ("studio", 1600, 1000, "gate", CREAM, 0.5, 0.5, 16),
    ("og", 1200, 630, "paint", CREAM, 0.7, 0.55, 17),
]


def blur(a, r):
    """Гауссово размытие массива HxW через Pillow (быстро)."""
    im = Image.fromarray(np.clip(a * 255 / max(a.max(), 1e-6), 0, 255).astype(np.uint8))
    out = np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255
    return out * max(a.max(), 1e-6)


def scene(w, h, kind, tint, cx, hy, seed):
    rng = np.random.default_rng(seed)
    W, H = w // 2, h // 2
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    u, v = x / W, y / H
    asp = W / H

    # фон: графит, к низу чуть светлее (пол), сверху почти чёрный
    base = 0.028 + 0.03 * np.clip((v - 0.55) / 0.45, 0, 1) ** 1.5
    light = np.zeros((H, W), np.float32)
    floor = 0.62 if kind != "gate" else 0.78

    if kind in ("paint", "dull", "drops", "soft"):
        # софтбокс над машиной: длинная полоса у верхнего края
        sb = np.exp(-((v - 0.07) / 0.018) ** 2) * np.exp(-((u - cx) / (0.28 if asp > 1 else 0.4)) ** 8)
        light += 0.55 * blur(sb, H * 0.006)
        # блик на лаке: плавная кривая через кадр, как линия плеча кузова
        ph = rng.uniform(0, 6.28)
        curve = hy + 0.05 * np.sin(u * 3.1 + ph) - 0.06 * (u - cx)
        d = (v - curve) * H
        span = np.exp(-((u - cx) / 0.42) ** 4)
        core = np.exp(-(d / (H * 0.0035)) ** 2) * span
        glow = np.exp(-(d / (H * 0.05)) ** 2) * span
        sheen = np.exp(-(np.clip(-d, 0, None) / (H * 0.22))) * (d < 0) * span
        light += 1.1 * core + 0.32 * glow + 0.2 * sheen
        # второй, слабый блик ниже: нижняя кромка кузова
        d2 = (v - curve - 0.16) * H
        light += 0.35 * np.exp(-(d2 / (H * 0.004)) ** 2) * span * np.exp(-((u - cx) / 0.3) ** 2)
        light += 0.08 * np.exp(-(d2 / (H * 0.04)) ** 2) * span
        # отражение на глянцевом полу
        refl = np.exp(-((u - cx) / 0.18) ** 2) * np.exp(-(np.clip(v - floor, 0, None) / 0.18)) * (v > floor)
        light += 0.06 * blur(refl.astype(np.float32), W * 0.02)
        light += 0.12 * np.exp(-((v - floor) * H / (H * 0.004)) ** 2) * np.exp(-((u - cx) / 0.5) ** 2)

    if kind == "soft":
        # мягкий тёплый свет сбоку, как в салоне
        light = light * 0.5 + 0.35 * np.exp(-(((u - cx - 0.25) / 0.35) ** 2 + ((v - 0.3) / 0.35) ** 2))

    if kind == "drops":
        # капли воды на покрытии: мелкие яркие точки с мягким ореолом
        m = np.zeros((H, W), np.float32)
        n = int(W * H / 2600)
        px = rng.integers(0, W, n); py = rng.integers(0, H, n)
        mask = np.exp(-((px / W - cx) / 0.45) ** 2) * np.exp(-((py / H - hy) / 0.3) ** 2)
        keep = rng.random(n) < mask
        m[py[keep], px[keep]] = rng.uniform(0.6, 1.0, keep.sum())
        light += 0.7 * blur(m, 1.6) * 8 + 0.2 * blur(m, 6) * 30

    if kind == "dull":
        # тусклый лак: свет рассеян, по кузову разводы и пятна
        light = blur(light, H * 0.03) * 0.8
        blot = blur(rng.random((H, W)).astype(np.float32), H * 0.02)
        light *= 0.75 + 0.5 * (blot - blot.mean()) / (blot.std() + 1e-6) * 0.25
        base = base + 0.012

    if kind == "gate":
        # вход в бокс вечером: светящийся проём ворот и отражение на мокром асфальте
        gx0, gx1, gy0, gy1 = cx - 0.2, cx + 0.2, 0.28, floor
        door = ((u > gx0) & (u < gx1) & (v > gy0) & (v < gy1)).astype(np.float32)
        fall = 0.35 + 0.65 * np.clip((v - gy0) / (gy1 - gy0), 0, 1) ** 1.5
        light += 0.42 * blur(door, H * 0.004) * fall + 0.22 * blur(door, H * 0.06)
        # внутри проёма свет мягко гаснет к краям, как в глубине бокса
        light *= 1 - 0.35 * door * np.clip(np.abs(u - cx) / 0.2, 0, 1) ** 2
        for k in (-0.34, 0.34):
            lamp = np.exp(-(((u - cx - k) / 0.012) ** 2 + ((v - 0.2) / 0.012) ** 2))
            light += 0.9 * lamp + 0.2 * blur(lamp.astype(np.float32), H * 0.05) * 30
        refl = np.exp(-((u - cx) / 0.16) ** 2) * np.exp(-((v - floor) / 0.14)) * (v > floor)
        light += 0.22 * blur(refl.astype(np.float32), W * 0.01)

    # виньетка
    vig = 1 - 0.55 * (((u - 0.5) * 1.3) ** 2 + ((v - 0.5) * 1.1) ** 2)
    lum = np.clip((base + light) * np.clip(vig, 0.25, 1), 0, None)
    lum = 1 - np.exp(-lum * 1.35)  # мягкое плечо, как у плёнки

    t = np.array(tint, np.float32)
    rgb = lum[..., None] * (0.55 * t + 0.45 * np.array(WHITE)) * np.clip(lum[..., None] * 1.2 + 0.3, 0, 1)
    rgb += (base[..., None] if np.ndim(base) else base) * np.array([1.0, 0.98, 0.94]) * 0.4
    img = Image.fromarray(np.clip(rgb * 255, 0, 255).astype(np.uint8)).resize((w, h), Image.LANCZOS)

    # зерно на полном размере
    a = np.asarray(img, np.float32)
    a += np.random.default_rng(seed + 100).normal(0, 2.2, (h, w, 1))
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


if __name__ == "__main__":
    for it in ITEMS:
        im = scene(*it[1:])
        p = os.path.join(OUT, it[0] + ".jpg")
        im.save(p, quality=82, optimize=True, progressive=True)
        print(it[0], f"{it[1]}x{it[2]}", os.path.getsize(p) // 1024, "КБ")
