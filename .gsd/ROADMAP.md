---
milestone: v2.0 — The Observatory (plan/plan.md Edition)
version: 2.0.0
updated: 2026-11-11T15:45:00+05:30
---

# Roadmap

> **Current Phase:** 0 — Foundation, Token Unification & Dead-Code Purge  
> **Master Blueprint:** [`.gsd/EXECUTION_PLAN.md`](file:///d:/GitHub/portfolio/.gsd/EXECUTION_PLAN.md) (derived from [`plan/plan.md`](file:///d:/GitHub/portfolio/plan/plan.md) + live repo delta audit)  
> **Status:** Planned (awaiting user sign-off on Section 12 open questions + go-ahead to execute)

## Must-Haves (from `plan/plan.md` §10)

- [ ] First screen shows name, role, 1 Resume CTA (`RESUME.PDF`), `FAST_VIEW`, and hits `< 2.5s` LCP mobile 4G (`<= 180 KB` initial JS gzip before lazy Three)
- [ ] Single pinned 5-layer `ScrollStage` (`500vh` desktop / `350vh` tablet / `220vh` mobile) scrubs cleanly without layout shift (`CLS < 0.05`)
- [ ] Docked `InstrumentCard`s never sit under navbar (`restY >= NAV_BOTTOM + 24 >= 115px`)
- [ ] HUD drawers close on `Escape`, outside click, and hash change; `.nav-divider` springs `scaleY(0→1)`
- [ ] Reduced-motion and `FAST_VIEW` (`?ref=resume`) paths fully usable
- [ ] Zero horizontal overflow at `390×844` and `1536×770`
- [ ] Lazy `ObservatoryCanvas` WebGL disposal verified, IO + `visibilitychange` paused, `webglcontextlost` -> `Starfield2D` fallback
- [ ] All 4 projects lead with verified outcome metrics (`SAAR` flagged `STATUS: IN DEVELOPMENT`, Cyber Hunt post-mortem accessible), Console `RUN TEST`, Experience, Skills, Credentials, copyable Email + `<footer>`
- [ ] `.webp` media, self-hosted `.woff2` fonts, `og-image.png`, JSON-LD `Person`, Lighthouse `>= 90` desktop / `>= 80` mobile, A11y `>= 95`, SEO `100`

---

## Phases (`plan/plan.md` §7)

### Phase 0: Foundation, Token Unification & Dead-Code Purge
**Status:** 🔄 Planned  
**Plans:**
- [ ] `0-1`: Purge 7 dead stylesheets + ~7 MB orphan `public/` assets, unify Observatory tokens & strict color ratios in `cyber.css` + `tailwind.config.js`, self-host `.woff2` fonts, verify `CNAME`/Vite/Pages CI ([`0-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/0-foundation/0-1-PLAN.md))

### Phase 1: Chapter Data, Preloader Budget & HUD Chrome
**Status:** ⬜ Not Started (`depends_on: Phase 0`)  
**Plans:**
- [ ] `1-1`: Update `src/data/profile.js` (`CH.00–CH.03`, tagline) & `src/data/projects.js` (`outcomeLead`, SAAR `STATUS: IN DEVELOPMENT`, Cyber Hunt post-mortem metadata) ([`1-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/1-hud-shell/1-1-PLAN.md))
- [ ] `1-2`: Upgrade `CustomPreloader` (`<=1.2s` + `sessionStorage` skip), `HudShell` (`.nav-divider` spring, `CH.00–CH.03`, outside-click/hash close, safe-area dock) & `FAST_VIEW` (`?ref=resume`) in `App.jsx` ([`1-2-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/1-hud-shell/1-2-PLAN.md))

### Phase 2: Core 2D `ScrollStage` Choreography
**Status:** ⬜ Not Started (`depends_on: Phase 1`)  
**Plans:**
- [ ] `2-1`: `usePointerLerp.js`, `Starfield2D.js`, 5-layer `ScrollStage.jsx` + `stage.css` (Aperture blur `p 0→0.20`, SEO title `rotateX(70)`, Fog curtain `p 0.20→0.42`, Telemetry count-up `p 0.40→0.55`) ([`2-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/2-scroll-stage/2-1-PLAN.md))
- [ ] `2-2`: `InstrumentCard.jsx`, curved-path flights (`p 0.55→0.90`) clamped `>= 115px` below measured `NAV_BOTTOM`, `gsap.matchMedia()` mobile/reduced-motion tiers, mount in `App.jsx` & delete `HeroSection.jsx` + `PinnedShowcase.jsx` ([`2-2-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/2-scroll-stage/2-2-PLAN.md))

### Phase 3: Lazy `ObservatoryCanvas` 3D Core
**Status:** ⬜ Not Started (`depends_on: Phase 2`)  
**Plans:**
- [ ] `3-1`: Evolve `HeroCanvas.jsx` into dynamic `import()` `ObservatoryCanvas.jsx` with tree-shaken `three` imports, scroll camera dolly (`z -> 6`), `webglcontextlost` -> `Starfield2D` fallback, static 1-frame reduced motion, full GPU `.dispose()` ([`3-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/3-observatory-3d/3-1-PLAN.md))

### Phase 4: Proof-First Bento Dossiers & Architecture Traces
**Status:** ⬜ Not Started (`depends_on: 1-1, 2-2`)  
**Plans:**
- [ ] `4-1`: Lead `#projects` with `outcomeLead`, Cyber Hunt Post-mortem drawer/section, SAAR `STATUS: IN DEVELOPMENT` badge, Architecture Console `RUN TEST` assertion trace & `<footer>` check ([`4-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/4-bento-proof/4-1-PLAN.md))

### Phase 5: Cross-Device Hardening, Reduced Motion & Fallbacks
**Status:** ⬜ Not Started (`depends_on: Phase 3, Phase 4`)  
**Plans:**
- [ ] `5-1`: Full `prefers-reduced-motion` bypass, `390×844` & `1536×770` overflow audit, `<=480px` blur/fog removal, Resume `<= 2` tab stops, WebGL loss verification ([`5-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/5-hardening/5-1-PLAN.md))

### Phase 6: Media Optimization, SEO/OG & Production Audit Gate
**Status:** ⚠️ Built Locally (DevTools/Lighthouse pending) (`depends_on: Phase 5`)  
**Plans:**
- [ ] `6-1`: `.webp` project images + `width`/`height` + `loading="lazy"`, sync `document-portal.html` tokens, `og-image.png`, JSON-LD `Person`, `sitemap.xml`, DevTools/Lighthouse & budget gate ([`6-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/6-ship/6-1-PLAN.md))

### Phase 7: Big Sticky Stacking Project Cards Deck & Telemetry Separation
**Status:** ✅ Implemented & Built Locally (`depends_on: Phase 6`, ready for user preview on `127.0.0.1:4173`)  
**Plans:**
- [x] `7-1`: Schema `MAX_PROJECTS = 6` + peaking header tones (`projects.js`, `profile.js`), deduplicate small project cards out of `ScrollStage.jsx` & delete `InstrumentCard.jsx` ([`7-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/7-stacking-projects/7-1-PLAN.md))
- [x] `7-2`: Build `ProjectStackDeck.jsx` (big sticky cascading scroll cards with GSAP depth scrub) & accessible `ProjectInspectModal.jsx` pop-out ([`7-2-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/7-stacking-projects/7-2-PLAN.md))
- [x] `7-3`: Separate `#telemetry` in `BentoDossiers.jsx`, wire Stack Deck + Pop-out Modal + clean `CH.00–CH.04` scroll-spy in `App.jsx` & `HudShell.jsx` ([`7-3-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/7-stacking-projects/7-3-PLAN.md))

---

## Progress Summary

| Phase | Status | Plans | Complete |
|---|---|---|---|
| 0. Foundation & Purge | ✅ | 1 | 1/1 |
| 1. Data & HUD Shell | ✅ | 2 | 2/2 |
| 2. Scroll Stage (2D) | ✅ | 2 | 2/2 |
| 3. Observatory 3D | ✅ | 1 | 1/1 |
| 4. Bento & Console | ✅ | 1 | 1/1 |
| 5. Hardening | ⚠️ Code Done (DevTools blocked) | 1 | 1/1 |
| 6. Ship & Audit | ⚠️ Built Locally (DevTools/Lighthouse pending) | 1 | 1/1 |
| 7. Project Stack Deck & Modal | ✅ Implemented Locally | 3 | 3/3 |
