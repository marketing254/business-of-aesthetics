"use client";

/** Simple page controls for client-side lists. */

export default function Paginator({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="fpill disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        &lt;- Prev
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-[13px] text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`fpill min-w-[42px] ${p === page ? "active" : ""}`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className="fpill disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        Next -&gt;
      </button>
    </nav>
  );
}
