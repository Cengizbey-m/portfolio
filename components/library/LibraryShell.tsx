"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Filter, Play, Star, Users, Trophy, Gamepad2 } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { getProjectFacts } from "@/lib/projectStats";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

type LibraryItem = {
  kind: "project" | "arcade";
  slug: string;
  title: string;
  short: string;
  tags: string[];
  cover?: string;
  liveDemo?: string;
  github?: string;
  caseStudy: string;
  developer: string;
  releaseYear: number;
};

const ARCADE_ITEMS: LibraryItem[] = [
  {
    kind: "arcade",
    slug: "arcade-snake",
    title: "Commit Snake",
    short:
      "Eat git commits, grow longer, don't crash into your past mistakes. The classic, themed for developers.",
    tags: ["Mini-game", "Arcade"],
    cover: undefined,
    caseStudy: "/library/arcade/snake",
    developer: "Cengiz · Arcade Studio",
    releaseYear: 2025,
  },
  {
    kind: "arcade",
    slug: "arcade-subnet",
    title: "Subnet Sprint",
    short:
      "Quickfire subnetting & CIDR quiz. 60 seconds, see how many you can answer right.",
    tags: ["Mini-game", "Networking"],
    cover: undefined,
    caseStudy: "/library/arcade/subnet",
    developer: "Cengiz · Networking Lab",
    releaseYear: 2025,
  },
  {
    kind: "arcade",
    slug: "arcade-whack",
    title: "Whack-a-Bug",
    short:
      "Click bugs before they reach prod. 30 seconds, combos, escalating spawn rate.",
    tags: ["Mini-game", "Reflex"],
    cover: undefined,
    caseStudy: "/library/arcade/whack",
    developer: "Cengiz · Pest Control",
    releaseYear: 2025,
  },
  {
    kind: "arcade",
    slug: "arcade-match",
    title: "Cache Match",
    short:
      "Memory match: flip cards, find the pairs, and clear the board in the fewest moves. Mobile-friendly.",
    tags: ["Mini-game", "Memory"],
    cover: undefined,
    caseStudy: "/library/arcade/match",
    developer: "Cengiz · Arcade Studio",
    releaseYear: 2026,
  },
  {
    kind: "arcade",
    slug: "arcade-shipit",
    title: "Ship It",
    short:
      "Reflex bar — stop the marker in the deploy zone. Every hit speeds it up and shrinks the window.",
    tags: ["Mini-game", "Reflex"],
    cover: undefined,
    caseStudy: "/library/arcade/shipit",
    developer: "Cengiz · Release Eng",
    releaseYear: 2026,
  },
  {
    kind: "arcade",
    slug: "arcade-echo",
    title: "Packet Echo",
    short:
      "Simon-style sequence memory, themed for networks. Repeat the growing packet pattern.",
    tags: ["Mini-game", "Memory"],
    cover: undefined,
    caseStudy: "/library/arcade/echo",
    developer: "Cengiz · Networking Lab",
    releaseYear: 2026,
  },
];

function projectToItem(p: Project): LibraryItem {
  return {
    kind: "project",
    slug: p.slug,
    title: p.title.split("(")[0].trim(),
    short: p.short,
    tags: p.tags,
    cover: p.coverImage,
    liveDemo: p.links.liveDemo,
    github: p.links.github,
    caseStudy: p.links.caseStudy,
    developer: "Cengiz",
    releaseYear: 2025,
  };
}

const categoryFilters = ["All", "Projects", "Arcade", "Web", "AI/ML", "Networking"] as const;
type CategoryFilter = (typeof categoryFilters)[number];

export function LibraryShell() {
  const allItems = React.useMemo<LibraryItem[]>(
    () => [...projects.map(projectToItem), ...ARCADE_ITEMS],
    []
  );
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategoryFilter>("All");
  const [activeSlug, setActiveSlug] = React.useState<string>(allItems[0]?.slug ?? "");

  const filtered = React.useMemo(() => {
    return allItems.filter((it) => {
      if (query && !it.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (category === "All") return true;
      if (category === "Projects") return it.kind === "project";
      if (category === "Arcade") return it.kind === "arcade";
      return it.tags.includes(category);
    });
  }, [allItems, query, category]);

  React.useEffect(() => {
    if (filtered.length && !filtered.some((f) => f.slug === activeSlug)) {
      setActiveSlug(filtered[0].slug);
    }
  }, [filtered, activeSlug]);

  const active = filtered.find((it) => it.slug === activeSlug) ?? filtered[0];

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Browse</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shipped projects and playable mini-games — pick one to see the details.
          </p>
        </div>
        <Link
          href="/library/arcade"
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-[hsl(var(--steam-gold))]/40 bg-[hsl(var(--steam-gold))]/10 px-4 text-sm font-semibold text-[hsl(var(--steam-gold))] transition hover:bg-[hsl(var(--steam-gold))]/20"
        >
          <Gamepad2 className="h-4 w-4" /> Open Arcade
        </Link>
      </header>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <aside className="panel">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search library..."
              className="h-9 w-full rounded-sm bg-black/30 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 ring-1 ring-white/10 focus:outline-none focus:ring-[hsl(var(--steam-link))]"
            />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Filter className="h-3 w-3" />
            <span className="font-semibold uppercase tracking-[0.14em]">Filter</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {categoryFilters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  sfx.click();
                }}
                className={cn(
                  "rounded px-2 py-1 text-[11px] font-semibold tracking-wide ring-1 ring-white/10",
                  category === c
                    ? "bg-[hsl(var(--steam-link))]/15 text-[hsl(var(--steam-link))] ring-[hsl(var(--steam-link))]/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="max-h-[60vh] overflow-y-auto steam-scroll p-1.5">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-xs text-muted-foreground">
              No installs match.
            </li>
          ) : (
            filtered.map((it) => {
              const isActive = it.slug === active?.slug;
              return (
                <li key={it.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSlug(it.slug);
                      sfx.hover();
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm",
                      isActive
                        ? "bg-white/10 text-foreground ring-1 ring-white/15"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {it.kind === "arcade" ? (
                      <Gamepad2 className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--steam-gold))]" />
                    ) : (
                      <span className="h-3.5 w-3.5 shrink-0 rounded-sm bg-[hsl(var(--steam-link))]/40 ring-1 ring-white/10" />
                    )}
                    <span className="truncate">{it.title}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="border-t border-border p-3 text-[11px] text-muted-foreground">
          {filtered.length} of {allItems.length} installed
        </div>
      </aside>

        {active ? <DetailView item={active} /> : null}
      </div>
    </div>
  );
}

function DetailView({ item }: { item: LibraryItem }) {
  const facts = item.kind === "project" ? getProjectFacts(item.slug) : null;
  const isArcade = item.kind === "arcade";
  return (
    <div className="panel overflow-hidden">
      {/* Hero */}
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        {item.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.cover} alt="" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(900px_300px_at_15%_15%,rgba(102,192,244,0.25),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.9),rgba(27,40,56,0.9))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--steam-panel))] via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--steam-link))]">
              {isArcade ? "ARCADE · INSTALLED" : "PROJECT · INSTALLED"}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {item.title}
            </h2>
          </div>
          <PlayButtons item={item} />
        </div>
      </div>

      <div className="grid gap-6 p-4 md:grid-cols-[1fr_220px] md:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.short}</p>
          {!isArcade && (
            <div className="mt-4">
              <Link
                href={item.caseStudy}
                onClick={() => unlock("open-case-study")}
                className="text-sm text-[hsl(var(--steam-link))] hover:underline"
              >
                Open full case study →
              </Link>
            </div>
          )}

          {facts && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Stat icon={<Users className="h-4 w-4" />} label="Role" value={facts.role} />
              <Stat icon={<Star className="h-4 w-4 text-[hsl(var(--steam-gold))]" />} label="Type" value={facts.type} />
              <Stat icon={<Trophy className="h-4 w-4 text-[hsl(var(--steam-green))]" />} label="Status" value={facts.status} />
              <Stat label="Year" value={facts.year} />
            </div>
          )}
        </div>

        <aside className="space-y-3">
          <Side label="Developer" value={item.developer} />
          <Side label="Release date" value={`${item.releaseYear}`} />
          <Side label="Genre" value={item.tags.join(", ") || "Misc"} />
          <Side label="Languages" value="English, code" />
          <Side label="Anti-cheat" value="ESLint + TypeScript" />
        </aside>
      </div>
    </div>
  );
}

function PlayButtons({ item }: { item: LibraryItem }) {
  if (item.kind === "arcade") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href={item.caseStudy} onClick={() => sfx.click()}>
            <Play className="h-4 w-4" /> Play
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {item.liveDemo ? (
        <Button asChild>
          <a href={item.liveDemo} target="_blank" rel="noreferrer" onClick={() => sfx.click()}>
            <Play className="h-4 w-4" /> Play
          </a>
        </Button>
      ) : null}
      <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
        <Link href={item.caseStudy} onClick={() => unlock("open-case-study")}>
          Case study
        </Link>
      </Button>
      {item.github ? (
        <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
          <a href={item.github} target="_blank" rel="noreferrer">
            Workshop (GitHub)
          </a>
        </Button>
      ) : null}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function Side({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border bg-black/20 p-3 ring-1 ring-white/5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
