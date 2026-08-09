import { devThread } from "@/data/threads/dev";
import { publicThread } from "@/data/threads/public";
import type { SiteMode } from "@/lib/site-mode";
import type { ThreadProfile } from "@/lib/threads/types";

const threads: Record<SiteMode, ThreadProfile> = {
  public: publicThread,
  dev: devThread,
};

export function getThread(mode: SiteMode): ThreadProfile {
  return threads[mode];
}

export function getGhostThread(mode: SiteMode): ThreadProfile {
  return threads[mode === "public" ? "dev" : "public"];
}

export const threadModes = Object.values(threads).map((t) => ({
  id: t.id,
  label: t.label,
}));
