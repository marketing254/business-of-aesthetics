"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { thumbUrl, type SheetPodcast } from "@/lib/sheet";

/** Only what the list needs - keeps the RSC payload small (was 480 KB). */
export type EpisodeCard = Pick<
  SheetPodcast,
  "episode" | "title" | "guestName" | "guestPhotoUrl" | "category" | "datePublished" | "slug" | "initials"
>;
import Paginator from "@/components/Paginator";

const EASE = [0.22, 0.61, 0.21, 1] as const;
const PAGE_SIZE = 10;

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
  episodes: EpisodeCard[];
}) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(episodes.map((e) => e.category))).sort()],
    [episodes]
  );
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setPage(1);
  }, [q, cat]);

  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const paged = useMemo(
    () => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [list, page]
  );

  const goToPage = (p: number) => {
    setPage(p);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!episodes.length) {
    return (
      <div className="card-frame p-10 text-center text-[15px] text-muted">
        New episodes are being added - check back shortly.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-full max-w-[420px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search episodes, guests, or topics..."
            className="w-full rounded-full border border-line bg-paper px-5 py-3 pr-11 text-[14px] transition-colors focus:border-teal focus:outline-none"
            aria-label="Search episodes"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 pb-1">
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
      </div>

      <div ref={listTopRef} className="scroll-mt-28" />
      <motion.div layout className="mt-9 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {paged.map((e) => (
            <motion.div
              key={e.episode}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="h-full"
            >
              <Link
                href={`/podcast/${e.slug}`}
                className="card-frame group flex h-full flex-col p-6 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  {e.guestPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbUrl(e.guestPhotoUrl, 400)}
                      alt={e.guestName}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 shrink-0 rounded-full border border-line object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <span className="dark-canvas grid h-12 w-12 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-teal">
                      {e.initials || initials(e.guestName)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-semibold text-ink">
                      {e.guestName}
                    </div>
                    <div className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                      EP {String(e.episode).padStart(3, "0")} · {e.datePublished}
                    </div>
                  </div>
                  <span className="chip ml-auto hidden shrink-0 sm:inline-flex">
                    {e.category}
                  </span>
                </div>

                <h3 className="display mt-5 flex-1 text-[17.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {e.title}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="chip sm:hidden">{e.category}</span>
                  <span className="linkline">
                    Listen to the episode <span className="arr">-&gt;</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="mt-10 text-center text-[15px] text-muted">
          No episodes match your search. Try a different keyword.
        </p>
      )}

      <Paginator page={page} pageCount={pageCount} onChange={goToPage} />
    </div>
  );
}
