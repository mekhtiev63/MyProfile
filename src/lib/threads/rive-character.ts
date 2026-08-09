import type { SiteMode } from "@/lib/site-mode";

/** Rive asset in /public/rive — replace with your own .riv when ready. */
export const RIVE_CHARACTER_SRC = "/rive/avatar-pack.riv";

/** Maps site modes to artboards inside avatar-pack.riv */
export const RIVE_ARTBOARDS: Record<SiteMode, string> = {
  public: "Avatar 1",
  dev: "Avatar 2",
  athlete: "Avatar 3",
};

export const RIVE_IDLE_ANIMATION = "idle";

export const THREAD_STRAND_LABELS: Record<SiteMode, string> = {
  public: "Public",
  dev: "Dev",
  athlete: "Sport",
};
