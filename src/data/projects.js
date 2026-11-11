/**
 * Flagship Engineering Projects
 * Verified deliverables with explicit dimensions for CLS prevention and honest recruiter links.
 */

export const PROJECTS_DATA = [
  {
    id: "document-portal",
    tag: "ERP & Workflow Automation",
    title: "Digital Document Service Portal",
    badge: "1ST PRIZE (STATE LEVEL)",
    metrics: ["1st Prize State-Level", "2,000+ Active Users", "Zero-Knowledge Security"],
    description: "Production-grade university document issuance and verification system featuring deterministic approval state machines, cryptographic hash validation, and real-time audit logging.",
    image: "/assets/projects/document-portal-dashboard.png",
    width: 1917,
    height: 987,
    dimensions: { width: 1917, height: 987 },
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "HMAC SHA-256"],
    caseStudyUrl: "/case-studies/document-portal.html",
    repoUrl: "https://github.com/sagarkharbikar25/digital-document-portal",
    demoUrl: null,
    note: null
  },
  {
    id: "gig-flow",
    tag: "Fintech & Escrow Systems",
    title: "Gig Flow",
    badge: "ESCROW CONTRACTS",
    metrics: ["Escrow Contracts", "Multi-Party Settlement", "Instant Verification"],
    description: "Freelance marketplace platform with milestone-based escrow contracts, dual-approval release workflows, and real-time transaction reconciliation.",
    image: "/assets/projects/gig-flow.jpg",
    width: 1376,
    height: 768,
    dimensions: { width: 1376, height: 768 },
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "JWT", "Stripe API"],
    caseStudyUrl: null,
    repoUrl: null,
    demoUrl: null,
    note: "Architecture and source code available upon request"
  },
  {
    id: "cyber-hunt",
    tag: "Security & CTF Infrastructure",
    title: "Cyber Hunt",
    badge: "NATIONAL CTF PLATFORM",
    metrics: ["500+ Participants", "Real-Time Leaderboard", "Zero Downtime"],
    description: "National-level cryptographic capture-the-flag platform hosting containerized challenge environments, dynamic hint penalties, and anti-tamper score telemetry.",
    image: "/assets/projects/cyber-hunt.jpg",
    width: 1376,
    height: 768,
    dimensions: { width: 1376, height: 768 },
    tech: ["Python", "Flask", "Docker", "Redis", "WebSockets"],
    caseStudyUrl: null,
    repoUrl: null,
    demoUrl: null,
    note: "Event architecture and post-mortem available upon request"
  },
  {
    id: "saar-assistant",
    tag: "Edge AI & Voice Systems",
    title: "SAAR",
    badge: "EDGE AI ARCHITECTURE",
    metrics: ["< 45ms Latency", "100% Offline Edge", "Zero Data Leaks"],
    description: "Autonomous on-device voice assistant and system automation agent powered by local Whisper neural speech models and custom hardware telemetry pipelines.",
    image: "/assets/projects/saar-assistant.png",
    width: 1918,
    height: 1142,
    dimensions: { width: 1918, height: 1142 },
    tech: ["Python", "Whisper AI", "PyTorch", "PyQt5", "Ollama", "System APIs"],
    caseStudyUrl: null,
    repoUrl: "https://github.com/sagarkharbikar25/saar-voice-assistant",
    demoUrl: null,
    note: null
  }
];
