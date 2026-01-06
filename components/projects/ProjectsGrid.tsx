"use client";

import * as React from "react";
import type { Project, ProjectTag } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

const tags: ProjectTag[] = ["Web", "AI/ML", "Networking"];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<ProjectTag | "All">("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={active === "All" ? "default" : "outline"}
          className="normal-case tracking-normal font-medium"
          onClick={() => setActive("All")}
        >
          All
        </Button>
        {tags.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={active === t ? "default" : "outline"}
            className="normal-case tracking-normal font-medium"
            onClick={() => setActive(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}


