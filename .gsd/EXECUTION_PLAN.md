# Phase-Wise Execution Plan — `sagardev.me` ("The Observatory")

> **Source Spec:** [`plan/plan.md`](file:///d:/GitHub/portfolio/plan/plan.md) · **Methodology:** GSD (`Wave-DAG + PLAN.md`) + **Ponytail (`full`)**  
> **Safety Rule:** Local edits & local testing only — **no `git merge`, no `git push`, no live deploy** without explicit approval.

---

## 1. Live Codebase Audit vs `plan/plan.md` (Ponytail Reuse & Purge)

Before executing Phase 0, this delta audit prevents rewriting ~60% of the work that already exists and passes `npm run build` in `d:\GitHub\portfolio`:

| Area | Already Working in `d:\GitHub\portfolio` (Reuse) | Dead Weight to Delete (Ponytail Purge) | Actual Delta to Build |
|---|---|---|---|
| **Build & Deploy** | `package.json` (React `18.3.1`, Vite `5.4.11`, Tailwind `3.4.19`, GSAP `3.15.1`, Lenis `1.3.27`, Three `0.187.0`), `vite.config.js` (`base: '/'`, `manualChunks`), `public/CNAME` (`sagardev.me`), `.github/workflows/{checks,deploy}.yml`, `public/favicon.svg` | Unused duplicate `public/resume/Sagar_Kharbikar_Resume.pdf`, `public/assets/resume/README.md`, `public/avatar/*` (`~4.23 MB`), 7 unused PNGs in `public/Digital Doc Service Portal/` (`~2.6 MB`, keeping `DASHBOARD.png`) | Self-host `.woff2` subsetted fonts (`Space Grotesk`, `JetBrains Mono`, `Cinzel`), `.webp` project images, `og-image.png`, `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema |
| **Tokens & Styles** | `src/styles/cyber.css` (`6.23 KB` gzip built CSS), `tailwind.config.js` | **7 unimported dead stylesheets** (`src/index.css` `41.3 KB`, `src/styles/{base,hud,odyssey,responsive,sections,tokens}.css`) | Unify `:root` tokens (`--ice: #6fc4f2`, `--gold-2: #ffaa00`, `--glass-strong`, `--hairline`, `--hairline-hot`, semantic `--text*`), enforce color ratio (cyan = info, gold = CTA/frames, violet <= 5%), dark-only `scroll-padding-top: 84px`, add concise `src/styles/stage.css` |
| **Data Modules** | `src/data/{profile,experience,projects,architecture,skills,credentials}.js` (100% authentic metrics & systems) | Stale `STORY_ACTS` / `OBSERVATORY_PILLARS` in `profile.js` once `ScrollStage` lands | Update `profile.js` (`CHAPTERS` `CH.00–CH.03`, chosen tagline) & `projects.js` (`outcomeLead` first, Cyber Hunt post-mortem details, `saar-ai` labeled `STATUS: IN DEVELOPMENT`) |
| **HUD & Preloader** | `CustomPreloader.jsx` (0–100%, cipher scramble, `Escape`/Skip, GSAP clipPath wipe), `HudShell.jsx` (`.hud-trapezoid`, `BOOT`, `RESUME.PDF`, `SYS_ONLINE`, rails, mobile dock), `SocialIcons.jsx` | Light-mode leftovers if any | Preloader `1.2s` ceiling + `sessionStorage` repeat-visit skip + reduced-motion bypass; `FAST_VIEW` toggle (`?ref=resume` + persisted); `.nav-divider` `2×26px` spring (`scaleY(0→1)`); `CH.00–CH.03`; outside-click + hash-change drawer close; safe-area bottom dock padding |
| **Hero & Scroll Stage** | `src/App.jsx` Lenis + `gsap.ticker` sync; `HeroCanvas.jsx` procedural icosahedron + inner core + torus rings + IO/visibility pause + `.dispose()` | `src/components/HeroSection.jsx` & `src/scenes/PinnedShowcase.jsx` (competing pinned system flagged in `plan/plan.md` §0) | Single pinned **5-layer `ScrollStage.jsx`** (`500vh` / `350vh` / `220vh` <=480px) with `Starfield2D.js`, `usePointerLerp.js`, `ApertureReveal`, `FogCurtain`, real-DOM title `rotateX(70)` fly-back, Telemetry count-up, `InstrumentCard.jsx` curved flight clamped `>= 115px` below navbar |
| **3D Core (Lazy)** | `HeroCanvas.jsx` geometry & disposal logic (currently `vendor-three` `126.08 KB` gzip loaded eagerly via `HeroSection`) | Static top-level Three import | Refactor into lazy-loaded `ObservatoryCanvas.jsx` (`import()` after first paint -> keeps initial JS `~119 KB` <= `180 KB` gzip budget), named Three imports, camera dolly `z -> 6` + scroll-linked rings, `webglcontextlost` -> `Starfield2D` fallback |
| **Proof Bento & Console** | `BentoSpotlightCard.jsx`, `BentoDossiers.jsx` (`#projects`, `#architecture` 4-tab console + `RUN TEST`, `#experience`, `#skills`, `#credentials`, `#contact`, `<footer>`) | Any generic tag ordering | Lead every project card with `outcomeLead`, Cyber Hunt Post-mortem drawer/panel, SAAR `STATUS: IN DEVELOPMENT` badge, trace assertion polish, explicit image dimensions + `loading="lazy"` |

---

## 2. Ponytail Simplifications Applied to `plan/plan.md` §2.2 Folder Map

To prevent single-use file bloat while honoring every architectural requirement:
1. Keep **2 stylesheets** (`cyber.css` + `stage.css`), not 8 (`tokens.css`, `base.css`, etc.).
2. Keep `.nav-divider` spring divider styling/markup inside `HudShell.jsx` + `cyber.css` rather than a tiny `NavDivider.jsx` file.
3. Keep `<footer>` landmark inside `BentoDossiers.jsx` unless `BentoDossiers.jsx` needs splitting.
4. Use native `gsap.matchMedia()` inside `ScrollStage.jsx` for desktop / tablet / `<=480px` mobile / `prefers-reduced-motion` instead of separate single-use React resize state hooks (`useViewportTier.js`, `useReducedMotion.js`). Keep `usePointerLerp.js` (zero React re-render `--mx/--my` rAF writer) and `Lenis` orchestration directly in `src/App.jsx`.
5. Keep `ApertureReveal` and `FogCurtain` as lean JSX sub-blocks inside `ScrollStage.jsx` + `stage.css`, extracting only standalone engines/reused components (`Starfield2D.js`, `ObservatoryCanvas.jsx`, `InstrumentCard.jsx`).

---

## 3. Dependency DAG & Phase Roadmap (`Phases 0–6`)

```text
Phase 0 (0-1 Foundation & Purge)
   │
   ▼
Phase 1 (1-1 Data Updates) ──► (1-2 HUD, Preloader & FAST_VIEW)
   │                                  │
   │                                  ▼
   │                        Phase 2 (2-1 2D ScrollStage) ──► (2-2 Clamped Cards & App Mount)
   │                                  │                                  │
   ▼                                  ▼                                  ▼
   └──────────────► Phase 4 (4-1 Bento Proof & Console)         Phase 3 (3-1 Lazy 3D Observatory)
                                      │                                  │
                                      └──────────────┬───────────────────┘
                                                     ▼
                                           Phase 5 (5-1 Hardening & Fallbacks)
                                                     │
                                                     ▼
                                           Phase 6 (6-1 Media, SEO/OG & Audit Gate)
```

| Phase | Plan IDs | Plan Path | Focus & Exit Gate |
|---|---|---|---|
| **0. Foundation** | `0-1` | [`.gsd/phases/0-foundation/0-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/0-foundation/0-1-PLAN.md) | Dead CSS & `~7 MB` orphan media purged; Observatory tokens unified; local `.woff2` fonts + CNAME/Vite/Pages CI verified via `npm run build` |
| **1. Data & HUD** | `1-1`, `1-2` | [`1-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/1-hud-shell/1-1-PLAN.md), [`1-2-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/1-hud-shell/1-2-PLAN.md) | `CH.00–CH.03`, chosen tagline, proof-first project leads, `1.2s`/session preloader, `.nav-divider` spring, `FAST_VIEW` toggle, Escape/outside-click/hash drawer close |
| **2. Scroll Stage (2D)** | `2-1`, `2-2` | [`2-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/2-scroll-stage/2-1-PLAN.md), [`2-2-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/2-scroll-stage/2-2-PLAN.md) | 5-layer `ScrollStage` (`500/350/220vh`), `Starfield2D`, aperture blur, fog sweep, SEO title `rotateX(70)`, `InstrumentCard` curved flight clamped `>= 115px`; deletes `HeroSection` + `PinnedShowcase` |
| **3. Observatory 3D** | `3-1` | [`.gsd/phases/3-observatory-3d/3-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/3-observatory-3d/3-1-PLAN.md) | Dynamic `import()` `ObservatoryCanvas` post-first-paint (`<= 180 KB` initial gzip JS), named Three imports, camera dolly `z->6`, `webglcontextlost` fallback, GPU `.dispose()` |
| **4. Bento Proof** | `4-1` | [`.gsd/phases/4-bento-proof/4-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/4-bento-proof/4-1-PLAN.md) | Outcome-first project cards, Cyber Hunt Post-mortem view, SAAR `STATUS: IN DEVELOPMENT`, verified `RUN TEST` traces, copy email + `<footer>` |
| **5. Hardening** | `5-1` | [`.gsd/phases/5-hardening/5-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/5-hardening/5-1-PLAN.md) | `prefers-reduced-motion` full bypass, `390×844` & `1536×770` zero horizontal overflow, Resume <= 2 tab stops, WebGL loss / 2D fallback test |
| **6. Ship Gate** | `6-1` | [`.gsd/phases/6-ship/6-1-PLAN.md`](file:///d:/GitHub/portfolio/.gsd/phases/6-ship/6-1-PLAN.md) | `.webp` project assets + `width`/`height`, `document-portal.html` token sync, `og-image.png`, JSON-LD `Person`, `sitemap.xml`, Chrome DevTools + Lighthouse >= 90 desktop / >= 80 mobile |

---

## 4. Cut Order & Performance Guardrails (`plan/plan.md` §6 & §7)

- **Hard Budgets:** Initial JS before lazy Three `<= 180 KB` gzip (baseline measured `86.13 + 32.53 = 118.66 KB` gzip once Three is dynamic!); LCP `< 2.5s` mobile 4G; CLS `< 0.05`; TBT `< 200ms`; Lighthouse Perf `>= 90` desktop / `>= 80` mobile, Accessibility `>= 95`, SEO `100`.
- **Cut Order (if time runs short):** (1) Fog curtain -> plain crossfade, (2) Preloader boot phases -> simple counter, (3) Left chapter rail, (4) Pixel-grid drawer shimmer, (5) Three.js scene -> 2D canvas core. **Never cut:** `FAST_VIEW`, `prefers-reduced-motion`, authentic project proof, `RESUME.PDF` CTA.

---

## 5. Open Decisions Before Phase 1 Execution (`plan/plan.md` §12)

1. **Tagline choice (§1):**
   - Option A: `"Backend systems, engineered to hold under load."`
   - Option B: `"Architecting the layer you never see."`
   - Option C: `"Production-minded. Backend-first. Full-stack when it counts."` (or custom)
2. **Recruiter `?ref=resume` -> `FAST_VIEW` default:** Yes (recommended) vs always show Observatory cinematic.
3. **Dark-only Obsidian vs keeping light-mode toggle:** Dark-only (recommended, half QA surface) vs dual-theme.

