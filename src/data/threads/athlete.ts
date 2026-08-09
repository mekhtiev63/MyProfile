import { athleteMetrics } from "@/data/athleteActivity";
import type { ThreadProfile } from "@/lib/threads/types";

export const athleteThread: ThreadProfile = {
  id: "athlete",
  label: "Sport",
  palette: {
    primary: "#7ef0b8",
    secondary: "#2a9d6a",
    accent: "#b8ffd9",
    glow: "rgba(126, 240, 184, 0.35)",
    atmosphere:
      "radial-gradient(ellipse 65% 50% at 72% 30%, rgba(126,240,184,0.2), transparent 55%), radial-gradient(ellipse 45% 40% at 22% 75%, rgba(42,157,106,0.32), transparent 50%)",
  },
  paths: {
    main: "M300 520 L300 420 L300 320 L300 220 L300 120 L300 60",
    secondary: "M260 480 L340 400 L260 320 L340 240 L260 160 L340 80",
    ghost: "M280 500 L320 400 L280 300 L320 200 L280 100",
    nodes: [
      { cx: 300, cy: 420 },
      { cx: 300, cy: 280 },
      { cx: 300, cy: 140 },
    ],
  },
  motion: {
    pulse: "rhythm",
    dashDuration: "2.4s",
    morphMs: 550,
  },
  hero: {
    eyebrow: "Athlete-нить",
    title: "Держу ритм через футзал, зал и бег",
    lead: "Спорт — отдельная линия дисциплины: тренировки 4× в неделю, командные матчи и восстановление.",
    cta: "Написать в Telegram",
  },
  highlights: {
    label: "Ритм",
    heading: "Спортивный фокус",
    metrics: athleteMetrics,
    cards: [
      {
        title: "Футзал",
        description: "Университетская лига и любительские турниры в Москве.",
        stat: "32",
        statLabel: "матча",
        span: "md:col-span-2 md:row-span-2",
        accent: "from-emerald/25 to-moss/10",
        glow: "rgba(42,157,106,0.45)",
      },
      {
        title: "Силовой зал",
        description: "Кор, ноги, мобильность — база под игру и бег.",
        stat: "2×",
        statLabel: "в неделю",
        span: "md:col-span-1",
        accent: "from-mint/15 to-emerald/5",
        glow: "rgba(126,240,184,0.35)",
      },
      {
        title: "Бег",
        description: "Лёгкие кроссы и интервалы, средний темп ~10 км.",
        stat: "10",
        statLabel: "км",
        span: "md:col-span-1",
        accent: "from-forest/40 to-emerald/10",
        glow: "rgba(42,157,106,0.5)",
      },
      {
        title: "Восстановление",
        description: "Сон, вода, разминка — без этого нить рвётся.",
        stat: "4",
        statLabel: "сна/спорт",
        span: "md:col-span-2",
        accent: "from-moss/20 to-forest/20",
        glow: "rgba(126,240,184,0.28)",
      },
    ],
  },
  spine: {
    path: "M24 0 L24 180 L24 360 L24 540 L24 720 L24 900 L24 1000",
    metricNodes: [0.22, 0.32, 0.42, 0.52],
  },
  about: {
    anchor: "Дисциплина и ритм — центр athlete-нити",
  },
};
