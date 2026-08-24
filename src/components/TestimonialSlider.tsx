"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

export default function TestimonialSlider() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (k: number) => setI((k + testimonials.length) % testimonials.length);

  useEffect(() => {
    timer.current = setInterval(() => {
      setI((v) => (v + 1) % testimonials.length);
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
        className="display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[150px] italic leading-none text-teal/15"
      >
        &ldquo;
      </div>
      <figure key={i} className="relative text-center" style={{ animation: "menuIn 0.5s ease both" }}>
        <blockquote className="display mx-auto max-w-[700px] text-[clamp(20px,2.6vw,29px)] italic leading-snug text-navy">
          {t.quote}
        </blockquote>
        <figcaption className="mt-8">
          <div className="mx-auto mb-4 h-px w-10 bg-teal" />
          <div className="text-[15px] font-extrabold text-navy">{t.name}</div>
          <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
            {t.role}
          </div>
        </figcaption>
      </figure>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => go(i - 1)}
          aria-label="Previous testimonial"
          className="grid h-11 w-11 place-items-center border border-line bg-paper text-navy transition-all hover:border-teal hover:text-teal-deep"
        >
          ←
        </button>
        <span className="text-[12px] font-extrabold tracking-[0.2em] text-muted">
          {String(i + 1).padStart(2, "0")}{" "}
          <span className="text-line">/</span>{" "}
          {String(testimonials.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => go(i + 1)}
          aria-label="Next testimonial"
          className="grid h-11 w-11 place-items-center border border-line bg-paper text-navy transition-all hover:border-teal hover:text-teal-deep"
        >
          →
        </button>
      </div>
    </div>
  );
}
