'use client';

import { useReveal } from '@/lib/useReveal';
import { CLOSING } from '@/lib/content';

export default function Closing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="closing"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="glow-levain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 max-w-3xl">
        <p className="reveal eyebrow mb-8">VIII · Closing reflection</p>
        <h2 className="reveal display text-balance text-[clamp(2.8rem,8vw,6.5rem)]">
          {CLOSING.title}
        </h2>
        <p className="reveal text-pretty mx-auto mt-10 max-w-reading text-lg leading-relaxed text-linen/80">
          {CLOSING.body}
        </p>
        <p className="reveal mt-12 font-mono text-sm uppercase tracking-[0.3em] text-levain">
          {CLOSING.signature}
        </p>
      </div>

      <footer className="reveal absolute bottom-8 left-0 right-0 px-6">
        <div className="rule-fade mb-6" />
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ash">
          A digital museum & living laboratory · built with Next.js, GSAP &
          Lenis · sources: Wikipedia, sourdough.co.uk & reference archive
        </p>
      </footer>
    </section>
  );
}
