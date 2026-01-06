"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className={cn(className)}
    >
      <Card className="h-full transition-colors hover:bg-white/5">
        {project.coverImage ? (
          <div className="overflow-hidden rounded-t-md border-b border-border bg-black/15">
            <img
              src={project.coverImage}
              alt=""
              className="h-32 w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <CardTitle className="mt-3">
            <Link href={project.links.caseStudy} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          <CardDescription>{project.short}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="font-medium">My role</p>
            <p className="text-muted-foreground">{project.role}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Stack</p>
            <p className="text-muted-foreground">{project.stack.join(" • ")}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


