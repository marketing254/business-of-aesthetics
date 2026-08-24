"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SheetPodcast } from "@/lib/sheet";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => !w.includes("."))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function EpisodeExplorer({
  episodes,
}: {
  episodes: SheetPodcast[];
}) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(episodes.map((e) => e.category))).sort()],
    [episodes]
  );
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return episodes.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (!needle) return true;
      return (
        e.title.toLowerCase().includes(needle) ||
        e.guestName.toLowerCase().includes(needle) ||
        e.category.toLowerCase().includes(needle) ||
        String(e.episode).includes(needle)
      );
    });
  }, [cat, episodes, q]);

  if (!episodes.length) {
    return (
      <div className="card-frame p-10 text-center text-[15px] text-muted">
        Podcast episodes are syncing from the database. Check back shortly.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="scroll-x flex gap-2.5 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              className={`fpill ${cat === c ? "active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative lg:w-[340px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search episodes, guests, or topics..."
            className="w-full border border-line bg-paper px-4 py-3 pr-11 text-[14px] transition-colors focus:border-teal focus:outline-none"
            aria-label="Search episodes"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
        </div>
      </div>

      <div className="mt-9 grid gap-px overflow-hidden border border-line bg-line">
        {list.map((e) => (
          <Link
            key={e.episode}
            href={`/podcast/${e.slug}`}
            className="group grid gap-5 bg-paper p-5 transition-colors hover:bg-cream md:grid-cols-[120px_1fr_auto] md:items-center md:p-6"
          >
            <div>
              <span className="index-no text-[15px]">
                EP {String(e.episode).padStart(3, "0")}
              </span>
              <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
                {e.datePublished}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="chip">{e.category}</span>
                <span className="text-[12px] font-bold text-muted">
                  {e.guestName}
                </span>
              </div>
              <h3 className="display mt-3 text-[20px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                {e.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              {e.guestPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={e.guestPhotoUrl}
                  alt={e.guestName}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full border border-line object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <span className="dark-canvas grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-extrabold text-teal">
                  {e.initials || initials(e.guestName)}
                </span>
              )}
              <span className="linkline">
                Open <span className="arr">-&gt;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-10 text-center text-[15px] text-muted">
          No episodes match your search. Try a different keyword.
        </p>
      )}
    </div>
  );
}
