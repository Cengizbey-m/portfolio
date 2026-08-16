import { profile } from "@/data/profile";
import { education } from "@/data/cv";
import {
  resumeSummary,
  resumeContact,
  workAuthorization,
  experience,
  sideProjects,
  skills,
  coursework,
  certifications,
  type ResumeRole,
} from "@/data/resume";

/**
 * The resume, as one A4 sheet.
 *
 * Sizes are in points, not pixels. A printed page is measured in points, so
 * declaring 9.6pt puts 9.6pt on the paper no matter what the browser's pixel
 * ratio happens to be. The previous version used px and landed around 7pt,
 * which is why the sheet read as cramped and stopped short of the bottom.
 *
 * Horizontal margins live in @page (see globals.css) rather than in this
 * component's padding, because print strips the padding but honours the page
 * box. On screen the sheet re-adds equivalent padding so it still looks like
 * paper.
 *
 * Built for an ATS parser first: single column, no icons, no graphics, no
 * colour, standard section names, real text rather than anything drawn.
 * Hierarchy comes from weight and size only, which is what survives when a
 * parser strips styling entirely.
 */

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

/**
 * One place to tune density. Raising BODY by 0.2pt is the fastest way to fill
 * a page that ends short; lowering GAP_SECTION is the fastest way to reclaim a
 * page that runs long.
 */
const T = {
  name: "19pt",
  role: "10pt",
  contact: "8.8pt",
  section: "9.5pt",
  entryTitle: "9.8pt",
  entryMeta: "8.8pt",
  entrySub: "8.4pt",
  body: "9.2pt",
  leading: "1.28",
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-[8pt] first:mt-0">
      <h2
        className="border-b border-black pb-[1.5pt] font-bold uppercase tracking-[0.08em] text-black"
        style={{ fontSize: T.section }}
      >
        {title}
      </h2>
      <div className="mt-[4pt]">{children}</div>
    </section>
  );
}

/** Title on the left, date on the right, and the date never gets squeezed. */
function EntryHead({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="min-w-0 font-bold leading-snug text-black" style={{ fontSize: T.entryTitle }}>
        {left}
      </p>
      <p
        className="shrink-0 whitespace-nowrap font-bold text-black"
        style={{ fontSize: T.entryMeta }}
      >
        {right}
      </p>
    </div>
  );
}

function Entry({ title, org, tech, location, period, links, bullets }: ResumeRole) {
  return (
    <div className="resume-entry mb-[6.5pt] last:mb-0">
      <EntryHead
        left={
          <>
            {title}
            {org ? <span className="font-normal"> | {org}</span> : null}
          </>
        }
        right={period}
      />

      {tech || location || links?.length ? (
        <p
          className="mt-[1.5pt] leading-snug text-[#333333]"
          style={{ fontSize: T.entrySub }}
        >
          {tech ? <span className="italic">{tech}</span> : null}
          {location ? <span className="italic">{location}</span> : null}
          {links?.length ? (
            <>
              {tech || location ? " | " : null}
              {links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 ? " | " : null}
                  <a href={l.href} className="font-bold text-black underline">
                    {l.label}
                  </a>
                </span>
              ))}
            </>
          ) : null}
        </p>
      ) : null}

      <ul className="mt-[3pt] list-disc pl-[12pt] marker:text-black">
        {bullets.map((b) => (
          <li
            key={b}
            className="mb-[1.5pt] text-black last:mb-0"
            style={{ fontSize: T.body, lineHeight: T.leading }}
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeDocument() {
  return (
    <article
      className="resume-sheet mx-auto w-full max-w-[210mm] bg-white px-[14mm] py-[12mm] text-black"
      style={{ fontFamily: FONT }}
    >
      {/* Left-aligned contact block, plain text so a parser reads every field. */}
      <header>
        <h1
          className="font-bold uppercase leading-none tracking-[0.02em] text-black"
          style={{ fontSize: T.name }}
        >
          {profile.realName}
        </h1>
        <p className="mt-[3pt] font-bold text-black" style={{ fontSize: T.role }}>
          {profile.role}
        </p>
        <p className="mt-[4pt] leading-[1.45] text-black" style={{ fontSize: T.contact }}>
          {resumeContact.location} &nbsp;·&nbsp; {resumeContact.phone} &nbsp;·&nbsp;{" "}
          {profile.links.email}
        </p>
        <p className="leading-[1.45] text-black" style={{ fontSize: T.contact }}>
          <a href={profile.links.linkedin} className="underline">
            {resumeContact.linkedin}
          </a>
          &nbsp;·&nbsp;
          <a href={profile.links.github} className="underline">
            {resumeContact.github}
          </a>
          &nbsp;·&nbsp;
          <a href={`https://${resumeContact.website}`} className="underline">
            {resumeContact.website}
          </a>
        </p>
        {/* Work authorization sits above the fold on purpose: in the Canadian
            market it is the first filter a recruiter applies. */}
        <p
          className="mt-[3pt] font-bold leading-snug text-black"
          style={{ fontSize: T.contact }}
        >
          {workAuthorization}
        </p>
      </header>

      <Section title="Summary">
        <p className="text-justify text-black" style={{ fontSize: T.body, lineHeight: T.leading }}>
          {resumeSummary}
        </p>
      </Section>

      <Section title="Skills">
        <dl className="space-y-[3pt]">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-[10pt]">
              <dt
                className="w-[27mm] shrink-0 font-bold text-black"
                style={{ fontSize: T.body, lineHeight: T.leading }}
              >
                {s.label}
              </dt>
              <dd
                className="flex-1 text-black"
                style={{ fontSize: T.body, lineHeight: T.leading }}
              >
                {s.items}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience">
        {experience.map((r) => (
          <Entry key={r.title + r.org} {...r} />
        ))}
      </Section>

      <Section title="Projects">
        {sideProjects.map((r) => (
          <Entry key={r.title} {...r} />
        ))}
      </Section>

      <Section title="Education">
        <div className="resume-entry">
          <EntryHead
            left={
              <>
                {education.school}
                <span className="font-normal"> | {education.location}</span>
              </>
            }
            right={education.grad}
          />
          <p
            className="mt-[1.5pt] text-black"
            style={{ fontSize: T.body, lineHeight: T.leading }}
          >
            {education.credentialFull}
          </p>
          <p
            className="mt-[1.5pt] text-[#333333]"
            style={{ fontSize: T.entrySub, lineHeight: T.leading }}
          >
            {coursework}
          </p>
          {/* Certifications ride along here rather than claiming their own
              heading. The keyword still parses; a sixth section header does
              not earn its vertical space on a one-page sheet. */}
          <p
            className="mt-[2pt] text-black"
            style={{ fontSize: T.entrySub, lineHeight: T.leading }}
          >
            <span className="font-bold">Certifications: </span>
            {certifications}
          </p>
        </div>
      </Section>
    </article>
  );
}
