import { devThread } from "@/data/threads/dev";
import { publicThread } from "@/data/threads/public";
import type { SiteMode } from "@/lib/site-mode";
import type { ThreadProfile } from "@/lib/threads/types";

const threads: Record<SiteMode, ThreadProfile> = {
  public: publicThread,
  dev: devThread,
};

const ghostFor: Record<SiteMode, SiteMode> = {
  public: "dev",
  dev: "public",
};

export function getThread(mode: SiteMode): ThreadProfile {
  return threads[mode];
}

export function getAllThreads(): ThreadProfile[] {
  return [threads.public, threads.dev];
}

export function getGhostThread(mode: SiteMode): ThreadProfile {
  return threads[ghostFor[mode]];
}

export const threadModes = Object.values(threads).map((t) => ({
  id: t.id,
  label: t.label,
}));

export const modeLabels: Record<SiteMode, string> = {
  public: "Общество",
  dev: "Разработка",
};
