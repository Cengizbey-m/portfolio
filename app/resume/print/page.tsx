import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { getResumeVariant } from "@/data/resume";

/**
 * The bare resume sheet with no site chrome around it.
 *
 * This is what gets rendered to PDF (browser print, or headless) and what the
 * /resume page falls back to if a browser refuses to display the embedded PDF.
 *
 * `?variant=qa` and `?variant=solutions` render the other two sheets. Printing
 * each one to PDF is how the downloadable files get made; see /resume for the
 * switcher and the print instructions.
 */
export const metadata = {
  title: "Resume (print view)",
  robots: { index: false, follow: false },
};

export default async function ResumePrintPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const v = getResumeVariant(variant);

  return (
    <div className="min-h-dvh bg-white">
      <ResumeDocument variant={v.id} />
    </div>
  );
}
