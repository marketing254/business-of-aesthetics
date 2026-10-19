"use client";

/**
 * Compact share row for episode / replay / event pages - copy link with
 * confirmation, native share where the device supports it, and the three
 * networks the BOA audience actually uses.
 */

import { useEffect, useState } from "react";

export default function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    setCanNative(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const url = () => (typeof window === "undefined" ? "" : window.location.href);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const native = async () => {
    try {
      await navigator.share({ title, url: url() });
    } catch {
      /* user dismissed */
    }
  };

  const open = (href: string) =>
    window.open(href, "_blank", "noopener,width=600,height=540");

  const iconBtn =
    "grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-muted transition-all hover:border-teal hover:text-teal-deep";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
        Share
      </span>
      <button onClick={copy} className={iconBtn} title="Copy link" aria-label="Copy link">
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-teal-deep"><path d="M20 6 9 17l-5-5"/></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        )}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=`}
        onClick={(e) => {
          e.preventDefault();
          open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`);
        }}
        className={iconBtn}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z"/></svg>
      </a>
      <a
        href="https://www.facebook.com/sharer/sharer.php"
        onClick={(e) => {
          e.preventDefault();
          open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`);
        }}
        className={iconBtn}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url())}`;
        }}
        className={iconBtn}
        title="Share by email"
        aria-label="Share by email"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
      </a>
      {canNative && (
        <button
          onClick={native}
          className={iconBtn}
          title="More options"
          aria-label="More share options"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 3.9M15.4 6.6 8.6 10.5"/></svg>
        </button>
      )}
    </div>
  );
}
