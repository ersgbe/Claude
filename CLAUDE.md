# Claude workspace

Это единственный репозиторий для всей работы: проекты, рабочие файлы, скиллы и MCP-конфиги. Все данные берём отсюда.

## Структура
- `projects/<имя>/` — каждый проект в своей папке (сайты деплоятся на Vercel).
- `.claude/skills/` — скиллы: `ui-ux-pro-max`, `shadcn`, `frontend-design`, `impeccable`, `design-taste-frontend` (Taste), `motion-react`.
- `.mcp.json` — MCP-серверы: `shadcn`, `vercel`.

## Правила
- Новые проекты, скиллы и MCP создаём только в этом репозитории и коммитим сюда.
- Сайты размещаем на Vercel (Vercel MCP / Vercel Git-интеграция на этот репозиторий; Root Directory = `projects/<имя>`).
- Для UI: сначала скилл `ui-ux-pro-max`, компоненты — shadcn (через shadcn MCP).
- Astryx (Meta design system): официального MCP нет, работает через CLI `@astryxdesign/cli` (`astryx init` пишет гайд в AGENTS.md/CLAUDE.md проекта).

## Работа с картинками (Codex)
- Картинки для сайтов генерирует Codex (ChatGPT), не Claude. Инструкции для него в `AGENTS.md`.
- Для каждого сайта Claude кладёт заглушки в `projects/<имя>/public/images/` и пишет `projects/<имя>/IMAGES.md` по шаблону `templates/IMAGES.md`: имя файла, размер, пропорции, готовый промпт.
- Codex пушит картинки в ветку `codex/images-<имя>`. Claude мерджит её в рабочую ветку, проверяет сайт и деплоит на Vercel.
- Пока Codex не прислал картинки, сайт должен нормально выглядеть на заглушках.
