"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FavoriteProjectPanel() {
  const featured =
    projects.find((p) => p.slug === profile.featuredProjectSlug) ?? projects[0];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Favorite Project"
          description="If you only read one case study, start here."
        />
        <Button
          variant="secondary"
          asChild
          className="normal-case tracking-normal font-medium"
        >
          <Link href="/projects">Browse all</Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4 2xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-sm border border-border bg-black/15 ring-1 ring-white/5">
            {featured.coverImage ? (
              <img
                src={featured.coverImage}
                alt=""
                className="h-52 w-full object-cover md:h-64"
                loading="lazy"
              />
            ) : (
              <div className="grid h-56 place-items-center text-sm text-muted-foreground md:h-64">
                Add a cover image
              </div>
            )}
          </div>

          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-xl font-semibold tracking-tight text-foreground">
                {featured.title}
              </p>
              <p className="clamp-3 text-sm leading-6 text-muted-foreground">
                {featured.short}
              </p>
            </div>

            <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                My role
              </p>
              <p className="clamp-3 mt-1 text-sm leading-6 text-foreground">{featured.role}</p>
            </div>

            <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                Highlights
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                {(featured.impact ?? []).slice(0, 2).map((x) => (
                  <li key={x} className="clamp-2">
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild className="normal-case tracking-normal font-medium">
                <Link href={featured.links.caseStudy}>Open case study</Link>
              </Button>
              {featured.links.github ? (
                <Button
                  variant="secondary"
                  asChild
                  className="normal-case tracking-normal font-medium"
                >
                  <a href={featured.links.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


