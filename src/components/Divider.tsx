// Organic section divider: two offset sine strokes (a strand of gluten / an
// instrument trace) with a slow flowing dash, and a small wheat-seed glyph at
// the centre. Replaces the plain hairline between major movements.
export default function Divider() {
  return (
    <div className="relative mx-auto my-4 max-w-6xl px-6">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="h-6 w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M0 12 Q 150 2 300 12 T 600 12 T 900 12 T 1200 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="div-flow text-levain/40"
        />
        <path
          d="M0 12 Q 150 22 300 12 T 600 12 T 900 12 T 1200 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="div-flow-rev text-phosphor/30"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-3 font-mono text-[0.6rem] text-levain">
        ✶
      </span>
    </div>
  );
}
