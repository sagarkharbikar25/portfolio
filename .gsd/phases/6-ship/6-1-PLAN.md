---
phase: 6
plan: 1
wave: 1
depends_on: ["5-1"]
files_modified:
  - public/assets/projects/
  - public/og-image.png
  - public/sitemap.xml
  - public/robots.txt
  - public/case-studies/document-portal.html
  - src/data/projects.js
  - src/components/BentoDossiers.jsx
  - index.html
autonomous: true

must_haves:
  truths:
    - "Project images (DASHBOARD, gig-flow, cyber-hunt, SAAR) are compressed .webp assets with explicit width/height attributes and loading='lazy' below stage"
    - "public/case-studies/document-portal.html shares Observatory palette tokens (#08080c, #00f0ff, #ffd700) without broken font/image links"
    - "index.html includes canonical SEO tags, Open Graph + Twitter card tags pointing to og-image.png (1200x630), JSON-LD Person schema for Sagar Kharbikar on https://sagardev.me/, and matching public/sitemap.xml + public/robots.txt"
    - "Final npm run build keeps initial JS (index + vendor-motion) <= 180 KB gzip before async vendor-three, and Chrome DevTools + Lighthouse audits pass Section 6/10 targets at 1536x770 desktop and 390x844 mobile"
  artifacts:
    - public/og-image.png
    - public/sitemap.xml
    - public/robots.txt
    - index.html
    - src/data/projects.js
---

# Plan 6.1: Media Optimization, SEO/OG Schema & Final Audit Gate

<objective>
Complete the pre-ship polish and empirical verification gate (`plan/plan.md` §6, §8, §10): convert heavy project screenshots to `.webp`, align `document-portal.html` styling, add Open Graph + JSON-LD + `sitemap.xml`, and execute the full Lighthouse / DevTools / memory verification suite locally (**no `git merge` or `git push`**).

Purpose: Deliver verified `>= 90` desktop / `>= 80` mobile Lighthouse performance, `>= 95` accessibility, `100` SEO, `<= 180 KB` initial gzip JS, zero WebGL leaks, and visual card-clearance proof.
Output: Optimized `.webp` assets, OG image, SEO/JSON-LD `index.html`, verified production `dist/`, and recorded DevTools audit proof.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 6, 8, 10)
- index.html
- src/data/projects.js
- public/case-studies/document-portal.html
</context>

<tasks>

<task type="auto">
  <name>Convert project screenshots to optimized WebP and sync document-portal.html tokens</name>
  <files>
    public/assets/projects/
    public/Digital Doc Service Portal/DASHBOARD.png
    public/SAAR/SAAR.png
    src/data/projects.js
    src/components/BentoDossiers.jsx
    public/case-studies/document-portal.html
  </files>
  <action>
    1. Convert `Digital Doc Service Portal/DASHBOARD.png` (~410 KB), `assets/projects/gig-flow.jpg` (~610 KB), `assets/projects/cyber-hunt.jpg` (~686 KB), and `SAAR/SAAR.png` (~86 KB) into compressed `.webp` files inside `public/assets/projects/` (deleting the oversized `.jpg`/`.png` copies and empty folders once wired).
    2. Update `src/data/projects.js` paths + explicit natural `width` / `height` metadata, ensuring `BentoDossiers.jsx` outputs `width`, `height`, and `loading="lazy"` (`CLS < 0.05`).
    3. Update CSS variables inside `public/case-studies/document-portal.html` so it matches Observatory (`#08080c`, `#00f0ff`, `#ffd700`) cleanly.
    AVOID: Leaving redundant 400–680 KB PNG/JPG originals alongside `.webp` in `public/`.
  </action>
  <verify>Get-ChildItem public\assets\projects\*.webp | Select-Object Name, Length; npm run build</verify>
  <done>All 4 project visuals are lean `.webp` files with explicit dimensions, `document-portal.html` matches tokens, and build passes.</done>
</task>

<task type="auto">
  <name>Add SEO metadata, Open Graph card (og-image.png), JSON-LD Person schema, and sitemap</name>
  <files>index.html, public/og-image.png, public/sitemap.xml, public/robots.txt</files>
  <action>
    1. Generate or render a crisp `1200x630` `public/og-image.png` (`sagardev.me` · Sagar Kharbikar · "The Observatory" dark cyan/gold aesthetic).
    2. Update `index.html` with canonical `<link rel="canonical" href="https://sagardev.me/">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter card tags, and JSON-LD `@type: "Person"` script for Sagar Kharbikar (GitHub, LinkedIn, `https://sagardev.me/`, B.Tech CSE, Backend & Full-Stack Developer).
    3. Add `public/sitemap.xml` (listing `/` and `/case-studies/document-portal.html`) and `public/robots.txt`.
    AVOID: Leaving localhost or placeholder URLs in OG/canonical/JSON-LD tags.
  </action>
  <verify>Select-String -Path index.html -Pattern 'application/ld\+json|og-image\.png|sagardev\.me' && Test-Path public\og-image.png && Test-Path public\sitemap.xml</verify>
  <done>SEO meta, OG image, `robots.txt`, `sitemap.xml`, and valid JSON-LD `Person` schema exist and copy into `dist/`.</done>
</task>

<task type="auto">
  <name>Run final production bundle budget, DevTools viewport/memory check & Lighthouse gate</name>
  <files>dist/</files>
  <action>
    1. Run `npm run build` and verify gzip sizes: initial JS (`index` + `vendor-motion`) `<= 180 KB` gzip, while `vendor-three` remains deferred/async.
    2. Start `npm run preview` locally and inspect via Chrome DevTools at `1536x770` desktop and `390x844` mobile:
       - Verify zero console errors, zero failed/404 network requests.
       - Verify zero horizontal overflow (`scrollWidth <= innerWidth`) on both viewports.
       - Verify docked `InstrumentCard` `getBoundingClientRect().top >= 115` at rest (`p ~ 0.90`).
       - Capture heap / GPU memory sanity across scroll stage -> unmount / toggle `FAST_VIEW`.
       - Run Lighthouse audits verifying Performance (`>= 90` desktop / `>= 80` mobile), Accessibility (`>= 95`), SEO (`100`), LCP `< 2.5s`, CLS `< 0.05`, TBT `< 200ms`.
    AVOID: Running `git merge` or `git push` (user tests locally first).
  </action>
  <verify>npm run build</verify>
  <done>Every item in `plan/plan.md` Section 10 Acceptance Checklist is empirically verified locally with zero failures.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] All Section 10 Acceptance Checklist items pass empirically
- [ ] Initial JS gzip `<= 180 KB` confirmed from `dist/assets/`
- [ ] Workspace stays local-only (no merge, no push)
</verification>

<success_criteria>
- All 3 tasks verified; portfolio ready for user local review and optional `main` deployment
</success_criteria>

