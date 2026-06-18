import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";

export function ProjectsShowcase() {
  // Featured one is shown above; show the rest here, then link to the full library.
  const rest = projects.filter((p) => p.slug !== profile.featuredProjectSlug);

  return (
    <section className="panel overflow-hidden rise-in">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="accent-bar" />
          <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Projects</p>
          <span className="rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground ring-1 ring-white/5">
            {projects.length}
          </span>
        </div>
        <Link href="/library" className="steam-link inline-flex items-center gap-1 text-xs font-semibold">
          Open library <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={p.links.caseStudy}
            className="game-card group flex gap-3 rounded-md border border-border bg-black/15 p-2.5"
          >
            <div className="relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-sm bg-black/30 sm:w-32">
              {p.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.coverImage} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
              ) : (
                <div className="grid h-full place-items-center text-[10px] text-muted-foreground">No cover</div>
              )}
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-semibold text-foreground group-hover:text-[hsl(var(--steam-link))]">
                {p.title.split("(")[0].split("—")[0].trim()}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {p.tags.slice(0, 2).map((t) => (
                  <Badge key={t} className="px-1.5 py-0 text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
              <p className="clamp-2 mt-1.5 text-xs leading-5 text-muted-foreground">{p.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
