# Claude workspace

Это единственный репозиторий для всей работы: проекты, рабочие файлы, скиллы и MCP-конфиги. Все данные берём отсюда.

## Структура
- `projects/<имя>/` — каждый проект в своей папке (сайты деплоятся на Vercel).
- `.claude/skills/` — скиллы: `ui-ux-pro-max`, `shadcn`.
- `.mcp.json` — MCP-серверы: `shadcn`, `vercel`.

## Правила
- Новые проекты, скиллы и MCP создаём только в этом репозитории и коммитим сюда.
- Сайты размещаем на Vercel (Vercel MCP / Vercel Git-интеграция на этот репозиторий; Root Directory = `projects/<имя>`).
- Для UI: сначала скилл `ui-ux-pro-max`, компоненты — shadcn (через shadcn MCP).
- Astryx (Meta design system): официального MCP нет, работает через CLI `@astryxdesign/cli` (`astryx init` пишет гайд в AGENTS.md/CLAUDE.md проекта).
