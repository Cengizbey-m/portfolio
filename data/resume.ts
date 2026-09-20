/**
 * Resume content, built for ATS parsing first and a human skim second.
 *
 * Rules this file follows:
 *  - Single column, standard section names (Skills, Experience, Projects,
 *    Education, Certifications). Creative headings confuse parsers.
 *  - Every bullet opens with an action verb and, wherever a real number exists,
 *    states the outcome rather than the activity.
 *  - Technology names are spelled the way postings spell them (TypeScript, not
 *    TS; PostgreSQL, not Postgres) so keyword matching actually hits.
 *  - One A4 page, filled. Nothing goes in without something coming out.
 *
 * THREE VARIANTS, one sheet each. The contact block, education, and
 * certifications are shared; what changes per variant is the title line under
 * the name, the summary, the order of the skills rows, and which bullets get
 * pulled forward. Same facts, different emphasis. Send the variant whose title
 * matches the posting, because title match is the first thing an ATS scores.
 *
 * Every bullet below is traceable to something that actually happened. If a
 * claim cannot be backed in an interview it does not belong here.
 */

export const resumeContact = {
  phone: "+1 437-260-2183",
  website: "muhammedcengiz.vercel.app",
  location: "Richmond Hill, ON (Greater Toronto Area)",
  linkedin: "linkedin.com/in/muhammed-cengiz",
  github: "github.com/Cengizbey-m",
};

/** Sits directly under the contact block. In Canada this is a screening gate. */
export const workAuthorization =
  "Canadian Permanent Resident. Authorized to work in Canada, no sponsorship required.";

export type ResumeLink = { label: string; href: string };

export type ResumeRole = {
  title: string;
  org: string;
  /** Technology line, shown under the heading. */
  tech?: string;
  location?: string;
  period: string;
  links?: ResumeLink[];
  bullets: string[];
};

export type ResumeVariantId = "fullstack" | "qa" | "solutions";

export type ResumeVariant = {
  id: ResumeVariantId;
  /** Shown on the switcher. */
  label: string;
  /** The title line printed under the name. Match this to the posting. */
  role: string;
  /** Suffix for the downloaded file name. */
  fileSuffix: string;
  /** Internal note: when to send this one. Never printed on the sheet. */
  sendWhen: string;
  summary: string;
  skills: { label: string; items: string }[];
  experience: ResumeRole[];
  projects: ResumeRole[];
};

/* ------------------------------------------------------------------ *
 * Role metadata, defined once. Only the bullets change per variant,
 * so the dates and employers can never drift out of sync between sheets.
 * ------------------------------------------------------------------ */

const tripman = (bullets: string[]): ResumeRole => ({
  title: "Contract Full-Stack Developer",
  org: "TheTripMan",
  location: "Remote, Ontario",
  period: "Aug 2025 - Present",
  // thetripman.com is the booking platform and the accurate brand for this
  // engagement. trvoo.com is the same company's rider-app marketing site, so
  // only one of the two earns the line on a one-page sheet.
  links: [{ label: "thetripman.com", href: "https://www.thetripman.com" }],
  bullets,
});

const puffy = (bullets: string[]): ResumeRole => ({
  title: "Freelance Web Developer",
  // The brand is "Puffy" (the site says so in its title and throughout its
  // copy). The domain is puuffy.ca, which is not a typo: it is the domain the
  // owner bought. Keep the two spellings straight.
  org: "Puffy",
  location: "Toronto, ON",
  period: "2026 - Present",
  links: [{ label: "puuffy.ca", href: "https://www.puuffy.ca" }],
  bullets,
});

const feather = (bullets: string[]): ResumeRole => ({
  title: "Feather, AI Market Insights Platform",
  org: "Capstone, team of 4",
  tech: "React, TypeScript, FastAPI, Python, Vercel Edge Functions, Firebase Auth, PostgreSQL, Docker",
  // "Present" rather than a 2026 end date: the team kept building after
  // graduation. The showcase result stays in the bullets.
  period: "2025 - Present",
  links: [{ label: "Live Demo", href: "https://www.feathertrade.org/" }],
  bullets,
});

const bloom = (bullets: string[]): ResumeRole => ({
  title: "Bloom, Cloud-Synced Life Planner",
  org: "Independent product",
  tech: "React, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind CSS, PWA",
  period: "2026 - Present",
  links: [{ label: "Live Demo", href: "https://bloom-cal.vercel.app" }],
  bullets,
});

const pathetique = (bullets: string[]): ResumeRole => ({
  title: "Le Pathetique, AI Cooking Critic Web App",
  org: "BearHacks 2026, solo build",
  tech: "Next.js, React, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
  period: "2026",
  links: [
    { label: "GitHub", href: "https://github.com/Cengizbey-m/Le-Pathetique" },
    { label: "DevPost", href: "https://devpost.com/software/le-pathetique" },
  ],
  bullets,
});

/* ------------------------------------------------------------------ *
 * Variant 1: Full-Stack Developer. The default, and the one that goes
 * out with roughly half of all applications.
 * ------------------------------------------------------------------ */

const fullstack: ResumeVariant = {
  id: "fullstack",
  label: "Full-Stack Developer",
  role: "Full-Stack Developer",
  fileSuffix: "Full-Stack-Developer",
  sendWhen:
    "Software Developer, Full-Stack Developer, Web Developer, Junior/Intermediate Developer, Frontend or Backend Developer.",
  summary:
    "Full-stack developer who ships production software end to end. Built and still runs a live booking and payments platform solo for a client with a 1.2M-follower audience, handling 11 to 13 customer bookings in a peak month. 2026 Sheridan graduate, capstone ranked #1 of 50+ projects. Strong in TypeScript, React, Next.js, PostgreSQL, and application security.",
  skills: [
    {
      label: "Languages",
      items: "TypeScript, JavaScript, Python, SQL, C#, Java, HTML/CSS",
    },
    {
      label: "Frontend",
      items: "React, Next.js, Tailwind CSS, Zustand, Vite, shadcn/ui, accessible UI",
    },
    {
      label: "Backend & Data",
      items: "Node.js, Express.js, FastAPI, .NET, REST APIs, PostgreSQL, Supabase, Prisma",
    },
    {
      label: "Cloud & DevOps",
      items: "AWS, Vercel, Docker, Google Cloud Run, GitHub Actions, CI/CD, Git, Jest, Vitest",
    },
    {
      label: "Security",
      items: "OAuth 2.0, JWT/JWKS verification, Row Level Security, rate limiting, TCP/IP, Linux",
    },
  ],
  experience: [
    tripman([
      "Engineered and deployed a booking and payments platform solo for a transportation business with a 1.2M-follower audience, now handling 11 to 13 customer bookings in a peak month under an active revenue-share contract.",
      "Integrated Stripe Checkout with webhook confirmation, ending unpaid reservations by confirming a booking only after payment settles.",
      // No hyphenated compound here on purpose: when one breaks across a line,
      // the PDF text layer extracts it welded together ("directmessage"), which
      // is exactly the kind of token an ATS fails to match.
      "Built an authenticated admin dashboard over a Prisma and PostgreSQL schema, replacing phone and direct message booking management and ending the client's daily dependency on a developer.",
      "Shipped to production on Vercel with automated email and calendar confirmations, jest-axe accessibility tests, and CI.",
    ]),
    puffy([
      "Built and still maintain the site for a Toronto patisserie on Spadina, taking it from no web presence to a mobile-first storefront now indexed in Google Search and Maps, with a QR-code in-store menu in progress.",
    ]),
  ],
  projects: [
    feather([
      "Ranked #1 of 50+ projects at the 2026 Sheridan capstone showcase, graded 97/100 over a full academic year.",
      "Identified and resolved a critical authentication vulnerability that let any caller read or write any user account, engineering a Vercel Edge gateway with Firebase ID token verification against Google JWKS and dual-window rate limiting.",
      "Remediated 12 tables running without Row Level Security, including user profile data, via SQL migration.",
    ]),
    bloom([
      "Launched a production planner covering calendar, tasks, habits, notes, journal, goals, and focus timing, in daily use.",
      "Engineered an offline-first sync layer committing writes to local state before debounced PostgreSQL persistence, with Realtime cross-device sync and Row Level Security isolating every account across 10 tables.",
    ]),
    pathetique([
      "Built a multimodal pipeline chaining Google Cloud Vision, Gemini, and ElevenLabs to turn a photo of a dish into spoken critique and recipes, with an offline fallback that survived venue network outages.",
    ]),
  ],
};

/* ------------------------------------------------------------------ *
 * Variant 2: QA Automation / SDET. Same facts, reordered so the testing,
 * CI, and defect-hunting work leads instead of trailing.
 *
 * Deliberately NOT framed as manual QA. Every bullet shows code.
 * ------------------------------------------------------------------ */

const qa: ResumeVariant = {
  id: "qa",
  label: "QA Automation / SDET",
  role: "QA Automation Engineer / Software Developer in Test",
  fileSuffix: "QA-Automation-SDET",
  sendWhen:
    "QA Automation Engineer, SDET, Test Automation Engineer, Quality Engineer, Software Engineer in Test. Skip manual-only QA postings.",
  summary:
    "Developer who finds defects by testing what is actually running. Found a critical authentication vulnerability in a live service by probing it against production, then built the fix. Repaired a CI pipeline that had failed on every run for months, clearing the 129 lint errors and 5 test failures behind it. 2026 Sheridan graduate, capstone ranked #1 of 50+ projects.",
  skills: [
    {
      label: "Testing",
      items: "Vitest, Jest, pytest, jest-axe, API and webhook testing, test planning",
    },
    {
      label: "CI/CD",
      items: "GitHub Actions, pipeline debugging, ESLint, pull request gates, Docker",
    },
    {
      label: "Languages",
      items: "TypeScript, JavaScript, Python, SQL, C#, Java",
    },
    {
      label: "Application",
      items: "React, Next.js, Node.js, Express.js, FastAPI, REST APIs, PostgreSQL, Prisma",
    },
    {
      label: "Security & Systems",
      items: "OAuth 2.0, JWT/JWKS, Row Level Security, rate limiting, TCP/IP, Linux",
    },
  ],
  experience: [
    tripman([
      "Own release quality end to end on a live payments platform handling 11 to 13 bookings in a peak month, with no QA team and no second pair of eyes on any change.",
      "Wrote jest-axe accessibility tests and wired them into CI so a regression fails the build rather than reaching a customer.",
      "Verified the Stripe payment path against real webhook delivery, so a reservation is confirmed only once payment settles rather than when the browser claims it did.",
      "Ship and validate every change against live production traffic, where a defect is a failed customer booking rather than a ticket in a backlog.",
    ]),
    puffy([
      "Built and tested the site for a Toronto patisserie across device sizes, tuning Core Web Vitals into its first search-indexed web presence, now live and maintained against an open storefront.",
    ]),
  ],
  projects: [
    feather([
      "Repaired a CI pipeline that had failed on every run for months, tracing it to an unresolvable ESLint config path and a missing test dependency, then clearing the 129 lint errors and 5 test failures behind it.",
      "Found a critical authentication defect by testing the running service rather than reading the code: the API trusted a client-supplied identity header, so any caller could read or write any account. Reproduced it against production first.",
      "Audited the database, found 12 tables running without Row Level Security including user profile data, and wrote the migration that closed it.",
      "Wrote the team's security plan with a reproduction command for every finding, so nothing rested on my word. Ranked #1 of 50+ projects at the 2026 Sheridan showcase, graded 97/100.",
    ]),
    // Le Pathetique is left off this sheet on purpose. A hackathon build is the
    // weakest evidence on a QA-focused page, and the sheet has to stay at one
    // page. It stays on the full-stack variant and on the site.
    bloom([
      "Launched a production planner across 7 modules, validating an offline-first sync layer that has to survive a dropped connection mid-edit, with Row Level Security isolating every account across 10 PostgreSQL tables.",
    ]),
  ],
};

/* ------------------------------------------------------------------ *
 * Variant 3: Solutions / Implementation / Integration Engineer.
 * Leads with client-facing delivery and third-party integration, which is
 * what these postings actually screen for.
 * ------------------------------------------------------------------ */

const solutions: ResumeVariant = {
  id: "solutions",
  label: "Solutions / Implementation Engineer",
  role: "Solutions Engineer / Implementation Engineer",
  fileSuffix: "Solutions-Implementation-Engineer",
  sendWhen:
    "Solutions Engineer, Implementation Engineer, Integration Engineer, Technical Consultant, Application Support Engineer, Technical Account Manager (associate level).",
  summary:
    "Engineer who takes a client from requirements to a live system and then supports it. Delivered a booking and payments platform solo for a transportation business with a 1.2M-follower audience, integrating Stripe, calendar sync, and transactional email, and remain their single technical contact. 2026 Sheridan graduate with a networking and Linux background, capstone ranked #1 of 50+ projects.",
  skills: [
    {
      label: "Integration",
      items: "Stripe Checkout and webhooks, OAuth 2.0, Firebase Auth, Google Calendar, REST APIs",
    },
    {
      label: "Client delivery",
      items: "Requirements gathering, scoping, deployment, incident response, documentation",
    },
    {
      label: "Languages & Frameworks",
      items: "TypeScript, JavaScript, Python, SQL, React, Next.js, Node.js, Express.js, FastAPI, .NET",
    },
    {
      label: "Cloud & Data",
      items: "AWS, Vercel, Google Cloud Run, Docker, PostgreSQL, Prisma, Supabase, GitHub Actions",
    },
    {
      label: "Networking & Security",
      items: "TCP/IP, subnetting, IPv6, Linux/UNIX, JWT/JWKS, rate limiting, Row Level Security",
    },
  ],
  experience: [
    tripman([
      "Took a non-technical client from a manual phone and message process to a live platform, now handling 11 to 13 bookings in a peak month under an active revenue-share contract.",
      "Integrated Stripe Checkout with webhook confirmation, Google Calendar sync, and transactional email, so one booking flows through several third-party services with no manual follow-up.",
      "Built an authenticated admin dashboard so the owner runs the business directly, ending their daily dependency on a developer, and act as their single technical contact for deployment, incident response, and ongoing changes against live traffic.",
    ]),
    puffy([
      "Scoped and delivered the site for a Toronto patisserie and still handle its updates, including the Google Business listing that puts it on Maps and a QR-code in-store menu in progress.",
    ]),
  ],
  projects: [
    feather([
      "Designed and built the API gateway fronting the backend: Firebase ID token verification against Google's JWKS, route allowlisting so an unrecognised path never reaches upstream, and dual-window rate limiting.",
      "Integrated three Google Cloud Run services, Firebase Auth, PostgreSQL, and a market data provider behind one contract the React client consumes.",
      "Identified a critical authentication vulnerability that let any caller read or write any user account, verified it against production, and shipped the gateway that closed it.",
    ]),
    pathetique([
      "Chained Google Cloud Vision, Gemini, and ElevenLabs into a single multimodal pipeline, with an offline fallback that kept the full demo running through a venue network outage.",
    ]),
    // Bloom is left off this sheet on purpose. It is a solo product rather than
    // an integration story, and the sheet has to stay at one page. It stays on
    // the full-stack variant and on the site.
  ],
};

export const resumeVariants: Record<ResumeVariantId, ResumeVariant> = {
  fullstack,
  qa,
  solutions,
};

export const resumeVariantList: ResumeVariant[] = [fullstack, qa, solutions];

export const defaultVariantId: ResumeVariantId = "fullstack";

export function getResumeVariant(id?: string | null): ResumeVariant {
  if (id && id in resumeVariants) return resumeVariants[id as ResumeVariantId];
  return resumeVariants[defaultVariantId];
}

/* Shared across every variant. */

export const coursework =
  "Coursework: AI & Machine Learning, Cloud Systems, Database Design, .NET/C#, Enterprise Java, Network Security, Linux/UNIX.";

export const certifications =
  "AWS Academy Graduate, Cloud Developing · CCNA IP Addressing & Subnetting · IPv6 Fundamentals (APNIC) · Cisco Introduction to Cybersecurity";

/* Back-compat named exports, pointing at the default variant. */
export const resumeSummary = fullstack.summary;
export const skills = fullstack.skills;
export const experience = fullstack.experience;
export const sideProjects = fullstack.projects;
