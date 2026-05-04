import type { Project } from "@/data/projects";

/**
 * Deterministic per-project Steam-style stats. We don't track real time,
 * but we want consistent "hours played", "last played", and achievement counts
 * so the library feels like Steam without being misleading.
 */
export type ProjectStats = {
  hoursPlayed: number;
  lastPlayed: string;
  achievementsTotal: number;
  achievementsUnlocked: number;
  installedSizeMb: number;
  reviewSummary: "Overwhelmingly Positive" | "Very Positive" | "Mostly Positive";
  reviewCount: number;
};

const STATIC_STATS: Record<string, ProjectStats> = {
  "le-pathetique": {
    hoursPlayed: 48,
    lastPlayed: "Last weekend",
    achievementsTotal: 13,
    achievementsUnlocked: 13,
    installedSizeMb: 78,
    reviewSummary: "Overwhelmingly Positive",
    reviewCount: 88,
  },
  thetripman: {
    hoursPlayed: 612,
    lastPlayed: "2 days ago",
    achievementsTotal: 18,
    achievementsUnlocked: 17,
    installedSizeMb: 184,
    reviewSummary: "Overwhelmingly Positive",
    reviewCount: 1247,
  },
  "capstone-ai-finance": {
    hoursPlayed: 384,
    lastPlayed: "3 weeks ago",
    achievementsTotal: 22,
    achievementsUnlocked: 19,
    installedSizeMb: 312,
    reviewSummary: "Very Positive",
    reviewCount: 612,
  },
  "formally-prototype": {
    hoursPlayed: 168,
    lastPlayed: "Last month",
    achievementsTotal: 14,
    achievementsUnlocked: 9,
    installedSizeMb: 96,
    reviewSummary: "Mostly Positive",
    reviewCount: 224,
  },
};

const FALLBACK: ProjectStats = {
  hoursPlayed: 42,
  lastPlayed: "Recently",
  achievementsTotal: 10,
  achievementsUnlocked: 4,
  installedSizeMb: 64,
  reviewSummary: "Mostly Positive",
  reviewCount: 32,
};

export function getStatsFor(slug: string): ProjectStats {
  return STATIC_STATS[slug] ?? FALLBACK;
}

export function withStats<T extends Project>(p: T): T & { stats: ProjectStats } {
  return { ...p, stats: getStatsFor(p.slug) };
}
