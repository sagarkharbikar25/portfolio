---
milestone: v2.0 — The Aetherial Systems Observatory
version: 2.0.0
updated: 2026-11-11T12:35:00+05:30
---

# Roadmap

> **Current Phase:** 1 - Foundation, Asset Hygiene & Modular Shell
> **Status:** ready for execution

## Must-Haves (from SPEC)

- [ ] Modular React 18 + Vite 5 codebase (`data/`, `styles/`, `hooks/`, `components/`, `scenes/`)
- [ ] Original Obsidian-Gold-Cyan theme, glassmorphic HUD tokens, and font system
- [ ] Clean, deduplicated `public/` assets + missing `og-image.png` and `favicon.svg`
- [ ] 5-Act Techfest-inspired Scrollytelling Engine (`Threshold → Skyline → Aether Wipe → 3D Observatory → Dossiers`)
- [ ] HUD navigation (top chamfered bar, auto-closing popout drawers, mobile 5-tab dock) with zero clipping
- [ ] Full Act V recruiter proof + unified ERP case study + semantic footer
- [ ] Cross-browser fallback, `prefers-reduced-motion` safety, and verified >= 90 Lighthouse scores

---

## Phases

### Phase 1: Foundation, Asset Hygiene & Modular Shell
**Status:** 🔄 Planned (Ready for `/execute 1`)
**Objective:** Untangle the monolithic `src/App.jsx` and `src/index.css` into typed/structured data and style modules, establish the Techfest-inspired Obsidian-Gold-Cyan design system and typography, purge ~6.8 MB of orphaned/duplicate assets, add missing OG/favicon files, and establish baseline Vite build + verification tooling.
**Requirements:** REQ-01, REQ-02, REQ-03, REQ-04, NFR-04

**Plans:**
- [ ] Plan 1.1: Design tokens, typography & CSS module system
- [ ] Plan 1.2: Data layer extraction & verification contracts
- [ ] Plan 1.3: Asset hygiene, scriptable brand assets & case study sync
- [ ] Plan 1.4: Custom hooks, scene scaffolds & core navigation shell
- [ ] Plan 1.5: Recruiter proof dossier components & orchestrator build

---

### Phase 2: Cinematic Storyline Engine & 3D Observatory
**Status:** ⬜ Not Started
**Objective:** Build the pinned `100vh` multi-act scrollytelling engine (Act I Threshold radial-blur reveal, Act II mouse-tracked 2.5D layered horizon world with original cyber-arcane artwork, Act III CSS 3D atmospheric mist wipe, Act IV lazy-loaded WebGL 3D Observatory dome with particle system and 3 HUD-safe chamfered pillars), complete with Prologue skip control, `"Jump to Proof"` escape hatch, cross-browser fallbacks, and strict `prefers-reduced-motion` handling.
**Depends on:** Phase 1
**Requirements:** REQ-05, REQ-06, REQ-07, NFR-01, NFR-02, NFR-03

**Plans:**
- [ ] Plan 2.1: Scroll-progress rig (`ScrollTimeline` + `IntersectionObserver`/rAF fallback) & Prologue / Act I Threshold
- [ ] Plan 2.2: Act II 2.5D mouse-parallax skyline artwork & Act III 3D mist wipe transition
- [ ] Plan 2.3: Act IV WebGL 3D Observatory `<canvas>` + 3 HUD-safe command pillars & reduced-motion audit

---

### Phase 3: Fixed HUD Navigation, Proof Dossiers & Case Study Sync
**Status:** ⬜ Not Started
**Objective:** Implement the fixed Techfest-inspired HUD navigation shell (top chamfered dock, left chapter rail with auto-closing popout drawers, right social rail, live scroll-spy, and mobile 5-tab bottom bar), connect Act V Engineering Dossiers (`#experience`, `#projects`, `#architecture` with per-tab verification traces, `#skills`, `#credentials`, `#contact`, and semantic `<footer>`), and restyle `public/case-studies/document-portal.html` to share the Observatory visual language.
**Depends on:** Phase 2
**Requirements:** REQ-08, REQ-09, REQ-10, NFR-03

**Plans:**
- [ ] Plan 3.1: Fixed HUD shell, auto-closing popout drawers, scroll-spy & responsive 5-tab mobile dock
- [ ] Plan 3.2: Act V Dossiers (`Experience`, `Projects`, per-tab `Architecture Console`, `Skills`, `Credentials`, `Contact`, `Footer`)
- [ ] Plan 3.3: Sync `/case-studies/document-portal.html` design system & deep-link routing

---

### Phase 4: Performance, Accessibility, SEO & Live Verification
**Status:** ⬜ Not Started
**Objective:** Optimize asset payloads (`.webp`/`.avif` + lazy WebGL loading), enforce WCAG AA contrast and full keyboard navigation, finalize SEO/OG metadata and GitHub Actions CI checks, and capture empirical Chrome DevTools verification (desktop `1920x960` + mobile `390x844` screenshots, zero console/404 errors, Lighthouse audit >= 90).
**Depends on:** Phase 3
**Requirements:** REQ-11, NFR-01, NFR-02, NFR-03, NFR-04, NFR-05

**Plans:**
- [ ] Plan 4.1: Bundle/image/WebGL performance tuning, accessibility (`prefers-reduced-motion` & keyboard) & CI checks
- [ ] Plan 4.2: Empirical Chrome DevTools desktop/mobile visual verification, Lighthouse audit & `README.md` sync

---

## Progress Summary

| Phase | Status | Plans | Complete |
|---|---|---|---|
| 1 | 🔄 | 0/5 | — |
| 2 | ⬜ | 0/3 | — |
| 3 | ⬜ | 0/3 | — |
| 4 | ⬜ | 0/2 | — |

---

## Timeline

| Phase | Started | Completed | Duration |
|---|---|---|---|
| 1 | 2026-11-11 | — | — |
| 2 | — | — | — |
| 3 | — | — | — |
| 4 | — | — | — |

---

*Last updated: 2026-11-11*

