"use client";

/**
 * Cinematic headline reveal, powered by GSAP SplitText + ScrollTrigger.
 * Characters rise out of per-word masks with a soft stagger the first time
 * the heading scrolls into view.
 *
 * API (unchanged across the site): pass plain text; mark the teal accent
 * with *asterisks*. e.g. <WordReveal text="Grow a practice *built to last*." />
 */

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const tags = ["h1", "h2", "h3", "p", "div"] as const;

export default function WordReveal({
  text,
  className,
  as = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: (typeof tags)[number];
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // build content: accents inside *…* become <em> (teal via .display em)
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      let split: SplitText | null = null;
      let cancelled = false;

      // wait for webfonts so the split measures the real glyphs
      document.fonts.ready.then(() => {
        if (cancelled || !el) return;
        split = SplitText.create(el, {
          type: "words,chars",
          mask: "words",
          wordsClass: "wr-word",
        });
        gsap.set(el, { visibility: "visible" });
        gsap.from(split.chars, {
          yPercent: 115,
          rotate: 3,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.016,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduced, text] }
  );

  const Tag = as;

  return (
    <Tag
      // @ts-expect-error — polymorphic ref
      ref={ref}
      className={className}
      style={reduced ? undefined : { visibility: "hidden" }}
      suppressHydrationWarning
    >
      {segments.map((seg, i) => {
        const accent = seg.startsWith("*") && seg.endsWith("*");
        const clean = accent ? seg.slice(1, -1) : seg;
        return accent ? <em key={i}>{clean}</em> : <span key={i}>{clean}</span>;
      })}
    </Tag>
  );
}
