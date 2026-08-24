"use client";

/**
 * Live speaker directory, driven by the Google Sheet.
 * Server-renders with fresh data on every request, then keeps itself in
 * sync while the tab is open by polling /api/speakers.
 */

import { useEffect, useState } from "react";
import type { SheetSpeaker } from "@/lib/sheet";

const POLL_MS = 45_000;

function SpeakerCard({ s, i }: { s: SheetSpeaker; i: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const bioParas = s.bio.split(/\n+/).filter(Boolean);

  return (
    <article className="card-frame group flex flex-col overflow-hidden">
      <div className="tone-img relative aspect-[4/4.4] bg-sand">
        {s.imageUrl && !imgFailed ? (
          // Sheet-driven Google Drive image — plain img keeps it live & simple
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.imageUrl}
            alt={s.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-top"
            loading={i < 3 ? "eager" : "lazy"}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="dark-canvas grid h-full w-full place-items-center">
            <span className="display text-[64px] italic text-teal">
              {s.initials}
            </span>
          </div>
        )}
        {s.event && (
          <span className="chip teal absolute left-4 top-4">{s.event}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="display text-[22px] text-navy">{s.name}</h3>
        {s.company && (
          <div className="mt-1 text-[11.5px] font-extrabold uppercase tracking-[0.18em] text-teal-deep">
            {s.company}
          </div>
        )}
        {s.title && (
          <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-ink/85">
            {s.title}
          </p>
        )}

        {bioParas.length > 0 && (
          <div className="mt-4 border-t border-line pt-4">
            <div
              className={`space-y-3 text-[13px] leading-relaxed text-muted ${
                expanded ? "" : "line-clamp-4"
              }`}
            >
              {bioParas.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="linkline mt-3"
            >
              {expanded ? "Read less" : "Read full bio"}{" "}
              <span className="arr">{expanded ? "↑" : "↓"}</span>
            </button>
          </div>
        )}

        <div className="mt-auto flex gap-2.5 pt-5">
          {s.linkedin && (
            <a
              href={s.linkedin.trim()}
              target="_blank"
              rel="noopener"
              title={`${s.name} on LinkedIn`}
              className="grid h-9 w-9 place-items-center border border-line text-navy transition-all hover:border-teal hover:bg-teal hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {s.website && (
            <a
              href={s.website.trim()}
              target="_blank"
              rel="noopener"
              className="linkline self-center"
            >
              Website <span className="arr">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function LiveSpeakers({
  initial,
}: {
  initial: SheetSpeaker[];
}) {
  const [speakers, setSpeakers] = useState<SheetSpeaker[]>(initial);

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      try {
        const res = await fetch("/api/speakers", { cache: "no-store" });
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

  if (!speakers.length) {
    return (
      <div className="card-frame p-10 text-center text-[15px] text-muted">
        Speaker profiles are being updated — check back shortly.
      </div>
    );
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {speakers.map((s, i) => (
        <SpeakerCard key={`${s.name}-${i}`} s={s} i={i} />
      ))}
    </div>
  );
}
