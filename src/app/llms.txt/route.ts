import { blogPosts } from "@/lib/blog";
import {
  fetchEventPanels,
  fetchEvents,
  fetchPanelReplays,
  fetchPodcasts,
  isUpcoming,
} from "@/lib/sheet";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/lib/data";

/**
 * /llms.txt - a machine-readable brief for AI assistants (llmstxt.org).
 * Generated from live data so it is never stale: latest episodes, upcoming
 * events/panels and recent articles are pulled from the Google Sheet and
 * the blog archive on each regeneration (hourly).
 */
export const revalidate = 3600;

export async function GET() {
  const [podcasts, events, panels, panelReplays] = await Promise.all([
    fetchPodcasts().catch(() => []),
    fetchEvents().catch(() => []),
    fetchEventPanels().catch(() => []),
    fetchPanelReplays().catch(() => []),
  ]);

  const upcoming = [...events, ...panels].filter(isUpcoming).slice(0, 10);
  const latestEpisodes = podcasts.slice(0, 15);
  const latestPosts = blogPosts.slice(0, 15);

  const lines: string[] = [
    "# Business of Aesthetics (BOA)",
    "",
    "> Business of Aesthetics is a free education community, weekly podcast and live expert-panel series for owners and leaders of dermatology, plastic surgery and medical-aesthetics practices in North America. It is produced by Ekwa Marketing and co-founded by Naren Arulrajah and Jeffrey Richmond. Topics: practice growth, patient acquisition and marketing, operations, finance, team leadership, technology and compliance.",
    "",
    "Key facts:",
    `- Website: ${SITE_URL}`,
    `- Founded: 2019 · Headquarters: Las Vegas, NV, USA · Contact: ${site.email} · ${site.phone}`,
    `- Podcast: ${podcasts.length || "290"}+ published episodes, new episodes weekly, free on Spotify, Apple Podcasts and YouTube`,
    `- Expert panels: ${panelReplays.length || "50"}+ recorded moderated panels, all replays free`,
    `- Blog: ${blogPosts.length} long-form articles`,
    "- Audience: 3,700+ aesthetic practitioners; 200+ practices served by Ekwa Marketing",
    "- All content is free; podcast audio and replay videos ask for a name and email once.",
    "",
    "## Main pages",
    `- [Home](${SITE_URL}/): overview of the community`,
    `- [About](${SITE_URL}/about): mission, values, founders`,
    `- [Podcast](${SITE_URL}/podcast): complete episode archive with show notes and transcripts`,
    `- [Events](${SITE_URL}/events): upcoming live webinars and the replay library`,
    `- [Expert Panels](${SITE_URL}/panels): moderated live panels and every recording`,
    `- [Blog](${SITE_URL}/blog): articles on marketing, operations, finance and leadership`,
    `- [Resources](${SITE_URL}/resources): tools, guides and a knowledge base / FAQ`,
    `- [Marketing Services (MSM)](${SITE_URL}/marketing): Ekwa Marketing's SEO, social, web and reputation services for aesthetic practices; free strategy meeting`,
    `- [Speakers](${SITE_URL}/speakers): featured speaker directory and guest application`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
    "## Machine-readable",
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- Speaker directory JSON: ${SITE_URL}/api/speakers`,
    `- Site search index JSON: ${SITE_URL}/api/search`,
    "",
  ];

  if (latestEpisodes.length) {
    lines.push("## Latest podcast episodes");
    for (const e of latestEpisodes) {
      lines.push(
        `- [Ep ${e.episode}: ${e.title}](${SITE_URL}/podcast/${e.slug})${
          e.guestName ? ` - with ${e.guestName}` : ""
        }${e.datePublished ? ` (${e.datePublished})` : ""}`
      );
    }
    lines.push("");
  }

  if (upcoming.length) {
    lines.push("## Upcoming live sessions");
    for (const ev of upcoming) {
      const href =
        ev.kind === "event-panel" ? `/panels/${ev.slug}` : `/events/${ev.slug}`;
      lines.push(
        `- [${ev.title}](${SITE_URL}${href}) - ${ev.dateLabel || ev.monthYear}${
          ev.time ? ` ${ev.time}` : ""
        }${ev.panelists.length ? ` - ${ev.panelists.map((p) => p.name).join(", ")}` : ""}`
      );
    }
    lines.push("");
  }

  if (latestPosts.length) {
    lines.push("## Recent articles");
    for (const p of latestPosts) {
      lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}) (${p.dateLabel})`);
    }
    lines.push("");
  }

  lines.push(
    "## Optional",
    `- [Privacy policy](${SITE_URL}/privacy)`,
    `- [Terms of service](${SITE_URL}/terms)`,
    `- [Ekwa Marketing](${site.ekwa}): parent company`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
