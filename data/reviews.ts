export type Review = {
  author: string;
  role: string;
  recommended: boolean;
  hoursOnRecord: number;
  body: string;
  postedAgo: string;
  helpful: number;
  funny: number;
};

// These "reviews" are a wink, not real testimonials — a little Steam-style fun.
// The profile section says as much, and the only real way to reach me is the
// contact form right below them. Swap these out the day I have real quotes to show.
export const reviews: Review[] = [
  {
    author: "Hiring Manager",
    role: "Definitely a real person",
    recommended: true,
    hoursOnRecord: 247,
    body: "10/10. Ships features, writes tests when you ask, doesn't argue about tabs vs spaces. Surprisingly good at networking puzzles.",
    postedAgo: "Posted 3 days ago",
    helpful: 412,
    funny: 88,
  },
  {
    author: "Past Teammate",
    role: "Capstone collaborator",
    recommended: true,
    hoursOnRecord: 612,
    body: "Owns his pieces end-to-end. Catches bugs before they reach the demo. Knows when to call a meeting and when to just open a PR.",
    postedAgo: "Posted last semester",
    helpful: 298,
    funny: 14,
  },
  {
    author: "Production Server",
    role: "Has been online for 3 months",
    recommended: true,
    hoursOnRecord: 2160,
    body: "He set me up properly. Logs are clean, env vars are sane, secrets aren't in git. I'd let him push to main again.",
    postedAgo: "Posted from /var/log",
    helpful: 1024,
    funny: 256,
  },
  {
    author: "TheTripMan Client",
    role: "Paying customer",
    recommended: true,
    hoursOnRecord: 184,
    body: "Took my rough idea and turned it into a real booking site. Communicated clearly the whole way. Would hire again.",
    postedAgo: "Posted 2 months ago",
    helpful: 187,
    funny: 3,
  },
];
