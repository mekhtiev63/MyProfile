# Life Threads — снимок ветки и план реализации

> **Ветка:** `cursor/setup-21st-mcp-demo-c322`  
> **Снимок:** коммит `333e834` (2026-08-09)  
> **PR:** https://github.com/mekhtiev63/MyProfile/pull/1

---

## 1. Текущее состояние (baseline)

### Что уже есть

| Слой | Реализация |
|------|------------|
| **Режимы** | `public` / `dev` через `SiteModeProvider` (`src/lib/site-mode.tsx`), URL `?mode=`, localStorage |
| **Переключатель** | `SiteHeader` — две кнопки Public / Dev |
| **Hero** | Текст + `HeroBackdrop` (SVG-линии) + `HeroCanvas` (3D, только desktop) |
| **Фокус** | `HighlightsBento` — метрики с count-up, карточки со свайпом |
| **Контент** | `About`, `PublicActivity` / `ItActivity`, `Contact` |
| **Данные** | `src/data/publicActivity.ts`, `src/data/itActivity.ts` |
| **MCP** | `.cursor/mcp.json` — 21st MCP (опционально для генерации UI) |

### Что работает хорошо

- Разделение Public / Dev по смыслу и данным
- Единая визуальная система (тёмно-зелёная палитра)
- Анимации метрик, адаптив под мобилку

### Чего не хватает для идеи «нитей»

- Режим — это **переключатель текста**, а не **смена живой нити**
- HeroBackdrop и HeroCanvas **не связаны** одной метафорой
- 3D-сцена не меняется при смене режима осмысленно
- Нет третьей сферы (Athlete)
- Нет единого «движка нити» — логика размазана по компонентам

### Зафиксированные артефакты

- Все изменения UI/MCP — в ветке `cursor/setup-21st-mcp-demo-c322`
- Тег снимка: `snapshot/pre-life-threads` (точка отсчёта до рефакторинга под нити)
- Папка `magic-mcp/` — локальный клон для анализа, **не часть продукта**

---

## 2. Видение

Сайт — **один человек, несколько глубоких нитей жизни**.

- **Public** — широкая, разветвлённая нить (люди, события, город)
- **Dev** — точная, пульсирующая нить (системы, нагрузка, код)
- **Athlete** — ритмичная, натянутая нить (дисциплина, тело, цикл)

Переключение режима = **другая нить выходит на первый план**: меняются линия, цвет, динамика и контент. Имя и структура страницы остаются якорем.

---

## 3. Целевая архитектура

```
src/
├── lib/
│   ├── site-mode.tsx          → SiteMode: "public" | "dev" | "athlete"
│   └── threads/
│       ├── types.ts             → ThreadProfile, ThreadMotion, ThreadPalette
│       ├── registry.ts          → getThread(mode), все профили нитей
│       └── use-thread-transition.ts
├── components/
│   ├── thread/
│   │   ├── ThreadCanvas.tsx     → единый canvas/SVG-слой hero
│   │   ├── ThreadPath.tsx       → SVG-путь нити
│   │   ├── ThreadNodes.tsx      → узлы (события, метрики)
│   │   └── ThreadMorph.tsx      → морфинг между профилями
│   ├── Hero.tsx                 → текст + ThreadCanvas
│   └── SiteHeader.tsx           → 3 переключателя режима
└── data/
    ├── threads/
    │   ├── public.ts
    │   ├── dev.ts
    │   └── athlete.ts           → заглушка, потом контент
    ├── publicActivity.ts
    └── itActivity.ts
```

### ThreadProfile (контракт одной нити)

```ts
type ThreadProfile = {
  id: SiteMode;
  label: string;
  palette: { primary; accent; glow; fog };
  path: string;              // SVG d или набор точек для morph
  motion: {
    speed: number;
    pulse: "soft" | "sharp" | "rhythm";
    parallax: number;
  };
  hero: { eyebrow; title; lead; cta };
  highlights: { cards; metrics };
  spine: "publicActivity" | "itActivity" | "athleteActivity";
};
```

Вся mode-логика читает **профиль нити**, а не разрозненные `if (mode === "public")` по компонентам.

---

## 4. Визуальный язык нитей

| Нить | Форма | Цвет | Движение | Узлы на линии |
|------|-------|------|----------|---------------|
| **Public** | Широкая кривая, ответвления | `#5ee0a0`, тёплый emerald | Медленный drift, soft-pulse | Команда 64, 150+, 18 вузов |
| **Dev** | Геометрия, сетка, кольца | mint + `#146b45` | Быстрый pulse, parallax | RPS, %, Kafka/Go |
| **Athlete** | Одна натянутая линия, повтор | контрастный accent | Ритм «вдох–выдох» 1.2s | km, pace, streak |

**Правило:** на экране **одна домinant-нить**. Остальные — едва видимый ghost (10–15% opacity) на фоне, чтобы намекнуть на «переплетение».

---

## 5. План работ по фазам

### Фаза 0 — Подготовка (1 PR)

- [x] Зафиксировать baseline (тег `snapshot/pre-life-threads`)
- [ ] Слить или оставить PR #1 как «demo/MCP»; новая ветка `cursor/life-threads-v1-c322` от main или от snapshot
- [ ] Вынести hero/highlights copy в `data/threads/*.ts`
- [ ] Добавить `docs/LIFE-THREADS-PLAN.md` (этот файл)

### Фаза 1 — Движок нити (MVP морфинга) ✅ в работе

**Цель:** переключатель Public ↔ Dev **визуально** меняет нить в hero.

- [x] `ThreadProfile` + `registry.ts` для public и dev
- [x] `ThreadCanvas` — SVG full-viewport, заменяет `HeroBackdrop` + `HeroCanvas`
- [x] Morph / redraw path при `setMode()` (stroke-draw + thread-morph, `prefers-reduced-motion`)
- [x] Hero-текст из профиля нити
- [x] Highlights читает данные из `ThreadProfile`
- [ ] Удалить legacy `HeroBackdrop.tsx`, `HeroCanvas` (оставлены, не подключены)

**Критерий готовности:** пользователь нажимает Public/Dev — линия, цвет и скорость меняются плавно, текст синхронно.

### Фаза 2 — Нить в контенте

**Цель:** Highlights и метрики — продолжение той же нити, не отдельный блок.

- [ ] `HighlightsBento` читает `cards` / `metrics` из `ThreadProfile`
- [ ] Count-up привязан к «узлам» нити (визуальная линия проходит через карточки)
- [ ] `About` — общий якорь; `Activity` — только spine выбранной нити
- [ ] Переход между секциями: нить ведёт взгляд (scroll-linked, лёгкий parallax)

**Критерий:** скролл ощущается как движение **по одной нити**, а не по списку секций.

### Фаза 3 — Athlete

**Цель:** третья нить с реальным контентом.

- [ ] Расширить `SiteMode`: `"athlete"`
- [ ] Третья кнопка в header (или scroll-segmented control на мобилке)
- [ ] `data/threads/athlete.ts` + `AthleteActivity.tsx`
- [ ] Профиль motion: rhythm pulse
- [ ] Контент от тебя: вид спорта, достижения, метрики, ритм

**Критерий:** три нити равноправны; Athlete не заглушка «скоро».

### Фаза 4 — Переплетение (опционально, v2)

- [ ] На общем экране «Обо мне» — все нити сходятся в одну точку
- [ ] Easter egg: удержание toggle — ghost других нитей
- [ ] Звук (off by default): тихий tick/pulse при смене режима

---

## 6. Технические решения

| Вопрос | Рекомендация |
|--------|--------------|
| SVG vs Canvas vs Three.js | **SVG** для нитей (лёгко, morph, mobile). Three.js — только если нужен объём для Dev |
| Morph путей | `flubber` или ручной crossfade opacity двух path + `stroke-dashoffset` анимация |
| State | Оставить `SiteModeProvider`, добавить `transitioning: boolean` для блокировки double-click |
| SEO | `?mode=public` сохраняется; Athlete → `?mode=athlete` |
| Performance | Одна SVG-нить, `will-change: stroke-dashoffset`, без трёх 3D-сцен |

---

## 7. Что не делать

- Не делать три отдельные landing page — один якорь, три профиля
- Не перегружать биологией («ген») в UI-копирайте — «нить / путь / линия»
- Не добавлять Athlete без контента — лучше скрытый feature flag
- Не дублировать метрики в нескольких секциях (уже убрали в PublicActivity)

---

## 8. Контент, который нужен от тебя

Для Athlete и финальной Public/Dev полировки:

1. **Athlete:** дисциплина, ключевые цифры, период, 3–5 вех timeline
2. **Public:** подтвердить формулировки (председатель СПК и т.д.)
3. **Dev:** актуальные метрики МТС (можно округлённо)
4. **Общее:** одна фраза-якорь, которая **не меняется** между нитями

---

## 9. Следующий шаг (рекомендация)

1. Создать ветку `cursor/life-threads-v1-c322` от текущего snapshot  
2. Реализовать **Фазу 1** — `ThreadProfile` + `ThreadCanvas` + morph Public ↔ Dev  
3. Показать тебе preview; после OK — Фаза 2 и контент Athlete  

---

## 10. Связь с 21st MCP

MCP остаётся **инструментом разработки**, не частью UX для посетителя. Им можно генерировать карточки/секции, но «нить» — **архитектурное решение**, его лучше кодить вручную под твою метафору.
