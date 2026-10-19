"use client";

/**
 * Podcast audio player with listening memory. Progress is saved locally
 * every few seconds, so returning visitors resume where they stopped -
 * and the /podcast page can offer a "continue listening" shortcut.
 */

import { useEffect, useRef, useState } from "react";

const STORE_KEY = "boa-listening";
const KEEP = 12;

export interface ListenEntry {
  slug: string;
  title: string;
  href: string;
  /** seconds into the episode */
  t: number;
  /** duration in seconds, once known */
  d: number;
  /** last-played timestamp */
  at: number;
}

export function readListening(): ListenEntry[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const list = raw ? (JSON.parse(raw) as ListenEntry[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveEntry(entry: ListenEntry) {
  try {
    const rest = readListening().filter((e) => e.slug !== entry.slug);
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify([entry, ...rest].slice(0, KEEP))
    );
  } catch {
    /* private mode etc. - listening still works, just without memory */
  }
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function EpisodeAudio({
  src,
  slug,
  title,
  href,
}: {
  src: string;
  slug: string;
  title: string;
  href: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [resumeAt, setResumeAt] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const saved = readListening().find((e) => e.slug === slug);
    // offer resume only when meaningfully into the episode and not finished
    if (saved && saved.t > 45 && (!saved.d || saved.t < saved.d * 0.97)) {
      setResumeAt(saved.t);
    }
  }, [slug]);

  const persist = () => {
    const el = ref.current;
    if (!el || !el.currentTime) return;
    saveEntry({
      slug,
      title,
      href,
      t: el.currentTime,
      d: el.duration && isFinite(el.duration) ? el.duration : 0,
      at: Date.now(),
    });
  };

  const resume = () => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = resumeAt;
    el.play().catch(() => {});
    setDismissed(true);
  };

  return (
    <div>
      {resumeAt > 0 && !dismissed && (
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-teal/40 bg-teal-soft/50 px-4 py-2.5 text-[12.5px] font-semibold text-navy">
          <span>You were at {fmt(resumeAt)} last time.</span>
          <button onClick={resume} className="linkline !text-[12px]">
            Resume <span className="arr">→</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-[12px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-navy"
          >
            Start over
          </button>
        </div>
      )}
      <audio
        ref={ref}
        controls
        preload="metadata"
        src={src}
        className="w-full"
        onPause={persist}
        onEnded={persist}
        onTimeUpdate={(e) => {
          // light-touch persistence roughly every 5 seconds of playback
          const t = e.currentTarget.currentTime;
          if (Math.floor(t) % 5 === 0) persist();
        }}
      />
    </div>
  );
}
