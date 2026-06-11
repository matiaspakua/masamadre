'use client';

import { useReveal } from '@/lib/useReveal';
import { useContent } from '@/lib/i18n';

export default function Closing() {
  const ref = useReveal<HTMLElement>();
  const { closing } = useContent();

  return (
    <section
      id="closing"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="glow-levain pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative z-10 max-w-3xl">
        <p className="reveal eyebrow mb-8">{closing.index} · ✶</p>
        <h2 className="reveal display text-balance text-[clamp(2.8rem,8vw,6.5rem)]">
          {closing.title}
        </h2>
        <p className="reveal text-pretty mx-auto mt-10 max-w-reading text-lg leading-relaxed text-ink/80">
          {closing.body}
        </p>
        <p className="reveal mt-12 font-mono text-sm uppercase tracking-[0.3em] text-levain">
          {closing.signature}
        </p>
      </div>

      <footer className="reveal absolute bottom-8 left-0 right-0 px-6">
        <div className="rule-fade mb-6" />
        <p className="mx-auto max-w-3xl font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ash">
          {closing.footer}
        </p>
      </footer>
    </section>
  );
}
