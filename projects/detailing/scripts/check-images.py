"""Проверяет, что все картинки на месте, нужного размера и не тяжелее 500 КБ."""
import os, sys
from PIL import Image
D = os.path.join(os.path.dirname(__file__), "..", "public", "images")
NEED = {"hero": (2400,1350), "hero-m": (1200,1500), "before": (1600,1000), "after": (1600,1000), "og": (1200,630)}
for n in ("wash","polish","ceramic","interior","film","presale"): NEED["service-"+n] = (1200,900)
for i in range(1,6): NEED[f"work-{i}"] = (1000,1250)
bad = 0
for n,(w,h) in NEED.items():
    p = os.path.join(D, n + ".jpg")
    if not os.path.exists(p): print("НЕТ    ", n); bad += 1; continue
    iw, ih = Image.open(p).size; kb = os.path.getsize(p)//1024
    ok = (iw, ih) == (w, h) and kb <= 500
    if not ok: bad += 1
    print("ok     " if ok else "ОШИБКА ", n, f"{iw}x{ih}", f"{kb} КБ", "" if (iw,ih)==(w,h) else f"нужно {w}x{h}")
print("\nВсё в порядке" if not bad else f"\nПроблем: {bad}")
sys.exit(1 if bad else 0)
