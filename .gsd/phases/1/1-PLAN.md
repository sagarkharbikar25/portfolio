---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified:
  - index.html
  - src/styles/tokens.css
  - src/styles/base.css
  - src/styles/hud.css
  - src/styles/sections.css
  - src/styles/odyssey.css
  - src/styles/responsive.css
autonomous: true
gap_closure: false

must_haves:
  truths:
    - "index.html loads Space Grotesk, Cinzel, and JetBrains Mono without Chrome preload warnings"
    - "tokens.css defines Obsidian-Gold-Cyan palette satisfying WCAG AA contrast (>= 4.5:1 text, >= 3:1 UI)"
    - "base.css uses overflow-x: clip so position: sticky is preserved for scrollytelling"
    - "hud.css targets .nav-civic-root instead of mismatched .navbar selector"
    - "All [data-theme='light'] overrides are eliminated per DEC-003"
  artifacts:
    - index.html
    - src/styles/tokens.css
    - src/styles/base.css
    - src/styles/hud.css
    - src/styles/sections.css
    - src/styles/odyssey.css
    - src/styles/responsive.css
  key_links:
    - "index.html links to Google Fonts with preconnect and display=swap"
    - "tokens.css is ready to be imported by src/main.jsx"
---

# Plan 1.1: Design Tokens, Typography & CSS Module System

## Objective
Establish the foundational Obsidian-Gold-Cyan design tokens, zero-warning typography subsystem (`Space Grotesk`, `Cinzel`, `JetBrains Mono`), and modular CSS architecture (`tokens.css`, `base.css`, `hud.css`, `sections.css`, `odyssey.css`, `responsive.css`). This replaces the monolithic 2,093-line `src/index.css`, purges 477 lines of deprecated light-mode overrides (`DEC-003`), resolves the broken `.nav-civic-root` vs `.navbar` selector mismatch, and fixes the `overflow-x: hidden` sticky-scroll trap.

## Context
Load these files for context:
- .gsd/SPEC.md
- .gsd/DECISIONS.md
- .gsd/phases/1/RESEARCH.md
- src/index.css
- index.html

## Tasks

<task type="auto">
  <name>Typography, Dark Meta & Core Token/Base Styles</name>
  <files>
    index.html
    src/styles/tokens.css
    src/styles/base.css
  </files>
  <action>
    Configure typography, color scheme meta, and core CSS tokens:

    1. In `index.html`:
       - Add `<meta name="color-scheme" content="dark">` inside `<head>`.
       - Add Google Fonts preconnect links (`https://fonts.googleapis.com` and `https://fonts.gstatic.com` with `crossorigin`).
       - Add stylesheet `<link>` requesting `family=Cinzel:wght@600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap`.
       - Remove existing `Outfit` and `Plus+Jakarta+Sans` font links.
       - Update social meta tags: set `og:image` and `twitter:image` to canonical absolute URL `https://sagardev.me/assets/img/og-image.png`.
       - Update favicon link to `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
       - Ensure `<body id="top">` contains `<a href="#main-content" className="skip-link">Skip to main content</a>` target hook.
       - AVOID: `<link rel="preload" as="style">` or `<link rel="preload" as="font">` on Google Fonts URLs because it causes Chrome DevTools "preloaded but not used within a few seconds" console warnings.
       - AVOID: Requesting `Space Grotesk` at weight 800 or 900 (it only supports 300..700 on Google Fonts; requesting 800 causes HTTP 400).
       - USE: Single Google Fonts stylesheet with `display=swap`.

    2. Create `src/styles/tokens.css`:
       - Define `:root` with `color-scheme: dark;`.
       - Obsidian canvas tokens: `--bg-void: #0a0a0c;`, `--bg-elevated: #111420;`, `--bg-glass: rgba(10, 15, 30, 0.78);`, `--bg-code: #070a12;`.
       - Text tokens calibrated to WCAG AA:
         - `--text-pure: #ffffff;` (AAA 19.78:1 on void)
         - `--text-primary: #dce5f2;` (AAA 15.57:1 on void)
         - `--text-muted: #9fb0c8;` (AAA 8.97:1 on void)
         - `--text-dim: #8899b4;` (AA+ 6.84:1 on void; replaces failing `#64748b` and `#475569`)
         - `--text-on-gold: #0a0a0c;` (AAA on gold CTA backgrounds)
       - Accent tokens:
         - `--gold-primary: #ffd700;`, `--gold-warm: #ffaa00;`
         - `--cyan-electric: #6fc4f2;`, `--cyan-soft: #63b3ed;`
         - `--emerald-live: #34d399;`, `--rose-keyword: #fb7185;`
       - Border tokens:
         - `--border-hud: rgba(111, 196, 242, 0.50);` (passes 3:1 UI non-text contrast)
         - `--border-gold: rgba(255, 215, 0, 0.45);` (passes 3:1 UI non-text contrast)
         - `--border-subtle: rgba(220, 229, 242, 0.14);`
       - Font family tokens:
         - `--font-display: 'Cinzel', Georgia, serif;`
         - `--font-body: 'Space Grotesk', system-ui, -apple-system, sans-serif;`
         - `--font-code: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;`
       - Layout tokens: `--hud-height: 64px;`, `--container-max: 1200px;`.
       - AVOID: Any `[data-theme="light"]` selectors (`DEC-003`).

    3. Create `src/styles/base.css`:
       - Element resets (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`).
       - Apply `overflow-x: clip;` on `html`, `body`, and `.portfolio-app-root`.
       - AVOID: `overflow-x: hidden;` on `html` or `body` because it triggers internal scroll container behavior in browsers and breaks `position: sticky` needed for Phase 2 scrollytelling.
       - Apply `font-size-adjust: from-font;` on `body`, headings, and `pre, code` to eliminate font swap layout shifts.
       - Set `background-color: var(--bg-void); color: var(--text-primary); font-family: var(--font-body);`.
       - Define skip link styling:
         ```css
         .skip-link {
           position: absolute;
           top: -100px;
           left: 16px;
           background: var(--gold-primary);
           color: var(--text-on-gold);
           padding: 8px 16px;
           font-weight: 700;
           z-index: 9999;
           border-radius: 4px;
           transition: top 0.2s ease;
         }
         .skip-link:focus {
           top: 16px;
         }
         ```
       - Define `:focus-visible` styles with `--cyan-electric` outline (`outline: 2px solid var(--cyan-electric); outline-offset: 3px;`).
       - Define `@media (prefers-reduced-motion: reduce)` block disabling animations/transitions where appropriate.
       - Define `@media (forced-colors: active)` fallback rules ensuring borders remain visible in High Contrast mode.
  </action>
  <verify>
    node -e "const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf8'); const tokens = fs.readFileSync('src/styles/tokens.css', 'utf8'); const base = fs.readFileSync('src/styles/base.css', 'utf8'); if (!html.includes('Cinzel') || !html.includes('Space+Grotesk') || !html.includes('JetBrains+Mono')) throw new Error('Missing fonts in index.html'); if (!tokens.includes('--bg-void') || !tokens.includes('--text-dim: #8899b4')) throw new Error('Missing tokens'); if (base.includes('overflow-x: hidden')) throw new Error('Found illegal overflow-x: hidden in base.css'); if (!base.includes('overflow-x: clip')) throw new Error('Missing overflow-x: clip in base.css'); console.log('Base tokens and typography OK');"
  </verify>
  <done>
    `index.html` loads Space Grotesk/Cinzel/JetBrains Mono without preload warnings, `tokens.css` defines dark WCAG AA tokens with zero light mode styles, and `base.css` uses `overflow-x: clip` and skip link styling.
  </done>
</task>

<task type="auto">
  <name>HUD, Section Layouts, Odyssey Placeholder & Responsive Modules</name>
  <files>
    src/styles/hud.css
    src/styles/sections.css
    src/styles/odyssey.css
    src/styles/responsive.css
  </files>
  <action>
    Extract and structure the remaining CSS modules from `src/index.css`:

    1. Create `src/styles/hud.css`:
       - Define `.nav-civic-root` as the primary fixed navigation bar (`position: fixed; top: 0; left: 0; right: 0; height: var(--hud-height); z-index: 1000; background: var(--bg-glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-hud); display: flex; align-items: center; justify-content: space-between; padding: 0 24px;`).
       - AVOID: `.navbar` selector from `src/index.css:637` which never matched the JSX in `src/App.jsx:163`.
       - Style the segmented dock (`.nav-segmented-dock`), nav brand, live internship pill (`.live-engine-pill`), mobile hamburger button (`.mobile-menu-btn`), and mobile overlay (`.mobile-menu-overlay`).
       - Add chamfered pill aesthetics with cyan focus indicators.

    2. Create `src/styles/sections.css`:
       - Extract styles for Hero and specular metric cards (`.hero-section`, `.specular-metric-card`, `.radial-blur-veil`).
       - Extract styles for Experience timeline (`.experience-section`, `.experience-timeline`, `.experience-card`).
       - Extract styles for Projects bento grid (`.projects-section`, `.projects-bento-grid`, `.bento-project-card`).
       - USE: `.projects-bento-grid` CSS grid; drop dead `.node-ray-line` rule (`src/index.css:1011`).
       - Extract styles for Architecture console (`.architecture-section`, `.architecture-console`, `.console-header`, `.code-viewport`, `.telemetry-rail`).
       - Extract styles for Skills bento clusters (`.skills-section`, `.skills-grid`, `.skill-card`, `.skill-pill`).
       - Extract styles for Credentials grid (`.credentials-section`, `.credentials-grid`, `.credential-card`).
       - Extract styles for Contact section and terminal card (`.contact-section`, `.contact-card`).
       - Extract semantic footer styles (`.site-footer`).

    3. Create `src/styles/odyssey.css`:
       - Define layout scaffolding for Phase 2 scrollytelling (`.odyssey-stage`, `.odyssey-sticky-viewport`, `.odyssey-act-frame`).
       - Ensure `will-change: transform` and `position: relative` are staged cleanly without blocking Phase 1 static layout.

    4. Create `src/styles/responsive.css`:
       - Consolidate all media queries from `src/index.css:1818-2093`:
         - `@media (max-width: 1040px)`
         - `@media (max-width: 960px)`
         - `@media (max-width: 880px)`
         - `@media (max-width: 768px)`
         - `@media (max-width: 380px)`
       - Ensure mobile drawer, project cards, and code console adapt gracefully with zero horizontal overflow.
  </action>
  <verify>
    node -e "const fs = require('fs'); const hud = fs.readFileSync('src/styles/hud.css', 'utf8'); const sec = fs.readFileSync('src/styles/sections.css', 'utf8'); if (!hud.includes('.nav-civic-root')) throw new Error('Missing .nav-civic-root in hud.css'); if (sec.includes('.node-ray-line')) throw new Error('Found dead .node-ray-line in sections.css'); if (hud.includes('light') || sec.includes('light')) throw new Error('Found light mode reference in styles'); console.log('CSS modules verified OK');"
  </verify>
  <done>
    `hud.css` styles `.nav-civic-root` cleanly, `sections.css` houses modular section rules without dead code or light-mode duplicates, and `responsive.css` covers all mobile breakpoints.
  </done>
</task>

## Must-Haves
After all tasks complete, verify:
- [ ] `index.html` requests `Cinzel`, `Space Grotesk`, and `JetBrains Mono` with `display=swap` and zero preload warnings.
- [ ] `src/styles/tokens.css` defines the Obsidian-Gold-Cyan palette with `--text-dim: #8899b4` and zero `[data-theme="light"]` rules.
- [ ] `src/styles/base.css` enforces `overflow-x: clip;` on `html`, `body`, and `.portfolio-app-root`.
- [ ] `src/styles/hud.css` defines `.nav-civic-root` as fixed top dock with glassmorphism tokens.
- [ ] Dead `.node-ray-line` is eliminated.

## Success Criteria
- [ ] All tasks verified passing via Node script assertions.
- [ ] Must-haves confirmed.
- [ ] Zero syntax errors in CSS modules.
