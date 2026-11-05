"use client";

import { useEffect, useState } from "react";

export type SpineSection = {
  id: string;
  t: number;
};

const SECTION_IDS = [
  "top",
  "highlights",
  "about",
  "public",
  "it",
  "news",
  "knots",
  "contact",
] as const;

/**
 * Measures section anchors inside the spine's layer root.
 * `enabled` skips work on the hidden dual-render layer.
 */
export function useSpineNodes(anchorId: string, enabled = true) {
  const [nodes, setNodes] = useState<SpineSection[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setNodes([]);
      setActiveId(null);
      return;
    }

    const anchor = document.getElementById(anchorId);
    const layer = anchor?.closest("[data-mode-layer]") as HTMLElement | null;
    if (!anchor || !layer) return;

    const findSection = (id: string) =>
      layer.querySelector<HTMLElement>(`[data-sid="${id}"]`);

    const measure = () => {
      const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
      const height = Math.max(layer.offsetHeight, 1);
      const next: SpineSection[] = [];

      for (const id of SECTION_IDS) {
        const el = findSection(id);
        if (!el) continue;
        const mid =
          el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.2 - anchorTop;
        const t = Math.min(0.96, Math.max(0.06, mid / height));
        next.push({ id, t });
      }

      setNodes(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(layer);
    window.addEventListener("resize", measure);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const sid = visible[0]?.target.getAttribute("data-sid");
        if (sid) setActiveId(sid);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );

    for (const id of SECTION_IDS) {
      const el = findSection(id);
      if (el) io.observe(el);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
    // enabled always present (default true) so Fast Refresh never changes deps length
  }, [anchorId, enabled]);

  return { nodes, activeId };
}
