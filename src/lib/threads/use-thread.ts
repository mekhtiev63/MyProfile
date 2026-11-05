"use client";

import { getGhostThread, getThread } from "@/lib/threads/registry";
import { useSiteMode } from "@/lib/site-mode";

export function useThread() {
  const { mode, activeMode, setMode } = useSiteMode();
  return {
    mode,
    activeMode,
    setMode,
    thread: getThread(mode),
    ghost: getGhostThread(mode),
  };
}
