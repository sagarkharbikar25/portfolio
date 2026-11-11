# DECISIONS.md — Architecture Decision Records

> **Purpose**: Log significant technical and creative decisions and their rationale.

---

## Decisions

## [DECISION-001] Retain React 18 + Vite 5 Build Pipeline

**Date**: 2026-11-11
**Status**: Accepted

### Context
Prior planning docs (`PORTFOLIO_BUILD_PLAN.md` and `plan/plan.md`) targeted vanilla HTML/CSS/JS, whereas commit `023f0fa` already migrated `sagardev.me` to React 18 + Vite 5 with GitHub Actions CI/CD (`.github/workflows/deploy.yml`).

### Decision
Keep React 18 + Vite 5 and modularize `src/` rather than reverting to vanilla HTML files.

### Rationale
React + Vite cleanly supports code-splitting (`React.lazy` for the WebGL Observatory chunk), clean data separation (`src/data/`), and zero-downtime deployment via the existing GitHub Actions workflow.

### Consequences
Requires maintaining clean component boundaries so scroll-driven animations run via CSS/rAF refs rather than triggering React re-renders per scroll frame.

---

## [DECISION-002] Original Cyber-Arcane Assets & Visual System (No Techfest Asset Reuse)

**Date**: 2026-11-11
**Status**: Accepted

### Context
The user requested the storyline, motion, and visual theme reference from IIT Bombay Techfest 2026 (`https://techfest.org/`).

### Decision
Adapt Techfest's **structural choreography and aesthetic tokens** (obsidian canvas, glassmorphic icy-blue HUD panels, arcane gold `#ffd700` + electric cyan `#6fc4f2`, 2.5D mouse parallax, 3D perspective mist wipe, WebGL 3D dome, 3 floating command pillars) using **100% original SVG/WebP/Canvas/WebGL geometry** and Sagar's own media.

### Rationale
Avoids copyright infringement on Techfest's proprietary artwork (`skybg.webm`, `titlethemelogo.webp`, palace PNGs) and aligns the worldbuilding with Sagar's backend/AI systems identity.

---

## [DECISION-003] Obsidian Dark-Only Design System (Deprecate Dual Light-Mode Toggle)

**Date**: 2026-11-11
**Status**: Accepted

### Context
`src/index.css` currently carries 470+ lines of `[data-theme="light"]` overrides, while the Techfest 2026 cyber-arcane observatory aesthetic relies on deep obsidian (`#0a0a0c`), glowing gold/cyan lighting, and WebGL bloom that do not translate cleanly to white backgrounds.

### Decision
Standardize on a single high-contrast Obsidian-Gold-Cyan theme (`>= 4.5:1` WCAG AA text contrast) and remove the light-mode toggle and duplicate CSS overrides.

### Rationale
Eliminates ~25% dead CSS maintenance overhead and preserves visual cohesion across Act I–V and `/case-studies/document-portal.html`.

### Alternatives Considered
Maintaining dual dark/light CSS themes (doubles QA surface across 2.5D/WebGL layers). Can be revisited in Phase 1 if the user explicitly prefers keeping light mode.

---

## [DECISION-004] Hybrid Scroll Architecture + Lazy-Loaded WebGL Observatory

**Date**: 2026-11-11
**Status**: Accepted

### Context
CSS Scroll-Driven Animations (`view-timeline`, `animation-timeline`) provide zero-JS compositor performance in Chrome/Edge/Safari 26+, but Firefox lacks native support, and a WebGL 3D camera needs normalized `[0..1]` scroll progress.

### Decision
Use native CSS Scroll-Driven Animations (`@supports ((animation-timeline: scroll()) and (animation-range: 0% 100%))`) for pure CSS reveal/parallax enhancements where supported, paired with a lightweight passive `rAF` scroll-progress hook + `IntersectionObserver` fallback for cross-browser parity and WebGL camera synchronization (`Three.js` lazy chunk vs pure WebGL2/Canvas2D shader evaluated in Phase 1/2 research).

### Rationale
Follows `modern-web-guidance` best practices (avoids broken `scroll-timeline-polyfill`), keeps scroll handlers off React state (`CSS custom property --scroll-p` + refs), and prevents heavy bundle bloat on initial load.

---

## [DECISION-005] Typography Pairing (Space Grotesk + Cinzel + JetBrains Mono)

**Date**: 2026-11-11
**Status**: Accepted

### Context
Techfest 2026 pairs `SpaceGrotesk` with `Bleeding_Cowboys` (a distressed display font that can reduce readability for technical names).

### Decision
Use `Space Grotesk` for HUD navigation, headings, and body copy, `Cinzel` (or `Instrument Serif`) for arcane chapter titles, and `JetBrains Mono` for code contracts and telemetry.

### Rationale
Preserves the epic sci-fi/arcane contrast of Techfest 2026 while maximizing recruiter legibility on technical specifications and code blocks.

---

*Last updated: 2026-11-11*

