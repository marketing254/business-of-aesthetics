"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SheetReplay } from "@/lib/sheet";

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
        Panel replays are syncing from the database. Check back shortly.
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

      <div className="mt-9 grid gap-7 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.slug} className="card-frame group flex flex-col overflow-hidden">
            <Link
              href={`/panels/replays/${p.slug}`}
              className="tone-img relative aspect-[16/9] bg-cream"
            >
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="signal-surface grid h-full place-items-center p-8">
                  <div className="text-center">
                    <span className="chip teal">Replay</span>
                    <div className="display mt-4 text-[28px] text-navy">
                      BOA Panel
                    </div>
                  </div>
                </div>
              )}
              <span className="chip solid absolute left-4 top-4">{p.category}</span>
              <span className="absolute inset-0 grid place-items-center bg-navy-ink/0 transition-colors group-hover:bg-navy-ink/40">
                <span className="grid h-16 w-16 scale-90 place-items-center rounded-full bg-teal text-white opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="index-no text-[14px]">{p.date}</span>
                <span className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-muted">
                  {p.duration || "Replay"}
                </span>
              </div>
              <h3 className="display mt-3 text-[21px] leading-snug text-navy">
                {p.title}
              </h3>
              {p.summary && (
                <p className="mt-3 line-clamp-4 text-[14px] leading-relaxed text-muted">
                  {p.summary}
                </p>
              )}

              <div className="mt-auto flex flex-wrap gap-4 pt-6">
                <Link href={`/panels/replays/${p.slug}`} className="linkline">
                  Replay page <span className="arr">-&gt;</span>
                </Link>
                {p.videoUrl && (
                  <a
                    href={p.videoUrl}
                    target="_blank"
                    rel="noopener"
                    className="linkline"
                  >
                    Watch <span className="arr">-&gt;</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
