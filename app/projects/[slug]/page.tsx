import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, projectSlugs } from "@/data/projects";
import { readProjectMdx } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ExternalLink, Github } from "lucide-react";

export async function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  let source: string;
  try {
    source = await readProjectMdx(slug);
  } catch {
    notFound();
  }

  const mdx = await renderMdx(source);

  return (
    <article className="mx-auto max-w-3xl">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h1>
        <p className="text-base leading-7 text-muted-foreground">{project.short}</p>

        {project.confidentialityNote ? (
          <div className="rounded-xl border border-border bg-card p-4 text-sm">
            <p className="font-medium">Confidentiality note</p>
            <p className="mt-1 text-muted-foreground">{project.confidentialityNote}</p>
          </div>
        ) : null}

        <div className="pt-4">
          <SectionHeader title="Links" description="Public links and a quick deployment note." />
          <div className="mt-3 flex flex-wrap gap-2">
            {project.links.liveDemo ? (
              <Button asChild>
                <a href={project.links.liveDemo} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              </Button>
            ) : null}
            {project.links.github ? (
              <Button variant="secondary" asChild>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
            ) : null}
            <Button variant="ghost" asChild>
              <Link href="/projects">Back to projects</Link>
            </Button>
          </div>
          {project.deployment ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Deployment: <span className="font-medium text-foreground">{project.deployment}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {mdx}
      </div>

      <div className="mt-10">
        <Button variant="outline" asChild>
          <Link href="/projects">Back to projects</Link>
        </Button>
      </div>
    </article>
  );
}


