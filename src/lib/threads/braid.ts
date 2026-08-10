import type { SiteMode } from "@/lib/site-mode";

/** Единый узел схождения вверху */
export const BRAID_KNOT = { cx: 340, cy: 128 };

/**
 * Две нити к одному узлу + одна общая линия дальше.
 * public — диагональ слева снизу вверх
 * dev — диагональ слева сверху к узлу / справа вниз после узла через unified
 */
export const braidPaths: Record<
  SiteMode,
  {
    d: string;
    nodes: { cx: number; cy: number }[];
  }
> = {
  public: {
    d: "M48 530 C130 410 230 240 340 128",
    nodes: [
      { cx: 120, cy: 420 },
      { cx: 240, cy: 250 },
    ],
  },
  dev: {
    d: "M48 42 C150 70 250 110 340 128",
    nodes: [
      { cx: 120, cy: 55 },
      { cx: 250, cy: 105 },
    ],
  },
};

/** После узла — одна условная общая нить */
export const braidUnifiedPath = "M340 128 C430 95 510 65 585 42";

export const braidCrossings: {
  cx: number;
  cy: number;
  modes: SiteMode[];
}[] = [{ cx: BRAID_KNOT.cx, cy: BRAID_KNOT.cy, modes: ["public", "dev"] }];

export const braidOrder: SiteMode[] = ["public", "dev"];
