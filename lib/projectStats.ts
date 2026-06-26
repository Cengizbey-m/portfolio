/**
 * Honest, on-theme facts for each project — real metadata only
 * (role, type, status, year). No fabricated hours/reviews/install sizes.
 */
export type ProjectFacts = {
  role: string;
  type: string;
  status: string;
  year: string;
};

const FACTS: Record<string, ProjectFacts> = {
  thetripman: { role: "Solo", type: "Client work", status: "Live in production", year: "2025 – present" },
  "le-pathetique": { role: "Solo", type: "Hackathon (BearHacks 2026)", status: "Shipped", year: "2026" },
  "capstone-ai-finance": { role: "Team", type: "Capstone", status: "Graded 94 / 100", year: "2025" },
  puffy: { role: "Solo", type: "Client work", status: "Live · iterating", year: "2026" },
  bloom: { role: "Solo", type: "Product", status: "In development", year: "2026" },
  "formally-prototype": { role: "Solo", type: "Product", status: "Prototype", year: "2025" },
};

const FALLBACK: ProjectFacts = { role: "Solo", type: "Project", status: "Shipped", year: "2025" };

export function getProjectFacts(slug: string): ProjectFacts {
  return FACTS[slug] ?? FALLBACK;
}
