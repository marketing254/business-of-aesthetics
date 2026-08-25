"use client";

/**
 * Pinned horizontal-scroll rail (GSAP ScrollTrigger) — the section pins
 * while vertical scroll drives the cards sideways, each card scaling and
 * brightening as it reaches center stage. Falls back to a simple stacked
 * grid on small screens and for reduced motion.
 */

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface RailItem {
  no: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
}

export default function PillarRail({
  kicker,
  heading,
  items,
}: {
  kicker: string;
  heading: string;
  items: RailItem[];
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        () => {
          const track = section.querySelector<HTMLElement>(".rail-track");
          const cards = gsap.utils.toArray<HTMLElement>(".rail-card", section);
          if (!track || cards.length === 0) return;

          const distance = () => track.scrollWidth - section.clientWidth + 96;

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          // spotlight: each card lifts as it crosses the center of the viewport
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { scale: 0.94, opacity: 0.55 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: gsap.getTweensOf(track)[0],
                  start: "left 78%",
                  end: "left 42%",
                  scrub: true,
                },
              }
            );
          });
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-0">
      <div className="mx-auto max-w-[1280px] px-5 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
        <div className="max-w-[680px]">
          <span className="kicker">{kicker}</span>
          <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-navy">
            {heading}
          </h2>
        </div>

        {/* rail (horizontal on desktop, stacked otherwise) */}
        <div className="mt-12 lg:mt-14 lg:overflow-visible">
          <div className="rail-track grid gap-6 will-change-transform lg:flex lg:w-max lg:gap-8 lg:pr-24">
            {items.map((p) => (
              <Link
                key={p.no}
                href={p.href}
                className="rail-card card-frame group flex flex-col p-8 lg:w-[420px] lg:shrink-0 lg:p-10"
              >
                <span className="display text-[39px] leading-none text-teal-deep/25 transition-colors duration-300 group-hover:text-teal-deep">
                  {p.no}
                </span>
                <h3 className="display mt-6 text-[26px] text-navy transition-colors group-hover:text-teal-deep">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">
                  {p.copy}
                </p>
                <span className="linkline mt-8">
                  {p.cta} <span className="arr">-&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted lg:flex">
          <span className="h-px w-10 bg-line" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
