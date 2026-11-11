---
phase: 1
plan: 2
wave: 1
depends_on: []
files_modified:
  - src/data/profile.js
  - src/data/experience.js
  - src/data/projects.js
  - src/data/architecture.js
  - src/data/skills.js
  - src/data/credentials.js
autonomous: true
gap_closure: false

must_haves:
  truths:
    - "All portfolio text, metrics, and links are extracted from monolithic App.jsx into typed data modules"
    - "Personal phone number is omitted from public data to prevent scraping per SPEC.md:61"
    - "Projects data contains explicit image dimensions (width/height) to eliminate layout shift"
    - "Unconfirmed project links (Gig Flow, Cyber Hunt) use honest nulls or repo requests rather than misleading profile links"
    - "Architecture data provides authentic verification traces for every interactive tab"
  artifacts:
    - src/data/profile.js
    - src/data/experience.js
    - src/data/projects.js
    - src/data/architecture.js
    - src/data/skills.js
    - src/data/credentials.js
  key_links:
    - "Projects and Architecture modules export contracts consumed by UI dossier components"
---

# Plan 1.2: Data Layer Extraction & Verification Contracts

## Objective
Extract all static portfolio content, credentials, metrics, project metadata, and architecture code tabs from the 1,211-line `src/App.jsx` into clean, typed ES module data files under `src/data/`. This plan establishes honest, verifiable data contracts: removing phone numbers to prevent scraping, eliminating misleading links that point to Sagar's GitHub profile root rather than project repositories, declaring explicit image dimensions to avoid CLS, and providing authentic verification telemetry traces for each architecture console tab.

## Context
Load these files for context:
- .gsd/SPEC.md
- .gsd/DECISIONS.md
- .gsd/phases/1/RESEARCH.md
- src/App.jsx

## Tasks

<task type="auto">
  <name>Profile, Experience, Skills & Credentials Data Modules</name>
  <files>
    src/data/profile.js
    src/data/experience.js
    src/data/skills.js
    src/data/credentials.js
  </files>
  <action>
    Extract personal, career, skills, and credential data from `src/App.jsx`:

    1. Create `src/data/profile.js`:
       - Export `PROFILE_DATA`:
         ```javascript
         export const PROFILE_DATA = {
           name: "Sagar Kharbikar",
           identity: "Backend · AI Systems · Architecture",
           tagline: "I build the systems behind the screen — APIs, state machines, and local AI pipelines.",
           availability: "AVAILABLE: INTERNSHIP",
           location: "Nagpur, Maharashtra, India",
           cgpa: "8.70 CGPA",
           degree: "B.Tech in Computer Science and Engineering",
           links: {
             email: "sagarkharbikar25@gmail.com",
             github: "https://github.com/sagarkharbikar25",
             linkedin: "https://linkedin.com/in/sagar-kharbikar",
             resume: "/assets/resume/Sagar_Kharbikar_Resume.pdf"
           }
         };
         ```
       - Export `HERO_METRICS`:
         ```javascript
         export const HERO_METRICS = [
           { id: "erp", label: "Production ERP", value: "1st Prize", detail: "State-Level Award & Live University Deployment" },
           { id: "cgpa", label: "B.Tech CSE", value: "8.70", detail: "Top Academic Standing · Core CS Fundamentals" },
           { id: "intern", label: "4iBiz Intern", value: "Full-Stack", detail: "Production APIs, State Workflows & Dashboards" },
           { id: "ai", label: "Local AI Systems", value: "Neural Ops", detail: "Real-Time Edge Voice, LLMs & Vector Pipelines" }
         ];
         ```
       - Export `STORY_CHAPTERS`: 5 narrative acts (`Act I: The Threshold`, `Act II: Awakening the Skyline`, `Act III: Crossing the Aether`, `Act IV: The Observatory`, `Act V: Engineering Dossiers`).
       - AVOID: Including telephone numbers in `profile.js` (`SPEC.md:61`).

    2. Create `src/data/experience.js`:
       - Export `EXPERIENCE_DATA` containing:
         - `4iBiz Techno-Solutions Pvt. Ltd.` (Role: Full-Stack Web Developer Intern, Period: July 2024 – Present, Location: Nagpur, India, deliverables: REST APIs, state workflow engines, database optimization, dashboard architecture).
         - `TechAlfa & Schollogma CSE Forum` (Role: Technical Lead & System Administrator, Period: Aug 2023 – May 2024, deliverables: server administration, CTF challenge infrastructure, student technical workshops).

    3. Create `src/data/skills.js`:
       - Export `SKILLS_DATA` grouping competencies into 4 distinct clusters:
         - Backend & Core Systems: Python, Node.js, Express, Java, C++, RESTful APIs, System Design.
         - AI & Intelligent Systems: LangChain, Hugging Face, Transformers, PyTorch, Ollama, Vector Databases.
         - Databases & Storage: PostgreSQL, MongoDB, Redis, MySQL, Data Modeling, Indexing.
         - DevOps & Cloud: Docker, Git, CI/CD Actions, Linux, Nginx, AWS Basics.

    4. Create `src/data/credentials.js`:
       - Export `CREDENTIALS_DATA` with 6 verified achievement cards:
         - B.Tech in Computer Science and Engineering (8.70 CGPA)
         - 1st Prize Winner — State-Level Project Competition (Digital Document Service Portal)
         - 4iBiz Techno-Solutions Internship Certification
         - Python for Data Science (NPTEL Elite Certificate)
         - Full-Stack Web Development Specialization
         - Cyber Hunt Technical Lead & Event Architecture
  </action>
  <verify>
    node -e "const p = require('./src/data/profile.js'); const e = require('./src/data/experience.js'); const s = require('./src/data/skills.js'); const c = require('./src/data/credentials.js'); if (!p.PROFILE_DATA || !p.HERO_METRICS || !p.STORY_CHAPTERS) throw new Error('Invalid profile.js'); if (e.EXPERIENCE_DATA.length !== 2) throw new Error('Expected 2 experience items'); if (s.SKILLS_DATA.length !== 4) throw new Error('Expected 4 skill clusters'); if (c.CREDENTIALS_DATA.length !== 6) throw new Error('Expected 6 credential items'); if (JSON.stringify(p).includes('phone')) throw new Error('Phone number must not be exposed'); console.log('Profile, Experience, Skills, Credentials OK');"
  </verify>
  <done>
    `profile.js`, `experience.js`, `skills.js`, and `credentials.js` export clean structured data without personal phone numbers.
  </done>
</task>

<task type="auto">
  <name>Flagship Projects & Architecture Console Verification Traces</name>
  <files>
    src/data/projects.js
    src/data/architecture.js
  </files>
  <action>
    Extract project contracts and architecture code tabs with verification traces:

    1. Create `src/data/projects.js`:
       - Export `PROJECTS_DATA` containing 4 flagship projects:
         - `Digital Document Service Portal`:
           - Tag: "ERP & Workflow Automation"
           - Title: "Digital Document Service Portal"
           - Metrics: ["1st Prize State-Level", "2,000+ Active Users", "Zero-Knowledge Security"]
           - Description: "Production-grade university document issuance and verification system featuring deterministic approval state machines, cryptographic hash validation, and real-time audit logging."
           - Image: "/assets/projects/document-portal-dashboard.png" (clean path without spaces)
           - Dimensions: width: 1917, height: 987
           - Tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "HMAC SHA-256"]
           - CaseStudyUrl: "/case-studies/document-portal.html"
           - RepoUrl: "https://github.com/sagarkharbikar25/digital-document-portal"
           - DemoUrl: null
         - `Gig Flow`:
           - Tag: "Fintech & Escrow Systems"
           - Title: "Gig Flow"
           - Metrics: ["Escrow Contracts", "Multi-Party Settlement", "Instant Verification"]
           - Description: "Freelance marketplace platform with milestone-based escrow contracts, dual-approval release workflows, and real-time transaction reconciliation."
           - Image: "/assets/projects/gig-flow.jpg"
           - Dimensions: width: 1376, height: 768
           - Tech: ["Node.js", "Express", "PostgreSQL", "Redis", "JWT", "Stripe API"]
           - CaseStudyUrl: null
           - RepoUrl: null (truthful null; avoid linking to GitHub profile root)
           - DemoUrl: null
           - Note: "Architecture and source code available upon request"
         - `Cyber Hunt`:
           - Tag: "Security & CTF Infrastructure"
           - Title: "Cyber Hunt"
           - Metrics: ["500+ Participants", "Real-Time Leaderboard", "Zero Downtime"]
           - Description: "National-level cryptographic capture-the-flag platform hosting containerized challenge environments, dynamic hint penalties, and anti-tamper score telemetry."
           - Image: "/assets/projects/cyber-hunt.jpg"
           - Dimensions: width: 1376, height: 768
           - Tech: ["Python", "Flask", "Docker", "Redis", "WebSockets"]
           - CaseStudyUrl: null
           - RepoUrl: null (truthful null)
           - DemoUrl: null
           - Note: "Event architecture and post-mortem available upon request"
         - `SAAR`:
           - Tag: "Edge AI & Voice Systems"
           - Title: "SAAR"
           - Metrics: ["< 45ms Latency", "100% Offline Edge", "Zero Data Leaks"]
           - Description: "Autonomous on-device voice assistant and system automation agent powered by local Whisper neural speech models and custom hardware telemetry pipelines."
           - Image: "/assets/projects/saar-assistant.png" (clean unified path)
           - Dimensions: width: 1918, height: 1142
           - Tech: ["Python", "Whisper AI", "PyTorch", "PyQt5", "Ollama", "System APIs"]
           - CaseStudyUrl: null
           - RepoUrl: "https://github.com/sagarkharbikar25/saar-voice-assistant"
           - DemoUrl: null
       - AVOID: Setting `repoUrl` or `demoUrl` to `https://github.com/sagarkharbikar25` profile root pretending it is a project repository.
       - USE: Null values and descriptive notes so UI renders honest recruiter controls.

    2. Create `src/data/architecture.js`:
       - Export `ARCHITECTURE_PRINCIPLES`:
         - Clean Contracts & Fault Isolation
         - Deterministic State Machines
         - Local-First AI & Zero-Knowledge Storage
       - Export `CODE_TABS`:
         - `DocumentStatePipeline.ts`: TypeScript state machine validating transition rules, role authorization, and HMAC verification.
         - `SaarNeuralPipeline.py`: Python edge inference pipeline loading Whisper wake-word model and processing voice intents.
         - `SystemHealth.sh`: Bash audit script inspecting CPU memory pressure, container health, disk space, and TLS certificates.
       - Export `VERIFICATION_TRACES` mapping each tab to empirical test/benchmark telemetry:
         - `DocumentStatePipeline.ts`: "✔ 14 transition tests passed | 0 regressions | HMAC verified in 1.18ms"
         - `SaarNeuralPipeline.py`: "✔ Wake-word engine ready | Whisper-base CPU inference: 42.4ms | Intent confidence: 0.984"
         - `SystemHealth.sh`: "✔ System check PASS | Load avg: 0.18 | Memory: 41% | Docker: 4/4 containers healthy"
  </action>
  <verify>
    node -e "const pr = require('./src/data/projects.js'); const arc = require('./src/data/architecture.js'); if (pr.PROJECTS_DATA.length !== 4) throw new Error('Expected 4 projects'); pr.PROJECTS_DATA.forEach(p => { if (!p.width || !p.height) throw new Error('Missing dimensions on project ' + p.title); }); if (!arc.CODE_TABS || !arc.VERIFICATION_TRACES) throw new Error('Missing architecture exports'); if (!arc.VERIFICATION_TRACES['DocumentStatePipeline.ts']) throw new Error('Missing verification trace for DocumentStatePipeline'); console.log('Projects and Architecture data OK');"
  </verify>
  <done>
    `projects.js` exports 4 projects with explicit dimensions and honest links, and `architecture.js` provides code tabs and empirical verification telemetry.
  </done>
</task>

## Must-Haves
After all tasks complete, verify:
- [ ] `src/data/profile.js` exports `PROFILE_DATA`, `HERO_METRICS`, and `STORY_CHAPTERS` without phone numbers.
- [ ] `src/data/experience.js` exports 4iBiz and TechAlfa experiences.
- [ ] `src/data/projects.js` exports 4 flagship projects with clean asset paths and width/height dimensions.
- [ ] `src/data/architecture.js` exports code tabs and per-tab `VERIFICATION_TRACES`.
- [ ] All data modules use clean CommonJS/ESM compatible exports verifiable by Node.

## Success Criteria
- [ ] All tasks verified passing via Node script assertions.
- [ ] Must-haves confirmed.
- [ ] Zero undefined fields or syntax errors in data modules.
