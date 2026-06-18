import Link from "next/link";
import { Star, ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";

export function FeaturedProject() {
  const featured = projects.find((p) => p.slug === profile.featuredProjectSlug) ?? projects[0];

  return (
    <section className="panel overflow-hidden rise-in">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-[hsl(var(--steam-gold))]" />
          <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Featured project</p>
        </div>
        <Link href="/library" className="steam-link inline-flex items-center gap-1 text-xs font-semibold">
          All projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        {/* Media */}
        <Link
          href={featured.links.caseStudy}
          className="group relative block aspect-[16/10] overflow-hidden border-b border-border bg-black/20 lg:border-b-0 lg:border-r"
        >
          {featured.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">No cover</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>

        {/* Details */}
        <div className="flex min-w-0 flex-col gap-3 p-4 sm:p-5">
          <div className="flex flex-wrap gap-1.5">
            {featured.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground">
            {featured.title}
          </h3>
          <p className="clamp-3 text-sm leading-6 text-muted-foreground">{featured.short}</p>

          <div className="inset mt-auto space-y-2 p-3">
            <p className="eyebrow">What I shipped</p>
            <ul className="space-y-1.5 text-sm leading-5 text-muted-foreground">
              {(featured.impact ?? []).slice(0, 2).map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--steam-link))]" />
                  <span className="clamp-2">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={featured.links.caseStudy}
              className="inline-flex h-9 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-xs font-semibold tracking-[0.06em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
            >
              Read case study
            </Link>
            {featured.links.github ? (
              <a
                href={featured.links.github}
                target="_blank"
                rel="noreferrer"
                className="link-pill h-9"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            ) : null}
            {featured.links.liveDemo ? (
              <a href={featured.links.liveDemo} target="_blank" rel="noreferrer" className="link-pill h-9">
                Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
