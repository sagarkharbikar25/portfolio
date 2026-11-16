---
phase: 8
plan: 1
wave: 1
depends_on: []
files_modified:
  - index.html
  - src/styles/editorial.css
  - src/App.jsx
  - src/components/CapsuleNav.jsx
  - src/components/HeroNeoSection.jsx
  - src/components/BentoMatrixSection.jsx
  - src/components/SkillsRibbon.jsx
  - src/components/ServicesSection.jsx
  - src/components/ProjectsNeoSection.jsx
  - src/components/InteractiveCanvasCTA.jsx
  - src/components/ContactSection.jsx
  - src/components/FooterNeo.jsx
autonomous: true

must_haves:
  truths:
    - "Hero section matches reference: floating capsule nav, split condensed typography (FULL STACK / DEVELOPER), overlapping portrait avatar, and bottom-right frosted glass testimonial card"
    - "About Bento grid matches reference: 40+ partners avatar pile, 90% ROI card, $2.5M revenue card with live green beacon, 3D textured hero card with 5.0/5 star rating, and floating chrome ribbon with multi-colored skill pills"
    - "Interactive Services matches reference: diagonal wildflower hill backdrop with clean numbered rows 01 to 04 and circular arrow buttons"
    - "Projects section matches reference: asymmetric staggered 2-column layout with real code preview, tags, and interactive detail view"
    - "Interactive CTA canvas matches reference: pitch-black background with interactive mouse-proximity dot matrix canvas and micro-marquee"
    - "Minimalist contact form and mint-green condensed footer match reference layout and typography"
    - "Build succeeds cleanly with npm run build and conforms to 60fps compositor-only motion and prefers-reduced-motion accessibility"
---

# Plan 8.1: Neo-Nature Tactile Bento & High-Contrast Editorial Portfolio

<objective>
Build the complete high-fidelity portfolio matching the 8 reference screenshots in `ref/` on the current `demo` branch without pushing code.
Follow `/ui-skills` design engineering standards and `/ponytail` minimal zero-bloat principles.
</objective>

<tasks>
1. [auto] Task 1: Setup Neo-Nature tokens, condensed typography, and CSS foundation in `index.html` and `src/styles/editorial.css`.
2. [auto] Task 2: Build `CapsuleNav.jsx` and `HeroNeoSection.jsx` with split condensed headline, overlapping avatar, and glass quote card.
3. [auto] Task 3: Build `BentoMatrixSection.jsx` and `SkillsRibbon.jsx` with stats, 3D sponge hero badge, and floating skill pills.
4. [auto] Task 4: Build `ServicesSection.jsx` and `ProjectsNeoSection.jsx` with wildflower hill aesthetic and asymmetric 2-column cards.
5. [auto] Task 5: Build `InteractiveCanvasCTA.jsx`, `ContactSection.jsx`, and `FooterNeo.jsx`.
6. [auto] Task 6: Wire all components into `src/App.jsx`, verify with `npm run build`, and ensure responsive/motion compliance.
</tasks>
