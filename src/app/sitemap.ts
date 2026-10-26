import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import {
  fetchEventPanels,
  fetchEventReplays,
  fetchEvents,
  fetchPanelReplays,
  fetchPodcasts,
} from "@/lib/sheet";
import { SITE_URL, toIsoDate } from "@/lib/seo";

/** Regenerated at most once an hour - new sheet rows appear within the hour. */
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const STATIC: { path: string; priority: number; freq: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "daily" },
  { path: "/podcast", priority: 0.9, freq: "weekly" },
  { path: "/events", priority: 0.9, freq: "weekly" },
  { path: "/panels", priority: 0.9, freq: "weekly" },
  { path: "/blog", priority: 0.9, freq: "weekly" },
  { path: "/marketing", priority: 0.8, freq: "monthly" },
  { path: "/coaching", priority: 0.8, freq: "monthly" },
  { path: "/resources", priority: 0.8, freq: "monthly" },
  { path: "/speakers", priority: 0.7, freq: "weekly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.6, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
];

function when(label?: string): Date | undefined {
  const iso = toIsoDate(label);
  return iso ? new Date(iso) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [podcasts, events, panels, eventReplays, panelReplays] = await Promise.all([
    fetchPodcasts().catch(() => []),
    fetchEvents().catch(() => []),
    fetchEventPanels().catch(() => []),
    fetchEventReplays().catch(() => []),
    fetchPanelReplays().catch(() => []),
  ]);

  const entries: MetadataRoute.Sitemap = [
    ...STATIC.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified: now,
      changeFrequency: s.freq,
      priority: s.priority,
    })),
    ...podcasts.map((p) => ({
      url: `${SITE_URL}/podcast/${p.slug}`,
      lastModified: when(p.datePublished) ?? now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: when(b.modified || b.date) ?? now,
      changeFrequency: (b.kind === "article" ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: b.kind === "article" ? 0.7 : 0.5,
      ...(b.image ? { images: [`${SITE_URL}${b.image}`] } : {}),
    })),
    ...events.map((e) => ({
      url: `${SITE_URL}/events/${e.slug}`,
      lastModified: when(e.dateIso) ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...panels.map((e) => ({
      url: `${SITE_URL}/panels/${e.slug}`,
      lastModified: when(e.dateIso) ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...eventReplays.map((r) => ({
      url: `${SITE_URL}/events/replays/${r.slug}`,
      lastModified: when(r.date) ?? now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...panelReplays.map((r) => ({
      url: `${SITE_URL}/panels/replays/${r.slug}`,
      lastModified: when(r.date) ?? now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  // de-duplicate defensively (sheet rows can repeat a title/date)
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}
