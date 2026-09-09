"use client";

/**
 * Floating back-to-top button - appears after a page of scroll, sits above
 * the fold-away footer, and rides the brand's pill style.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-navy shadow-[0_16px_36px_-16px_rgba(12,18,41,0.4)] transition-colors hover:border-teal hover:text-teal-deep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
