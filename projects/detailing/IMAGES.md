# Картинки для сайта: detailing

Папка: `projects/detailing/public/images/`. Файлы заменяют заглушки с теми же именами и размерами. Вёрстку не менять.

## Что сказать ChatGPT / Codex (скопируй целиком)

> Открой репозиторий ersgbe/Claude, папку `projects/detailing`. Прочитай `IMAGES.md`. Сгенерируй все 16 картинок из таблицы по промптам, добавляя к каждому «Общий стиль» из этого файла. Сохрани в `projects/detailing/public/images/` под точными именами и размерами из таблицы. Работай в ветке `codex/images-detailing`, трогай только эту папку. После работы запусти `python3 projects/detailing/scripts/check-images.py` и пришли результат.

## Общий стиль (добавлять к каждому промпту)
Premium automotive photography, dark graphite studio, soft cinematic light, warm cream accent light (#ffe0a3), deep blacks, high contrast, sharp, realistic, no text, no logos, no watermarks, no license plates, no people faces.

## Таблица

| Файл | Где на сайте | Размер, px | Пропорции |
|------|--------------|-----------|-----------|
| hero.jpg | Первый экран, компьютер | 2400×1350 | 16:9 |
| hero-m.jpg | Первый экран, телефон | 1200×1500 | 4:5 |
| service-wash.jpg | Карточка «Мойка и уход» | 1200×900 | 4:3 |
| service-polish.jpg | Карточка «Полировка кузова» | 1200×900 | 4:3 |
| service-ceramic.jpg | Карточка «Керамика» | 1200×900 | 4:3 |
| service-interior.jpg | Карточка «Химчистка салона» | 1200×900 | 4:3 |
| service-film.jpg | Карточка «Защитная плёнка» | 1200×900 | 4:3 |
| service-presale.jpg | Карточка «Подготовка к продаже» | 1200×900 | 4:3 |
| before.jpg | Ползунок, «до» | 1600×1000 | 16:10 |
| after.jpg | Ползунок, «после» | 1600×1000 | 16:10 |
| work-1.jpg ... work-5.jpg | Лента «Работы» (5 фото) | 1000×1250 | 4:5 |
| og.jpg | Превью ссылки в мессенджерах | 1200×630 | 1.91:1 |

Карточки услуг на сайте обрезаются до 4:5 (портрет) по центру. Главный предмет ставь в центр кадра.

## Промпты

### hero.jpg
Black premium sports sedan in a dark detailing studio, low three-quarter front angle. Car in the right 55 percent of the frame, left 45 percent is dark empty space for a headline. Long soft LED strip lights reflect on perfectly polished paint, glossy wet floor. 16:9.

### hero-m.jpg
Same scene as hero.jpg but vertical 4:5. Car in the upper 55 percent of the frame, centered. The lower 45 percent is dark floor with soft reflection, empty, for text. 4:5.

### service-wash.jpg
Close-up of a dark car hood covered with thick white foam, water droplets, a gloved hand with a soft wash mitt, cool blue rim light. Shallow depth of field. 4:3.

### service-polish.jpg
Detailer polishing a dark grey car door with a rotary polisher. Half of the panel shows swirl scratches, half is a mirror finish reflecting warm studio lights. Close-up. 4:3.

### service-ceramic.jpg
Macro of a black car fender with water beading into round droplets on ceramic coating, a gloved hand with a suede applicator, cream accent light reflection. 4:3.

### service-interior.jpg
Clean luxury car interior with beige leather seats and a dark dashboard, a detailer in black gloves steam-cleaning the seat, soft warm light. Very tidy. 4:3.

### service-film.jpg
Detailer applying transparent paint protection film on a glossy dark car hood with a squeegee, visible film edge, teal-tinted workshop light. 4:3.

### service-presale.jpg
Freshly detailed silver family crossover in a bright clean studio, spotless paint and wheels, warm neutral light, three-quarter front view. 4:3.

### before.jpg
Rear three-quarter view of a dark grey car with dull faded paint, fine swirl scratches and water spots, flat grey daylight. Same car, angle, framing and crop as after.jpg. 16:10.

### after.jpg
The exact same dark grey car, same rear three-quarter angle, framing and crop as before.jpg, now with deep mirror-like paint after polishing and ceramic coating, sharp reflections, subtle cream accent light. 16:10.

### work-1.jpg
Vertical close-up of a black car door handle and shoulder line with perfect reflections of a studio light strip. 4:5.

### work-2.jpg
Vertical shot of an alloy wheel and fender of a dark car, clean, glossy, teal rim light. 4:5.

### work-3.jpg
Vertical shot of a car roof and rear window with a long warm amber reflection, dark studio. 4:5.

### work-4.jpg
Vertical shot of a front bumper and headlight of a dark car with blue-tinted light, water beading on paint. 4:5.

### work-5.jpg
Vertical interior detail: steering wheel and dashboard of a clean luxury car, soft cream light. 4:5.

### og.jpg
Wide cinematic photo of a black car in a dark studio with a long warm cream light reflection along the body, large empty dark area on the left. 1200×630.

## Требования
- Один стиль и одна палитра на всех фото.
- Без текста, водяных знаков, логотипов, номеров и лиц.
- before.jpg и after.jpg: одна машина, один ракурс, один кадр.
- JPG до 500 КБ, названия строго как в таблице.
- Проверка: `python3 projects/detailing/scripts/check-images.py`.
