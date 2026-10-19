"use client";

/**
 * Click-to-play video facade. Replay pages used to mount the YouTube/Vimeo
 * player iframe on load, which pulled 2-4 MB of third-party JS before the
 * visitor did anything. Now a lightweight poster + play button renders
 * first and the real player is injected (with autoplay) only on tap.
 * The VideoObject JSON-LD on the page still carries embedUrl for crawlers.
 */

import { useState } from "react";

function withAutoplay(url: string) {
  const u = new URL(url);
  u.searchParams.set("autoplay", "1");
  if (u.hostname.includes("youtube")) u.searchParams.set("rel", "0");
  return u.toString();
}

export default function VideoEmbed({
  embedUrl,
  title,
  poster,
}: {
  embedUrl: string;
  title: string;
  poster?: string;
}) {
  const [play, setPlay] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-navy-ink">
      {play ? (
        <iframe
          src={withAutoplay(embedUrl)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 grid h-full w-full place-items-center text-white"
        >
          {poster && !posterFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setPosterFailed(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-90"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,#2B5C86_0%,#14284A_55%,#0D4E57_100%)]"
            />
          )}
          <span className="relative z-10 flex flex-col items-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy shadow-xl transition-transform group-hover:scale-105">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
              Play replay
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
