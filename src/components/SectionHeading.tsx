// Shared editorial section heading: a mono eyebrow with an index numeral and
// a large display title. Numbering here is structural — the sections form an
// ordered narrative arc — not decoration.
export default function SectionHeading({
  index,
  eyebrow,
  title,
  className = '',
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="reveal mb-6 flex items-center gap-4">
        <span className="font-mono text-sm text-levain">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="reveal display text-balance text-[clamp(2.4rem,6vw,5rem)]">
        {title}
      </h2>
    </div>
  );
}
