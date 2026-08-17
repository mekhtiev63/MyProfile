#!/usr/bin/env python3
"""Generate favicon.ico and apple-touch-icon.png from site colors (no SVG deps)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

BG = (4, 17, 12)
MINT = (94, 224, 160)
MOSS = (31, 157, 99)


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    r = max(2, size // 5)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=r, fill=BG)

    def pt(x: float, y: float) -> tuple[float, float]:
        return (x * size / 32, y * size / 32)

    main = [
        pt(5, 21),
        pt(9, 11),
        pt(13, 11),
        pt(16, 16),
        pt(19, 21),
        pt(23, 21),
        pt(27, 11),
    ]
    w = max(1, int(size * 2.25 / 32))
    draw.line(main, fill=MINT, width=w, joint="curve")

    sec = [pt(6, 24), pt(11, 19), pt(21, 25), pt(26, 20)]
    w2 = max(1, int(size * 1.5 / 32))
    draw.line(sec, fill=(*MOSS, 217), width=w2, joint="curve")

    cr = max(2, int(size * 2.25 / 32))
    cx, cy = pt(16, 16)
    draw.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=MINT)
    return img


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    APP.mkdir(parents=True, exist_ok=True)

    sizes_ico = [(16, 16), (32, 32), (48, 48)]
    frames = [draw_icon(s).convert("RGBA") for s, _ in sizes_ico]
    ico_path = PUBLIC / "favicon.ico"
    frames[0].save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s, _ in sizes_ico],
        append_images=frames[1:],
    )

    apple = draw_icon(180).convert("RGB")
    apple_path = PUBLIC / "apple-touch-icon.png"
    apple.save(apple_path, format="PNG", optimize=True)

    print(f"Wrote {ico_path.relative_to(ROOT)}")
    print(f"Wrote {apple_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
