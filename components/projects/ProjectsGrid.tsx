"use client";

import * as React from "react";
import type { Project, ProjectTag } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

const tags: ProjectTag[] = ["Web", "AI/ML", "Networking"];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<ProjectTag | "All">("All");
  const [query, setQuery] = React.useState("");

  const filteredByTag =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  const q = query.trim().toLowerCase();
  const filtered =
    q.length === 0
      ? filteredByTag
      : filteredByTag.filter((p) => {
          const haystack = [
            p.title,
            p.short,
            p.problem,
            p.role,
            p.stack.join(" "),
            p.features.join(" "),
            p.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={active === "All" ? "default" : "outline"}
            onClick={() => setActive("All")}
          >
            All
          </Button>
          {tags.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={active === t ? "default" : "outline"}
              onClick={() => setActive(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="w-full md:w-[320px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}


