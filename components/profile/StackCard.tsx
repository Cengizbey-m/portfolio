import { Boxes } from "lucide-react";
import { topSkills } from "@/data/skills";

export function StackCard() {
  return (
    <div id="stack" className="panel overflow-hidden rise-in scroll-mt-20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Boxes className="h-4 w-4 text-[hsl(var(--steam-link))]" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Tech stack</p>
      </div>
      <div className="chip-row p-4">
        {topSkills.map((s) => (
          <span
            key={s}
            className="rounded-sm border border-border bg-white/5 px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
