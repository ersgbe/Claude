---
name: motion-react
description: Анимации в React через библиотеку Motion (бывший Framer Motion, импорт из "motion/react"). Использовать при добавлении переходов, жестов, scroll-анимаций, layout-анимаций и анимаций появления/исчезновения элементов.
---

# Motion for React

Официальная документация: https://motion.dev/docs/react

## Установка и импорт
- `npm i motion`, импорт: `import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react"`.
- Не использовать старый пакет `framer-motion`.
- В Next.js App Router компоненты с motion — клиентские (`"use client"`); для серверных страниц можно `import * as motion from "motion/react-client"`.

## Основы
- `<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.4,ease:"easeOut"}} />`
- Жесты: `whileHover`, `whileTap`, `whileFocus`, `whileInView` (+ `viewport={{once:true, amount:.3}}`), `drag`.
- Анимация выхода: оборачивать в `<AnimatePresence>` и задавать `exit`; у элементов списка нужен уникальный `key`.
- Layout-анимации: проп `layout`, общие переходы между элементами через `layoutId`.
- Варианты: `variants` + `staggerChildren` / `delayChildren` для каскадов.
- Scroll: `useScroll` + `useTransform` для параллакса и индикаторов; `useInView` для триггеров.
- Императивно: `useAnimate`.

## Правила качества
- Анимировать `transform` и `opacity`, не `width/height/top/left`.
- Длительность UI-переходов 150–400 мс; пружины (`type:"spring"`) для интерактива.
- Обязательно учитывать `prefers-reduced-motion`: `useReducedMotion()` или `<MotionConfig reducedMotion="user">` на корне.
- Не анимировать всё подряд: движение должно объяснять иерархию и состояние.
- Для больших списков/страниц использовать `LazyMotion` + `domAnimation` для уменьшения бандла.
