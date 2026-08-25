"use client";

/**
 * Subtle magnetic hover — the wrapped element leans toward the cursor and
 * springs back on leave. Wrap buttons/CTAs; keep strength low (default 0.25).
 */

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 16, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left - rect.width / 2) * strength);
        my.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
