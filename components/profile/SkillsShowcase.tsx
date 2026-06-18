import {
  Layout,
  Server,
  Database,
  Network,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  Layout,
  Server,
  Database,
  Network,
  Wrench,
  Sparkles,
};

function Meter({ level }: { level: number }) {
  return (
    <span className="skill-meter" aria-label={`${level} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`skill-seg ${i <= level ? "skill-seg--on" : ""}`} />
      ))}
    </span>
  );
}

export function SkillsShowcase() {
  return (
    <section id="skills" className="panel overflow-hidden rise-in scroll-mt-20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="accent-bar" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Skills &amp; tools</p>
        <span className="ml-auto text-[11px] text-muted-foreground">self-rated · be honest, right?</span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = ICONS[group.icon] ?? Sparkles;
          return (
            <div key={group.id} className="inset flex flex-col gap-3 p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-sm bg-[hsl(var(--steam-link))]/15 text-[hsl(var(--steam-link))] ring-1 ring-[hsl(var(--steam-link))]/20">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{group.title}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {group.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">{s.name}</span>
                    <Meter level={s.level} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
