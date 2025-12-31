"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const isClientPrivate = project.slug === "thetripman";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className={cn(className)}
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {isClientPrivate ? <Badge variant="outline">Code private</Badge> : null}
          </div>
          <CardTitle className="mt-3">
            {project.title}
          </CardTitle>
          <CardDescription>{project.short}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="font-medium">My role</p>
            <p className="text-muted-foreground">{project.role}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Key features</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {project.features.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-medium">Stack</p>
            <p className="text-muted-foreground">{project.stack.join(" • ")}</p>
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-2">
          <Button asChild>
            <Link href={project.links.caseStudy}>Case study</Link>
          </Button>
          <div className="flex items-center gap-2">
            {project.links.liveDemo ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                title="Live demo"
              >
                <a href={project.links.liveDemo} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {project.links.github ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                title="GitHub"
              >
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}


