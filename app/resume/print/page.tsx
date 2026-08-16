import { ResumeDocument } from "@/components/resume/ResumeDocument";

/**
 * The bare resume sheet with no site chrome around it.
 *
 * This is what gets rendered to PDF (headless print) and what the /resume page
 * falls back to if a browser refuses to display the embedded PDF.
 */
export const metadata = {
  title: "Resume (print view)",
  robots: { index: false, follow: false },
};

export default function ResumePrintPage() {
  return (
    <div className="min-h-dvh bg-white">
      <ResumeDocument />
    </div>
  );
}
