"use client";

import { useEffect, useState } from "react";

export function useScrollSpine(anchorId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const anchor = document.getElementById(anchorId);
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const top = scrollY + rect.top;
      const height = anchor.offsetHeight;

      const start = top - viewport * 0.15;
      const end = top + height - viewport * 0.55;
      const span = Math.max(end - start, 1);
      const next = (scrollY - start) / span;

      setProgress(Math.min(1, Math.max(0, next)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [anchorId]);

  return progress;
}
