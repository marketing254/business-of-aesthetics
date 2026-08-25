"use client";

/**
 * Ambient aurora — three blurred brand-color orbs drifting slowly behind a
 * section. Theme-aware (uses accent/heading tokens), pointer-reactive just
 * enough to feel alive, invisible to screen readers, and disabled for
 * reduced motion.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Aurora({
  className = "",
  intensity = 0.5,
}: {
  className?: string;
  /** 0–1 opacity scale */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const orbs = gsap.utils.toArray<HTMLElement>(".aurora-orb");

      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: () => gsap.utils.random(-120, 120),
          y: () => gsap.utils.random(-80, 80),
          scale: () => gsap.utils.random(0.85, 1.25),
          duration: () => gsap.utils.random(9, 14),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: i * 1.4,
        });
      });

      const qx = orbs.map((o) => gsap.quickTo(o, "xPercent", { duration: 2.4, ease: "sine.out" }));
      const qy = orbs.map((o) => gsap.quickTo(o, "yPercent", { duration: 2.4, ease: "sine.out" }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        qx.forEach((fn, i) => fn(nx * (i + 1) * 6));
        qy.forEach((fn, i) => fn(ny * (i + 1) * 6));
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="aurora-orb absolute -left-[10%] top-[-20%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 26%, transparent), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="aurora-orb absolute right-[-15%] top-[10%] h-[48vmax] w-[48vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--heading) 16%, transparent), transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="aurora-orb absolute bottom-[-25%] left-[25%] h-[42vmax] w-[42vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-strong) 18%, transparent), transparent 65%)",
          filter: "blur(65px)",
        }}
      />
    </div>
  );
}
