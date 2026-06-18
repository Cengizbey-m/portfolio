import Link from "next/link";
import {
  Worm,
  Network,
  Bug,
  Grid3x3,
  Rocket,
  Radio,
  Gamepad2,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Arcade",
  description:
    "A small arcade of dev- and networking-themed mini-games built into the portfolio. Snake, subnetting, memory, reflex, and more — each grants achievements.",
};

type Game = {
  slug: string;
  title: string;
  short: string;
  badge: string;
  icon: LucideIcon;
  /** tailwind color expression for the art accent */
  accent: string;
};

const games: Game[] = [
  {
    slug: "snake",
    title: "Commit Snake",
    short: "Eat git commits, grow longer, don't crash into your past.",
    badge: "Classic",
    icon: Worm,
    accent: "hsl(var(--steam-link))",
  },
  {
    slug: "subnet",
    title: "Subnet Sprint",
    short: "60 seconds of CIDR & subnetting trivia. Don't /24 yourself.",
    badge: "Networking",
    icon: Network,
    accent: "hsl(var(--steam-green))",
  },
  {
    slug: "whack",
    title: "Whack-a-Bug",
    short: "Smash bugs before prod. Don't whack the features.",
    badge: "Reflex",
    icon: Bug,
    accent: "hsl(var(--steam-red))",
  },
  {
    slug: "match",
    title: "Cache Match",
    short: "Flip cards, find the pairs, clear the board in fewest moves.",
    badge: "Memory",
    icon: Grid3x3,
    accent: "hsl(var(--steam-gold))",
  },
  {
    slug: "shipit",
    title: "Ship It",
    short: "Stop the marker in the deploy zone. It only gets faster.",
    badge: "Reflex",
    icon: Rocket,
    accent: "hsl(var(--steam-link))",
  },
  {
    slug: "echo",
    title: "Packet Echo",
    short: "Repeat the growing packet sequence. Simon, for networks.",
    badge: "Memory",
    icon: Radio,
    accent: "hsl(var(--steam-purple))",
  },
];

export default function ArcadeIndexPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Library</p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <Gamepad2 className="h-7 w-7 text-[hsl(var(--steam-gold))]" />
            Arcade
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Six little games I built into the site. Every one runs in your browser, works on mobile, and
            quietly hands out achievements. Yes, this is also a portfolio piece.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-[hsl(var(--steam-gold))]/30 bg-[hsl(var(--steam-gold))]/10 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--steam-gold))]">
          <Trophy className="h-4 w-4" /> {games.length} games installed
        </span>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => {
          const Icon = g.icon;
          return (
            <li key={g.slug}>
              <Link
                href={`/library/arcade/${g.slug}`}
                className="game-card group flex h-full flex-col overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))]"
              >
                <div
                  className="relative grid aspect-[16/9] place-items-center overflow-hidden"
                  style={{
                    background: `radial-gradient(380px 160px at 30% 20%, color-mix(in oklab, ${g.accent} 35%, transparent), transparent 60%), linear-gradient(160deg, rgba(15,23,34,0.9), rgba(27,40,56,0.9))`,
                  }}
                >
                  <Icon
                    className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: g.accent }}
                  />
                  <span className="absolute right-2 top-2 rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 ring-1 ring-white/10">
                    {g.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-base font-semibold text-foreground group-hover:text-[hsl(var(--steam-link))]">
                    {g.title}
                  </p>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{g.short}</p>
                  <span className="mt-1 inline-flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.9),rgba(26,68,194,0.92))] text-xs font-semibold tracking-[0.08em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] transition group-hover:brightness-110">
                    ▶ PLAY
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
