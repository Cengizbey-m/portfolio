import { ReplayShow } from "@/components/replay/ReplayShow";

export const metadata = {
  title: "Year in Code 2025",
  description:
    "A Steam-Replay-style animated retrospective of 2025: hours coded, top languages, favourite project, biggest commit days.",
};

export default function ReplayPage() {
  return <ReplayShow />;
}
