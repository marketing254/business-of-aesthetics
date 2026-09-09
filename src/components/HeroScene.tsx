"use client";

/**
 * Cinematic 3D hero backdrop - concentric brand-teal rings orbiting in
 * slow, tilted rotation around a soft glowing core, with a luminous swept
 * arc (a nod to the ring lights of aesthetic practice). Pure CSS 3D with a
 * gentle pointer parallax; static for reduced motion. Sits behind the hero
 * copy at low opacity so the headline stays the star.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function HeroScene() {
  const rigRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const rig = rigRef.current;
    if (!rig) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetY = nx * 10; // rotateY
      targetX = -ny * 7; // rotateX
    };

    const tick = () => {
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      rig.style.transform = `rotateX(${curX.toFixed(3)}deg) rotateY(${curY.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="hero-scene" aria-hidden>
      <div className="hs-glow" />
      <div ref={rigRef} className="hs-rig">
        <span className="hs-ring hs-r1" />
        <span className="hs-ring hs-r2" />
        <span className="hs-ring hs-r3" />
        <span className="hs-arc" />
        <span className="hs-core" />
      </div>
      <span className="hs-speck" style={{ left: "16%", top: "30%", animationDelay: "0s" }} />
      <span className="hs-speck" style={{ left: "82%", top: "24%", animationDelay: "-3s" }} />
      <span className="hs-speck" style={{ left: "72%", top: "70%", animationDelay: "-6s" }} />
      <span className="hs-speck" style={{ left: "24%", top: "74%", animationDelay: "-9s" }} />
    </div>
  );
}
