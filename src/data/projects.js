export const MAX_PROJECTS = 6;

export const PROJECTS = [
  {
    id: 'document-portal',
    index: '01 / 04',
    category: 'ERP STATE MACHINE',
    headerAccent: 'gold',
    title: 'Digital Document Service Portal',
    award: '1st Prize — College Mini-Project Competition (2025)',
    awardTone: 'gold',
    image: '/assets/projects/document-portal.webp',
    imageWidth: 1280,
    imageHeight: 659,
    imageAlt: 'Digital Document Service Portal Administrative Dashboard',
    outcomeLead:
      '1st Prize (College Mini-Project Competition 2025): Replaced paper certificate workflows with atomic approval preconditions, QR verification, and queryable audit logs.',
    summary:
      'ERP-style portal that moves academic document requests from paper to a tracked, auditable workflow.',
    problem:
      'Certificates, verifications, and transcripts were handled on paper. Requests got lost, applicants could not see status, and there was no audit trail.',
    specs: [
      {
        label: 'Role-Based Access Control',
        detail:
          'Four scoped roles (Applicant, Clerk, Verifier, Admin), each limited strictly to its own domain actions.',
      },
      {
        label: 'Approval State Machine',
        detail:
          'Modelled lifecycle: SUBMITTED → UNDER_REVIEW → VERIFIED → APPROVED → ISSUED / REJECTED. Invalid transitions rejected in service layer.',
      },
      {
        label: 'QR-Code Verification',
        detail:
          'Instant tamper-proof physical authenticity validation for issued documents.',
      },
      {
        label: 'Tamper-Proof Audit Trail',
        detail:
          'Every state change appends actor ID, timestamp, and previous/new state to a queryable log.',
      },
    ],
    decisionTitle: 'Key Architecture Decision',
    decisionText:
      'Transitions execute an atomic conditional query (precondition lock) ensuring two verifiers cannot simultaneously approve a request. Stack evolution: built originally with PHP MVC & PostgreSQL; expanded with Node.js, Express, and MongoDB for modern API service orchestration.',
    stack: ['PHP MVC', 'PostgreSQL', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    links: [
      {
        label: 'Source Code',
        href: 'https://github.com/sagarkharbikar25/digital-document-portal',
        external: true,
        primary: false,
      },
      {
        label: 'Read Architecture Case Study',
        href: '/case-studies/document-portal.html',
        external: false,
        primary: true,
      },
    ],
  },
  {
    id: 'gig-flow',
    index: '02 / 04',
    category: 'RBAC LEAD CRM',
    headerAccent: 'emerald',
    title: 'Gig Flow — Smart Leads Dashboard',
    award: 'Live MERN Application (2026)',
    awardTone: 'emerald',
    image: '/assets/projects/gig-flow.webp',
    imageWidth: 1280,
    imageHeight: 714,
    imageAlt: 'Gig Flow Smart Leads Dashboard Preview',
    outcomeLead:
      'Live MERN CRM (2026): Enforced API-layer JWT & RBAC isolation between Admin and Sales roles with server-side paginated search and CSV export.',
    summary:
      'Full-stack MERN dashboard for managing sales leads with secure, role-aware access.',
    problem:
      'Sales teams needed a responsive, debounced lead tracking system that enforces privilege boundaries without leaking customer contact data to unauthorized roles.',
    specs: [
      {
        label: 'JWT & RBAC Security',
        detail:
          'Protected REST APIs with strict role segregation (Admin vs. Sales), preventing unauthenticated data extraction.',
      },
      {
        label: 'High-Performance Pipeline',
        detail:
          'Server-side pagination, multi-criteria filtering, debounced search, and instant CSV data export.',
      },
      {
        label: 'Modular Component System',
        detail:
          'Reusable TypeScript components built for maintainability and responsive CRM workflows.',
      },
    ],
    decisionTitle: 'Key Architecture Decision',
    decisionText:
      'Enforced role-based authorization at the API routing layer rather than merely hiding UI controls in the client. Server-side pagination and indexed filter fields ensure low latency under large lead datasets.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    links: [
      {
        label: 'GitHub Profile (Repo on Request)',
        href: 'https://github.com/sagarkharbikar25',
        external: true,
        primary: false,
      },
      {
        label: 'Request Live Demo',
        href: 'mailto:sagarkharbikar25@gmail.com?subject=Gig%20Flow%20Demo%20%26%20Repo%20Request',
        external: false,
        primary: true,
      },
    ],
  },
  {
    id: 'cyber-hunt',
    index: '03 / 04',
    category: 'COMPETITION INFRA',
    headerAccent: 'cyan',
    title: 'Cyber Hunt — Online Treasure Hunt Platform',
    award: 'Live Event Platform (2026)',
    awardTone: 'cyan',
    image: '/assets/projects/cyber-hunt.webp',
    imageWidth: 1280,
    imageHeight: 714,
    imageAlt: 'Cyber Hunt Competition Platform Preview',
    outcomeLead:
      'Survived live competition traffic surge: Resolved serverless PostgreSQL exhaustion via PgBouncer pooling, Redis hot-leaderboard caching, and rate limiting.',
    summary:
      'Live competition platform for technical events: authentication, progressive questions, real-time scoring, admin controls.',
    problem:
      'Technical event required high-concurrency real-time clue solving without leaking questions in client bundles or allowing leaderboard tampering.',
    specs: [
      {
        label: 'Progressive Question Engine',
        detail:
          'Server-validated dynamic clue progression with role-based admin controls.',
      },
      {
        label: 'Real-Time Leaderboard',
        detail:
          'Live scoring and solve ranking database integration, deployed on Vercel for live collegiate events.',
      },
      {
        label: 'Admin Control Center',
        detail:
          'Real-time oversight for event organizers to monitor participant pacing and arbitrate disputes.',
      },
    ],
    decisionTitle: 'Engineering Post-Mortem & Fix',
    decisionText:
      'Symptom & Root Cause: During a live event surge, burst serverless function invocations exhausted direct PostgreSQL connection limits. Fix: Switched to connection-pooled Supabase infrastructure (PgBouncer), introduced Redis caching for hot leaderboard queries, and applied rate-limiting on answer submissions.',
    isPostMortem: true,
    postMortem: {
      symptom:
        'During a live collegiate event surge, burst serverless invocations exhausted direct PostgreSQL connections.',
      fix:
        'Moved to Supabase connection-pooled endpoints (PgBouncer), added Redis caching for hot leaderboard queries, and applied answer submission rate limiting.',
      stack: 'Next.js · Supabase PgBouncer · Redis · Vercel',
    },
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Redis', 'Vercel'],
    links: [
      {
        label: 'GitHub Profile',
        href: 'https://github.com/sagarkharbikar25',
        external: true,
        primary: false,
      },
      {
        label: 'Request Post-Mortem Notes',
        href: 'mailto:sagarkharbikar25@gmail.com?subject=Cyber%20Hunt%20Architecture%20Notes',
        external: false,
        primary: true,
      },
    ],
  },
  {
    id: 'saar-ai',
    index: '04 / 04',
    category: 'LOCAL VOICE AI',
    headerAccent: 'ice',
    title: 'SAAR — AI Personal Assistant',
    award: 'Ongoing (Jan 2026 – Present)',
    statusLabel: 'STATUS: IN DEVELOPMENT',
    awardTone: 'gold',
    image: '/assets/projects/saar.webp',
    imageWidth: 1280,
    imageHeight: 762,
    imageAlt: 'SAAR AI Voice Assistant Architecture & UI',
    outcomeLead:
      'Status: In Development — Local Whisper + Piper TTS pipeline (<1.4s TTFB) with Twilio HMAC verification, caller allowlists, and strict command whitelists.',
    summary:
      'Voice-controlled personal assistant for hands-free system control and remote commands.',
    problem:
      'Voice assistants typically suffer high roundtrip cloud latency and introduce privacy risks when executing privileged system commands.',
    specs: [
      {
        label: 'Local Speech Pipeline',
        detail:
          'Speech-to-text, wake-word detection, and text-to-speech with <1.4s TTFB on local hardware.',
      },
      {
        label: 'Remote Command Dispatch',
        detail:
          'Modular FastAPI backend integrating Twilio webhooks for remote system task execution.',
      },
      {
        label: 'OpenCV Presence Detection',
        detail:
          'Real-time camera feed monitor that triggers automatic system lock upon user absence.',
      },
    ],
    decisionTitle: 'Key Architecture Decision (Security)',
    decisionText:
      'Remote command execution is strictly bounded: validates Twilio webhook HMAC signatures, checks incoming numbers against an explicit allowlist, restricts commands to a predefined whitelist matrix, and logs all execution attempts with immutable timestamps.',
    stack: ['Python', 'FastAPI', 'OpenCV', 'Twilio', 'Local Whisper', 'Piper TTS'],
    links: [
      {
        label: 'Source Code',
        href: 'https://github.com/sagarkharbikar25/saar-voice-assistant',
        external: true,
        primary: true,
      },
    ],
  },
];

const HEADER_ACCENT_ROTATION = ['gold', 'emerald', 'cyan', 'ice', 'violet', 'cyan'];

export function getDeckProjects() {
  const list = PROJECTS.slice(0, MAX_PROJECTS);
  const total = String(list.length).padStart(2, '0');
  return list.map((project, idx) => ({
    ...project,
    deckIndex: `${String(idx + 1).padStart(2, '0')} / ${total}`,
    category: project.category || 'SYSTEM BUILD',
    headerAccent:
      project.headerAccent || HEADER_ACCENT_ROTATION[idx % HEADER_ACCENT_ROTATION.length],
  }));
}
