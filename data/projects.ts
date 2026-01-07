export type ProjectTag = "Web" | "AI/ML" | "Networking";

export type ProjectLinks = {
  caseStudy: string;
  liveDemo?: string;
  github?: string;
};

export type Project = {
  title: string;
  slug: string;
  tags: ProjectTag[];
  short: string;
  problem: string;
  role: string;
  stack: string[];
  impact: string[];
  coverImage?: string;
  links: ProjectLinks;
  confidentialityNote?: string;
};

export const projects: Project[] = [
  {
    title: "TheTripMan (Client • Transportation Booking + Sales)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    short:
      "Transportation booking + sales website built for a paying client. Production code is private due to business confidentiality.",
    problem:
      "Client needed a fast way for customers to browse services, request bookings, and convert leads without exposing operational details.",
    role:
      "Full‑stack developer: UI build, API integration patterns, deployment setup, and security/privacy constraints for a client project.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind",
      "REST APIs",
      "CI/CD (GitHub Actions)",
    ],
    impact: [
      "Built and deployed a conversion-focused marketing + booking experience with clear CTAs and service pages.",
      "Implemented a reliable request/booking flow with validation and production-ready UX polish.",
    ],
    coverImage: "/images/thetripman-placeholder.svg",
    links: {
      caseStudy: "/projects/thetripman",
      liveDemo: "https://www.thetripman.com",
    },
    confidentialityNote:
      "Production code is private due to client confidentiality. This page describes the architecture and shows a safe demo/prototype.",
  },
  {
    title: "Capstone (Team) — AI Finance Prediction App",
    slug: "capstone-ai-finance",
    tags: ["AI/ML", "Web"],
    short:
      "Team capstone building an AI-assisted finance prediction workflow with clear evaluation, safeguards, and a web UI.",
    problem:
      "Users wanted a simple UI for exploring signals and predictions with transparent evaluation and limits on overconfident outputs.",
    role:
      "Team contributor: owned ML evaluation + API contract; implemented feature work end‑to‑end and documented trade‑offs.",
    stack: ["Python", "Pandas", "Model evaluation", "Next.js", "TypeScript"],
    impact: [
      "Owned the evaluation approach (baselines + metrics) and translated results into clear UI-friendly outputs.",
      "Defined and implemented the API contract between model code and the web UI for predictable integrations.",
    ],
    coverImage: "/images/capstone-placeholder.svg",
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      github: "https://github.com/Cengizbey-m/Feather-Capstone",
    },
  },
  {
    title: "Formally (Prototype) — Fitness + Personal Development Platform",
    slug: "formally-prototype",
    tags: ["Web"],
    short:
      "Early-stage product prototype exploring onboarding, habit flows, and clean UI patterns. Codebase is private while the product is in development.",
    problem:
      "Needed a clean onboarding + habit flow that keeps users focused on next actions, not configuration.",
    role:
      "Product + engineering: UX flows, component library, and front-end architecture that can evolve into a full system.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Component design"],
    impact: [
      "Designed onboarding and habit flows focused on clarity and low cognitive load.",
      "Built reusable UI patterns that can evolve into a full product design system.",
    ],
    coverImage: "/images/formally-placeholder.svg",
    links: {
      caseStudy: "/projects/formally-prototype",
    },
  },
];

export const projectSlugs = projects.map((p) => p.slug);


