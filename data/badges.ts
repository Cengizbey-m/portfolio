export type BadgeCategory = "Software" | "Networking" | "Security" | "Data" | "AI/ML";

export type PortfolioBadge = {
  label: string;
  category: BadgeCategory;
  icon:
    | "code"
    | "server"
    | "network"
    | "shield"
    | "database"
    | "brain"
    | "terminal"
    | "cloud";
};

export const badges: PortfolioBadge[] = [
  { label: "Next.js", category: "Software", icon: "code" },
  { label: "TypeScript", category: "Software", icon: "terminal" },
  { label: "APIs", category: "Software", icon: "server" },
  { label: "SQL", category: "Data", icon: "database" },
  { label: "Linux", category: "Software", icon: "terminal" },
  { label: "Subnetting / IPv6", category: "Networking", icon: "network" },
  { label: "Security fundamentals", category: "Security", icon: "shield" },
  { label: "AI/ML prototyping", category: "AI/ML", icon: "brain" },
];


