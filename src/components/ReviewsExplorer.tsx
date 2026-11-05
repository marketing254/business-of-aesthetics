"use client";

/**
 * Review cards with category tabs (All / Podcast Guests / Expert Panelists)
 * and client-side pagination (6 per page, 3-up on desktop, 2-up on tablet,
 * 1-up on phones). The page itself stays a server component for metadata
 * and JSON-LD; the list comes from src/lib/reviews.ts.
 */

import { useRef, useState } from "react";
import Paginator from "@/components/Paginator";
import VideoEmbed from "@/components/VideoEmbed";
import { Stagger, StaggerItem } from "@/components/motion/Animate";
import {
  CATEGORY_LABEL,
  cleanQuote,
  initials,
  vimeoEmbedUrl,
  vimeoPoster,
  type Review,
  type ReviewCategory,
} from "@/lib/reviews";

const PAGE_SIZE = 6;
type Filter = "all" | ReviewCategory;

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-[2px] text-gold" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.9l1.2-6.6L2.5 9.7l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsExplorer({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.category === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const tabs = (
    [
      { key: "all", label: "All Reviews", count: reviews.length },
      ...(["podcast", "panel"] as const).map((c) => ({
        key: c,
        label: CATEGORY_LABEL[c],
        count: reviews.filter((r) => r.category === c).length,
      })),
    ] as { key: Filter; label: string; count: number }[]
  ).filter((t) => t.count > 0);

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* category tabs */}
      <div
        role="tablist"
        aria-label="Filter reviews"
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        {tabs.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setFilter(t.key);
                setPage(1);
              }}
              className={`fpill ${active ? "active" : ""}`}
            >
              {t.label}
              <span className={`ml-1.5 text-[11px] ${active ? "opacity-80" : "text-muted"}`}>{t.count}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[12.5px] text-muted" aria-live="polite">
        Showing {shown.length} of {filtered.length}
        {pageCount > 1 && ` · Page ${current} of ${pageCount}`}
      </p>

      <Stagger
        key={`${filter}-${current}`}
        className={`mt-8 grid gap-5 sm:gap-6 ${
          shown.length === 1 ? "mx-auto max-w-[460px]" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {shown.map((r) => {
          const idx = reviews.indexOf(r) + 1;
          return (
            <StaggerItem key={`${r.name}-${idx}`}>
              <article
                id={`review-${idx}`}
                className="card-frame flex h-full flex-col overflow-hidden scroll-mt-28"
              >
                <div className="p-2.5 pb-0">
                  <VideoEmbed
                    embedUrl={vimeoEmbedUrl(r.vimeo)}
                    title={`${r.name} - ${r.tag} review`}
                    poster={vimeoPoster(r.vimeo)}
                    cta="Play review"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-teal-soft px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-deep">
                      {r.tag}
                    </span>
                    <Stars n={r.stars} />
                  </div>
                  <blockquote className="display text-[15.5px] leading-[1.4] text-navy sm:text-[16px]">
                    “{cleanQuote(r.quote)}”
                  </blockquote>
                  {r.panel && (
                    <p className="text-[12px] leading-relaxed text-muted">
                      <span className="font-semibold text-navy">
                        Expert panel{r.date ? ` · ${r.date}` : ""}
                      </span>
                      <br />
                      <span className="line-clamp-2">{r.panel}</span>
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2.5 pt-1">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold tracking-wide text-white">
                      {initials(r.name)}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold leading-tight text-navy">{r.name}</div>
                      <div className="mt-0.5 text-[12px] leading-snug text-muted">{r.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Paginator page={current} pageCount={pageCount} onChange={goTo} />
    </div>
  );
}
