import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projects",
  description: "Project case studies across web, AI/ML, and networking.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Projects"
          description="Case studies with clear roles, decisions, and outcomes."
        />
        <Button variant="secondary" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </div>

      <ProjectsGrid projects={projects} />
    </div>
  );
}


