import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Arcade",
  description: "Mini-games inside the portfolio. Snake, subnet quiz, more soon.",
};

const games = [
  {
    slug: "snake",
    title: "Commit Snake",
    short: "Eat commits, grow longer, don't crash.",
    badge: "Classic",
  },
  {
    slug: "subnet",
    title: "Subnet Sprint",
    short: "60 seconds. Networking trivia. Don't /24 yourself.",
    badge: "Networking",
  },
  {
    slug: "whack",
    title: "Whack-a-Bug",
    short: "Click bugs. Don't click features. 30 seconds, ramping up.",
    badge: "Reflex",
  },
];

export default function ArcadeIndexPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="Arcade"
            description="A small collection of in-portfolio games. Each one grants achievements."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="grid gap-4 md:grid-cols-2">
            {games.map((g) => (
              <li
                key={g.slug}
                className="game-card overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] ring-1 ring-white/5"
              >
                <div className="flex aspect-[16/9] items-center justify-center bg-[radial-gradient(700px_240px_at_15%_15%,rgba(102,192,244,0.25),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.9),rgba(27,40,56,0.9))] text-3xl font-black tracking-tight text-foreground">
                  {g.title}
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-base font-semibold text-foreground">{g.title}</p>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground ring-1 ring-white/10">
                      {g.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{g.short}</p>
                  <Button asChild>
                    <Link href={`/library/arcade/${g.slug}`}>Play</Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
