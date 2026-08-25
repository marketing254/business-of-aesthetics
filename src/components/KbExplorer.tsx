"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { kbCategories, kbFaqs } from "@/lib/data";

export default function KbExplorer() {
  const [cat, setCat] = useState("all");

  const list = kbFaqs.filter((f) => cat === "all" || f.cat === cat);

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
      <aside>
        <h3 className="display text-[22px] text-navy">Browse by topic</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          Six clean categories covering everything from membership to marketing
          to podcast guesting.
        </p>
        <div className="mt-6 flex flex-row flex-wrap gap-2.5 lg:flex-col lg:items-start">
          {kbCategories.map((c) => (
            <button
              key={c.key}
              className={`fpill ${cat === c.key ? "active" : ""}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.21, 1] }}
          >
            {list.map((f, i) => (
              <details key={f.q} className="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
