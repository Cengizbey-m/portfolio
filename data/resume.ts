/**
 * Structured resume content. Drives the /resume page, which is styled to print
 * cleanly to PDF (Ctrl/Cmd+P → Save as PDF) so this file is the single source
 * of truth for both the web and paper versions.
 *
 * Written for humans first, but keyword coverage is deliberate: most postings
 * are filtered by an ATS before a person reads them.
 */

export const resumeSummary =
  "Full-stack developer with an advanced diploma in Software Development and Network Engineering and a track record of shipping software that people use. Built and maintain a booking and payments platform processing live Stripe transactions for a client with a 1.2M-follower audience. On a year-long capstone ranked #1 of 50+ projects, I found and fixed a critical authentication flaw and built the API gateway, token verification, and rate limiting that now protect the service. Also designed and launched Bloom, a cloud-synced planner with offline support and realtime multi-device sync. Canadian permanent resident, available across the Greater Toronto Area or remote.";

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
      "Sole developer of a production booking and payments platform for a transportation business with a 1.2M-follower audience. Live, taking real payments, maintained under a revenue-share agreement.",
      "Integrated Stripe checkout with webhook-driven confirmation, so a booking is committed only after payment settles. Unpaid reservations can no longer reach the database.",
      "Replaced DM and phone-based booking management with an authenticated admin dashboard, ending the client's daily dependency on a developer.",
      "Modelled the PostgreSQL schema with Prisma, automated confirmation email and calendar invites, and ship schema changes against live traffic.",
      "Added Jest and jest-axe accessibility tests enforced by Husky pre-commit hooks and CI.",
    ],
    tech: "Next.js 15, TypeScript, Tailwind, Stripe, PostgreSQL, Prisma, Resend, Vercel, Jest",
  },
  {
    title: "Web Developer (Contract)",
    org: "Puffy Patisserie",
    location: "Greater Toronto Area",
    period: "2026",
    bullets: [
      "Took a local business with no online presence to a launched, mobile-first site covering products, location, and hours, built at phone width first because that is where local discovery happens.",
      "Currently adding a QR-code in-store menu and a Google Business listing to capture local search traffic.",
    ],
    tech: "Next.js, TypeScript, Tailwind CSS, Vercel",
  },
  {
    title: "Software Developer, Capstone (Team of 4)",
    org: "Feather, Sheridan College",
    location: "Oakville, ON",
    period: "2025 – 2026",
    bullets: [
      "Ranked #1 of 50+ projects at the 2026 capstone showcase, graded 97/100 in the final term. Delivered over a full academic year with a team of four.",
      "Found a critical authentication flaw in the live API: it accepted a client-supplied header as proof of identity, letting any caller read or write any account. Verified it against production before designing the fix.",
      "Built the API gateway that closed it, on Vercel edge functions. It verifies Firebase ID tokens against Google's JWKS, discards client-supplied identity, and rewrites user fields in request bodies so neither channel can be spoofed.",
      "Added allowlist routing so undeclared paths return 404 without reaching the backend, and dual-window rate limiting backed by shared PostgreSQL counters, replacing a service that had no limiting at all.",
      "Audited the database, found 12 tables running without Row Level Security including user profiles, and shipped the migration that enabled it.",
      "Repaired a CI pipeline that had been failing on every run, then cleared the 129 lint errors and 5 test failures hidden behind it.",
      "Earlier in the project, owned the model evaluation layer that scores predictions against naive baselines, and defined the API contract between the Python service and the React client.",
    ],
    tech: "TypeScript, React, Vercel Edge Functions, Firebase Auth, PostgreSQL, Supabase, FastAPI, Python, Docker, GitHub Actions, Vitest, pytest",
  },
];

export const sideProjects: ResumeRole[] = [
  {
    title: "Bloom, Cloud-Synced Life Planner (live product)",
    org: "Independent product · bloom-cal.vercel.app",
    location: "Sole developer and designer",
    period: "2026 – Present",
    bullets: [
      "Designed, built, and launched a complete planner covering seven connected modules: calendar, tasks, habits, notes, journal, goals, and a focus timer. Live and in daily use.",
      "Built an offline-first sync layer where writes commit to local state immediately and sync to PostgreSQL on a debounce, so the interface never waits on the network and keeps working with no connection at all.",
      "Added Realtime subscriptions so edits reach every signed-in device within seconds, and enforced Row Level Security across 10 tables so accounts are isolated at the database layer rather than by client-side checks.",
      "Shipped as an installable PWA with Workbox, using Google OAuth for sign-in and DOMPurify to sanitize user-authored markdown.",
    ],
    tech: "React 18, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind CSS v4, Workbox",
  },
  {
    title: "Le Pathétique, Multimodal AI Application",
    org: "BearHacks 2026",
    location: "Solo build",
    period: "2026",
    bullets: [
      "Built a multimodal pipeline chaining Google Cloud Vision, Gemini Flash, and ElevenLabs to turn a photo into spoken critique and generated recipes, solo, in one weekend.",
      "Implemented a graceful offline fallback mode so the application degrades predictably when a third-party API is unavailable.",
    ],
    tech: "Next.js 16, React 19, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
  },
];

export const skills: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, Java, C#, SQL, C, HTML, CSS",
  },
  {
    label: "Frontend",
    items: "React, Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion, Vite, PWA",
  },
  {
    label: "Backend",
    items: "Node.js, Express, FastAPI, REST API design, JWT authentication, role-based access control, Stripe",
  },
  {
    label: "Data",
    items: "PostgreSQL, Prisma, Supabase, MongoDB, SQLAlchemy, schema design, migrations",
  },
  {
    label: "Infrastructure & Tools",
    items: "Docker, Git, GitHub Actions, CI/CD, Vercel, Linux, Jest, jest-axe, Postman",
  },
  {
    label: "Networking & Security",
    items: "TCP/IP, subnetting, IPv6, DNS, cloud-enabled networks, Row Level Security, OWASP fundamentals",
  },
];
