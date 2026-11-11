---
phase: 0
plan: 1
wave: 1
depends_on: []
files_modified:
  - src/index.css
  - src/styles/base.css
  - src/styles/hud.css
  - src/styles/odyssey.css
  - src/styles/responsive.css
  - src/styles/sections.css
  - src/styles/tokens.css
  - public/resume/Sagar_Kharbikar_Resume.pdf
  - public/assets/resume/README.md
  - public/avatar/avatar.png
  - public/avatar/avatar-video.mp4
  - src/styles/cyber.css
  - tailwind.config.js
  - index.html
autonomous: true

must_haves:
  truths:
    - "All 7 unimported legacy CSS files and ~7 MB of orphaned/duplicate public assets are removed without breaking any src/ or case-study reference"
    - "Observatory design tokens (--void, --surface, --surface-2, --glass, --glass-strong, --hairline, --hairline-hot, --cyan, --ice, --gold, --gold-2, --violet, --emerald, --text, --text-2, --text-3) are unified in cyber.css and tailwind.config.js"
    - "Self-hosted Latin-subset .woff2 fonts (Space Grotesk, JetBrains Mono, Cinzel) replace blocking remote Google Fonts requests with font-display: swap and fold preloads"
    - "public/CNAME ('sagardev.me'), vite.config.js (base: '/'), and .github/workflows/{checks,deploy}.yml pass npm run build cleanly"
  artifacts:
    - src/styles/cyber.css
    - tailwind.config.js
    - index.html
    - public/fonts/
---

# Plan 0.1: Foundation, Observatory Token Unification & Dead-Code Purge

<objective>
Establish a lean, dark-only "The Observatory" token and typography foundation (`plan/plan.md` §1) while purging ~104 KB of dead legacy stylesheets and ~7 MB of orphaned/duplicate assets left over from prior iterations.

Purpose: Eliminate bundle/repo noise before adding `ScrollStage`, ensure strict cyan/gold/violet ratio discipline, and remove third-party Google Fonts latency on initial paint.
Output: Cleaned `src/styles/` & `public/`, unified `:root` tokens + `scroll-padding-top: 84px`, local `.woff2` fonts preloaded in `index.html`.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 1, 2.2, 6, 8)
- .gsd/EXECUTION_PLAN.md
- src/styles/cyber.css
- tailwind.config.js
- index.html
</context>

<tasks>

<task type="auto">
  <name>Purge unimported legacy CSS and orphaned/duplicate public assets</name>
  <files>
    src/index.css
    src/styles/base.css
    src/styles/hud.css
    src/styles/odyssey.css
    src/styles/responsive.css
    src/styles/sections.css
    src/styles/tokens.css
    public/resume/Sagar_Kharbikar_Resume.pdf
    public/assets/resume/README.md
    public/avatar/avatar.png
    public/avatar/avatar-video.mp4
    public/Digital Doc Service Portal/
  </files>
  <action>
    1. Verify via grep that nothing in `src/`, `index.html`, or `public/case-studies/document-portal.html` imports `src/index.css`, `src/styles/{base,hud,odyssey,responsive,sections,tokens}.css`, `public/avatar/*`, `public/resume/Sagar_Kharbikar_Resume.pdf`, `public/assets/resume/README.md`, or the 7 unused Digital Doc screenshots (`APPLY .png`, `DOWNLOAD.png`, `HELP .png`, `MY APPLICATION.png`, `NOTIFICATION.png`, `PROFILE.png`, `TRACKING .png`). Keep `public/Digital Doc Service Portal/DASHBOARD.png` until Phase 6 `.webp` conversion.
    2. Delete those verified dead files so only active source and canonical `public/assets/resume/Sagar_Kharbikar_Resume.pdf` remain.
    AVOID: Deleting `DASHBOARD.png`, `SAAR/SAAR.png`, `assets/projects/*.jpg`, `favicon.svg`, `CNAME`, or `case-studies/document-portal.html` before Phase 6 migration.
  </action>
  <verify>npm run build</verify>
  <done>Only `src/styles/cyber.css` exists in `src/styles/`, unused ~7 MB assets are gone, and `npm run build` exits 0.</done>
</task>

<task type="auto">
  <name>Unify Observatory CSS tokens, color rules, and self-hosted woff2 fonts</name>
  <files>
    src/styles/cyber.css
    tailwind.config.js
    index.html
    public/fonts/
  </files>
  <action>
    1. Update `:root` in `src/styles/cyber.css` and `theme.extend.colors` in `tailwind.config.js` to match `plan/plan.md` §1 verbatim: `--void: #08080c`, `--surface: #0f101a`, `--surface-2: #13131a`, `--glass: rgba(10, 15, 30, 0.6)`, `--glass-strong: rgba(15, 25, 45, 0.85)`, `--hairline: rgba(150, 200, 255, 0.15)`, `--hairline-hot: rgba(150, 200, 255, 0.3)`, `--cyan: #00f0ff`, `--ice: #6fc4f2`, `--gold: #ffd700`, `--gold-2: #ffaa00`, `--violet: #9d4edd`, `--emerald: #34d399`, `--text: #e6f4f5`, `--text-2: #b9cacb`, `--text-3: #849495`. Add `scroll-padding-top: 84px;` on `html`.
    2. Self-host Latin-subset `.woff2` font files (Space Grotesk, JetBrains Mono, Cinzel) under `public/fonts/` via `@font-face` (`font-display: swap`) in `src/styles/cyber.css` and replace the remote Google Fonts link in `index.html` with `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two primary above-the-fold weights. Keep dark-only root styling.
    AVOID: Creating a separate `tokens.css` file — keep tokens inline in `src/styles/cyber.css` per Ponytail file minimization.
  </action>
  <verify>npm run build && Select-String -Path index.html,src\styles\cyber.css -Pattern '--ice|--glass-strong|scroll-padding-top|@font-face'</verify>
  <done>Tokens match §1 palette, `public/fonts/*.woff2` load locally with `swap`, zero remote font requests remain in `index.html`, and `npm run build` exits 0.</done>
</task>

<task type="auto">
  <name>Verify GitHub Pages CNAME, Vite base path, and CI workflow config</name>
  <files>
    public/CNAME
    vite.config.js
    .github/workflows/deploy.yml
    .github/workflows/checks.yml
  </files>
  <action>
    Confirm `public/CNAME` outputs `"sagardev.me"`, `vite.config.js` sets `base: '/'` with `vendor-three` / `vendor-motion` `manualChunks`, and `.github/workflows/{checks,deploy}.yml` build cleanly (`npm ci && npm run build`). Adjust only if a discrepancy is found.
    AVOID: Running `git merge` or `git push`.
  </action>
  <verify>Get-Content dist\CNAME; npm run build</verify>
  <done>`dist/CNAME` contains `sagardev.me`, Vite build passes with split chunks, and CI workflows align with `plan/plan.md` §8.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` succeeds with zero warnings/errors
- [ ] `dist/CNAME` equals `sagardev.me` and `dist/fonts/` contains self-hosted `.woff2` files
- [ ] Dead stylesheets (`base.css`, `tokens.css`, `src/index.css`, etc.) do not exist
</verification>

<success_criteria>
- All 3 tasks verified
- Phase 0 foundation ready for Phase 1 HUD & data upgrades
</success_criteria>

