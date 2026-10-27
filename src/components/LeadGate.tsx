"use client";

/**
 * Lead-magnet gate for podcast audio and replay videos.
 *
 * SEO-safe: the gated content is always in the server-rendered DOM.
 * While locked, the media is visually hidden and a neatly-sized form takes
 * its place in normal flow (no overlay spill). Unlocking is remembered in
 * the browser, so visitors are asked exactly once - but every unlock is
 * written to the Google Sheet (Podcast Gate / Event Replay Gate / Panel
 * Replay Gate tabs) with the item that was unlocked.
 *
 * variant="bar"   compact form for small media (audio players)
 * variant="panel" larger centered form for video embeds (fills the slot)
 * variant="stack" stacked fields + full-width button for narrow sidebars
 */

import { useEffect, useState, type ReactNode } from "react";
import { submitLead, type LeadForm } from "@/lib/lead";

const KEY = "boa-lead-unlock";
const DETAILS_KEY = "boa-lead-details";

export interface GateMeta {
  /** which sheet tab the unlock is logged to */
  form: Extract<LeadForm, "podcast_gate" | "event_replay_gate" | "panel_replay_gate" | "resource_download">;
  title: string;
  slug: string;
  episode?: number;
  date?: string;
  /** resource_download only: which resource/file was unlocked */
  resource?: string;
  file?: string;
}

export default function LeadGate({
  children,
  label = "this replay",
  variant = "bar",
  meta,
}: {
  children: ReactNode;
  label?: string;
  variant?: "bar" | "panel" | "stack";
  meta: GateMeta;
}) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(KEY) === "1");
    } catch {
      setUnlocked(true); // storage blocked: never trap the visitor
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      localStorage.setItem(KEY, "1");
      localStorage.setItem(
        DETAILS_KEY,
        JSON.stringify({ name, email, at: new Date().toISOString() })
      );
    } catch {
      /* ignore */
    }
    // never block playback on the network - log in the background
    void submitLead(meta.form, {
      name,
      email,
      title: meta.title,
      slug: meta.slug,
      episode: meta.episode,
      date: meta.date,
      resource: meta.resource,
      file: meta.file,
      action: "unlocked",
    });
    setUnlocked(true);
    setBusy(false);
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
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Free access - unlock {label}
          </div>
          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="name"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13px] focus:border-teal focus:outline-none sm:flex-1"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourpractice.com"
              aria-label="Email address"
              autoComplete="email"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13px] focus:border-teal focus:outline-none sm:flex-1"
            />
            <button type="submit" disabled={busy} className="btn btn-teal shrink-0 !py-2.5">
              Unlock
            </button>
          </div>
          <p className="mt-2 text-[12px] text-muted">
            Asked once - no spam, just new episodes and events.
          </p>
        </form>
      )}

      {locked && variant === "stack" && (
        <form onSubmit={submit} className="rounded-2xl border border-line bg-sand p-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Free access
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            Enter your details once to unlock {label} - and everything else on the site.
          </p>
          <div className="mt-4 space-y-2.5">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="name"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourpractice.com"
              aria-label="Email address"
              autoComplete="email"
              className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
            />
          </div>
          <button type="submit" disabled={busy} className="btn btn-teal mt-3 w-full">
            Unlock &amp; Download
          </button>
          <p className="mt-2.5 text-[12px] text-muted">
            Asked once - no spam, just new episodes and resources.
          </p>
        </form>
      )}

      {locked && variant === "panel" && (
        <div className="grid aspect-video place-items-center rounded-2xl border border-line bg-sand p-5">
          <form onSubmit={submit} className="w-full max-w-[380px] text-center">
            <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
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
                autoComplete="name"
                className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourpractice.com"
                aria-label="Email address"
                autoComplete="email"
                className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] focus:border-teal focus:outline-none"
              />
            </div>
            <button type="submit" disabled={busy} className="btn btn-teal mt-4 w-full">
              Unlock &amp; Watch
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
