"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { SheetReplay } from "@/lib/sheet";

const EASE = [0.22, 0.61, 0.21, 1] as const;

export default function PanelExplorer({
  replays,
}: {
  replays: SheetReplay[];
}) {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(replays.map((p) => p.category))).sort()],
    [replays]
  );
  const [cat, setCat] = useState("all");

  const list = replays.filter((p) => cat === "all" || p.category === cat);

  if (!replays.length) {
    return (
      <div className="card-frame p-10 text-center text-[15px] text-muted">
        Replays are being added — check back shortly.
      </div>
    );
  }

  return (
    <div>
      <div className="scroll-x flex gap-2.5 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            className={`fpill ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-9 grid gap-7 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="card-frame group flex h-full flex-col p-7"
            >
              <Link href={`/panels/replays/${p.slug}`} className="flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <span className="index-no text-[14px]">{p.date}</span>
                  <span className="chip teal">{p.category}</span>
                </div>

                <h3 className="display mt-5 text-[21px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {p.title}
                </h3>
                {p.summary && (
                  <p className="mt-3 line-clamp-4 flex-1 text-[14px] leading-relaxed text-muted">
                    {p.summary}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {p.duration || "Replay"}
                  </span>
                  <span className="linkline">
                    Watch replay <span className="arr">-&gt;</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
