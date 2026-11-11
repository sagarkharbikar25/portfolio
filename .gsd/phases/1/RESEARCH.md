---
phase: 1
researched_at: 2026-11-11
discovery_level: 2
---

# Phase 1 Research: Foundation, Asset Hygiene & Modular Shell

## Objective
Resolve all Phase 1 architectural, visual-system, asset-hygiene, and defect questions before planning and executing `Plan 1.1`, `Plan 1.2`, and `Plan 1.3`:
1. Target modular `src/` layout separating `src/App.jsx:1-1211` and `src/index.css:1-2093` with clean mount points for Phase 2's 5-act scrollytelling and lazy-loaded WebGL Observatory.
2. Zero-warning font loading pattern (`Space Grotesk`, `Cinzel`, `JetBrains Mono`) and WCAG AA (`>= 4.5:1`) Obsidian-Gold-Cyan tokens.
3. File-by-file `public/` and root asset purge/retention map (referencing `.gsd/STACK.md:27-39`) plus zero-dependency Windows PowerShell/Node generation of `public/assets/img/og-image.png` (`1200x630`) and `public/favicon.svg`.
4. Exact CSS selector, layout (`overflow-x: clip`), accessibility, and broken/generic link fixes required prior to Phase 2.

## Discovery Level
**Level 2** — Standard architectural & implementation research across codebase audit, WCAG 2.1 contrast calculation (Node), asset inspection (`.NET System.Drawing` + `Get-FileHash`), `vite build` verification, and `modern-web-guidance` retrieval.

---

## Key Decisions

### Decision 1: Modular `src/` Structure & Vite Code-Splitting Mount Points
**Question:** How should `src/App.jsx:1-1211` and `src/index.css:1-2093` be decomposed under `src/` (`data/`, `styles/`, `hooks/`, `components/`, `scenes/`) to support Phase 2 without breaking Vite 5 builds?
**Options Considered:**
1. Keep flat `src/` with extracted JSON files only: leaves 800+ lines of JSX and 2,000 lines of CSS coupled; makes lazy-loading Phase 2 WebGL awkward.
2. Feature-folder architecture (`features/observatory/...`): excessive indirection for a single-page static portfolio.
3. Domain-typed shallow hierarchy (`data/`, `styles/`, `hooks/`, `components/`, `scenes/`): directly mirrors `SPEC.md` Goal 3 and `REQUIREMENTS.md:18` (`REQ-01`), keeps `App.jsx` as a slim `< 120`-line composition shell, and isolates Phase 2 WebGL behind `React.lazy(() => import('../scenes/...'))`.

**Decision:** Adopt the 5-directory shallow hierarchy (`src/data/`, `src/styles/`, `src/hooks/`, `src/components/`, `src/scenes/`), importing ordered CSS modules directly from `src/main.jsx` (avoiding CSS `@import`) and reserving `src/scenes/` for the Phase 2 `StoryStage` + lazy-loaded `ObservatoryCanvas`.
**Confidence:** High (verified baseline `npm run build` compiles ESM + ordered CSS imports into single `dist/assets/index-*.css` and JS chunks cleanly).

### Decision 2: Font Loading Pattern (`Space Grotesk`, `Cinzel`, `JetBrains Mono`)
**Question:** How should the 3 new fonts be loaded in `index.html` without Chrome `<link rel="preload">` console warnings and without layout shift?
**Options Considered:**
1. `<link rel="preload" as="style">` or `<link rel="preload" as="font">` on Google Fonts / secondary weights: triggers Chrome `"was preloaded using link preload but not used within a few seconds"` warnings whenever `Cinzel` or `JetBrains Mono` sits below the fold or unused subsets exist.
2. Self-hosted `@fontsource` npm packages: eliminates third-party DNS (`fonts.googleapis.com`), but adds 3 npm dependencies and ~150–300 KB of `.woff2` files across weights/subsets into `dist/assets/`.
3. Google Fonts CSS2 stylesheet with `<link rel="preconnect">` + `display=swap` + exact used weights + CSS `font-size-adjust: from-font`: zero npm dependencies, zero preload warnings, and keeps `public/case-studies/document-portal.html` aligned via the same CDN hints.

**Decision:** Use **Option 3** (Google Fonts `preconnect` + single `<link rel="stylesheet">` with `display=swap` and verified valid weights, omitting `<link rel="preload">` on Google Fonts URLs) paired with `font-size-adjust: from-font` in `src/styles/base.css` to eliminate swap CLS. (Option 2 `@fontsource` remains an optional Phase 4 offline enhancement if Lighthouse flags 3P font latency.)
**Confidence:** High (verified Google Fonts axis constraints: `Space Grotesk` supports weights `300..700` — requesting `800` or `900` like `Outfit` currently does at `index.html:30` causes HTTP 400).

### Decision 3: Obsidian-Gold-Cyan WCAG AA Token System
**Question:** Which exact Obsidian, Gold, Cyan, and Muted/Dim tokens satisfy `SPEC.md:32-34`, `DECISION-003` (dark-only), and WCAG AA (`>= 4.5:1` text, `>= 3:1` UI boundaries)?
**Options Considered:**
1. Keep existing `--text-dim: #64748b` (`src/index.css:33`) and `#475569` (`src/App.jsx:903`): mathematically fails WCAG AA (`4.16:1` on `#0a0a0c`, `3.85:1` on `#111420`; `#475569` is `2.61:1`).
2. Shift to Obsidian-Gold-Cyan tokens (`--bg-void: #0a0a0c`, `--bg-elevated: #111420`) with calibrated `--text-primary: #dce5f2`, `--text-muted: #9fb0c8`, `--text-dim: #8899b4`, and `3:1`-verified border tokens.

**Decision:** Adopt **Option 2** and deprecate the 477-line `[data-theme="light"]` override block (`src/index.css:45-522`) and theme toggle state (`src/App.jsx:108, 116-123, 232-234`) per `DECISION-003`.
**Confidence:** High (every ratio mathematically computed via Node WCAG 2.1 relative luminance script against `#0a0a0c`, `#111420`, and blended glass `#0d1222`).

### Decision 4: Zero-Dependency Generation of `og-image.png` & `favicon.svg`
**Question:** What scriptable Windows PowerShell/Node method generates a real `1200x630` `/assets/img/og-image.png` and `public/favicon.svg` without heavy npm dependencies (`sharp`, `canvas`, `puppeteer`)?
**Options Considered:**
1. Pure Node `zlib` + CRC32 bitmap rasterizer: cross-platform, zero deps, but poor font rendering unless shipping bitmap glyph tables.
2. Headless Edge/Chrome screenshot of a local HTML/SVG card (`msedge.exe` / `chrome.exe --headless=new --screenshot`): crisp web-font rendering if browser binaries exist, slightly fragile across headless GPU flags.
3. Windows PowerShell `.NET System.Drawing.Bitmap(1200, 630)` + `Graphics` (`SmoothingMode.AntiAlias`, `LinearGradientBrush`) for `public/assets/img/og-image.png`, paired with deterministic UTF-8 SVG generation for `public/favicon.svg` in a committed script `scripts/generate-brand-assets.ps1` (committing the resulting PNG/SVG so Ubuntu CI never executes Windows `.NET` code).

**Decision:** Use **Option 3** (`scripts/generate-brand-assets.ps1` using native Windows `.NET System.Drawing`, with optional Edge/Inkscape SVG-to-PNG refinement if custom display font glyphs are desired in the OG card), committing `public/assets/img/og-image.png` and `public/favicon.svg` directly to git.
**Confidence:** High (empirically verified `Add-Type -AssemblyName System.Drawing` works in PowerShell with native PNG codec support, and `msedge.exe` / `chrome.exe` / `inkscape` are also present locally).

---

## Findings

### 1. Modular `src/` Architecture & Exact Line Mapping (`REQ-01`)

Currently, `src/App.jsx` (`1,211` lines) holds all static data, inline SVG icons, local UI state, and 8 layout sections, while `src/index.css` (`2,093` lines) mixes tokens, 477 lines of light-mode overrides, component styles, and breakpoints (`src/main.jsx:1-10`, `vite.config.js:1-13`).

#### Target Folder Layout
```text
src/
├── main.jsx                       # Mounts <App /> + ordered CSS imports (no CSS @import)
├── App.jsx                        # Slim (<120 line) orchestrator + Phase 2 <StoryStage> boundary
├── data/
│   ├── profile.js                 # Hero copy, satellites, 4 metrics, contact links, footer meta, story chapters
│   ├── experience.js              # 4iBiz + TechAlfa/Schollogma experience entries
│   ├── projects.js                # 4 flagship projects (nullable repoUrl/demoUrl, clean asset paths)
│   ├── architecture.js            # 3 principle cards, CODE_TABS, per-tab verification traces
│   ├── skills.js                  # 4 tiered competency groups
│   └── credentials.js             # 6 achievement/cert/education cards
├── styles/
│   ├── tokens.css                 # Obsidian-Gold-Cyan :root variables + color-scheme: dark
│   ├── base.css                   # Element resets, overflow-x: clip, typography, focus-visible, reduced-motion
│   ├── hud.css                    # Fixed .nav-civic-root, segmented dock, mobile drawer (Phase 3 HUD rails mount)
│   ├── sections.css               # Hero, Experience, Projects, Architecture Console, Skills, Credentials, Contact, Footer
│   ├── odyssey.css                # Phase 2 sticky stage (.odyssey-stage, .odyssey-sticky-viewport) placeholder
│   └── responsive.css             # Breakpoints (<=1040, <=960, <=880, <=768, <=380)
├── hooks/
│   ├── useReducedMotion.js        # matchMedia('(prefers-reduced-motion: reduce)') listener
│   ├── useScrollSpy.js            # IntersectionObserver updating activeSection on manual scroll
│   ├── useEscapeKey.js            # Keyboard Escape handler for drawers/overlays
│   └── useStoryProgress.js        # Phase 2 rAF --scroll-p CSS custom property writer (zero React re-renders)
├── components/
│   ├── icons/
│   │   └── BrandIcons.jsx         # GithubIcon, LinkedinIcon (src/App.jsx:88-105), ObservatoryCrestSvg
│   ├── Navbar.jsx                 # Fixed HUD top bar + Escape-accessible mobile menu (src/App.jsx:163-261)
│   ├── HeroSection.jsx            # #hero + 4 specular metric cards (src/App.jsx:266-398)
│   ├── ExperienceSection.jsx      # #experience (src/App.jsx:403-463)
│   ├── ProjectsSection.jsx        # #projects (src/App.jsx:468-816)
│   ├── ArchitectureSection.jsx    # #architecture + console + per-tab traces (src/App.jsx:821-928)
│   ├── SkillsSection.jsx          # #skills (src/App.jsx:933-1049)
│   ├── CredentialsSection.jsx     # #credentials (src/App.jsx:1054-1120)
│   ├── ContactSection.jsx         # #contact + anti-scraping notice (src/App.jsx:1125-1191)
│   └── Footer.jsx                 # Semantic <footer> (src/App.jsx:1196-1208)
└── scenes/
    ├── StoryStage.jsx             # Phase 1 transparent wrapper rendering HeroSlot; Phase 2 hosts Acts I–IV
    └── ObservatoryStaticFallback.jsx # Accessible non-WebGL crest fallback ready for React.lazy error/reduced-motion boundaries
```

#### Exact CSS & JSX Extraction Map
| Source Range | Target Module | Notes / Cleanup Applied |
|---|---|---|
| `src/App.jsx:9-86` (`CODE_TABS`) + `:832-866` | `src/data/architecture.js` | Add `VERIFICATION_TRACES[tabKey]` and bind `SystemHealth.sh` cleanly |
| `src/App.jsx:88-105` | `src/components/icons/BrandIcons.jsx` | Preserve stroke/viewBox parity; add `aria-hidden="true"` to decorative icons |
| `src/App.jsx:108-152` | `src/App.jsx` + `src/hooks/` | Remove `theme`/`toggleTheme` (`DECISION-003`); replace click-only `activeSection` with `useScrollSpy` |
| `src/App.jsx:163-261` | `src/components/Navbar.jsx` | Add `Credentials` nav link (`ARCHITECTURE.md:115`), `Escape` close, semantic `<button>` elements |
| `src/App.jsx:266-1208` | `src/data/*` + `src/components/*` | Replace 37 inline `style={{...}}` attributes with CSS classes (`modern-web-guidance` `css` rule) |
| `src/index.css:6-43` | `src/styles/tokens.css` | Upgrade to Obsidian-Gold-Cyan WCAG AA tokens + `color-scheme: dark` |
| `src/index.css:45-522` | **Deleted** | Drops 477 lines (~23% of CSS) of `[data-theme="light"]` overrides (`DECISION-003`) |
| `src/index.css:524-632` | `src/styles/base.css` | Replace `overflow-x: hidden` (`:534, :546`) with `overflow-x: clip` so Phase 2 `position: sticky` works |
| `src/index.css:634-817, :1781-1812` | `src/styles/hud.css` | Rename `.navbar` (`:637`) to `.nav-civic-root` |
| `src/index.css:820-1780` | `src/styles/sections.css` | Drop dead `.node-ray-line` (`:1011`), apply `.projects-bento-grid` (`:1232`) |
| `src/index.css:1019-1023, :1818-2093` | `src/styles/responsive.css` | Consolidate all 5 media queries cleanly |

#### Phase 2 Mount Point Readiness & Vite Build Safety
- **Baseline Build Verified:** Running `npm run build` (`vite v5.4.21`) succeeded in `5.12s`, outputting `dist/index.html` (`2.15 kB`), `dist/assets/index-CQ0X26bK.css` (`31.30 kB`, gzip `5.74 kB`), and `dist/assets/index-DaHUVT4E.js` (`198.07 kB`, gzip `59.58 kB`).
- **Sticky Scrollytelling Trap Avoided:** `src/index.css:534, 546` currently sets `overflow-x: hidden` on both `html` and `body`. In CSS, `overflow-x: hidden` forces `overflow-y: auto` internally on `body`, breaking `position: sticky` needed in Phase 2 (`Acts I–IV`). Changing `html`, `body`, and `.portfolio-app-root` to `overflow-x: clip` preserves horizontal clipping while keeping `position: sticky` fully functional (Baseline Widely Available: Chrome 90+, Firefox 81+, Safari 16+).
- **No CSS `@import` Chains:** Importing CSS files directly in `src/main.jsx` (`import './styles/tokens.css'; import './styles/base.css'; ...`) lets Vite concatenate/minify into one asset without sequential network waterfalls (`modern-web-guidance` `performance`).
- **Lazy WebGL Ready:** Keeping `src/scenes/StoryStage.jsx` as the explicit wrapper around `HeroSection` lets Phase 2 swap in `<Suspense><ObservatoryCanvas /></Suspense>` via `React.lazy()` so Rollup automatically code-splits WebGL/Three.js out of the initial `198 kB` bundle without altering `vite.config.js:5-12`.

---

### 2. Typography & WCAG AA Obsidian-Gold-Cyan Token System (`REQ-02`, `NFR-04`)

#### Zero-Warning Font Loading Pattern (`index.html`)
- **Why Preload Warnings Occur:** Using `<link rel="preload" as="style">` on Google Fonts CSS or `<link rel="preload" as="font">` on `.woff2` files whose family/weight is not painted within ~3s of `load` (e.g., `JetBrains Mono` in Act V `#architecture`, or unused unicode ranges/weights, or missing `crossorigin` on font preloads) causes Chrome DevTools `"preloaded using link preload but not used within a few seconds"` console warnings.
- **Google Fonts Axis Constraint:** Currently `index.html:30` requests `Outfit:wght@400..900` and `Plus+Jakarta+Sans:wght@300..800`. `Space Grotesk` on Google Fonts only supports `300..700` — requesting `800` or `900` produces a 400 error.
- **Exact Zero-Warning `index.html` Snippet:**
```html
<meta name="color-scheme" content="dark">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **CSS Fallback Stability (`src/styles/base.css`):** Apply `font-size-adjust: from-font;` on `body`, headings, and `pre, code` (`modern-web-guidance` `visually-stable-font-fallbacks`, Baseline since 2024-07-25) plus clean system stacks:
  - `--font-display: 'Cinzel', Georgia, serif;` (Act chapter titles & arcane display accents; avoid cursive/all-body usage per `typography` guide)
  - `--font-body: 'Space Grotesk', system-ui, -apple-system, sans-serif;` (HUD nav, section titles, cards, prose)
  - `--font-code: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;` (telemetry tags, code console, badges)

#### Node-Verified WCAG AA Contrast Matrix (Obsidian-Gold-Cyan)
All ratios below were computed via WCAG 2.1 relative luminance against the dark Obsidian backgrounds (`#0a0a0c` `--bg-void`, `#111420` `--bg-elevated`, and `#0d1222` representing `rgba(10, 15, 30, 0.78)` glass composited over `#161c2e`):

| Token Name | Hex / Value | On `#0a0a0c` | On `#111420` | On `#0d1222` (Glass) | Role & WCAG Verdict |
|---|---|---|---|---|---|
| `--bg-void` | `#0a0a0c` | — | — | — | Primary document canvas (`SPEC.md:32`) |
| `--bg-elevated` | `#111420` | — | — | — | Elevated panels & card fallback (`SPEC.md:32`) |
| `--bg-glass` | `rgba(10, 15, 30, 0.78)` | — | — | — | HUD dock, popout drawers, observatory pillars |
| `--bg-code` | `#070a12` | — | — | — | Architecture console code viewport |
| `--text-pure` | `#ffffff` | **19.78:1** | **18.34:1** | **18.71:1** | Hero display & card titles (AAA) |
| `--text-primary` | `#dce5f2` | **15.57:1** | **14.44:1** | **14.72:1** | Primary body copy & deliverables (`SPEC.md:32`, AAA) |
| `--text-muted` | `#9fb0c8` | **8.97:1** | **8.31:1** | **8.48:1** | Subtitles, metadata, descriptions (`SPEC.md:32`, AAA) |
| `--text-dim` *(fixed)* | `#8899b4` | **6.84:1** | **6.34:1** | **6.45:1** | Replaces failing `#64748b` (`3.85:1`–`4.16:1`) & `#475569` (`2.42:1`–`2.61:1`) in `src/index.css:33`, `src/App.jsx:903, 907` (AA+) |
| `--gold-primary` | `#ffd700` | **14.10:1** | **13.08:1** | **13.34:1** | Primary crests, awards, active gold icons (AAA) |
| `--gold-warm` | `#ffaa00` | **10.36:1** | **9.61:1** | **9.80:1** | Gradient end-stop & warning/post-mortem accents (AAA) |
| `--text-on-gold` | `#0a0a0c` | — | — | — | Text on `#ffd700` (`14.10:1`) / `#ffaa00` (`10.36:1`) CTA buttons (AAA) |
| `--cyan-electric` | `#6fc4f2` | **10.22:1** | **9.48:1** | **9.67:1** | Telemetry labels, links, active HUD indicators (`SPEC.md:34`, AAA) |
| `--cyan-soft` | `#63b3ed` | **8.67:1** | **8.04:1** | **8.20:1** | Secondary cyan highlights & focus outlines (AAA) |
| `--emerald-live` | `#34d399` | **10.29:1** | **9.54:1** | **9.73:1** | Live internship badge & verification pass text (AAA) |
| `--rose-keyword` | `#fb7185` | **7.35:1** | **6.82:1** | **6.96:1** | Code syntax keyword highlights (AA+) |
| `--border-hud` | `rgba(111, 196, 242, 0.50)` | **~3.35:1** | **3.25:1** | **~3.30:1** | Interactive HUD borders & active controls (passes 3:1 UI non-text contrast) |
| `--border-gold` | `rgba(255, 215, 0, 0.45)` | **~3.60:1** | **3.50:1** | **~3.55:1** | Featured gold CTA / award card boundaries (passes 3:1 UI non-text contrast) |
| `--border-subtle` | `rgba(220, 229, 242, 0.14)` | — | — | — | Purely decorative glass divider (non-interactive hairline) |

*Note on Forced Colors Mode:* Add `@media (forced-colors: active)` fallback rules in `src/styles/base.css` using `CanvasText`, `LinkText`, `Highlight`, and explicit `border: 1px solid ButtonText` on `.nav-segmented-btn`, `.bento-project-card`, and `.specular-metric-card` so Windows High Contrast users do not lose glass borders (`modern-web-guidance` `color`).

---

### 3. Asset Hygiene Audit & Scriptable OG / Favicon Generation (`REQ-03`)

#### Verified Inventory & Disposition (Referencing `.gsd/STACK.md:27-39`)
Total tracked public + root duplicate assets before cleanup: **~8.75 MB** across 19 files (`Get-ChildItem`, `.NET System.Drawing`, `Get-FileHash`).

| Asset Path (Current) | Size & Dimensions / SHA-256 | Action | Target Path & Rationale |
|---|---|---|---|
| `public/avatar/avatar-video.mp4` | `2,488.1 KB` | **PURGE** | Unused legacy video (`PORTFOLIO_BUILD_PLAN.md`; `REQUIREMENTS.md:20`) |
| `public/avatar/avatar.png` | `1,842.3 KB` (`1448x1086`) | **PURGE** *(flag note)* | Currently unreferenced (`REQUIREMENTS.md:20`, `ARCHITECTURE.md:116`). *Caveat:* `SPEC.md:21` mentions `avatar.png / original SVG-WebP layers` for Act II. Purge raw `1.84 MB` PNG from `public/avatar/` in Phase 1 (recoverable from git commit `023f0fa` if Act II later uses a `<120 KB` WebP silhouette). |
| `public/Digital Doc Service Portal/APPLY .png`, `DOWNLOAD.png`, `HELP .png`, `MY APPLICATION.png`, `NOTIFICATION.png`, `PROFILE.png`, `TRACKING .png` | `2,470.7 KB` total (`7` PNGs, `1918x982`–`992`) | **PURGE** | Completely unreferenced; contain spaces and trailing spaces before `.png` (`STACK.md:34`) |
| `public/resume/Sagar_Kharbikar_Resume.pdf` | `115.0 KB` (`6DBA9E178CE8...`) | **PURGE** | Exact SHA-256 duplicate of active resume (`STACK.md:37`) |
| `resume/Sagar_Kharbikar_Resume.pdf` | `115.0 KB` (`6DBA9E178CE8...`) | **PURGE** | Exact SHA-256 duplicate in root (`STACK.md:39`) |
| `public/assets/resume/README.md` | `0.1 KB` | **PURGE** | Unnecessary placeholder copied verbatim into `dist/assets/resume/README.md` |
| `CNAME` (root) | `11 B` (`CA42FA8B...`) | **PURGE** | Ignored by Vite build; `.github/workflows/deploy.yml:45` deploys `./dist` which uses `public/CNAME` |
| `public/CNAME` | `12 B` (`69AE5502...`, `sagardev.me`) | **KEEP** | Copied to `dist/CNAME` for GitHub Pages custom domain (`STACK.md:30`) |
| `public/assets/resume/Sagar_Kharbikar_Resume.pdf` | `115.0 KB` (`6DBA9E178CE8...`) | **KEEP** | Single canonical resume download target (`src/App.jsx:216, 254, 322, 1174`) |
| `public/case-studies/document-portal.html` | `14.1 KB` (317 lines) | **KEEP & FIX LINK** | Phase 1 updates `href="../index.html"` (`:169`) → `href="/"` and favicon link; Phase 3 syncs theme |
| `public/Digital Doc Service Portal/DASHBOARD.png` | `401.1 KB` (`1917x987`) | **MOVE / RENAME** | Move to `public/assets/projects/document-portal-dashboard.png` (eliminates spaces in URL; delete empty `Digital Doc Service Portal/` dir) |
| `public/SAAR/SAAR.png` | `84.1 KB` (`1918x1142`) | **MOVE / RENAME** | Move to `public/assets/projects/saar-assistant.png` (unifies asset folder; delete empty `SAAR/` dir) |
| `public/assets/projects/cyber-hunt.jpg` | `670.1 KB` (`1376x768`) | **KEEP** *(opt. resize)* | Active (`src/App.jsx:653`). Candidate for Phase 4 WebP conversion or `System.Drawing` JPEG 80% pass (`~150–200 KB`) |
| `public/assets/projects/gig-flow.jpg` | `596.3 KB` (`1376x768`) | **KEEP** *(opt. resize)* | Active (`src/App.jsx:569`). Candidate for Phase 4 WebP conversion or `System.Drawing` JPEG 80% pass |
| `public/assets/img/og-image.png` | *Missing* (`index.html:16, 23`) | **CREATE** | Real `1200x630` Obsidian-Gold-Cyan social preview card |
| `public/favicon.svg` | *Missing* (`README.md:78`) | **CREATE** | Lightweight vector brand crest (`< 1 KB`), replacing inline emoji `index.html:26` |

**Net Payload Impact:** Purging ~`6.92 MB` of dead/duplicate media reduces `public/` from `~8.63 MB` to **`~1.71 MB`** immediately (before Phase 4 WebP optimization).

#### Zero-Dependency Generation Script (`scripts/generate-brand-assets.ps1`)
Verified on this Windows environment:
1. **`public/favicon.svg` (< 1 KB):** Pure declarative SVG (`viewBox="0 0 64 64"`) with Obsidian `#0a0a0c` chamfered squircle/hex frame, `#6fc4f2` cyan outer hairline border, and `#ffd700` → `#ffaa00` metallic linear-gradient `SK` geometric glyph. Written directly as UTF-8 from PowerShell or Node with zero deps.
2. **`public/assets/img/og-image.png` (`1200x630`):**
   - **Native Windows PowerShell approach (0 external binaries, 0 npm packages):** Use `[System.Drawing.Bitmap]::new(1200, 630)` + `[System.Drawing.Graphics]` (`SmoothingMode = AntiAlias`, `TextRenderingHint = AntiAliasGridFit`, `LinearGradientBrush`, `GraphicsPath`) to draw:
     - `#0a0a0c` → `#111420` radial/linear gradient backdrop + subtle `#6fc4f2` (10% alpha) orbital arc & gridlines
     - Chamfered `#0f1526` glass card frame with `#ffd700` / `#6fc4f2` accent border
     - Monogram emblem (`SK`), title (`Sagar Kharbikar`), headline (`The Aetherial Systems Observatory`), proof pills (`4iBiz Intern · B.Tech CSE 8.70 CGPA · 1st Prize ERP`), and canonical footer (`sagardev.me · Backend · AI Systems · Architecture`)
     - Save via `$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)`.
   - **Optional Vector-Typography Alternative (same zero-npm-dep footprint):** If exact `Space Grotesk` / `Cinzel` font rendering is desired in the raster OG image, author an HTML/SVG card and screenshot at `--window-size=1200,630` using local `msedge.exe` / `chrome.exe --headless=new --screenshot=...` (verified installed locally). Either way, commit the resulting `public/assets/img/og-image.png` to git so Linux CI (`ubuntu-latest`) never executes generation at build time.

---

### 4. Exact Selector, Accessibility & Broken Link Fixes (`REQ-04`)

#### A. CSS Selector & Layout Audit (Diffed `src/App.jsx` vs `src/index.css`)
Running an AST/regex diff of every class in `src/App.jsx` against `src/index.css` revealed exact mismatches:

1. **Broken Navbar Selector (`src/App.jsx:163` vs `src/index.css:637-650` & `:70-74`):**
   - `src/App.jsx:163` renders `<nav className="nav-civic-root">`.
   - `src/index.css:637-650` defines `position: fixed; top: 0; left: 0; right: 0; height: var(--nav-height); background: ...; backdrop-filter: ...; z-index: 1000; display: flex; align-items: center;` on `.navbar` (which never exists in JSX!).
   - `[data-theme="light"] .nav-civic-root` (`src/index.css:70-74`) only sets light background/border, leaving dark mode `<nav className="nav-civic-root">` unpinned and unstyled in static document flow.
   - **Fix:** Rename `.navbar` (`src/index.css:637`) → `.nav-civic-root` in `src/styles/hud.css` and remove `[data-theme="light"] .nav-civic-root`.

2. **Root Class Missing CSS & `position: sticky` Overflow Trap (`src/App.jsx:155`, `src/index.css:534, 546`):**
   - `portfolio-app-root` (`src/App.jsx:155`) has **zero** CSS rules in `src/index.css`.
   - `html` (`src/index.css:534`) and `body` (`src/index.css:546`) both use `overflow-x: hidden;`, which disables `position: sticky` needed in Phase 2 (`Acts I–IV`).
   - **Fix:** Define `.portfolio-app-root { position: relative; min-height: 100vh; width: 100%; overflow-x: clip; }` and replace `overflow-x: hidden` on `html, body` with `overflow-x: clip`.

3. **Dead CSS Selectors & Missing Class Usage (`src/index.css:1011, 1232`):**
   - `.node-ray-line` (`src/index.css:1011-1017`): unused anywhere in `src/App.jsx` → **Remove**.
   - `.projects-bento-grid` (`src/index.css:1232-1236`): unused because `src/App.jsx:476` uses inline `style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '36px' }}` → **Use `.projects-bento-grid`** in `ProjectsSection.jsx` and remove the inline style.

4. **Keyboard Accessibility & Navigation Gaps (`src/App.jsx`):**
   - `<div className="nav-brand" onClick={() => scrollTo('hero')}>` (`src/App.jsx:167`), `<div className="live-engine-pill" onClick={() => scrollTo('contact')}>` (`src/App.jsx:223-230`), and 3 `<div className="principle-card" onClick={...}>` (`src/App.jsx:832-866`) are clickable `<div>`s unreachable via `Tab` / `Enter` → **Convert to `<button type="button">`**.
   - `<a href="#projects" onClick={() => scrollTo('projects')}>` (`src/App.jsx:318`) lacks `e.preventDefault()`, triggering both native anchor jump and smooth scroll.
   - `#credentials` (`src/App.jsx:1054`) is missing from `.nav-segmented-dock` (`:174-211`) and `.mobile-menu-overlay` (`:247-252`), and `activeSection` (`:109`) lacks scroll-spy → **Add `Credentials` link + `useScrollSpy` hook**.
   - Skip link (`<a href="#main-content" className="skip-link">Skip to main content</a>`) missing before `<nav>` (`modern-web-guidance` `accessibility`).

#### B. Broken, Missing & Generic Links Audit
| Location | Current Target | Issue | Exact Phase 1 Fix |
|---|---|---|---|
| `index.html:16, 23` | `/assets/img/og-image.png` | File does not exist (`404`); root-relative URL breaks OG/Twitter card crawlers | Create `public/assets/img/og-image.png` (`1200x630`) and set `https://sagardev.me/assets/img/og-image.png` |
| `index.html:26` | `data:image/svg+xml,...⚡` | Emoji fallback differs from `README.md:78` (`public/favicon.svg`) | Create `public/favicon.svg` and link `href="/favicon.svg"` |
| `src/App.jsx:483` | `/Digital Doc Service Portal/DASHBOARD.png` | Unencoded spaces in directory path | Move to `/assets/projects/document-portal-dashboard.png` |
| `src/App.jsx:730` | `/SAAR/SAAR.png` | Inconsistent directory casing/nesting | Move to `/assets/projects/saar-assistant.png` |
| `src/App.jsx:628, 636` | `https://github.com/sagarkharbikar25` (Gig Flow `Source Code` & `View Live Demo & Docs`) | Points to profile root instead of project repo/demo; even `PORTFOLIO_BUILD_PLAN.md:79` lists only profile root | Render `repoUrl`/`demoUrl` conditionally in `ProjectsSection.jsx`; set `demoUrl: null` (removes misleading dead "View Live Demo & Docs" button) and point `Source Code` only when Sagar supplies exact slug, or label truthfully `"GitHub Repositories ↗"` (`https://github.com/sagarkharbikar25?tab=repositories`) until verified |
| `src/App.jsx:713` | `https://github.com/sagarkharbikar25` (Cyber Hunt `Source Code & Post-Mortem`) | Points to profile root instead of repo/post-mortem | Same conditional handling (`repoUrl: null` / honest `"Event Architecture on Request"` or verified repo slug from Sagar) |
| `public/case-studies/document-portal.html:169` | `../index.html` | Relative `.html` file path instead of clean canonical `/` | Change to `href="/"` and add `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` |
| `src/App.jsx:1205` | `Last updated: October 2026` | Stale static copy | Update to current milestone/date (`November 2026` or build-time constant) |

---

## Patterns to Follow
- **CSS Layer & Cascade Hygiene:** Import split CSS modules in `src/main.jsx` in strict order (`tokens.css` → `base.css` → `hud.css` → `sections.css` → `odyssey.css` → `responsive.css`); do not use CSS `@import` (`modern-web-guidance` `performance`).
- **Zero-Re-Render Scroll Readiness:** Any scroll progress hook created in `src/hooks/` writes `--scroll-p` via DOM refs (`requestAnimationFrame`), never React `useState`.
- **Semantic Interactive Controls:** All clickable nav brands, pills, drawer toggles, and architecture principle cards use `<button type="button">` or `<a href>` with `:focus-visible` cyan outlines (`NFR-04`).
- **Explicit Image Dimensions:** Set `width` and `height` attributes on every project `<img>` in `ProjectsSection.jsx` (matching measured intrinsic dimensions: `1917x987` for ERP dashboard, `1376x768` for Gig Flow & Cyber Hunt, `1918x1142` for SAAR) to guarantee `0` CLS (`modern-web-guidance` `performance`).

## Anti-Patterns to Avoid
- **Never retain `overflow-x: hidden` on `html`/`body`:** Breaks `position: sticky` for Phase 2's pinned scrollytelling container; always use `overflow-x: clip`.
- **Never preload below-the-fold Google Fonts or fonts without `crossorigin`:** Triggers Chrome preload unused warnings.
- **Never fabricate missing GitHub repo URLs (`gig-flow`, `cyber-hunt`):** Gate links on verified URLs in `src/data/projects.js` (`STATE.md:36`, `CON-03`).
- **Never keep `[data-theme="light"]` overrides when deprecating light mode:** Eliminating lines `45-522` immediately cuts CSS payload and Phase 2–4 QA surface (`DECISION-003`).

## Dependencies Identified
| Package | Version | Purpose |
|---|---|---|
| `react` / `react-dom` | `^18.3.1` (`18.3.1`) | Existing UI runtime (`package.json:13-14`) — **no new production deps needed for Phase 1** |
| `lucide-react` | `^1.16.0` (`1.57.0`) | Existing UI icon library (`package.json:12`) |
| `vite` / `@vitejs/plugin-react` | `^5.4.11` / `^4.3.3` | Existing build toolchain (`package.json:19-20`) |
| `@types/react` / `@types/react-dom` | `^18.3.12` / `^18.3.1` | Unused TS type packages (`package.json:17-18`); safe to keep for IDE IntelliSense or prune in cleanup |

*Note:* `scripts/generate-brand-assets.ps1` uses built-in Windows PowerShell `.NET System.Drawing` (`0` npm dependencies).

## Risks & Unknowns
- **Unverified Public GitHub Repos (`digital-document-portal`, `saar-voice-assistant`):** Network availability of `https://github.com/sagarkharbikar25/digital-document-portal` (`src/App.jsx:546`), `https://github.com/sagarkharbikar25/saar-voice-assistant` (`src/App.jsx:789`), and missing repo/demo slugs for Gig Flow & Cyber Hunt could not be verified offline in this workspace; Sagar must confirm Gig Flow / Cyber Hunt URLs before Phase 4 launch (`STATE.md:36`).
- **`avatar.png` Phase 2 Reuse Ambiguity:** `REQUIREMENTS.md:20` requires purging `public/avatar/`, while `SPEC.md:21` lists `avatar.png / original SVG-WebP layers` as an Act II option. Purging raw `1.84 MB` `public/avatar/avatar.png` in Phase 1 is still safe because commit `023f0fa` preserves it in git history if a compressed WebP silhouette is ever desired in Phase 2.
- **Google Fonts Network Availability & Local Font Fallback in OG Script:** On Linux CI (`ubuntu-latest`), `scripts/generate-brand-assets.ps1` is a local authoring script only — `public/assets/img/og-image.png` must be committed so CI builds never depend on Windows `.NET System.Drawing`.

## Recommendations for Planning (Phase 1 Plans `1.1`–`1.3`)
1. **Plan 1.1 (Design Tokens, Typography & Data Extraction):**
   - Update `index.html` with `<meta name="color-scheme" content="dark">`, zero-warning Google Fonts (`Space Grotesk` `400..700`, `Cinzel` `600;700`, `JetBrains Mono` `400..700`), canonical `https://sagardev.me/assets/img/og-image.png`, and `/favicon.svg`.
   - Create `src/styles/tokens.css`, `base.css` (with `overflow-x: clip`, `font-size-adjust: from-font`, `:focus-visible`, `@media (forced-colors: active)`, `@media (prefers-reduced-motion: reduce)`), `hud.css`, `sections.css`, `odyssey.css`, and `responsive.css` (dropping `[data-theme="light"]` overrides and dead selectors).
   - Extract all verified data into `src/data/` (`profile.js`, `experience.js`, `projects.js`, `architecture.js`, `skills.js`, `credentials.js`) with per-tab verification traces and nullable `repoUrl`/`demoUrl`.
2. **Plan 1.2 (Asset Hygiene, OG/Favicon Generation & Link/Selector Fixes):**
   - Purge `public/avatar/`, 7 unused PNGs in `public/Digital Doc Service Portal/`, duplicate PDFs (`public/resume/`, `resume/`), `public/assets/resume/README.md`, and root `CNAME` (~6.92 MB removed).
   - Move active screenshots to `public/assets/projects/document-portal-dashboard.png` and `public/assets/projects/saar-assistant.png` (removing empty spaces-in-name directories) and update `public/case-studies/document-portal.html` back-link (`href="/"`), favicon, and title font links.
   - Author & execute `scripts/generate-brand-assets.ps1` to generate `public/favicon.svg` and `public/assets/img/og-image.png` (`1200x630`), verifying dimensions and non-zero file size.
3. **Plan 1.3 (Modular Component Shell, Hooks, Scene Mount & Build Verification):**
   - Implement `src/hooks/` (`useReducedMotion.js`, `useScrollSpy.js`, `useEscapeKey.js`, `useStoryProgress.js`), `src/components/` (`Navbar.jsx` fixing `.nav-civic-root` + `Credentials` link + semantic `<button>` controls, `HeroSection.jsx`, `ExperienceSection.jsx`, `ProjectsSection.jsx`, `ArchitectureSection.jsx`, `SkillsSection.jsx`, `CredentialsSection.jsx`, `ContactSection.jsx`, `Footer.jsx`), and `src/scenes/` (`StoryStage.jsx`, `ObservatoryStaticFallback.jsx`).
   - Refactor `src/App.jsx` and `src/main.jsx`, remove legacy `src/index.css`, and empirically verify `npm run build`, `vite preview` + asset HTTP 200 checks (zero 404s, zero console preload/CSS warnings).

---

### Modern Web Guidance Applied
- **`performance`**: Avoided CSS `@import` in `src/styles/` in favor of bundled JS CSS imports in `src/main.jsx` and mandated explicit `width`/`height` on project images (`"DON'T use @import in CSS: This creates sequential request chains"`).
- **`optimize-preload-priority` & `visually-stable-font-fallbacks`**: Omitted `<link rel="preload">` on Google Fonts stylesheets/secondary fonts to prevent Chrome unused-preload warnings and added `font-size-adjust: from-font` (`"Use the from-font keyword to let the browser extract the ratio from your primary web font"`).
- **`color` & `dark-mode`**: Calibrated Obsidian-Gold-Cyan tokens to `>= 4.5:1` text and `>= 3:1` UI boundary contrast, added `<meta name="color-scheme" content="dark">` + `:root { color-scheme: dark; }`, and specified `@media (forced-colors: active)` border fallbacks (`"Maintain a minimum contrast ratio of 3:1 for user interface component boundaries and states"`).
- **`accessibility` & `typography`**: Converted clickable `<div>` triggers (`nav-brand`, `live-engine-pill`, `principle-card`) to `<button type="button">`, added a skip link, avoided ornate cursive fonts for body text, and enforced unitless `line-height` + `text-wrap: balance`/`pretty` (`"Don't rely on all-caps for emphasis"`, `"Provide skip links prior to repeated content"`).
