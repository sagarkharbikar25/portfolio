---
phase: 1
plan: 4
wave: 2
depends_on:
  - "1"
  - "2"
files_modified:
  - src/hooks/useReducedMotion.js
  - src/hooks/useScrollSpy.js
  - src/hooks/useEscapeKey.js
  - src/hooks/useStoryProgress.js
  - src/scenes/StoryStage.jsx
  - src/scenes/ObservatoryStaticFallback.jsx
  - src/components/icons/BrandIcons.jsx
  - src/components/Navbar.jsx
  - src/components/HeroSection.jsx
  - src/components/Footer.jsx
autonomous: true
gap_closure: false

must_haves:
  truths:
    - "useReducedMotion detects prefers-reduced-motion media query"
    - "useScrollSpy updates active navigation state dynamically without triggering unnecessary re-renders"
    - "useEscapeKey closes mobile drawer or modal overlays when Escape is pressed"
    - "useStoryProgress writes --scroll-p via rAF DOM ref manipulation with zero React state re-renders"
    - "Navbar uses semantic buttons, includes Credentials link in both desktop and mobile docks, and fixes the .nav-civic-root selector"
    - "HeroSection and Footer render verified profile data and specular metrics"
  artifacts:
    - src/hooks/useReducedMotion.js
    - src/hooks/useScrollSpy.js
    - src/hooks/useEscapeKey.js
    - src/hooks/useStoryProgress.js
    - src/scenes/StoryStage.jsx
    - src/scenes/ObservatoryStaticFallback.jsx
    - src/components/icons/BrandIcons.jsx
    - src/components/Navbar.jsx
    - src/components/HeroSection.jsx
    - src/components/Footer.jsx
  key_links:
    - "Navbar consumes useScrollSpy and useEscapeKey"
    - "HeroSection consumes PROFILE_DATA and HERO_METRICS from src/data/profile.js"
    - "StoryStage provides the boundary where Phase 2 scrollytelling acts will mount"
---

# Plan 1.4: Custom Hooks, Scene Scaffolds & Core Navigation Shell

## Objective
Implement reusable React custom hooks (`useReducedMotion`, `useScrollSpy`, `useEscapeKey`, `useStoryProgress`), establish scene boundary scaffolds (`StoryStage`, `ObservatoryStaticFallback`) for Phase 2 scrollytelling, and extract core presentation components (`BrandIcons`, `Navbar`, `HeroSection`, `Footer`). This plan replaces unsemantic clickable `<div>` elements with accessible `<button>` triggers, ensures the mobile drawer auto-closes on `Escape`, integrates live scroll-spy navigation including `#credentials`, and eliminates deprecated theme toggling.

## Context
Load these files for context:
- .gsd/SPEC.md
- .gsd/DECISIONS.md
- .gsd/phases/1/RESEARCH.md
- src/data/profile.js
- src/styles/tokens.css
- src/styles/hud.css

## Tasks

<task type="auto">
  <name>Custom Hooks & Scene Scaffolds</name>
  <files>
    src/hooks/useReducedMotion.js
    src/hooks/useScrollSpy.js
    src/hooks/useEscapeKey.js
    src/hooks/useStoryProgress.js
    src/scenes/StoryStage.jsx
    src/scenes/ObservatoryStaticFallback.jsx
  </files>
  <action>
    Create core custom hooks and scene mounting boundaries:

    1. Create `src/hooks/useReducedMotion.js`:
       - Query `window.matchMedia('(prefers-reduced-motion: reduce)')`.
       - Add change event listener with cleanup on unmount.
       - Return boolean `prefersReducedMotion` (defaulting to `false` if `matchMedia` is unsupported).

    2. Create `src/hooks/useScrollSpy.js`:
       - Accept `sectionIds` array (defaults to `['hero', 'experience', 'projects', 'architecture', 'skills', 'credentials', 'contact']`).
       - Accept optional `options` (`rootMargin: '-20% 0px -60% 0px'`, `threshold: 0`).
       - Observe elements by ID using `IntersectionObserver`.
       - Maintain `activeSection` state.
       - Provide smooth `scrollTo(id)` helper function that safely falls back if the target element does not exist.
       - Return `{ activeSection, scrollTo }`.

    3. Create `src/hooks/useEscapeKey.js`:
       - Accept a callback function and an `isOpen` boolean flag.
       - Attach `keydown` listener to `window` only when `isOpen` is `true`.
       - Invoke callback when `event.key === 'Escape'`.
       - Clean up listener on unmount or when `isOpen` changes.

    4. Create `src/hooks/useStoryProgress.js`:
       - Phase 2 scrollytelling foundation: accept a container ref.
       - Use `requestAnimationFrame` on scroll events to calculate scroll progress `[0..1]`.
       - Write `--scroll-p: progress` directly to `element.style.setProperty('--scroll-p', progress)` or `:root`.
       - AVOID: Calling React `useState` / `setState` inside the scroll handler (re-rendering React on every scroll frame causes stutter and violates `DEC-004`).
       - USE: Direct DOM custom property mutation via `requestAnimationFrame`.

    5. Create `src/scenes/StoryStage.jsx`:
       - Accepts `children` (in Phase 1, renders `<HeroSection />`).
       - Render `<div className="odyssey-stage" ref={stageRef}>{children}</div>`.
       - Acts as the isolated mount point for Phase 2's multi-act scrollytelling and WebGL Observatory canvas.

    6. Create `src/scenes/ObservatoryStaticFallback.jsx`:
       - Render accessible SVG/HTML fallback for users with `prefers-reduced-motion` or when WebGL is unsupported.
       - Include decorative geometric crest matching brand styling.
  </action>
  <verify>
    node -e "const fs = require('fs'); ['useReducedMotion.js', 'useScrollSpy.js', 'useEscapeKey.js', 'useStoryProgress.js'].forEach(f => { if (!fs.existsSync('src/hooks/' + f)) throw new Error('Missing ' + f); }); ['StoryStage.jsx', 'ObservatoryStaticFallback.jsx'].forEach(f => { if (!fs.existsSync('src/scenes/' + f)) throw new Error('Missing ' + f); }); console.log('Hooks and scenes verified OK');"
  </verify>
  <done>
    All 4 custom hooks and 2 scene scaffold files exist, follow non-re-rendering scroll patterns, and handle cleanup on unmount.
  </done>
</task>

<task type="auto">
  <name>Core Navigation, Brand Icons, Hero & Semantic Footer</name>
  <files>
    src/components/icons/BrandIcons.jsx
    src/components/Navbar.jsx
    src/components/HeroSection.jsx
    src/components/Footer.jsx
  </files>
  <action>
    Extract and modernize core shell components:

    1. Create `src/components/icons/BrandIcons.jsx`:
       - Export `GithubIcon`, `LinkedinIcon`, and `ObservatoryCrestSvg`.
       - Include `aria-hidden="true"`, `focusable="false"`, and viewBox properties matching `src/App.jsx:88-105`.

    2. Create `src/components/Navbar.jsx`:
       - Accept `{ activeSection, scrollTo }` props.
       - Render `<nav className="nav-civic-root" aria-label="Main Navigation">`.
       - Render skip link before interactive content:
         `<a href="#main-content" className="skip-link">Skip to main content</a>`
       - Render nav brand as a semantic button:
         `<button type="button" className="nav-brand" onClick={() => scrollTo('hero')} aria-label="Navigate to top">`
         Display monogram crest and "SAGAR KHARBIKAR".
       - Render segmented dock (`.nav-segmented-dock`):
         Nav buttons/links for: `Experience`, `Projects`, `Architecture`, `Skills`, `Credentials`, `Contact`.
         Include active indicator when `activeSection === item.id`.
         IMPORTANT: Include `Credentials` link in the dock (fixing the missing credentials item from `src/App.jsx:174-211`).
       - Render live availability status pill as button:
         `<button type="button" className="live-engine-pill" onClick={() => scrollTo('contact')} aria-label="Internship status: available">`
       - Render mobile hamburger toggle button:
         `<button type="button" className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle navigation menu">`
       - Render mobile menu overlay:
         Include all nav links including `Credentials` and `Resume PDF`.
         Auto-close menu when any link is clicked.
         Wire `useEscapeKey(handleClose, isOpen)` so `Escape` key closes drawer.
       - AVOID: Including theme toggle button or state (`DEC-003`).
       - AVOID: Unstyled clickable `<div>` elements.

    3. Create `src/components/HeroSection.jsx`:
       - Accept `{ scrollTo }` prop.
       - Render `<section id="hero" className="hero-section">`.
       - Render radial blur backdrop veil (`.radial-blur-veil`).
       - Render identity header: "Sagar Kharbikar" + subtitle "Backend · AI Systems · Architecture".
       - Render thesis tagline from `src/data/profile.js`.
       - Render dual action CTAs:
         - `<button type="button" className="cta-primary-gold" onClick={() => scrollTo('projects')}>Enter Observatory ↓</button>`
         - `<a href="/assets/resume/Sagar_Kharbikar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-secondary-cyan">Resume PDF ↗</a>`
       - Render 4 specular metric cards from `HERO_METRICS` in `src/data/profile.js`.

    4. Create `src/components/Footer.jsx`:
       - Render semantic `<footer className="site-footer">`.
       - Include copyright notice, tech stack badges (`React 18 · Vite 5 · WebGL · CSS Scroll-Driven`), and verified build milestone (`November 2026`).
       - Include quick navigation links and back-to-top button.
  </action>
  <verify>
    node -e "const fs = require('fs'); const nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8'); const hero = fs.readFileSync('src/components/HeroSection.jsx', 'utf8'); if (!nav.includes('nav-civic-root')) throw new Error('Missing nav-civic-root'); if (nav.includes('toggleTheme') || nav.includes('data-theme')) throw new Error('Found deprecated theme toggle in Navbar'); if (!nav.includes('Credentials')) throw new Error('Missing Credentials link in Navbar'); if (!hero.includes('Enter Observatory')) throw new Error('Missing CTA in HeroSection'); console.log('Navbar, Hero, BrandIcons, Footer verified OK');"
  </verify>
  <done>
    `Navbar.jsx` targets `.nav-civic-root` with semantic buttons, `Escape` key closing, and `Credentials` link; `HeroSection.jsx` and `Footer.jsx` render verified metrics.
  </done>
</task>

## Must-Haves
After all tasks complete, verify:
- [ ] All 4 hooks in `src/hooks/` export clean functions and do not trigger per-scroll React re-renders.
- [ ] `src/scenes/StoryStage.jsx` wraps children in `.odyssey-stage`.
- [ ] `src/components/Navbar.jsx` contains the `Credentials` navigation link.
- [ ] `src/components/Navbar.jsx` closes mobile menu on `Escape` key.
- [ ] Zero theme toggling logic or light-mode references remain in components.
- [ ] `HeroSection.jsx` displays verified metrics from `src/data/profile.js`.

## Success Criteria
- [ ] All tasks verified passing via Node script assertions.
- [ ] Must-haves confirmed.
- [ ] Zero lint/syntax errors in components and hooks.
