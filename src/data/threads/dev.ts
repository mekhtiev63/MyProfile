import { itMetrics } from "@/data/itActivity";
import type { ThreadProfile } from "@/lib/threads/types";

export const devThread: ThreadProfile = {
  id: "dev",
  label: "Dev",
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
    eyebrow: "Dev-нить",
    title: "Golang-разработчик платформы инцидентов в МТС",
    lead: "Микросервисы, высокая нагрузка, автоматизация поддержки: Go, Kafka, PostgreSQL, gRPC.",
    cta: "Написать в Telegram",
  },
  highlights: {
    label: "Stack & impact",
    heading: "Что строю на backend",
    metrics: itMetrics,
    cards: [
      {
        title: "Incident automation",
        description: "Классификация, маршрутизация и SLA для линий поддержки.",
        stat: "~30%",
        statLabel: "быстрее",
        span: "md:col-span-2 md:row-span-2",
        accent: "from-emerald/25 to-moss/10",
        glow: "rgba(31,157,99,0.45)",
      },
      {
        title: "High-load backend",
        description: "Массовые инциденты и пиковые нагрузки.",
        stat: "800",
        statLabel: "evt/min",
        span: "md:col-span-1",
        accent: "from-mint/15 to-emerald/5",
        glow: "rgba(94,224,160,0.35)",
      },
      {
        title: "Go + event-driven",
        description: "Kafka, PostgreSQL, gRPC, Redis.",
        stat: "+70%",
        statLabel: "perf",
        span: "md:col-span-1",
        accent: "from-forest/40 to-emerald/10",
        glow: "rgba(20,107,69,0.5)",
      },
      {
        title: "Production ownership",
        description: "Рефакторинг, LLM-сервисы, prod-инциденты.",
        stat: "600k",
        statLabel: "evt/mo",
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
    anchor: "Системы и надёжность — центр dev-нити",
  },
};
