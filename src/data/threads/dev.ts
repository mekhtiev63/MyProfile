import { itLoadNumbers, itMetrics } from "@/data/itActivity";
import type { ThreadProfile } from "@/lib/threads/types";

export const devThread: ThreadProfile = {
  id: "dev",
  label: "Разработка",
  palette: {
    primary: "#5ee0a0",
    secondary: "#146b45",
    accent: "#94f0c8",
    glow: "rgba(94, 224, 160, 0.28)",
    atmosphere:
      "radial-gradient(ellipse 60% 50% at 75% 40%, rgba(94,224,160,0.16), transparent 50%), radial-gradient(ellipse 40% 35% at 25% 65%, rgba(20,107,69,0.35), transparent 50%)",
  },
  paths: {
    main: "M40 120 L200 120 L280 240 L440 240 L520 400 L560 480",
    secondary: "M80 80 L160 200 L240 200 L320 320 L480 320 L520 440",
    ghost: "M60 160 L180 160 L260 280 L400 280 L480 420",
    nodes: [
      { cx: 280, cy: 240 },
      { cx: 440, cy: 240 },
      { cx: 520, cy: 400 },
    ],
  },
  motion: {
    pulse: "sharp",
    dashDuration: "3.2s",
    morphMs: 550,
  },
  hero: {
    eyebrow: "Разработка",
    title: "Backend платформы инцидентов в МТС",
    lead: "Очереди, пики нагрузки и сервисы, которые держат поддержку.",
    cta: "Написать в Телеграм",
  },
  highlights: {
    label: "Работа",
    heading: "Что строю",
    metrics: itMetrics,
    cards: [
      {
        title: "Автоматизация инцидентов",
        description: "Классификация, маршрутизация, сроки для линий поддержки.",
        stat: itLoadNumbers.processingFaster,
        statLabel: "быстрее",
        span: "md:col-span-2 md:row-span-2",
        accent: "from-emerald/25 to-moss/10",
        glow: "rgba(31,157,99,0.45)",
      },
      {
        title: "Высокая нагрузка",
        description: "Пики при массовых авариях: очереди и внутренние API.",
        stat: itLoadNumbers.eventsPerMinutePeakLabel,
        statLabel: "соб./мин · пик",
        span: "md:col-span-1",
        accent: "from-mint/15 to-emerald/5",
        glow: "rgba(94,224,160,0.35)",
      },
      {
        title: "Событийная архитектура",
        description: "Очереди, базы и обмен между сервисами.",
        stat: itLoadNumbers.apiRpsLabel,
        statLabel: "RPS · пик",
        span: "md:col-span-1",
        accent: "from-forest/40 to-emerald/10",
        glow: "rgba(20,107,69,0.5)",
      },
      {
        title: "Промышленная среда",
        description: "Рефакторинг, ML-сервисы, разбор аварий.",
        stat: itLoadNumbers.eventsPerMonthLabel,
        statLabel: "обращений/мес",
        span: "md:col-span-2",
        accent: "from-moss/20 to-forest/20",
        glow: "rgba(94,224,160,0.28)",
      },
    ],
  },
  spine: {
    path: "M24 0 L36 140 L12 280 L36 420 L12 560 L36 700 L12 840 L28 1000",
    metricNodes: [0.22, 0.32, 0.42, 0.52],
  },
  about: {
    anchor: "Сервисы, которые держат пик",
  },
};
