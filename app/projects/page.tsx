import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Projects",
  description: "Three shipped-style case studies: web, AI/ML, networking.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            title="Projects"
            description="Designed for recruiter scanning: problem → role → stack → proof."
          />
          <Button
            variant="secondary"
            asChild
            className="normal-case tracking-normal font-medium"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <ProjectsGrid projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}


