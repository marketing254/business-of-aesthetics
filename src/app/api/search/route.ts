import { NextResponse } from "next/server";
import {
  fetchEventPanels,
  fetchEventReplays,
  fetchEvents,
  fetchPanelReplays,
  fetchPodcasts,
  fetchSpeakers,
} from "@/lib/sheet";
import { blogCards } from "@/lib/blog";

export interface SearchDoc {
  group:
    | "Episodes"
    | "Events"
    | "Panels"
    | "Replays"
    | "Speakers"
    | "Articles"
    | "Pages";
  title: string;
  meta: string;
  href: string;
}

/**
 * Compact site-wide search index consumed by the Ctrl+K palette.
 * Live per-request on servers; snapshotted at build time for the
 * static GitHub Pages export (the prepare script marks it force-static).
 */
export async function GET() {
  const [podcasts, events, panels, eventReplays, panelReplays, speakers] =
    await Promise.all([
      fetchPodcasts(),
      fetchEvents(),
      fetchEventPanels(),
      fetchEventReplays(),
      fetchPanelReplays(),
      fetchSpeakers(),
    ]);

  const docs: SearchDoc[] = [
    ...podcasts.map((p) => ({
      group: "Episodes" as const,
      title: p.title,
      meta: [`EP ${p.episode}`, p.guestName, p.category]
        .filter(Boolean)
        .join(" · "),
      href: `/podcast/${p.slug}`,
    })),
    ...events.map((e) => ({
      group: "Events" as const,
      title: e.title,
      meta: e.dateLabel || e.monthYear || "Event",
      href: `/events/${e.slug}`,
    })),
    ...panels.map((p) => ({
      group: "Panels" as const,
      title: p.title,
      meta: p.dateLabel || p.monthYear || "Panel",
      href: `/panels/${p.slug}`,
    })),
    ...eventReplays.map((r) => ({
      group: "Replays" as const,
      title: r.title,
      meta: [r.category, r.date].filter(Boolean).join(" · "),
      href: `/events/replays/${r.slug}`,
    })),
    ...panelReplays.map((r) => ({
      group: "Replays" as const,
      title: r.title,
      meta: [r.category, r.date].filter(Boolean).join(" · "),
      href: `/panels/replays/${r.slug}`,
    })),
    ...speakers.map((s) => ({
      group: "Speakers" as const,
      title: s.name,
      meta: [s.title, s.company].filter(Boolean).join(", ") || "Speaker",
      href: "/speakers",
    })),
    ...blogCards().map((p) => ({
      group: "Articles" as const,
      title: p.title,
      meta: `${p.dateLabel} · ${p.readMins} min read`,
      href: `/blog/${p.slug}`,
    })),
    { group: "Pages", title: "About BOA", meta: "Our story and founders", href: "/about" },
    { group: "Pages", title: "The BOA Podcast", meta: "Every episode", href: "/podcast" },
    { group: "Pages", title: "Events & Webinars", meta: "Calendar and replays", href: "/events" },
    { group: "Pages", title: "Expert Panels", meta: "Roundtable series", href: "/panels" },
    { group: "Pages", title: "Marketing Services (MSM)", meta: "SEO, social, web, reputation", href: "/marketing" },
    { group: "Pages", title: "Book a Strategy Meeting", meta: "Free 60-minute session", href: "/marketing#book" },
    { group: "Pages", title: "The BOA Blog", meta: "Growth articles", href: "/blog" },
    { group: "Pages", title: "Resources & FAQ", meta: "Guides, tools, answers", href: "/resources" },
    { group: "Pages", title: "Speakers", meta: "Meet and apply", href: "/speakers" },
    { group: "Pages", title: "Contact", meta: "Get in touch", href: "/contact" },
  ];

  return NextResponse.json(docs, {
    headers: { "Cache-Control": "no-store" },
  });
}
