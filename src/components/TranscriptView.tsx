"use client";

/**
 * Inline transcript reader - quiet, structured, readable.
 * Section headings ("00:00 - Topic"), speaker turns, and plain paragraphs
 * each get their own treatment; live search highlights matches.
 */

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import type { TranscriptBlock } from "@/lib/sheet";

const PREVIEW_BLOCKS = 10;

function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const parts = text.split(
    new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")
  );
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded-[3px] bg-teal/20 px-0.5 text-teal-deep">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function TranscriptView({
  blocks,
}: {
  blocks: TranscriptBlock[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim();
  const filtered = useMemo(() => {
    if (!q) return blocks;
    const needle = q.toLowerCase();
    return blocks.filter(
      (b) =>
        b.text.toLowerCase().includes(needle) ||
        (b.heading ?? "").toLowerCase().includes(needle) ||
        (b.speaker ?? "").toLowerCase().includes(needle) ||
        (b.time ?? "").toLowerCase().includes(needle)
    );
  }, [blocks, q]);

  const visible = q || expanded ? filtered : filtered.slice(0, PREVIEW_BLOCKS);
  const hasMore = !q && filtered.length > PREVIEW_BLOCKS;

  return (
    <div>
      {/* search */}
      <div className="relative mb-7 max-w-[340px]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the transcript…"
          aria-label="Search the transcript"
          className="w-full rounded-full border border-line bg-paper px-5 py-2.5 pr-11 text-[13.5px] transition-colors focus:border-teal focus:outline-none"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
        </span>
      </div>

      <div className="card-frame relative overflow-hidden !shadow-none">
        <div className="px-6 py-2 sm:px-9">
          {visible.map((b, i) =>
            b.heading ? (
              <div key={i} className="pb-2 pt-8 first:pt-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3">
                  {b.time && (
                    <span className="text-[12px] font-semibold tracking-[0.08em] text-teal-deep">
                      {highlight(b.time, q)}
                    </span>
                  )}
                  <h3 className="text-[14.5px] font-semibold text-navy">
                    {highlight(b.heading, q)}
                  </h3>
                </div>
              </div>
            ) : (
              <div key={i} className="py-4 first:pt-6 last:pb-6">
                {(b.speaker || b.time) && (
                  <div className="mb-1.5 flex items-baseline gap-3">
                    {b.speaker && (
                      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-teal-deep">
                        {highlight(b.speaker, q)}
                      </span>
                    )}
                    {b.time && !b.speaker && (
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-muted">
                        {highlight(b.time, q)}
                      </span>
                    )}
                  </div>
                )}
                <div className="space-y-3 text-[14.5px] leading-[1.85] text-muted">
                  {b.text.split("\n").map((p, k) => (
                    <p key={k}>{highlight(p, q)}</p>
                  ))}
                </div>
              </div>
            )
          )}
          {q && filtered.length === 0 && (
            <p className="py-10 text-center text-[14px] text-muted">
              No matches for &ldquo;{q}&rdquo; - try a different phrase.
            </p>
          )}
        </div>

        {!expanded && hasMore && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent"
          />
        )}
      </div>

      {hasMore && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setExpanded((v) => !v)}
          className="btn btn-outline mt-7"
        >
          {expanded ? "Collapse Transcript" : "Read Full Transcript"}{" "}
          <span className="arr">{expanded ? "↑" : "↓"}</span>
        </motion.button>
      )}
    </div>
  );
}
