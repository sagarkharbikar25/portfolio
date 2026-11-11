---
milestone: v2.0 — The Aetherial Systems Observatory
updated: 2026-11-11T12:35:00+05:30
---

# Requirements

## Overview

Requirements derived from `.gsd/SPEC.md` for full traceability across Phases 1–4.

---

## Functional Requirements

| ID | Requirement | Source | Phase | Status |
|---|---|---|---|---|
| REQ-01 | Modularize monolithic `src/App.jsx` and `src/index.css` into `src/data/`, `src/styles/`, `src/hooks/`, `src/components/`, and `src/scenes/` | SPEC Goal 3 | 1 | Pending |
| REQ-02 | Establish Obsidian-Gold-Cyan design tokens (`#0a0a0c`, `#ffd700`, `#6fc4f2`, glassmorphic HUD) and typography (`Space Grotesk`, `Cinzel`, `JetBrains Mono`) | SPEC Goal 1, 3 | 1 | Pending |
| REQ-03 | Clean ~6.8 MB unused/duplicate public assets (`avatar/`, duplicate resume PDFs, duplicate `CNAME`, unused ERP screenshots), optimize active images, and add missing `og-image.png` + `favicon.svg` | SPEC Goal 3 | 1 | Pending |
| REQ-04 | Fix broken navbar selector mismatch (`.nav-civic-root` vs `.navbar`) and replace generic GitHub URLs / inconsistent metadata | SPEC Goal 3 | 1 | Pending |
| REQ-05 | Build pinned `100vh` 5-Act Scrollytelling Engine with unified scroll-progress driver (`Scroll-Driven Animations` + `IntersectionObserver`/rAF fallback) and skippable Prologue | SPEC Goal 1 | 2 | Pending |
| REQ-06 | Implement Act I (Radial blur threshold + Hero crest + `"Skip to Proof"` escape hatch) and Act II (Mouse-tracked 2.5D layered horizon world with original architectural artwork) | SPEC Goal 1, 2 | 2 | Pending |
| REQ-07 | Implement Act III (CSS 3D `perspective(800px)` atmospheric mist wipe) and Act IV (WebGL 3D Observatory Dome `<canvas>` + ambient particles + 3 HUD-safe chamfered pillars) | SPEC Goal 1 | 2 | Pending |
| REQ-08 | Implement fixed Techfest-inspired HUD shell: top chamfered bar, left chapter rail with auto-closing popout drawers, right social rail, scroll-spy chapter indicator, and mobile 5-tab bottom bar | SPEC Goal 2 | 3 | Pending |
| REQ-09 | Implement Act V Engineering Dossiers (`#experience`, `#projects`, `#architecture` with per-tab verification traces, `#skills`, `#credentials`, `#contact`, and semantic `<footer>`) | SPEC Goal 2 | 3 | Pending |
| REQ-10 | Restyle and link `public/case-studies/document-portal.html` to match the Obsidian-Gold-Cyan theme and Space Grotesk / JetBrains Mono typography | SPEC Goal 3 | 3 | Pending |
| REQ-11 | Configure GitHub Actions CI (`.github/workflows/checks.yml`) for build, link/HTML validation, and bundle checks | SPEC Goal 4 | 4 | Pending |

---

## Non-Functional Requirements

| ID | Requirement | Category | Phase | Status |
|---|---|---|---|---|
| NFR-01 | Smooth 60fps compositor-only (`transform`, `opacity`) scroll animations and lazy-loaded WebGL canvas with static fallback | Performance | 2, 4 | Pending |
| NFR-02 | Full `@media (prefers-reduced-motion: reduce)` support disabling pinned/continuous animations while keeping all content legible | Accessibility | 2, 4 | Pending |
| NFR-03 | Desktop (`1920x960`) and mobile (`390x844`) responsive layouts with zero HUD/card clipping or overlapping floating controls | UX / Responsive | 2, 3, 4 | Pending |
| NFR-04 | WCAG AA contrast (`>= 4.5:1`) on all body/HUD copy and keyboard focus management (`Tab`, `Escape`) | Accessibility | 1, 4 | Pending |
| NFR-05 | Lighthouse >= 90 across Performance, Accessibility, Best Practices, and SEO; zero console/404 errors | Quality | 4 | Pending |

---

## Constraints

| ID | Constraint | Source | Impact |
|---|---|---|---|
| CON-01 | Static React 18 + Vite 5 deployed on GitHub Pages (`sagardev.me`) | SPEC | No SSR, API server, or Next.js migration |
| CON-02 | Zero copyrighted Techfest artwork, videos, or brand text | SPEC | Original SVG/WebP parallax layers & custom WebGL geometry required |
| CON-03 | Only verified Sagar Kharbikar career/project data; keep phone off public HTML | SPEC | `src/data/` strictly sourced from verified resume & current app |
| CON-04 | Dual PowerShell/Bash compatibility and GSD planning lock discipline | `PROJECT_RULES.md` | Plans verified before any `src/` execution |

---

*Last updated: 2026-11-11*

