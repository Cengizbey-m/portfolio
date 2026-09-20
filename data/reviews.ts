export type Review = {
  author: string;
  role: string;
  recommended: boolean;
  hoursOnRecord: number;
  body: string;
  postedAgo: string;
  helpful: number;
  funny: number;
  /**
   * True only when a real, named person actually said these words and it can be
   * produced on request. Everything else here is a Steam-style joke, and the
   * section header says so. Never set this on something invented.
   */
  verified?: boolean;
};

// Two of these are a wink. The verified one is a real quote from a real client,
// taken word for word from a signed engagement letter, and is reproducible on
// request. Do not add unverified quotes attributed to identifiable people.
export const reviews: Review[] = [
  {
    author: "Bekir Ozel",
    role: "TheTripMan & Trvoo, client",
    recommended: true,
    hoursOnRecord: 0,
    body: "Mr. Cengiz has consistently demonstrated a high level of technical expertise, professionalism, reliability, and commitment. His contributions have been valuable to the continued operation and growth of our platform.",
    postedAgo: "Signed engagement letter, July 2026",
    helpful: 0,
    funny: 0,
    verified: true,
  },
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
    author: "Production Server",
    role: "Has been online for 3 months",
    recommended: true,
    hoursOnRecord: 2160,
    body: "He set me up properly. Logs are clean, env vars are sane, secrets aren't in git. I'd let him push to main again.",
    postedAgo: "Posted from /var/log",
    helpful: 1024,
    funny: 256,
  },
];
