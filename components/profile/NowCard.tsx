import { Activity } from "lucide-react";

const nowItems = [
  "Polishing case studies + this portfolio",
  "Wrapping up SDNE coursework (grad Aug 2026)",
  "Sharpening Next.js, system design & networking",
];

export function NowCard() {
  return (
    <div className="panel overflow-hidden rise-in">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Activity className="h-4 w-4 text-[hsl(var(--steam-green))]" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Currently</p>
      </div>
      <ul className="space-y-2.5 p-4">
        {nowItems.map((t) => (
          <li key={t} className="flex gap-2.5 text-sm leading-5 text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--steam-green))]" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
