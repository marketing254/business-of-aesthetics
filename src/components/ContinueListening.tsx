"use client";

/**
 * "Pick up where you left off" strip for the podcast page - surfaces the
 * most recent unfinished episode from local listening memory.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { readListening, type ListenEntry } from "@/components/EpisodeAudio";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ContinueListening() {
  const [entry, setEntry] = useState<ListenEntry | null>(null);

  useEffect(() => {
    const unfinished = readListening().find(
      (e) => e.t > 45 && (!e.d || e.t < e.d * 0.97)
    );
    if (unfinished) setEntry(unfinished);
  }, []);

  if (!entry) return null;
  const pct = entry.d ? Math.min(100, Math.round((entry.t / entry.d) * 100)) : 0;

  return (
    <div className="mx-auto mt-8 max-w-[720px]">
      <Link
        href={entry.href}
        className="card-frame group block overflow-hidden !shadow-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4">
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
              <span className="live-dot" /> Continue listening
            </span>
            <p className="mt-1 truncate text-[14px] font-semibold text-navy transition-colors group-hover:text-teal-deep">
              {entry.title}
            </p>
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            {fmt(entry.t)}
            {entry.d ? ` / ${fmt(entry.d)}` : ""} <span className="arr text-teal-deep">→</span>
          </span>
        </div>
        {pct > 0 && (
          <div className="h-[3px] w-full bg-sand">
            <div className="h-full bg-teal" style={{ width: `${pct}%` }} />
          </div>
        )}
      </Link>
    </div>
  );
}
