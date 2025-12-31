import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, projectSlugs } from "@/data/projects";
import { readProjectMdx } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

        <div className="flex flex-wrap gap-2 pt-2">
          {project.links.liveDemo ? (
            <Button asChild>
              <a href={project.links.liveDemo} target="_blank" rel="noreferrer">
                Live demo
              </a>
            </Button>
          ) : null}
          {project.links.github ? (
            <Button variant="secondary" asChild>
              <a href={project.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          ) : null}
          <Button variant="ghost" asChild>
            <Link href="/projects">Back to projects</Link>
          </Button>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {mdx}
      </div>
    </article>
  );
}


