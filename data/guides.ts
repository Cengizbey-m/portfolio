export type Guide = {
  slug: string;
  title: string;
  summary: string;
  readMinutes: number;
  tag: string;
  rating: number; // 1..5
  views: number;
};

export const guides: Guide[] = [
  {
    slug: "shipping-as-a-student",
    title: "Shipping as a student dev (without burning out)",
    summary:
      "Practical loop: scope ruthlessly, deploy daily, write the README first. The trick that kept TheTripMan healthy.",
    readMinutes: 5,
    tag: "Workflow",
    rating: 5,
    views: 1842,
  },
  {
    slug: "subnet-cheatsheet",
    title: "Subnetting in 60 seconds — the only trick I ever use",
    summary:
      "Block size method, mental math for /20–/30, and one diagram that fixes IPv6 anxiety.",
    readMinutes: 4,
    tag: "Networking",
    rating: 5,
    views: 3120,
  },
  {
    slug: "next-server-actions",
    title: "Server Actions are great, here's the gotcha",
    summary:
      "Why your Resend integration silently fails on Vercel, plus the env-var checklist I use on every Next.js deploy.",
    readMinutes: 6,
    tag: "Next.js",
    rating: 4,
    views: 920,
  },
];
