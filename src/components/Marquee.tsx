"use client";

/**
 * Velocity-reactive marquee — glides continuously and speeds up (and flips
 * direction) with the user's scroll velocity, GSAP-driven. Same API as the
 * old CSS marquee.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marqueeTopics } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Marquee({
  items = marqueeTopics,
  dark = false,
}: {
  items?: string[];
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 36,
        ease: "none",
        repeat: -1,
      });
      if (reduced) {
        tween.timeScale(0.25);
        return;
      }

      let speed = 1;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 240);
          speed = gsap.utils.interpolate(speed, 1 + Math.abs(v), 0.1);
          tween.timeScale(v < 0 ? -speed : speed);
        },
      });
      const settle = gsap.ticker.add(() => {
        speed = gsap.utils.interpolate(speed, 1, 0.04);
        const ts = tween.timeScale();
        if (Math.abs(ts) > 1)
          tween.timeScale(gsap.utils.interpolate(ts, ts < 0 ? -1 : 1, 0.04));
      });
      return () => {
        st.kill();
        gsap.ticker.remove(settle);
      };
    },
    { scope: ref }
  );

  const row = (
    <span className="flex items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap">
          <span
            className={`px-8 text-[16px] font-semibold tracking-wide ${
              dark ? "text-white/85" : "text-navy"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t}
          </span>
          <span className={dark ? "text-teal" : "text-teal-deep"} aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`overflow-hidden border-y py-4 ${
        dark ? "border-white/10 bg-navy-ink" : "border-line bg-sand"
      }`}
    >
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
