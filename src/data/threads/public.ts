import { impactMetrics } from "@/data/publicActivity";
import type { ThreadProfile } from "@/lib/threads/types";

export const publicThread: ThreadProfile = {
  id: "public",
  label: "Public",
  palette: {
    primary: "#5ee0a0",
    secondary: "#1f9d63",
    accent: "#5ee0a0",
    glow: "rgba(31, 157, 99, 0.35)",
    atmosphere:
      "radial-gradient(ellipse 70% 55% at 78% 35%, rgba(31,157,99,0.28), transparent 55%), radial-gradient(ellipse 45% 40% at 20% 70%, rgba(13,59,42,0.45), transparent 50%)",
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
    eyebrow: "Общественная нить",
    title: "Строю молодёжные проекты и работаю с городской повесткой",
    lead: "Председатель СПК Тимирязевки, помощник депутата МГД на общественных началах.",
    cta: "Написать в Telegram",
  },
  highlights: {
    label: "Фокус",
    heading: "Ключевые направления работы",
    metrics: impactMetrics,
    cards: [
      {
        title: "Председатель студенческого парламентского клуба",
        description: "Календарь мероприятий и межвузовские проекты.",
        stat: "64",
        statLabel: "активиста",
        span: "md:col-span-2 md:row-span-2",
        accent: "from-emerald/25 to-moss/10",
        glow: "rgba(31,157,99,0.45)",
      },
      {
        title: "Городская повестка",
        description: "Помощник депутата МГД на общественных началах.",
        stat: "МГД",
        statLabel: "город",
        span: "md:col-span-1",
        accent: "from-mint/15 to-emerald/5",
        glow: "rgba(94,224,160,0.35)",
      },
      {
        title: "Публичные выступления",
        description: "Открытия форумов и церемоний.",
        stat: "1200+",
        statLabel: "аудитория",
        span: "md:col-span-1",
        accent: "from-forest/40 to-emerald/10",
        glow: "rgba(20,107,69,0.5)",
      },
      {
        title: "Молодёжные сообщества",
        description: "Форумы, круглые столы, образовательные проекты.",
        stat: "18",
        statLabel: "вузов",
        span: "md:col-span-2",
        accent: "from-moss/20 to-forest/20",
        glow: "rgba(94,224,160,0.28)",
      },
    ],
  },
};
