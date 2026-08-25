"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/lib/data";

const EASE = [0.22, 0.61, 0.21, 1] as const;

export default function TestimonialSlider() {
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (k: number, d: number) =>
    setState([(k + testimonials.length) % testimonials.length, d]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setState(([v]) => [(v + 1) % testimonials.length, 1]);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const t = testimonials[i];

  return (
    <div className="relative mx-auto max-w-[820px]">
      <div
        aria-hidden
        className="display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[150px] leading-none text-teal/15"
      >
        &ldquo;
      </div>

      <div className="relative min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, x: 34 * dir, filter: "blur(3px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -26 * dir, filter: "blur(3px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative text-center"
          >
            <blockquote className="display mx-auto max-w-[700px] text-[clamp(20px,2.6vw,29px)] leading-snug text-navy">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8">
              <div className="mx-auto mb-4 h-px w-10 bg-teal" />
              <div className="text-[15px] font-semibold text-navy">{t.name}</div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
                {t.role}
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => go(i - 1, -1)}
          aria-label="Previous testimonial"
          className="grid h-11 w-11 place-items-center border border-line bg-paper text-navy transition-colors hover:border-teal hover:text-teal-deep"
        >
          ←
        </motion.button>
        <span className="text-[12px] font-semibold tracking-[0.2em] text-muted">
          {String(i + 1).padStart(2, "0")}{" "}
          <span className="text-line">/</span>{" "}
          {String(testimonials.length).padStart(2, "0")}
        </span>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => go(i + 1, 1)}
          aria-label="Next testimonial"
          className="grid h-11 w-11 place-items-center border border-line bg-paper text-navy transition-colors hover:border-teal hover:text-teal-deep"
        >
          →
        </motion.button>
      </div>
    </div>
  );
}
