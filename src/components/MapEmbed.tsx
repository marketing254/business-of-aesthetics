"use client";

/**
 * Click-to-load Google Map. The embed alone costs ~1.7 MB of JS, so the
 * contact page shows a static card with the address and a "Load map"
 * button; the iframe is only created on demand.
 */

import { useState } from "react";
import { site } from "@/lib/data";

const QUERY = encodeURIComponent("1810 E Sahara Ave, Las Vegas, NV 89104");

export default function MapEmbed({ className = "" }: { className?: string }) {
  const [load, setLoad] = useState(false);

  if (load) {
    return (
      <iframe
        src={`https://www.google.com/maps?q=${QUERY}&output=embed`}
        title="Business of Aesthetics office location"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={`h-full w-full border-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(120%_100%_at_15%_0%,#2B5C86_0%,#14284A_55%,#0D4E57_100%)] p-6 text-center text-white ${className}`}
    >
      <div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mx-auto text-teal">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="mt-3 text-[14px] font-semibold">{site.address}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <button type="button" onClick={() => setLoad(true)} className="btn btn-teal !px-5 !py-2.5 !text-[12px]">
            Load map
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${QUERY}`}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost-light !px-5 !py-2.5 !text-[12px]"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
