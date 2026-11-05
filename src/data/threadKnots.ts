import type { SiteMode } from "@/lib/site-mode";

export type ThreadKnot = {
  id: string;
  title: string;
  description: string;
  modes: SiteMode[];
  tag: string;
};

export const threadKnots: ThreadKnot[] = [
  {
    id: "mts-timiryazev",
    title: "МТС и Тимирязевка в одном дне",
    description: "Днём сервисы, вечером учёба и СПК.",
    modes: ["dev", "public"],
    tag: "МТС × учёба",
  },
  {
    id: "spk-mgd-gd",
    title: "СПК, МГД и кампания в ГД",
    description: "Клуб, помощник депутата и штабы Шелкового и Гусева в 2026.",
    modes: ["public"],
    tag: "СПК / МГД / ГД",
  },
  {
    id: "spk-visits",
    title: "Выезды и диалоги СПК",
    description: "МГД, Сколтех, Минсельхоз, РАН — и диалог с Еленой Фастовой.",
    modes: ["public"],
    tag: "СПК",
  },
  {
    id: "tournament",
    title: "Футбольный турнир при депутате",
    description: "Ветераны СВО, МВД, управа — больше 90 участников.",
    modes: ["public"],
    tag: "Турнир",
  },
];
