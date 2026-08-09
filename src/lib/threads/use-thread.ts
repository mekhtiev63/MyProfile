"use client";

import { getGhostThread, getThread } from "@/lib/threads/registry";
import { useSiteMode } from "@/lib/site-mode";

export function useThread() {
  const { mode, setMode } = useSiteMode();
  return {
    mode,
    setMode,
    thread: getThread(mode),
    ghost: getGhostThread(mode),
  };
}
