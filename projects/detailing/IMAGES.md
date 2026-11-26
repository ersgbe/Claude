# Картинки для сайта: detailing

Папка: `projects/detailing/public/images/`. Сейчас там заглушки (тёмная студия и блики света, их делает `scripts/make-placeholders.py`). Новые фото кладутся под теми же именами и размерами. Вёрстку не менять.

## Что сказать ChatGPT / Codex (скопируй целиком)

> Открой репозиторий ersgbe/Claude, папку `projects/detailing`. Прочитай `IMAGES.md`. Сгенерируй все 18 картинок из таблицы по промптам. К каждому промпту добавляй блок «Общий стиль» из этого файла. Сохрани в `projects/detailing/public/images/` под точными именами и размерами из таблицы, формат JPG, до 500 КБ. Работай в ветке `codex/images-detailing`, трогай только эту папку. После работы запусти `python3 projects/detailing/scripts/check-images.py` и пришли результат.

## Общий стиль (добавлять к каждому промпту)
Premium automotive photography in a dark graphite detailing studio. Soft cinematic light from long overhead LED softboxes, warm cream highlights (#ffe0a3) on glossy paint, deep blacks, low-key, high contrast, crisp detail, realistic, shot on a full-frame camera. One consistent color grade across all images: near-black shadows, warm cream highlights, no saturated colors. No text, no logos, no badges, no watermarks, no license plates, no recognizable faces.

## Таблица

| Файл | Где на сайте | Размер, px | Пропорции |
|------|--------------|-----------|-----------|
| hero.jpg | Первый экран, компьютер | 2400×1350 | 16:9 |
| hero-m.jpg | Первый экран, телефон | 1080×1920 | 9:16 |
| service-wash.jpg | Карточка «Мойка и уход» | 1000×1250 | 4:5 |
| service-polish.jpg | Карточка «Полировка кузова» | 1000×1250 | 4:5 |
| service-ceramic.jpg | Карточка «Керамика» | 1000×1250 | 4:5 |
| service-interior.jpg | Карточка «Химчистка салона» | 1000×1250 | 4:5 |
| service-film.jpg | Карточка «Защитная плёнка» | 1000×1250 | 4:5 |
| service-presale.jpg | Карточка «Перед продажей» | 1000×1250 | 4:5 |
| before.jpg | Ползунок «до» | 1600×1000 | 16:10 |
| after.jpg | Ползунок «после» | 1600×1000 | 16:10 |
| work-1.jpg … work-6.jpg | Сетка «Работы», 6 фото | 1000×1250 | 4:5 |
| studio.jpg | Блок «Как добраться» | 1600×1000 | 16:10 |
| og.jpg | Превью ссылки в мессенджерах | 1200×630 | 1.91:1 |

Как кадрируется на сайте:
- hero.jpg: слева и снизу ложится тёмный градиент с заголовком. Машина в правой половине.
- hero-m.jpg: нижние 45% кадра закрыты текстом и формой. Машина в верхней половине.
- Карточки услуг (главная, раздел «Услуги», «Другие услуги»; на странице услуги это же фото крупно справа, а на телефоне сверху в 4:3): снизу на 40% высоты лежит текст на тёмном градиенте. Главный предмет в верхней половине.
- before.jpg и after.jpg: на телефоне кадр обрезается до 5:4 по центру. Машину ставь в центр.
- studio.jpg: на телефоне 4:3 по центру.

## Промпты

### hero.jpg
Black premium sports sedan in a dark detailing studio, low three-quarter front view. The car fills the right 55 percent of the frame; the left 45 percent is dark, empty space for a headline. Long overhead LED strips reflect as clean lines along the polished paint, glossy dark floor with a soft reflection. 16:9.

### hero-m.jpg
Same car and studio as hero.jpg, vertical 9:16. The car sits in the upper half, three-quarter front view, slightly smaller in frame. The lower 45 percent is dark glossy floor with a faint reflection, empty, for text. 9:16.

### service-wash.jpg
Vertical close-up of a dark car hood covered in thick white foam, water droplets running down, a gloved hand with a soft wash mitt in the upper half, cool rim light. Shallow depth of field. 4:5.

### service-polish.jpg
Vertical close-up of a detailer polishing a dark grey car door with a dual-action polisher. The upper half of the panel is a mirror finish reflecting a warm light strip, the lower part still shows fine swirls. 4:5.

### service-ceramic.jpg
Vertical macro of a black car fender with water beading into round droplets on ceramic coating, a gloved hand with a suede applicator in the upper part of the frame, warm cream reflection. 4:5.

### service-interior.jpg
Vertical shot of a clean premium car interior: beige leather front seat and dark dashboard, a detailer in black gloves cleaning the seat with a soft brush, warm soft light, very tidy. 4:5.

### service-film.jpg
Vertical close-up of a detailer applying clear paint protection film on a glossy dark car hood with a squeegee, the film edge visible, cool neutral workshop light. 4:5.

### service-presale.jpg
Vertical shot of a freshly detailed silver crossover in a clean studio, three-quarter front view, spotless paint and wheels, car in the upper two thirds, warm neutral light. 4:5.

### before.jpg
Rear three-quarter view of a dark grey car with dull faded paint, fine swirl scratches and water spots, flat grey light. The car is centered with space around it. Same car, angle, framing and crop as after.jpg. 16:10.

### after.jpg
The exact same dark grey car, same rear three-quarter angle, framing and crop as before.jpg, now with deep mirror-like paint after polishing and ceramic coating, sharp reflections of studio light strips, warm cream accent light. 16:10.

### work-1.jpg
Vertical close-up of a black car door handle and shoulder line with a perfect reflection of a studio light strip. 4:5.

### work-2.jpg
Vertical shot of a clean alloy wheel and front fender of a dark car, glossy paint, soft rim light. 4:5.

### work-3.jpg
Vertical shot of a car roof and rear window with one long warm reflection, dark studio. 4:5.

### work-4.jpg
Vertical shot of a headlight and front bumper of a dark car, water beading on the paint, cool light. 4:5.

### work-5.jpg
Vertical interior detail: steering wheel and dashboard of a clean premium car, soft cream light. 4:5.

### work-6.jpg
Vertical close-up of glossy black paint with fresh water beads after ceramic coating, a long warm amber reflection crossing the panel. 4:5.

### studio.jpg
Entrance to a small modern detailing studio in the evening: a dark building facade with one open garage gate glowing with warm light, a clean car visible inside, wet asphalt reflecting the light, two small wall lamps. No signs, no text. 16:10.

### og.jpg
Wide cinematic shot of a black car in a dark studio with a long warm cream reflection along the body, the car on the right, a large empty dark area on the left. 1200×630.

## Требования
- Один стиль и одна цветокоррекция на всех фото.
- Без текста, водяных знаков, логотипов, номеров и лиц.
- before.jpg и after.jpg: одна машина, один ракурс, один кадр.
- JPG до 500 КБ, имена и размеры строго как в таблице.
- Проверка: `python3 projects/detailing/scripts/check-images.py`. Скрипт также покажет лишние файлы.
