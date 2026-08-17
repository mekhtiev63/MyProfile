# Public Page Overrides

> **PROJECT:** Public Activity
> Rules here override `design-system/public-activity/MASTER.md`.

## Layout

- Pattern: Trust & Authority (mission → proof/stats → featured recognition → path → letters → competencies)
- Max width: 72rem (1152px)
- Swiss grid, generous whitespace, no decorative atmosphere

## Typography

- Keep site fonts Unbounded + Manrope (Cyrillic). Do not switch to Atkinson Hyperlegible — it is Latin-first and would break Russian text.
- Body ≥ 16px. Small labels ≥ 14px. Avoid 10–12px captions.

## Color

- Background `#F8FAFC`, text `#020617`, muted `#334155` (≈7:1 on light)
- Primary navy `#0F172A` for headings and metrics
- Accent `#0369A1` for secondary labels
- Red `#B91C1C` only for «фокус» and result emphasis — never for all numbers, never as a flag stripe
- No neon, glow, green, or tricolor decoration

## Motion

- No GSAP scroll-reveal that hides content before paint
- Respect existing `prefers-reduced-motion` rules
