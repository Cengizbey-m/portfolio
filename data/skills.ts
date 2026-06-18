/**
 * Skills, presented Steam-"inventory"/perks style on the profile.
 * `level` is a soft 1–5 self-rating used only for the little bar/marker.
 */
export type Skill = { name: string; level: number };

export type SkillGroup = {
  id: string;
  title: string;
  /** lucide-react icon name resolved in the component */
  icon: string;
  blurb: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "Layout",
    blurb: "Interfaces that feel fast and look intentional.",
    skills: [
      { name: "React", level: 5 },
      { name: "Next.js (App Router)", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "HTML / CSS / a11y", level: 4 },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "Server",
    blurb: "APIs, auth, and data that hold up in production.",
    skills: [
      { name: "Node.js / Express", level: 4 },
      { name: "REST API design", level: 4 },
      { name: "FastAPI (Python)", level: 4 },
      { name: "Auth (JWT / RBAC)", level: 4 },
      { name: "Java (Enterprise)", level: 3 },
    ],
  },
  {
    id: "data",
    title: "Data",
    icon: "Database",
    blurb: "Schema design, queries, and migrations that don't surprise you.",
    skills: [
      { name: "PostgreSQL", level: 4 },
      { name: "Prisma", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "SQL & schema design", level: 4 },
    ],
  },
  {
    id: "networking",
    title: "Networking & Systems",
    icon: "Network",
    blurb: "The SDNE edge — I understand the stack underneath the app.",
    skills: [
      { name: "IP / subnetting / IPv6", level: 5 },
      { name: "Linux / UNIX", level: 4 },
      { name: "Security fundamentals", level: 3 },
      { name: "Cloud-enabled networks", level: 3 },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Delivery",
    icon: "Wrench",
    blurb: "Ship it, then keep it healthy.",
    skills: [
      { name: "Git / GitHub", level: 5 },
      { name: "Docker", level: 3 },
      { name: "Vercel / CI", level: 4 },
      { name: "Testing basics", level: 3 },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    icon: "Sparkles",
    blurb: "Prototyping with LLMs and classic ML, evaluated honestly.",
    skills: [
      { name: "Python", level: 4 },
      { name: "LLM / multimodal APIs", level: 4 },
      { name: "ML baselines & eval", level: 3 },
    ],
  },
];

/** Flat marquee list for compact contexts. */
export const topSkills = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Python",
  "Tailwind",
  "Networking (IP / IPv6)",
  "Linux",
  "Docker",
];
