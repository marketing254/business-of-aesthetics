"use client";

/**
 * Speaker directory - a standard, scannable listing.
 *
 * Compact cards (small round headshot, name, role, company, event tag,
 * two-line bio) in a responsive grid, with search, an event filter and
 * pagination (12 per page). The full bio and links open in a dialog so the
 * list itself stays light. Server-renders with fresh Google-Sheet data on
 * every request and keeps itself in sync by polling /api/speakers.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { thumbUrl, type SheetSpeaker } from "@/lib/sheet";
import { asset } from "@/lib/asset";
import Paginator from "@/components/Paginator";

const POLL_MS = 45_000;
const PAGE_SIZE = 12;
const EASE = [0.22, 0.61, 0.21, 1] as const;

function Avatar({
  s,
  size = 64,
  className = "",
}: {
  s: SheetSpeaker;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const dim = { width: size, height: size };
  if (s.imageUrl && !failed) {
    return (
      // Sheet-driven Google Drive image - plain img keeps it live & simple
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={thumbUrl(s.imageUrl, Math.max(96, size * 3))}
        alt={s.name}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        style={dim}
        className={`shrink-0 rounded-full border border-line bg-sand object-cover object-top ${className}`}
      />
    );
  }
  return (
    <span
      style={dim}
      className={`dark-canvas grid shrink-0 place-items-center rounded-full ${className}`}
    >
      <span className="display text-teal" style={{ fontSize: size * 0.34 }}>
        {s.initials}
      </span>
    </span>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SpeakerCard({ s, onOpen }: { s: SheetSpeaker; onOpen: () => void }) {
  const firstLine = s.bio.split(/\n+/).find(Boolean) ?? "";
  return (
    <article className="card-frame flex h-full flex-col p-5">
      <div className="flex items-start gap-4">
        <Avatar s={s} size={64} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[16.5px] font-semibold leading-snug text-navy">
            {s.name}
          </h3>
          {s.title && (
            <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink/80">
              {s.title}
            </p>
          )}
          {s.company && (
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-deep">
              {s.company}
            </p>
          )}
        </div>
      </div>

      {firstLine && (
        <p className="mt-4 line-clamp-3 text-[13px] leading-relaxed text-muted">
          {firstLine}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex min-w-0 items-center gap-2">
          {s.event && (
            <span className="chip truncate !py-1 !text-[12px]" title={s.event}>
              {s.event}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {s.linkedin && (
            <a
              href={s.linkedin.trim()}
              target="_blank"
              rel="noopener"
              title={`${s.name} on LinkedIn`}
              aria-label={`${s.name} on LinkedIn`}
              className="grid h-8 w-8 place-items-center rounded-full border border-line text-navy transition-all hover:border-teal hover:bg-teal hover:text-paper"
            >
              <LinkedInIcon />
            </a>
          )}
          <button onClick={onOpen} className="linkline !text-[12.5px]">
            View bio <span className="arr">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function BioDialog({ s, onClose }: { s: SheetSpeaker | null; onClose: () => void }) {
  useEffect(() => {
    if (!s) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [s, onClose]);

  return (
    <AnimatePresence>
      {s && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-navy-ink/60 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-dialog-title"
        >
          <motion.div
            initial={{ y: 18, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-line bg-paper p-7 shadow-2xl sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-navy transition-colors hover:border-teal hover:text-teal-deep"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <div className="flex items-start gap-5">
              <Avatar s={s} size={88} />
              <div className="min-w-0 pr-8">
                <h3 id="speaker-dialog-title" className="display text-[24px] leading-tight text-navy">
                  {s.name}
                </h3>
                {s.title && <p className="mt-1 text-[13.5px] text-ink/85">{s.title}</p>}
                {s.company && (
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-teal-deep">
                    {s.company}
                  </p>
                )}
                {s.event && <span className="chip teal mt-3 !text-[12px]">{s.event}</span>}
              </div>
            </div>
            {s.bio && (
              <div className="mt-6 space-y-3 border-t border-line pt-6 text-[14px] leading-relaxed text-muted">
                {s.bio.split(/\n+/).filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {(s.linkedin || s.website) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {s.linkedin && (
                  <a href={s.linkedin.trim()} target="_blank" rel="noopener" className="btn btn-navy !px-5 !py-2.5 !text-[12px]">
                    <LinkedInIcon /> LinkedIn
                  </a>
                )}
                {s.website && (
                  <a href={s.website.trim()} target="_blank" rel="noopener" className="btn btn-outline !px-5 !py-2.5 !text-[12px]">
                    Website <span className="arr">→</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SpeakerDirectory({ initial }: { initial: SheetSpeaker[] }) {
  const [speakers, setSpeakers] = useState<SheetSpeaker[]>(initial);
  const [query, setQuery] = useState("");
  const [event, setEvent] = useState("all");
  const [page, setPage] = useState(1);
  const [openIdx, setOpenIdx] = useState<SheetSpeaker | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      try {
        const res = await fetch(asset("/api/speakers"), { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SheetSpeaker[];
        if (alive && Array.isArray(data) && data.length) setSpeakers(data);
      } catch {
        /* keep last good data */
      }
    };
    const id = setInterval(refresh, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const events = useMemo(() => {
    const set = new Map<string, number>();
    for (const s of speakers) if (s.event) set.set(s.event, (set.get(s.event) ?? 0) + 1);
    return Array.from(set.entries());
  }, [speakers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return speakers.filter((s) => {
      if (event !== "all" && s.event !== event) return false;
      if (!q) return true;
      return [s.name, s.title, s.company, s.event, s.bio]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [speakers, query, event]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!speakers.length) {
    return (
      <div className="card-frame p-10 text-center text-[15px] text-muted">
        Speaker profiles are being updated - check back shortly.
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-[360px]">
          <span className="sr-only">Search speakers</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, company or topic"
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-[13.5px] focus:border-teal focus:outline-none"
          />
        </label>
        {events.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              className={`fpill ${event === "all" ? "active" : ""}`}
              onClick={() => {
                setEvent("all");
                setPage(1);
              }}
            >
              All ({speakers.length})
            </button>
            {events.map(([name, n]) => (
              <button
                key={name}
                className={`fpill ${event === name ? "active" : ""}`}
                onClick={() => {
                  setEvent(name);
                  setPage(1);
                }}
              >
                {name} ({n})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted" aria-live="polite">
        {filtered.length === speakers.length
          ? `${speakers.length} speakers`
          : `${filtered.length} of ${speakers.length} speakers`}
        {pageCount > 1 && ` · Page ${current} of ${pageCount}`}
      </div>

      {/* grid */}
      {slice.length ? (
        <motion.div
          key={`${current}-${event}-${query}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {slice.map((s, i) => (
            <SpeakerCard key={`${s.name}-${i}`} s={s} onOpen={() => setOpenIdx(s)} />
          ))}
        </motion.div>
      ) : (
        <div className="card-frame mt-5 p-10 text-center text-[14px] text-muted">
          No speakers match that search.
        </div>
      )}

      <Paginator page={current} pageCount={pageCount} onChange={goTo} />

      <BioDialog s={openIdx} onClose={() => setOpenIdx(null)} />
    </div>
  );
}
