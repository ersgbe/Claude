# Шаблон сайта для детейлинга и автомойки

Страницы: главная, `/uslugi`, `/uslugi/<slug>` (своя страница у каждой услуги из конфига), `/ceny`, `/raboty`, `/kontakty`, 404.

Next.js 16 + Tailwind 4. Все данные клиента в `src/site.config.ts`. Картинки в `public/images/` (список в `IMAGES.md`).

## Как сделать сайт под нового клиента
1. Правь `src/site.config.ts`: название, город, телефон, мессенджеры, адрес, часы, услуги, цены, отзывы, вопросы.
2. Заменить цвет акцента: `--color-accent` в `src/app/globals.css`.
3. Картинки: Codex заменяет заглушки по `IMAGES.md` в ветке `codex/images-detailing`.
4. Заявки в Telegram: в Vercel добавь переменные `TG_BOT_TOKEN` и `TG_CHAT_ID`, а также `NEXT_PUBLIC_SITE_URL` (адрес сайта).
5. Vercel: Root Directory = `projects/detailing`.

Без `TG_BOT_TOKEN` форма работает в демо-режиме: заявка пишется в лог, а не уходит владельцу.
Отзывы и цифры в шаблоне выдуманы. Перед отправкой клиенту замени их настоящими.
