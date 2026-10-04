import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Github, Lock } from "lucide-react";
import { projects, projectSlugs } from "@/data/projects";
import { readProjectMdx } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { getProjectFacts } from "@/lib/projectStats";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectAchievements } from "@/components/projects/ProjectAchievements";

export async function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

/** "TheTripMan (Client • Booking and Payments Platform)" -> name + kind. */
function splitTitle(title: string) {
  const i = title.indexOf(" (");
  if (i === -1) return { name: title, kind: "" };
  return { name: title.slice(0, i), kind: title.slice(i + 2).replace(/\)$/, "") };
}

/** "Next.js 15 (App Router)" -> "Next.js 15", for compact tags. */
function tagName(stackItem: string) {
  return stackItem.split(" (")[0].split(" + ")[0].split(" / ")[0].split(",")[0].trim();
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default async function ProjectStorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { name, kind } = splitTitle(project.title);
  const facts = getProjectFacts(project.slug);
  const tags = Array.from(new Set([...project.tags, ...project.stack.slice(0, 6).map(tagName)]));
  const live = project.links.liveDemo;
  const liveHost = live ? hostOf(live) : "";
  const liveIsWriteup = liveHost.includes("devpost");

  let mdx: React.ReactNode = null;
  try {
    const source = await readProjectMdx(slug);
    mdx = await renderMdx(source);
  } catch {
    mdx = (
      <p className="text-sm leading-6 text-muted-foreground">
        A longer write-up is coming soon. For now, the overview above and the links are the best
        way to see the project.
      </p>
    );
  }

  return (
    <article className="space-y-6">
      {/* Title block, as on a Steam app page */}
      <header>
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#8f98a0]">
          <Link href="/library" className="hover:text-white">
            All Projects
          </Link>
          <span className="px-1.5">&gt;</span>
          <Link href="/library" className="hover:text-white">
            {project.tags[0]}
          </Link>
          <span className="px-1.5">&gt;</span>
          <span>{name}</span>
        </nav>
        <h1 className="mt-1 text-[26px] font-normal leading-tight text-white light:text-foreground sm:text-[30px]">
          {name}
        </h1>
        {kind ? <p className="mt-0.5 text-sm text-[#8f98a0]">{kind}</p> : null}
      </header>

      {/* Highlights player + capsule column */}
      <section className="panel grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_324px]">
        <ProjectMedia gallery={project.gallery} demoVideo={project.demoVideo} title={name} />

        <aside className="flex min-w-0 flex-col gap-3">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt=""
              className="hidden aspect-[460/215] w-full object-cover object-top lg:block"
            />
          ) : null}
          <p className="text-[13px] leading-[1.55] text-[#c6d4df] light:text-foreground">{project.short}</p>

          <dl className="grid grid-cols-[96px_1fr] gap-x-2 gap-y-1.5 text-[12px] uppercase">
            <dt className="text-[#556772]">Status:</dt>
            <dd className="normal-case text-[#66c0f4]">{facts.status}</dd>
            <dt className="text-[#556772]">Release date:</dt>
            <dd className="normal-case text-[#8f98a0]">{facts.year}</dd>
            <dt className="text-[#556772]">Developer:</dt>
            <dd className="normal-case">
              <Link href="/about" className="text-[#66c0f4] hover:text-white">
                Muhammed Cengiz
              </Link>
            </dd>
            <dt className="text-[#556772]">Role:</dt>
            <dd className="normal-case text-[#8f98a0]">{facts.role}</dd>
            <dt className="text-[#556772]">Type:</dt>
            <dd className="normal-case text-[#8f98a0]">{facts.type}</dd>
          </dl>

          <div>
            <p className="text-[12px] text-[#556772]">Popular tags for this project:</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {tags.map((t) => (
                <span key={t} className="steam-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_324px]">
        <div className="min-w-0 space-y-6">
          {/* Purchase strips. Nothing costs money, so the price reads Live / Free. */}
          {live ? (
            <PurchaseStrip
              title={liveIsWriteup ? `Read about ${name}` : `Play ${name}`}
              subtitle={liveIsWriteup ? `Project page on ${liveHost}` : `Live at ${liveHost}`}
              price={liveIsWriteup ? "Demo" : "Live"}
              href={live}
              cta={liveIsWriteup ? "View on Devpost" : "Visit site"}
              icon={<ExternalLink className="h-4 w-4" />}
              variant="green"
            />
          ) : null}
          {project.links.github ? (
            <PurchaseStrip
              title={`${name} source code`}
              subtitle="Public repository on GitHub"
              price="Free"
              href={project.links.github}
              cta="View on GitHub"
              icon={<Github className="h-4 w-4" />}
              variant="blue"
            />
          ) : null}
          {project.confidentialityNote ? (
            <div className="flex gap-3 rounded-[3px] border border-[#3a4b5c] bg-[rgba(0,0,0,0.25)] p-3 text-[13px] text-[#acb2b8]">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#8f98a0]" />
              <p>
                <span className="font-semibold text-white light:text-foreground">Notice: </span>
                {project.confidentialityNote}
              </p>
            </div>
          ) : null}

          <section>
            <h2 className="steam-heading">About this project</h2>
            <div className="mt-3 space-y-4 text-[14px] leading-6 text-[#acb2b8] light:text-muted-foreground">
              <div>
                <h3 className="text-[15px] font-semibold text-white light:text-foreground">The problem</h3>
                <p className="mt-1">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white light:text-foreground">My role</h3>
                <p className="mt-1">{project.role}</p>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white light:text-foreground">What I shipped</h3>
                <ul className="mt-1 list-disc space-y-1.5 pl-5 marker:text-[#66c0f4]">
                  {project.impact.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <ProjectAchievements slug={project.slug} />

          <section>
            <h2 className="steam-heading">Case study</h2>
            <div className="mt-3 space-y-4">{mdx}</div>
          </section>
        </div>

        {/* Right column, like the features and languages blocks on a store page */}
        <aside className="space-y-4">
          <div className="panel p-4">
            <h2 className="steam-heading">Built with</h2>
            <ul className="mt-3 space-y-1.5">
              {project.stack.map((s) => (
                <li key={s} className="flex items-start gap-2 rounded-[2px] bg-[rgba(0,0,0,0.2)] px-2.5 py-1.5 text-[13px] text-[#c6d4df] light:bg-muted light:text-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#66c0f4]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4">
            <h2 className="steam-heading">Links</h2>
            <div className="mt-3 flex flex-col gap-2">
              {live ? (
                <a href={live} target="_blank" rel="noreferrer" className="steam-btn-soft h-8 justify-start text-[13px]">
                  <ExternalLink className="h-3.5 w-3.5" /> {liveHost}
                </a>
              ) : null}
              {project.links.github ? (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="steam-btn-soft h-8 justify-start text-[13px]">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              ) : null}
              <Link href="/library" className="steam-btn-soft h-8 justify-start text-[13px]">
                Back to library
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function PurchaseStrip({
  title,
  subtitle,
  price,
  href,
  cta,
  icon,
  variant,
}: {
  title: string;
  subtitle: string;
  price: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
  variant: "green" | "blue";
}) {
  return (
    <div className="steam-purchase relative px-4 pb-8 pt-4 sm:pb-9">
      <h2 className="text-[19px] font-normal text-white light:text-foreground">{title}</h2>
      <p className="mt-0.5 text-[12px] text-[#c6d4df] light:text-muted-foreground">{subtitle}</p>
      <div className="steam-purchase-action absolute -bottom-3.5 right-4 flex items-center">
        <span className="px-3 text-[13px] text-[#c6d4df]">{price}</span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`${variant === "green" ? "steam-btn-green" : "steam-btn-blue"} h-[30px] text-[13px]`}
        >
          {icon}
          {cta}
        </a>
      </div>
    </div>
  );
}
