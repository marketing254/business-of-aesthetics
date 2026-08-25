"use client";

/**
 * 3D perspective tilt card (21st.dev style) — spring-smoothed rotation that
 * follows the pointer, with an optional moving glare highlight and a subtle
 * lift. Children can pop toward the viewer with `.tilt-depth` (translateZ).
 * Disabled for touch/coarse pointers and prefers-reduced-motion.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className,
  maxTilt = 7,
  glare = true,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees */
  maxTilt?: number;
  glare?: boolean;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);
  const glareX = useSpring(gx, { stiffness: 200, damping: 30 });
  const glareY = useSpring(gy, { stiffness: 200, damping: 30 });

  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 62%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * maxTilt * 2);
    ry.set((px - 0.5) * maxTilt * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        className={className}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={lift ? { y: -6 } : undefined}
        transition={{ y: { duration: 0.3, ease: "easeOut" } }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
