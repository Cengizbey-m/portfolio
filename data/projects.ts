export type ProjectTag = "Web" | "AI/ML" | "Networking" | "Hackathon";

export type ProjectLinks = {
  caseStudy: string;
  liveDemo?: string;
  github?: string;
  app?: string;
};

export type Project = {
  title: string;
  slug: string;
  tags: ProjectTag[];
  /** One-line headline fact. Shown as a badge on cards. */
  highlight?: string;
  short: string;
  problem: string;
  role: string;
  stack: string[];
  impact: string[];
  coverImage?: string;
  gallery?: string[];
  demoVideo?: string;
  links: ProjectLinks;
  confidentialityNote?: string;
};

export const projects: Project[] = [
  {
    title: "TheTripMan (Client • Booking and Payments Platform)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    highlight: "Live · taking real payments",
    short:
      "A booking and payments platform I built and still run for a transportation business with a 1.2M-follower audience. Customers book and pay online through Stripe, and the owner manages every reservation from an admin dashboard instead of a phone.",
    problem:
      "The business had a large social following but no way to convert it. Bookings arrived through DMs and phone calls, payment happened in person, and nothing was tracked. They needed customers to browse services, reserve a time, and pay up front without a developer involved day to day.",
    role:
      "Sole developer. I own the product: design, frontend, API, database schema, Stripe integration, deployment, and the maintenance that follows. I still ship changes against live traffic.",
    stack: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind + shadcn/ui",
      "Stripe (checkout, webhooks)",
      "PostgreSQL (Neon) + Prisma",
      "Cal.com / FullCalendar / Google Calendar sync",
      "Resend (transactional email)",
      "GA4",
      "Vercel + CI",
    ],
    impact: [
      "Replaced a DM-and-phone booking process with a self-serve flow that takes payment at the time of booking, so the business stops chasing no-shows.",
      "Built the Stripe integration end to end, including webhook handling so a reservation is only confirmed once payment actually settles.",
      "Shipped an authenticated admin dashboard that turned scattered messages into one reservation list the owner can run the business from.",
      "Automated confirmation email and calendar invites, removing the manual follow-up that used to happen for every single booking.",
      "Running in production on a revenue-share agreement, which means the code has to keep working whether or not I am watching it.",
    ],
    coverImage: "/images/tripman/tripman-1.png",
    gallery: [
      "/images/tripman/tripman-1.png",
      "/images/tripman/tripman-2.png",
      "/images/tripman/tripman-3.png",
      "/images/tripman/tripman-4.png",
      "/images/tripman/tripman-5.png",
    ],
    links: {
      caseStudy: "/projects/thetripman",
      liveDemo: "https://www.trvoo.com",
    },
    confidentialityNote:
      "The production repository is private for business reasons. Screenshots avoid customer and booking data.",
  },
  {
    title: "Feather (Capstone • AI Market Insights Platform)",
    slug: "capstone-ai-finance",
    tags: ["AI/ML", "Web"],
    highlight: "Ranked #1 of 50+ projects",
    short:
      "A next-day stock movement prediction tool with an honest evaluation layer. Judged first overall out of more than fifty projects at Sheridan's 2026 capstone showcase, with the prototype graded 94/100.",
    problem:
      "Prediction demos usually hide their error rate and present a confident number the user has no way to question. We wanted a tool that shows a forecast next to the evidence for trusting it, and refuses to overstate what the model actually knows.",
    role:
      "Team of five. I owned the model evaluation layer and the API contract between the Python service and the React frontend, and implemented feature work across both sides.",
    stack: [
      "React + TypeScript (Vite)",
      "FastAPI (Python)",
      "SQLAlchemy",
      "scikit-learn (SVR, Random Forest baselines)",
      "Docker",
      "Vercel",
    ],
    impact: [
      "Judged #1 out of 50+ capstone projects at the 2026 showcase after being selected for the final showcase round.",
      "Prototype phase graded 94/100.",
      "Built the evaluation layer that scores every model against baselines, so the UI can show accuracy honestly instead of printing a number with no context.",
      "Defined the API contract between the Python model service and the React client, which let the frontend and ML work continue in parallel without blocking each other.",
      "Containerized the service with Docker so the whole team ran an identical environment and demo setup was not a gamble.",
    ],
    coverImage: "/images/feather/feather-1.png",
    gallery: [
      "/images/feather/feather-1.png",
      "/images/feather/feather-2.png",
      "/images/feather/feather-3.png",
      "/images/feather/feather-4.png",
      "/images/feather/feather-5.png",
    ],
    demoVideo: "/demo-videos/Feather-demo-video-2min.mp4",
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      liveDemo: "https://www.feathertrade.org/",
    },
  },
  {
    title: "Bloom (Product • Cloud-Synced Life Planner)",
    slug: "bloom",
    tags: ["Web"],
    highlight: "Live · offline-first sync",
    short:
      "A planner that holds calendar, tasks, habits, notes, journal, goals, and a focus timer in one place. Sign in with Google and your data follows you: start something on your phone, finish it on your laptop, and keep working with no connection at all.",
    problem:
      "Planner apps either sync well and feel like enterprise software, or feel nice and lose your data between devices. I wanted one that does both, and that does not punish you for missing a day.",
    role:
      "Sole developer and designer. Data model, sync engine, authentication, theming, and every screen.",
    stack: [
      "React 18 + TypeScript (Vite)",
      "Tailwind CSS v4",
      "Zustand (local state and persistence)",
      "Supabase (PostgreSQL, Google Auth, Realtime)",
      "PWA with Workbox (offline support)",
      "Row Level Security + DOMPurify",
      "Framer Motion",
      "Vercel",
    ],
    impact: [
      "Built an offline-first sync engine: writes land in local state immediately, then sync to Postgres on a debounce, so the interface never waits on the network.",
      "Wired Realtime subscriptions so a change on one device shows up on every other signed-in device, including theme and settings.",
      "Secured user data with Row Level Security across 10 Postgres tables, isolating every account at the database level rather than trusting client-side checks.",
      "Replaced streak counters with a forgiveness-based consistency score, because a single missed day should not erase two months of work.",
      "Added a global Ctrl/Cmd+K quick-add that creates a task, event, or note from any screen in about two seconds.",
    ],
    coverImage: "/images/bloom/bloom-1.png",
    gallery: [
      "/images/bloom/bloom-1.png",
      "/images/bloom/bloom-2.png",
      "/images/bloom/bloom-3.png",
      "/images/bloom/bloom-4.png",
      "/images/bloom/bloom-5.png",
    ],
    links: {
      caseStudy: "/projects/bloom",
      liveDemo: "https://bloom-cal.vercel.app",
    },
    confidentialityNote:
      "The repository is private while Bloom prepares for a public launch on web, iOS, and Android.",
  },
  {
    title: "Le Pathétique (BearHacks 2026 • AI Food Critic)",
    slug: "le-pathetique",
    tags: ["AI/ML", "Web", "Hackathon"],
    highlight: "Built solo in one weekend",
    short:
      "Photograph your questionable cooking and a pretentious French critic reviews it out loud, then hands you three recipes to redeem yourself. A multimodal pipeline wrapped in a brutalist newspaper interface.",
    problem:
      "Hackathon judging happens in a loud room on unreliable Wi-Fi, and most AI demos die the moment an API call hangs. I wanted something genuinely fun that would still work if the network or an API key failed mid-presentation.",
    role:
      "Solo build over one weekend. Persona design, the Vision to Gemini to ElevenLabs pipeline, the interface, and the offline fallback mode.",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Google Cloud Vision (image labeling)",
      "Gemini Flash (critique and recipe generation)",
      "ElevenLabs (speech synthesis)",
      "Web Audio API",
      "Vercel",
    ],
    impact: [
      "Chained three separate AI services into one pipeline that turns a photo into spoken audio critique and three tiered recipes.",
      "Built an offline mock mode that keeps the full demo working when the venue Wi-Fi or an API key fails, which is exactly what a live demo needs.",
      "Wrote 6 distinct critic personas with 13 hidden easter eggs so repeat use keeps finding new material.",
      "Went from empty repo to working multimodal demo in a single weekend, solo.",
    ],
    coverImage: "/images/le-pathetique/home.jpg",
    gallery: [
      "/images/le-pathetique/home.jpg",
      "/images/le-pathetique/recipes.jpg",
      "/images/le-pathetique/verdict.jpg",
    ],
    links: {
      caseStudy: "/projects/le-pathetique",
      github: "https://github.com/Cengizbey-m/Le-Pathetique",
      liveDemo: "https://devpost.com/software/le-pathetique",
    },
    confidentialityNote:
      "A Vercel deployment exists but is still being cleaned up after the hackathon, so the DevPost entry is the source of truth.",
  },
  {
    title: "Puffy (Client • Patisserie Website)",
    slug: "puffy",
    tags: ["Web"],
    highlight: "Second paying client",
    short:
      "A marketing site for a local patisserie that had no web presence at all. Built mobile-first, because nearly everyone finds a dessert shop on a phone.",
    problem:
      "The shop existed on foot traffic and word of mouth. Customers could not find hours, location, or what was actually on offer without walking in, and search results pointed nowhere.",
    role: "Sole developer. Design, build, deployment, and ongoing additions.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    impact: [
      "Took a business with no web presence to a fast, mobile-first site that answers the three questions customers actually have: what, where, and when.",
      "Built the layout mobile-first, since a dessert shop is found on a phone far more often than a desktop.",
      "Currently adding a QR-code menu for in-store scanning and a Google Business listing so the shop shows up in local search.",
    ],
    coverImage: "/images/puffy/puffy-1.png",
    gallery: [
      "/images/puffy/puffy-1.png",
      "/images/puffy/puffy-2.png",
      "/images/puffy/puffy-3.png",
      "/images/puffy/puffy-4.png",
      "/images/puffy/puffy-5.png",
    ],
    links: {
      caseStudy: "/projects/puffy",
      github: "https://github.com/Cengizbey-m/Puffy",
    },
  },
  {
    title: "Formally (Prototype • Fitness and Habit Platform)",
    slug: "formally-prototype",
    tags: ["Web", "AI/ML"],
    highlight: "Design system groundwork",
    short:
      "An early product prototype exploring onboarding, habit tracking, and a reusable component system. Private while the product is still in development.",
    problem:
      "Fitness apps ask for a lot of configuration before they give you anything useful. The prototype tested how much of that setup could be deferred or removed entirely without losing the plan quality.",
    role:
      "Product and engineering. User flows, the component library, and the frontend architecture underneath it.",
    stack: [
      "React",
      "Node.js / Express",
      "MongoDB (Mongoose)",
      "JWT auth + role-based access",
      "Socket.io",
      "Tailwind",
      "Docker",
    ],
    impact: [
      "Designed an onboarding flow that gets a user to their first workout with far less setup than the apps it was compared against.",
      "Built a reusable component library that later became the starting point for how I structure interfaces in other projects.",
      "Scaffolded JWT authentication with role-based access so admin and member views could diverge safely.",
    ],
    coverImage: "/images/Formally-Home.png",
    gallery: [
      "/images/Formally-Home.png",
      "/images/Formally-Nutrition.png",
      "/images/Formally-AiProgramBuilder.png",
      "/images/Formally-Workout-Session.png",
      "/images/Formally-Settings.png",
    ],
    links: {
      caseStudy: "/projects/formally-prototype",
    },
  },
];

export const projectSlugs = projects.map((p) => p.slug);
