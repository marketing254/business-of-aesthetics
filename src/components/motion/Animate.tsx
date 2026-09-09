"use client";

/**
 * Viewport-triggered animation primitives (Framer Motion / motion.dev).
 * Professional defaults: short distances, soft easing, animate once.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.61, 0.21, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  distance = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      /* low amount so tall blocks (which can never reach high visibility
         ratios) still trigger reliably */
      viewport={{ once, amount: 0.08, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Parent for a group of <StaggerItem>s that cascade in on scroll. */
export function Stagger({
  children,
  className,
  amount = 0.12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Hairline that draws itself in - for section dividers / timelines. */
export function DrawLine({
  className,
  vertical = false,
  delay = 0,
}: {
  className?: string;
  vertical?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: vertical ? "top" : "left" }}
      initial={reduced ? false : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
