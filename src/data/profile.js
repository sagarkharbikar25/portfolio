/**
 * Profile, Identity, Hero Metrics & Narrative Chapters
 * Verified career and identity data for Sagar Kharbikar.
 * Phone numbers omitted per SPEC.md:61 to prevent web scraping.
 */

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

export const HERO_METRICS = [
  { id: "erp", label: "Production ERP", value: "1st Prize", detail: "State-Level Award & Live University Deployment" },
  { id: "cgpa", label: "B.Tech CSE", value: "8.70", detail: "Top Academic Standing · Core CS Fundamentals" },
  { id: "intern", label: "4iBiz Intern", value: "Full-Stack", detail: "Production APIs, State Workflows & Dashboards" },
  { id: "ai", label: "Local AI Systems", value: "Neural Ops", detail: "Real-Time Edge Voice, LLMs & Vector Pipelines" }
];

export const STORY_CHAPTERS = [
  {
    id: "act-1",
    num: "I",
    title: "Act I: The Threshold",
    label: "The Threshold",
    range: [0, 0.20],
    description: "The metallic gold and cyan identity crest, availability badge, and recruiter quick-actions."
  },
  {
    id: "act-2",
    num: "II",
    title: "Act II: Awakening the Skyline",
    label: "Awakening the Skyline",
    range: [0.20, 0.40],
    description: "Layered data-citadel monoliths, glowing energy conduits, and systems engineering thesis."
  },
  {
    id: "act-3",
    num: "III",
    title: "Act III: Crossing the Aether",
    label: "Crossing the Aether",
    range: [0.40, 0.58],
    description: "Atmospheric perspective mist sweep bridging into the command sanctum."
  },
  {
    id: "act-4",
    num: "IV",
    title: "Act IV: The Observatory",
    label: "The Observatory",
    range: [0.58, 0.80],
    description: "Full-bleed WebGL 3D arcane observatory dome and 3 interactive command pillars."
  },
  {
    id: "act-5",
    num: "V",
    title: "Act V: Engineering Dossiers",
    label: "Engineering Dossiers",
    range: [0.80, 1.00],
    description: "Comprehensive engineering proof: production experience, flagship systems, code contracts, and credentials."
  }
];
