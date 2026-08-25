"use client";

/**
 * Scroll-linked parallax wrapper — the child drifts vertically as it moves
 * through the viewport. Use small speeds (0.1–0.3) for a professional feel.
 */

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export default function Parallax({
  children,
  speed = 0.18,
  className,
}: {
  children: ReactNode;
  /** positive = drifts up as you scroll; negative = drifts down */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 160, speed * -160]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
