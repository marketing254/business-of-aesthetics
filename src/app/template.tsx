"use client";

/**
 * Page-enter transition — remounts on every route change, so each
 * navigation gets a soft rise-and-fade. Kept short so it never feels slow.
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}
