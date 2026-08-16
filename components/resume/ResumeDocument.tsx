import { profile } from "@/data/profile";
import { education } from "@/data/cv";
import {
  resumeSummary,
  resumeContact,
  experience,
  sideProjects,
  skills,
  certifications,
  type ResumeRole,
} from "@/data/resume";

/**
 * The resume, as one A4 sheet.
 *
 * Layout follows the version that was already working: left-aligned header,
 * even margins on both sides, and a right-hand meta column for dates that never
 * collides with the title on its left.
 *
 * Built for an ATS parser first: single column, no icons, no graphics, no
 * colour, standard section names, real text rather than anything drawn.
 * Hierarchy comes from weight and size only, which is what survives when a
 * parser strips styling entirely.
 */

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-[10px]">
      <h2 className="border-b border-black pb-[1px] text-[10px] font-bold uppercase tracking-[0.09em] text-black">
        {title}
      </h2>
      <div className="mt-[5px]">{children}</div>
    </section>
  );
}

/** Title on the left, date on the right, and the date never gets squeezed. */
function EntryHead({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="min-w-0 text-[10.5px] font-bold leading-snug text-black">{left}</p>
      <p className="shrink-0 whitespace-nowrap text-[9.5px] font-bold text-black">{right}</p>
    </div>
  );
}

function Entry({ title, org, tech, location, period, links, bullets }: ResumeRole) {
  return (
    <div className="resume-entry mb-[8px] last:mb-0">
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
        <p className="mt-[1px] text-[9.2px] leading-snug text-[#333333]">
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

      <ul className="mt-[3px] list-disc pl-[13px] marker:text-black">
        {bullets.map((b) => (
          <li key={b} className="mb-[1px] text-[9.8px] leading-[1.4] text-black last:mb-0">
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
      className="resume-sheet mx-auto w-full max-w-[210mm] bg-white px-[14mm] py-[11mm] text-black"
      style={{ fontFamily: FONT }}
    >
      {/* Left-aligned contact block, plain text so a parser reads every field. */}
      <header>
        <h1 className="text-[23px] font-bold uppercase leading-none tracking-[0.03em] text-black">
          {profile.realName}
        </h1>
        <p className="mt-[3px] text-[11px] font-bold text-black">{profile.role}</p>
        <p className="mt-[4px] text-[9.7px] leading-[1.5] text-black">
          {resumeContact.location} &nbsp;·&nbsp; {resumeContact.phone} &nbsp;·&nbsp;{" "}
          {profile.links.email}
        </p>
        <p className="text-[9.7px] leading-[1.5] text-black">
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
        <p className="mt-[2px] text-[9.7px] font-bold leading-snug text-black">
          Canadian Permanent Resident, authorized to work in Canada with no sponsorship required.
        </p>
      </header>

      <Section title="Summary">
        <p className="text-[9.8px] leading-[1.42] text-black">{resumeSummary}</p>
      </Section>

      <Section title="Technical Skills">
        <dl className="space-y-[2px]">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-3">
              <dt className="w-[120px] shrink-0 text-[9.8px] font-bold text-black">{s.label}</dt>
              <dd className="flex-1 text-[9.8px] leading-[1.4] text-black">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Work Experience">
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
          <p className="mt-[1px] text-[9.8px] leading-[1.4] text-black">
            {education.credentialFull}
          </p>
          <p className="mt-[1px] text-[9.2px] leading-[1.4] text-[#333333]">
            Relevant coursework: AI &amp; Machine Learning, Cloud Systems, iOS Development, .NET/C#,
            Database Design, Enterprise Java, Computer &amp; Network Security, Linux/UNIX.
          </p>
        </div>
      </Section>

      <Section title="Certifications">
        <p className="text-[9.8px] leading-[1.4] text-black">{certifications}</p>
      </Section>
    </article>
  );
}
