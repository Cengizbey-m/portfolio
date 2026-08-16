/**
 * Structured resume content, deliberately kept to ONE page.
 *
 * The portfolio case studies carry the depth. A resume gets about six seconds
 * of attention, so every bullet here has to earn its line. When something new
 * goes in, something else comes out.
 *
 * Written for humans first, but keyword coverage is intentional: most postings
 * are filtered by an ATS before a person reads them.
 */

export const resumeSummary =
  "Full-stack developer shipping production software people actually use. Built and maintain a booking and payments platform taking live Stripe transactions for a client with a 1.2M-follower audience. On a year-long capstone ranked #1 of 50+ projects, found a critical authentication flaw in the live API and built the gateway, token verification, and rate limiting that closed it. Canadian permanent resident in the Greater Toronto Area.";

export type ResumeRole = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string;
};

export const experience: ResumeRole[] = [
  {
    title: "Full-Stack Developer (Contract)",
    org: "TheTripMan / Trvoo",
    location: "Greater Toronto Area",
    period: "2025 – Present",
    bullets: [
      "Sole developer of a live booking and payments platform for a transportation business with a 1.2M-follower audience, maintained under a revenue-share agreement.",
      "Integrated Stripe checkout with webhook-driven confirmation, so a booking commits only after payment settles and unpaid reservations never reach the database.",
      "Replaced DM and phone-based booking with an authenticated admin dashboard, ending the client's daily dependency on a developer.",
      "Modelled the PostgreSQL schema with Prisma and ship changes against live traffic, with Jest and jest-axe tests enforced by pre-commit hooks and CI.",
    ],
    tech: "Next.js 15, TypeScript, Tailwind, Stripe, PostgreSQL, Prisma, Vercel, Jest",
  },
  {
    title: "Software Developer, Capstone (Team of 4)",
    org: "Feather, Sheridan College",
    location: "Oakville, ON",
    period: "2025 – 2026",
    bullets: [
      "Ranked #1 of 50+ projects at the 2026 capstone showcase, graded 97/100, delivered over a full academic year.",
      "Found a critical authentication flaw in the live API: it accepted a client-supplied header as proof of identity, letting any caller read or write any account. Verified it against production before designing the fix.",
      "Built the API gateway that closed it on Vercel edge functions, verifying Firebase ID tokens against Google's JWKS, discarding client-supplied identity, and adding allowlist routing plus dual-window rate limiting on shared PostgreSQL counters.",
      "Audited the database, found 12 tables running without Row Level Security including user profiles, and shipped the migration that enabled it.",
    ],
    tech: "TypeScript, React, Vercel Edge Functions, Firebase Auth, PostgreSQL, Supabase, FastAPI, Python, Docker, GitHub Actions",
  },
  {
    title: "Web Developer (Contract)",
    org: "Puffy Patisserie",
    location: "Greater Toronto Area",
    period: "2026",
    bullets: [
      "Took a local business with no online presence to a launched, mobile-first site, built at phone width first because that is where local discovery happens.",
    ],
    tech: "Next.js, TypeScript, Tailwind CSS, Vercel",
  },
];

export const sideProjects: ResumeRole[] = [
  {
    title: "Bloom, Cloud-Synced Life Planner",
    org: "bloom-cal.vercel.app",
    location: "Sole developer and designer",
    period: "2026 – Present",
    bullets: [
      "Launched a complete planner covering calendar, tasks, habits, notes, journal, goals, and a focus timer, live and in daily use.",
      "Built an offline-first sync layer where writes commit locally and sync to PostgreSQL on a debounce, with Realtime subscriptions propagating edits across every signed-in device and Row Level Security isolating accounts across 10 tables.",
    ],
    tech: "React 18, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind, Workbox (PWA)",
  },
  {
    title: "Le Pathétique, Multimodal AI Application",
    org: "BearHacks 2026",
    location: "Solo build, one weekend",
    period: "2026",
    bullets: [
      "Chained Google Cloud Vision, Gemini Flash, and ElevenLabs into one pipeline turning a photo into spoken critique and generated recipes, with an offline fallback so the demo survives a failed third-party API.",
    ],
    tech: "Next.js 16, React 19, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
  },
];

export const skills: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, Java, C#, SQL, HTML, CSS",
  },
  {
    label: "Frontend",
    items: "React, Next.js (App Router), Tailwind CSS, shadcn/ui, Vite, PWA",
  },
  {
    label: "Backend & Data",
    items: "Node.js, Express, FastAPI, REST API design, JWT auth, Stripe, PostgreSQL, Prisma, Supabase, MongoDB",
  },
  {
    label: "Infrastructure",
    items: "Docker, Git, GitHub Actions, CI/CD, Vercel, Google Cloud Run, Linux, Jest, Vitest, pytest",
  },
  {
    label: "Security & Networks",
    items: "Firebase Auth, JWKS verification, Row Level Security, rate limiting, CORS/CSP, TCP/IP, subnetting, IPv6",
  },
];
