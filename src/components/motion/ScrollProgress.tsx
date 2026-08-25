"use client";

/** Thin reading-progress bar under the sticky header. */

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2.5px] origin-left bg-gradient-to-r from-teal to-teal-deep"
      style={{ scaleX }}
    />
  );
}
