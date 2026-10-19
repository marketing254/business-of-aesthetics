"use client";

/**
 * Site-wide search palette (Ctrl+K / Cmd+K, or the navbar search button,
 * which dispatches a "boa:search" event). Searches every episode, event,
 * panel, replay, speaker and page from the live sheet-backed /api/search
 * index, with full keyboard navigation.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";

interface SearchDoc {
  group: string;
  title: string;
  meta: string;
  href: string;
}

const GROUP_ORDER = ["Episodes", "Articles", "Replays", "Panels", "Events", "Speakers", "Pages"];
const MAX_PER_GROUP = 5;

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* open/close wiring: keyboard shortcut + navbar event */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("boa:search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("boa:search", onOpen);
    };
  }, []);

  /* lock scroll + focus the input while open */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  /* fetch the index once, on first open */
  useEffect(() => {
    if (!open || docs !== null) return;
    let alive = true;
    fetch(asset("/api/search"), { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (alive && Array.isArray(data)) setDocs(data);
      })
      .catch(() => {
        if (alive) setDocs([]);
      });
    return () => {
      alive = false;
    };
  }, [open, docs]);

  const results = useMemo(() => {
    if (!docs) return [];
    const q = query.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const pool = terms.length
      ? docs.filter((d) => {
          const hay = `${d.title} ${d.meta}`.toLowerCase();
          return terms.every((t) => hay.includes(t));
        })
      : docs.filter((d) => d.group === "Pages");

    const grouped: { group: string; items: SearchDoc[] }[] = [];
    for (const g of GROUP_ORDER) {
      const items = pool.filter((d) => d.group === g).slice(0, MAX_PER_GROUP);
      if (items.length) grouped.push({ group: g, items });
    }
    return grouped;
  }, [docs, query]);

  const flat = useMemo(() => results.flatMap((g) => g.items), [results]);

  useEffect(() => setActive(0), [query, open]);

  const go = useCallback(
    (doc: SearchDoc) => {
      setOpen(false);
      setQuery("");
      router.push(doc.href);
    },
    [router]
  );

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  };

  /* keep the active row in view */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let idx = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] bg-navy-ink/55 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.21, 1] }}
            className="mx-auto mt-[9vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_50px_120px_-30px_rgba(8,14,32,0.55)]"
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
          >
            {/* input row */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-teal-deep"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search episodes, events, panels, speakers…"
                aria-label="Search"
                className="w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-line px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-navy"
              >
                Esc
              </button>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {docs === null && (
                <p className="px-4 py-8 text-center text-[13.5px] text-muted">
                  Loading the library…
                </p>
              )}
              {docs !== null && query.trim() && flat.length === 0 && (
                <p className="px-4 py-8 text-center text-[13.5px] text-muted">
                  Nothing found for &ldquo;{query.trim()}&rdquo; - try a guest
                  name, topic, or episode number.
                </p>
              )}
              {results.map((g) => (
                <div key={g.group} className="py-1.5">
                  <div className="px-3 pb-1.5 pt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {g.group}
                  </div>
                  {g.items.map((doc) => {
                    idx++;
                    const i = idx;
                    return (
                      <button
                        key={`${doc.href}-${doc.title}`}
                        data-idx={i}
                        onClick={() => go(doc)}
                        onMouseMove={() => setActive(i)}
                        className={`flex w-full items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          i === active ? "bg-sand" : ""
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-semibold text-navy">
                            {doc.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] text-muted">
                            {doc.meta}
                          </span>
                        </span>
                        <span
                          className={`arr shrink-0 text-teal-deep transition-opacity ${
                            i === active ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              <span>↑↓ navigate · Enter open</span>
              <span>Business of Aesthetics</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
