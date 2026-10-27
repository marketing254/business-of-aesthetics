"use client";

/**
 * Downloadable episode resources, shown behind the site's one-time
 * name/email gate (same gate as the audio - visitors who already unlocked
 * anything are not asked again). The unlock and every download are logged
 * to the "Resource Downloads" tab in the sheet and sent to analytics.
 *
 * layout="list"  compact sidebar card (episode page)
 * layout="grid"  3-up cards (resources page)
 */

import LeadGate from "@/components/LeadGate";
import type { EpisodeResource } from "@/lib/episode-resources";
import { submitLead } from "@/lib/lead";

function PdfIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="m9 15 3 3 3-3" />
    </svg>
  );
}

function fileName(url: string) {
  try {
    return decodeURIComponent(url.split("/").pop() || "download.pdf");
  } catch {
    return "download.pdf";
  }
}

function logDownload(r: EpisodeResource) {
  // stored details were captured by the gate; we only log which file was taken
  let name = "";
  let email = "";
  try {
    const saved = JSON.parse(localStorage.getItem("boa-lead-details") || "{}");
    name = saved.name || "";
    email = saved.email || "";
  } catch {
    /* ignore */
  }
  if (email) {
    void submitLead("resource_download", {
      name,
      email,
      action: "downloaded",
      resource: r.label,
      episode: r.episode,
      file: r.url,
      title: r.label,
    });
  }
  try {
    window.gtag?.("event", "file_download", {
      file_name: fileName(r.url),
      link_text: r.label,
      episode: r.episode,
    });
  } catch {
    /* ignore */
  }
}

function Item({ r, big = false }: { r: EpisodeResource; big?: boolean }) {
  const external = /^https?:\/\//i.test(r.url) && !r.url.includes("businessofaesthetics.org");
  return (
    <a
      href={r.url}
      download={external ? undefined : fileName(r.url)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      onClick={() => logDownload(r)}
      className={`group flex gap-4 rounded-2xl border border-line bg-paper transition-all hover:border-teal hover:shadow-[0_18px_40px_-28px_rgba(19,42,84,0.35)] ${
        big ? "h-full flex-col p-7" : "items-start p-4"
      }`}
    >
      <span className={`grid shrink-0 place-items-center rounded-xl bg-teal-soft text-teal-deep ${big ? "h-12 w-12" : "h-10 w-10"}`}>
        <PdfIcon />
      </span>
      <span className="min-w-0 flex-1">
        {big && (
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Episode {r.episode}
          </span>
        )}
        <span className={`block font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep ${big ? "display mt-2 text-[19px]" : "text-[14px]"}`}>
          {r.label}
        </span>
        {r.description && (
          <span className={`mt-1.5 block leading-relaxed text-muted ${big ? "text-[13.5px]" : "line-clamp-2 text-[12.5px]"}`}>
            {r.description}
          </span>
        )}
        <span className={`mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-deep ${big ? "mt-5" : ""}`}>
          Download{r.meta ? ` · ${r.meta}` : ""} <span className="arr">↓</span>
        </span>
      </span>
    </a>
  );
}

export default function ResourceDownloads({
  resources,
  layout = "list",
  gateLabel = "the free resources",
  episodeSlug = "resources",
}: {
  resources: EpisodeResource[];
  layout?: "list" | "grid";
  gateLabel?: string;
  episodeSlug?: string;
}) {
  if (!resources.length) return null;
  const first = resources[0];

  const body =
    layout === "grid" ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <Item key={r.url} r={r} big />
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        {resources.map((r) => (
          <Item key={r.url} r={r} />
        ))}
      </div>
    );

  return (
    <LeadGate
      label={gateLabel}
      variant={layout === "grid" ? "bar" : "stack"}
      meta={{
        form: "resource_download",
        title: first.label,
        resource: first.label,
        file: first.url,
        slug: episodeSlug,
        episode: first.episode,
      }}
    >
      {body}
    </LeadGate>
  );
}
