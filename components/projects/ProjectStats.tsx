import { Layers, UserRound, Briefcase, Activity, CalendarDays, LinkIcon } from "lucide-react";
import { projects } from "@/data/projects";
import { getProjectFacts } from "@/lib/projectStats";

/**
 * Honest, on-theme "stats" for a project — real facts only (role, type,
 * status, year, stack size, available links). No fabricated hours/reviews.
 */
export function ProjectStats({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  const f = getProjectFacts(slug);

  const linkLabels: string[] = [];
  if (project?.links.liveDemo) linkLabels.push("Live");
  if (project?.links.github) linkLabels.push("Code");
  linkLabels.push("Case study");

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Stat icon={<UserRound className="h-4 w-4" />} label="Role" value={f.role} />
      <Stat icon={<Briefcase className="h-4 w-4" />} label="Type" value={f.type} />
      <Stat icon={<Activity className="h-4 w-4 text-[hsl(var(--steam-green))]" />} label="Status" value={f.status} />
      <Stat icon={<CalendarDays className="h-4 w-4" />} label="Year" value={f.year} />
      <Stat
        icon={<Layers className="h-4 w-4" />}
        label="Stack"
        value={`${project?.stack.length ?? 0} technologies`}
      />
      <Stat icon={<LinkIcon className="h-4 w-4" />} label="Links" value={linkLabels.join(" · ")} />
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
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
