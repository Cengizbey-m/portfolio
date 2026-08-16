/**
 * Structured resume content, deliberately kept to ONE page.
 *
 * Layout follows the version that was already working: contact block with a
 * phone number, then skills near the top where both a recruiter's eye and an
 * ATS look first, then paid work, then projects, then education.
 *
 * A resume gets about six seconds. Every bullet has to earn its line, so when
 * something new goes in, something else comes out.
 */

/** Contact details that belong on paper, including the ones the site does not show. */
export const resumeContact = {
  phone: "+1 437-260-2183",
  website: "muhammedcengiz.vercel.app",
  location: "Oakville, ON, Canada",
};

export const resumeSummary =
  "Full-stack developer who ships production software end to end. Built and deployed a live booking and payments platform solo for a client with a 1.2M-follower audience, now processing real customer bookings. Strong in TypeScript, React, and Next.js, with a networking and security foundation. Comfortable owning a feature from database to deployment.";

export type ResumeRole = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string;
};

export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "TypeScript, JavaScript, Python, C#, Java, SQL, Swift" },
  { label: "Frontend", items: "React, Next.js (App Router), Tailwind CSS, shadcn/ui, Vite" },
  { label: "Backend", items: ".NET (C#), Node/Express, FastAPI, Spring Boot, REST APIs, Stripe" },
  { label: "Databases", items: "PostgreSQL (Neon, Supabase), Prisma, MongoDB, Oracle, SQL Server" },
  { label: "Cloud & DevOps", items: "Vercel, Google Cloud Run, Docker, Git/GitHub, CI/CD, Linux/UNIX" },
  { label: "Other", items: "Firebase Auth, JWT/JWKS, Row Level Security, Jest/Vitest, Machine Learning, iOS (Swift)" },
];

export const experience: ResumeRole[] = [
  {
    title: "Freelance Full-Stack Developer",
    org: "TheTripMan (Contract, revenue-share)",
    location: "Remote",
    period: "Aug 2025 – Present",
    bullets: [
      "Designed, built, and deployed a full booking and payments platform solo for an influencer-led transportation business with a ~1.2M-follower audience, using Next.js 15, TypeScript, Prisma, and Neon PostgreSQL.",
      "Integrated Stripe end to end with webhook-driven confirmation, an authenticated admin dashboard for booking management, and automated email and calendar confirmations.",
      "Shipped to production on Vercel with GA4 analytics, jest-axe accessibility tests, and a Husky CI pipeline. The platform processes live bookings, generating $1,000+ in revenue across 11+ bookings in a recent month.",
    ],
  },
  {
    title: "Freelance Web Developer",
    org: "Puffy (Client)",
    location: "Greater Toronto Area",
    period: "2026",
    bullets: [
      "Designed and shipped a mobile-first marketing site for a local dessert business with no prior web presence; QR-code menu and Google Business integration in progress.",
    ],
  },
];

export const sideProjects: ResumeRole[] = [
  {
    title: "Feather · AI Market Insights Platform",
    org: "Capstone, team of 4 · Ranked #1 of 50+ projects",
    location: "React · TypeScript · FastAPI · Vercel Edge · Firebase Auth · PostgreSQL · Docker",
    period: "2025 – 2026",
    bullets: [
      "Judged first overall out of 50+ projects at the 2026 capstone showcase, graded 97/100, delivered across a full academic year.",
      "Found a critical authentication flaw in the live API, which accepted a client-supplied header as proof of identity and let any caller read or write any account. Verified it against production, then built the Vercel edge gateway that closed it: Firebase ID token verification against Google's JWKS, allowlist routing, and dual-window rate limiting on shared PostgreSQL counters.",
      "Audited the database, found 12 tables running without Row Level Security including user profiles, and shipped the migration that enabled it.",
    ],
  },
  {
    title: "Bloom · Cloud-Synced Life Planner",
    org: "Independent product · bloom-cal.vercel.app",
    location: "React 18 · TypeScript · Supabase · PostgreSQL · Zustand · PWA",
    period: "2026 – Present",
    bullets: [
      "Launched a complete planner covering calendar, tasks, habits, notes, journal, goals, and focus timing, live and in daily use.",
      "Built an offline-first sync layer where writes commit locally then sync to PostgreSQL on a debounce, with Realtime subscriptions across devices and Row Level Security isolating accounts across 10 tables.",
    ],
  },
  {
    title: "Le Pathétique · Multimodal AI Web App",
    org: "BearHacks 2026 · Solo",
    location: "Next.js · TypeScript · Google Vision · Gemini · ElevenLabs",
    period: "2026",
    bullets: [
      "Built a solo hackathon app that critiques a photo of your cooking: image to Vision labeling to Gemini critique to ElevenLabs voice, in one weekend. Engineered an offline mock mode so the live demo survives venue Wi-Fi or API failures.",
    ],
  },
];
