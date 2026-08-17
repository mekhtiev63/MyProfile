import { impactMetrics } from "@/data/publicActivity";
import type { ThreadProfile } from "@/lib/threads/types";

export const publicThread: ThreadProfile = {
  id: "public",
  label: "Общество",
  palette: {
    primary: "#0F172A",
    secondary: "#B91C1C",
    accent: "#B91C1C",
    glow: "rgba(15, 23, 42, 0.18)",
    atmosphere:
      "radial-gradient(ellipse 70% 55% at 78% 35%, rgba(15,23,42,0.18), transparent 55%), radial-gradient(ellipse 45% 40% at 20% 70%, rgba(185,28,28,0.12), transparent 50%)",
  },
  paths: {
    main: "M40 480 C140 420 180 300 280 240 C380 180 440 120 560 80",
    secondary: "M60 520 C160 470 220 360 320 310 C420 260 480 200 560 150",
    ghost: "M80 500 Q280 380 420 280 T560 120",
    nodes: [
      { cx: 280, cy: 240 },
      { cx: 420, cy: 180 },
      { cx: 520, cy: 100 },
    ],
  },
  motion: {
    pulse: "soft",
    dashDuration: "5s",
    morphMs: 550,
  },
  hero: {
    eyebrow: "Две линии жизни · общество",
    title: "Строю молодёжные проекты и работаю с городской повесткой",
    lead: "Сейчас главное — СПК, Московская городская Дума и избирательная программа в Госдуму.",
    cta: "Написать в Телеграм",
  },
  highlights: {
    label: "Главное",
    heading: "Ключевые направления работы",
    metrics: impactMetrics,
    cards: [
      {
        title: "Председатель студенческого парламентского клуба",
        description:
          "С командой СПК — выезды в МГД и профильные площадки, диалог с первым замминистра Еленой Фастовой.",
        stat: "64",
        statLabel: "активиста",
        span: "md:col-span-2 md:row-span-2",
        accent: "from-emerald/15 to-moss/5",
        glow: "rgba(15,23,42,0.12)",
      },
      {
        title: "Городская повестка",
        description:
          "Организовал футбольный турнир с ветеранами СВО, МВД и управой — более 90 участников.",
        stat: "90+",
        statLabel: "на турнире",
        span: "md:col-span-1",
        accent: "from-mint/10 to-emerald/5",
        glow: "rgba(185,28,28,0.12)",
      },
      {
        title: "Публичные выступления",
        description: "Открытия форумов и церемоний.",
        stat: "1200+",
        statLabel: "аудитория",
        span: "md:col-span-1",
        accent: "from-forest/20 to-emerald/5",
        glow: "rgba(15,23,42,0.1)",
      },
      {
        title: "Молодёжные сообщества",
        description:
          "Форумы, круглые столы и образовательные выезды на ключевые площадки.",
        stat: "18",
        statLabel: "вузов",
        span: "md:col-span-2",
        accent: "from-moss/10 to-forest/10",
        glow: "rgba(15,23,42,0.08)",
      },
    ],
  },
  spine: {
    path: "M24 0 C36 120 12 240 28 360 S40 520 24 640 S8 780 28 920 S36 980 24 1000",
    metricNodes: [0.22, 0.32, 0.42, 0.52],
  },
  about: {
    anchor: "Люди и смыслы — центр общественной линии",
  },
};
