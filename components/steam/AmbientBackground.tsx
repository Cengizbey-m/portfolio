/**
 * A calm, always-on backdrop. A few big, heavily-blurred colour blobs drift
 * slowly behind everything so the page keeps a sense of depth and life all the
 * way down — not just under the hero. Kept low-opacity on purpose: it should be
 * the kind of thing you feel more than notice. Motion is disabled for anyone
 * who prefers reduced motion (see globals.css).
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
      <span className="ambient-blob ambient-blob--1" />
      <span className="ambient-blob ambient-blob--2" />
      <span className="ambient-blob ambient-blob--3" />
    </div>
  );
}
