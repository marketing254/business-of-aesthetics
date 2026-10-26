"use client";

/**
 * Searchable, paginated blog archive - same interaction pattern as the
 * podcast and panel explorers so the whole site feels like one system.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Paginator from "@/components/Paginator";
import type { BlogCard } from "@/lib/blog";

const EASE = [0.22, 0.61, 0.21, 1] as const;
const PAGE_SIZE = 12;

type Filter = "article" | "episode" | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "article", label: "Articles" },
  { key: "episode", label: "Episode Notes" },
  { key: "all", label: "Everything" },
];

export default function BlogExplorer({
  posts,
  initialFilter = "article",
}: {
  posts: BlogCard[];
  initialFilter?: Filter;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(
    () => ({
      article: posts.filter((p) => p.kind === "article").length,
      episode: posts.filter((p) => p.kind === "episode").length,
      all: posts.length,
    }),
    [posts]
  );

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter !== "all" && p.kind !== filter) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle)
      );
    });
  }, [posts, q, filter]);

  useEffect(() => setPage(1), [q, filter]);

  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const paged = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="mx-auto max-w-[420px]">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-line bg-paper px-5 py-3 pr-11 text-[14px] transition-colors focus:border-teal focus:outline-none"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
        </div>
        <p className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
          {list.length} {filter === "episode" ? "episode" : "article"}{list.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`fpill ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      <div ref={topRef} className="scroll-mt-28" />
      <motion.div layout className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {paged.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="h-full"
            >
              <Link
                href={`/blog/${p.slug}`}
                className="card-frame group flex h-full flex-col overflow-hidden"
              >
                {p.image && (
                  <div className="tone-img aspect-[16/9] bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/_next/image?url=${encodeURIComponent(p.image)}&w=640&q=75`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                  <span className={`chip !py-1 !text-[10.5px] ${p.kind === "article" ? "teal" : ""}`}>
                    {p.category}
                  </span>
                  <span>{p.dateLabel} · {p.readMins} min read</span>
                </div>
                <h3 className="mt-3 flex-1 text-[16.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <span className="linkline mt-5">
                  {p.kind === "article" ? "Read article" : "Read show notes"} <span className="arr">→</span>
                </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="mt-10 text-center text-[15px] text-muted">
          No articles match your search. Try a different keyword.
        </p>
      )}

      <Paginator page={page} pageCount={pageCount} onChange={goToPage} />
    </div>
  );
}
