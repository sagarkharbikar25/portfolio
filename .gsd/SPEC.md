# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> **Milestone**: `v2.0 — The Aetherial Systems Observatory`
> **Reference Benchmark**: IIT Bombay Techfest 2026 (`https://techfest.org/`, *"An Aetherial Renaissance"*)
> **Owner**: Sagar Kharbikar (`sagardev.me`)

## Vision

Transform `sagardev.me` from a static vertical developer page into **"The Aetherial Systems Observatory"** — a story-driven, cinematic dark-mode engineering portfolio inspired by the visual worldbuilding, pinned scroll choreography, mouse-tracked 2.5D parallax, 3D mist transitions, WebGL dome centerpiece, and glassmorphic HUD chrome of IIT Bombay Techfest 2026, while solving Techfest's UX clipping/discoverability flaws so engineering recruiters reach verified backend, AI, and full-stack proof effortlessly.

---

## Narrative Storyline (5-Act Journey)

| Act | Scroll Band | Narrative Beat | Visual & Motion Choreography | Engineering Proof Surfaced |
|---|---|---|---|---|
| **Prologue** | Boot (`0s`, skippable, once/session) | *Signal Acquisition* | Brief obsidian telemetry veil (`< 1.2s` auto-resolve or instant skip; bypassed if `prefers-reduced-motion`). | Sets tone without blocking recruiters. |
| **Act I** | `0% – 20%` | *The Threshold* | Pinned `100vh` frame with radial `backdrop-filter: blur(12px) brightness(0.6)` veil framing the metallic gold/cyan identity crest, subtitle, availability badge, and dual CTAs (`Enter Observatory ↓` + `Skip to Proof / Resume`). | Name, role (`Backend · AI Systems · Architecture`), `4iBiz Intern · B.Tech CSE 8.70 CGPA`, instant Resume PDF access. |
| **Act II** | `20% – 40%` | *Awakening the Skyline* | Radial blur expands outward; hero lockup tilts/exits (`rotateX(65deg)` + fade); mouse-tracked 2.5D parallax world opens across original layered data-citadel monoliths, glowing gold energy conduits, and architect silhouette (`avatar.png` / original SVG-WebP layers). | Core thesis: *"I build the systems behind the screen — APIs, state machines, and local AI pipelines."* |
| **Act III** | `40% – 58%` | *Crossing the Aether* | Layered atmospheric mist/data-fog PNG/WebP planes sweep across the viewport using GPU `perspective(800px) rotateY(...)` + `translate3d(...)` transforms to bridge into the inner sanctum. | Smooth visual chapter break; HUD progress rail updates active chapter. |
| **Act IV** | `58% – 80%` | *The Observatory Command Deck* | Full-bleed WebGL `<canvas>` renders a 3D arcane observatory dome (rotating gold/cyan orbital rings, volumetric halo, pointer-reactive ambient particles). Three chamfered glass/gold HUD pillars rise into a **HUD-safe padded frame** (never clipped by the top bar): **1. Origins & Production**, **2. Flagship Systems** (hover-reveal cards for ERP Portal & SAAR), **3. Contracts & Credentials**. | High-impact interactive gateway into Sagar's 3 career pillars without scroll occlusion. |
| **Act V** | `80% – 100%+` | *The Engineering Dossiers* | Stage unpins seamlessly into clean, WCAG AA legible proof sections: `#experience`, `#projects`, `#architecture` (Interactive Console), `#skills`, `#credentials`, `#contact`, and an authentic `<footer>`. | Complete, scannable recruiter verification: case study, GitHub links, code contracts, Resume PDF, `mailto:`. |

---

## Visual & Motion Reference Matrix (Techfest 2026 → `sagardev.me`)

| Techfest 2026 Element | Portfolio Adaptation (`sagardev.me`) | UX Fix Applied Over Reference |
|---|---|---|
| Deep obsidian canvas `#0a0a0c` | Base `--bg-void: #0a0a0c` + `--bg-elevated: #111420` | Body copy raised to `#dce5f2` / `#9fb0c8` (WCAG AA `>= 4.5:1`). |
| Glassmorphic HUD (`rgba(10,15,30,0.6–0.85)`, `blur(20px)`, icy-blue hairline) | Chamfered top HUD dock + floating left chapter rail + right social rail | Fixed CSS selector mismatch (`.nav-civic-root` vs `.navbar` bug eliminated). |
| Arcane Gold (`#ffd700` → `#ffaa00`) & Electric Cyan (`#6fc4f2`, `#63b3ed`) | Gold for primary crests/CTAs/awards; Cyan for system telemetry, links & active nodes | Promo `#FFE600` adapted cleanly to live `AVAILABLE: INTERNSHIP` status pill. |
| `SpaceGrotesk` + runic display (`Bleeding_Cowboys`) | `Space Grotesk` (UI/HUD), `Cinzel` / `Instrument Serif` (chapter display headers), `JetBrains Mono` (code/telemetry) | High-legibility display pairing; zero preload console warnings. |
| Pinned `600vh` desktop / `300vh` mobile scrollytelling | Pinned `480vh–550vh` Odyssey wrapper (`280vh` mobile) handing off cleanly into Act V | Dedicated `"Skip Odyssey / Proof ↓"` button always reachable in HUD. |
| WebGL 3D dome + 3 floating cards | Lightweight WebGL / Three.js Observatory dome + 3 chamfered pillars | Safe top margin (`calc(var(--hud-height) + 28px)`) prevents card clipping at max scroll. |
| Left `Events`/`About` popout drawers + Mobile 5-tab bar | Left Chapter/Dossier popout drawer + Mobile 5-tab bottom bar (`HOME`, `ORIGIN`, `SYSTEMS`, `SPECS`, `CONTACT`) | Popout drawers **auto-close** on route/anchor selection; mobile top bar stays uncluttered. |
| Missing footer on `/` | Full semantic `<footer>` anchored below `#contact` | Recruiters always see attribution, stack, and dynamic build date. |

---

## Goals

1. **Cohesive 5-Act Storytelling & Motion** — Deliver a fluid, 60fps, Techfest-inspired multi-act scrollytelling journey (`Prologue → Threshold → Skyline → Aether Wipe → Observatory → Engineering Dossiers`) powered by GPU-composited transforms and WebGL.
2. **Recruiter-First Usability & Zero Friction** — Preserve instant access to Resume PDF, `mailto:`, Experience (`4iBiz`), and Flagship Projects (`Digital Document Service Portal`, `Gig Flow`, `Cyber Hunt`, `SAAR`) via fixed HUD shortcuts and Act V deep dives.
3. **Modular Architecture & Asset Hygiene** — Decompose the monolithic `src/App.jsx` (1,211 lines) and `src/index.css` (2,093 lines) into clean modules (`data/`, `styles/`, `hooks/`, `components/`, `scenes/`), remove ~6.8 MB of unused/duplicate assets, fix missing `og-image.png` and broken project links, and unify `/case-studies/document-portal.html` styling.
4. **Cross-Browser Reliability, Performance & Accessibility** — Implement CSS Scroll-Driven Animations with `@supports` + `IntersectionObserver`/scroll-progress fallbacks, graceful WebGL fallback, strict `@media (prefers-reduced-motion: reduce)` compliance, and >= 90 Lighthouse scores.

## Non-Goals (Out of Scope)

- **No copied Techfest assets:** Never reuse proprietary Techfest images, videos (`skybg.webm`, `titlethemelogo.webp`), fonts, or brand copy. All visual layers and WebGL scenes must be original or derived from Sagar's own media.
- **No backend or Next.js migration:** Keep React 18 + Vite 5 static deployment on GitHub Pages (`sagardev.me`) via `.github/workflows/deploy.yml`.
- **No fabricated credentials or metrics:** Every project, skill, certification, and code snippet must reflect verified data from `src/App.jsx`, `PORTFOLIO_BUILD_PLAN.md`, and `resume/Sagar_Kharbikar_Resume.pdf`.
- **No unrequested light-mode duplication:** Focus exclusively on the Obsidian/Gold/Cyan dark aesthetic (deprecating the 470-line `[data-theme="light"]` override unless explicitly requested later).

## Constraints

- **Deployment Target:** Static site hosted on GitHub Pages (`sagardev.me`), built via `npm run build` (`vite build` → `./dist`).
- **Bundle & Performance Budget:** Initial JS/CSS load optimized via lazy-loading for the WebGL Observatory chunk; asset payload compressed (`.webp`/`.avif`/optimized SVG) so total initial transfer stays lean (`< 2.5 MB` first-view payload).
- **Real Content Integrity:** Preserve Sagar's verified experience (`4iBiz Techno-Solutions Pvt. Ltd.`, `TechAlfa & Schollogma CSE Forum`), projects (`Digital Document Service Portal`, `Gig Flow`, `Cyber Hunt`, `SAAR`), credentials, and contact channels (`sagarkharbikar25@gmail.com`, `github.com/sagarkharbikar25`, `linkedin.com/in/sagar-kharbikar`), with phone kept off public HTML to prevent scraping.
- **Accessibility & Browser Support:** Chrome/Edge/Safari/Firefox support; full keyboard navigation (`Tab`, `Escape` to close drawers); WCAG AA contrast (`>= 4.5:1`); complete readability when `prefers-reduced-motion: reduce` is active.

## Success Criteria

- [ ] `npm run build` completes cleanly with zero errors and code-split WebGL bundle.
- [ ] All 5 Storyline Acts animate smoothly on desktop (`1920x960`) and adapt cleanly on mobile (`390x844`) with zero card/HUD overlap or clipped buttons.
- [ ] Fixed HUD navigation, auto-closing popout drawers, scroll-spy chapter indicator, and mobile 5-tab dock all navigate cleanly across Acts I–V.
- [ ] Zero missing assets (`og-image.png`, favicon, project previews), zero duplicate PDFs/`CNAME`, and ~6.8 MB asset bloat cleaned up.
- [ ] `/case-studies/document-portal.html` matches the Obsidian/Gold/Cyan visual tokens and typography.
- [ ] `prefers-reduced-motion: reduce` disables continuous/pinned motion while keeping 100% of portfolio content visible and usable.
- [ ] Chrome DevTools inspection confirms zero console/404 errors and Lighthouse >= 90 across Performance, Accessibility, Best Practices, and SEO.

---

*Last updated: 2026-11-11*

