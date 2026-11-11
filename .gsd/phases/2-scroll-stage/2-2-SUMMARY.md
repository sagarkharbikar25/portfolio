---
phase: 2
plan: 2
completed_at: 2026-11-11T18:55:00+05:30
status: passed
---

# Plan 2.2 Summary: Clamped InstrumentCard Flight & Stage Integration

## Changes Executed
- [`src/components/InstrumentCard.jsx`](file:///d:/GitHub/portfolio/src/components/InstrumentCard.jsx): Built docked curved-flight card displaying `outcomeLead`, up to 3 stack tags, `STATUS: IN DEVELOPMENT` amber pill for SAAR, and smooth scroll jump to `#project-{id}`.
- [`src/scenes/ScrollStage.jsx`](file:///d:/GitHub/portfolio/src/scenes/ScrollStage.jsx): Wired 4 curved keyframe flights (`p 0.55-0.90`) clamped via live `measureNavClamp()` (`Math.max(115, navBottom + 24)`) + `ScrollTrigger.refreshInit`, `gsap.matchMedia()` for `<=480px` 3-beat / 2x2 docking, and `fastView` / `prefers-reduced-motion` static bypass.
- [`src/App.jsx`](file:///d:/GitHub/portfolio/src/App.jsx): Mounted `<ScrollStage />` and deleted legacy [`HeroSection.jsx`](file:///d:/GitHub/portfolio/src/components/HeroSection.jsx) & [`PinnedShowcase.jsx`](file:///d:/GitHub/portfolio/src/scenes/PinnedShowcase.jsx).

## Verification
- `npm run build` exited `0` with `vendor-three` unbundled (`0.00 KB`) and initial bundle `123.16 KB` gzip (`index` + `vendor-motion`).

