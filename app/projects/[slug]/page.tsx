import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, projectSlugs } from "@/data/projects";
import { readProjectMdx } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export async function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
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
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
    <article className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {project.title}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">{project.short}</p>
          </div>

          {project.confidentialityNote ? (
            <div className="rounded-sm border border-border bg-white/5 p-3 text-sm ring-1 ring-white/10">
              <p className="font-semibold tracking-[0.08em] uppercase text-foreground">
                Confidentiality note
              </p>
              <p className="mt-1 text-muted-foreground">{project.confidentialityNote}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 pt-1">
            {project.links.liveDemo ? (
              <Button asChild className="normal-case tracking-normal font-medium">
                <a href={project.links.liveDemo} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              </Button>
            ) : null}
            {project.links.github ? (
              <Button
                variant="secondary"
                asChild
                className="normal-case tracking-normal font-medium"
              >
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            ) : null}
            <Button
              variant="ghost"
              asChild
              className="normal-case tracking-normal font-medium"
            >
              <Link href="/projects">Back to projects</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Case study
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">{mdx}</div>
        </CardContent>
      </Card>
    </article>
  );
}


