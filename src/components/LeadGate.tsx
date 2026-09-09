"use client";

/**
 * Lead-magnet gate for podcast audio and replay videos.
 *
 * SEO-safe: the gated content is always in the server-rendered DOM.
 * While locked, the media is visually hidden and a neatly-sized form takes
 * its place in normal flow (no overlay spill). Unlocking is remembered in
 * the browser, so visitors are asked exactly once.
 *
 * variant="bar"   compact form for small media (audio players)
 * variant="panel" larger centered form for video embeds (fills the slot)
 */

import { useEffect, useState, type ReactNode } from "react";

const KEY = "boa-lead-unlock";

export default function LeadGate({
  children,
  label = "this replay",
  variant = "bar",
}: {
  children: ReactNode;
  label?: string;
  variant?: "bar" | "panel";
}) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(KEY) === "1");
    } catch {
      setUnlocked(true); // storage blocked: never trap the visitor
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(KEY, "1");
      localStorage.setItem(
        "boa-lead-details",
        JSON.stringify({ name, email, at: new Date().toISOString() })
      );
    } catch {
      /* ignore */
    }
    setUnlocked(true);
  };

  const locked = unlocked === false;

  return (
    <div>
      {/* media stays in the DOM for crawlers; hidden only while locked */}
      <div className={locked ? "hidden" : ""} aria-hidden={locked}>
        {children}
      </div>

      {locked && variant === "bar" && (
        <form
          onSubmit={submit}
          className="mt-3 rounded-2xl border border-line bg-sand p-4"
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Free access - unlock {label}
          </div>
          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13px] focus:border-teal focus:outline-none sm:flex-1"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourpractice.com"
              aria-label="Email address"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13px] focus:border-teal focus:outline-none sm:flex-1"
            />
            <button type="submit" className="btn btn-teal shrink-0 !py-2.5">
              Unlock
            </button>
          </div>
          <p className="mt-2 text-[10.5px] text-muted">
            Asked once - no spam, just new episodes and events.
          </p>
        </form>
      )}

      {locked && variant === "panel" && (
        <div className="grid aspect-video place-items-center rounded-2xl border border-line bg-sand p-5">
          <form onSubmit={submit} className="w-full max-w-[380px] text-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
              Free access
            </div>
            <h3 className="display mt-2 text-[20px] text-navy">
              Unlock {label}
            </h3>
            <p className="mt-1.5 text-[12.5px] text-muted">
              Tell us who you are and it plays instantly - once, for
              everything on the site.
            </p>
            <div className="mt-4 space-y-2.5">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourpractice.com"
                aria-label="Email address"
                className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
              />
            </div>
            <button type="submit" className="btn btn-teal mt-4 w-full">
              Unlock &amp; Watch
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
