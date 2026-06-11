'use client';

import SectionHeading from '@/components/SectionHeading';
import Tilt from '@/components/Tilt';
import { useReveal } from '@/lib/useReveal';
import { useContent } from '@/lib/i18n';
import { img } from '@/lib/asset';

export default function Origins() {
  const ref = useReveal<HTMLElement>();
  const { origins, ingredients } = useContent();

  return (
    <section id="origins" ref={ref} className="section-pad relative">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          index={origins.index}
          eyebrow={origins.eyebrow}
          title={
            <>
              {origins.titleA}
              <br />
              <span className="italic text-levain">{origins.titleB}</span>
            </>
          }
        />

        <div className="space-y-8">
          <p className="reveal text-pretty text-lg leading-relaxed text-ink/85">
            {origins.p1}
          </p>
          <p className="reveal text-pretty leading-relaxed text-ash">
            {origins.p2}
          </p>
        </div>
      </div>

      {/* Four materials — each a framed specimen photograph */}
      <div className="mx-auto mt-20 max-w-6xl">
        <p className="reveal eyebrow mb-6">{origins.ingredientsHeading}</p>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {ingredients.map((ing) => (
            <figure key={ing.key} className="reveal group">
              <Tilt className="img-frame relative aspect-[4/5]" max={11}>
                <img
                  src={img(ing.img)}
                  alt={ing.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[0.15] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-4"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <p className="font-display text-2xl text-paper">{ing.name}</p>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-paper/70">
                    {ing.tag}
                  </p>
                </div>
              </Tilt>
              <figcaption className="text-pretty mt-3 text-sm leading-relaxed text-ash">
                {ing.body}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
