import { Trophy, Rocket, Briefcase, BadgeCheck, type LucideIcon } from "lucide-react";
import { credentials } from "@/data/cv";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Rocket,
  Briefcase,
  BadgeCheck,
};

const ACCENT: Record<string, string> = {
  capstone: "hsl(var(--steam-gold))",
  production: "hsl(var(--steam-green))",
  clients: "hsl(var(--steam-link))",
  pr: "hsl(var(--steam-purple))",
};

export function CredentialsStrip() {
  return (
    <section className="panel overflow-hidden rise-in">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="accent-bar" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">
          Why me, specifically
        </p>
      </div>

      <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((c) => {
          const Icon = ICONS[c.icon] ?? Trophy;
          const accent = ACCENT[c.id] ?? "hsl(var(--steam-link))";
          return (
            <li key={c.id} className="bg-[hsl(var(--steam-panel))] p-4">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} />
                <span
                  className="text-lg font-bold leading-none tracking-tight"
                  style={{ color: accent }}
                >
                  {c.stat}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-snug text-foreground">{c.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{c.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
