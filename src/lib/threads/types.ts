import type { SiteMode } from "@/lib/site-mode";

export type ThreadPulse = "soft" | "sharp" | "rhythm";

export type ThreadPalette = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  atmosphere: string;
};

export type ThreadPathSet = {
  main: string;
  secondary: string;
  ghost: string;
  nodes: { cx: number; cy: number }[];
};

export type ThreadMotion = {
  pulse: ThreadPulse;
  dashDuration: string;
  morphMs: number;
};

export type ThreadHero = {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
};

export type ThreadHighlightCard = {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  span: string;
  accent: string;
  glow: string;
};

export type ThreadMetric = {
  value: string;
  label: string;
};

export type ThreadHighlights = {
  label: string;
  heading: string;
  cards: ThreadHighlightCard[];
  metrics: ThreadMetric[];
};

export type ThreadProfile = {
  id: SiteMode;
  label: string;
  palette: ThreadPalette;
  paths: ThreadPathSet;
  motion: ThreadMotion;
  hero: ThreadHero;
  highlights: ThreadHighlights;
};
