/**
 * Free downloadable resources ("freebies") attached to podcast episodes.
 *
 * Two sources, merged per episode:
 *  1. The `resources` column in the podcasts tab of the Google Sheet - one
 *     resource per line, written as   Label | https://link   (Drive links and
 *     PDF URLs both work). Editors can add these without a deploy.
 *  2. This file - PDFs that live in the repo under /public/downloads. Add a
 *     line here when a new PDF is committed.
 *
 * Resources are listed on the episode page (behind the one-time name/email
 * gate, logged to the Podcast Gate tab as "Download: …") and on /resources.
 */

export interface EpisodeResource {
  /** episode number the resource belongs to */
  episode: number;
  /** short title shown to the visitor */
  label: string;
  /** one-line description */
  description?: string;
  /** absolute URL or site-relative path to the file */
  url: string;
  /** e.g. "PDF · 10 pages" */
  meta?: string;
}

export const bundledResources: EpisodeResource[] = [
  {
    episode: 299,
    label: "The Growth-Proof Med Spa Playbook",
    description:
      "A practical 90-day reset for building a med spa that protects margin, creates a consistent client experience, and does not depend on one provider staying forever.",
    url: "/downloads/ep-299-growth-proof-med-spa-playbook.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 300,
    label: "The Aesthetic Technology Investment Decision Guide",
    description:
      "A due-diligence workbook for deciding what to buy, what to skip, and how to make new technology earn its place in your practice.",
    url: "/downloads/ep-300-aesthetic-technology-investment-decision-guide.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 301,
    label: "The Modern Esthetician Client Trust Playbook",
    description:
      "A workbook for personalizing consultations, staying in scope, handling complex cases, and building a professional brand clients trust.",
    url: "/downloads/ep-301-modern-esthetician-client-trust-playbook.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 302,
    label: "The Vulnerable Patient Experience Blueprint",
    description:
      "An action guide for building trust, control, and continuity before, during, and after treatment.",
    url: "/downloads/ep-302-vulnerable-patient-experience-blueprint.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 303,
    label: "The Profit Leak Audit",
    description:
      "Is your busiest treatment quietly costing you money? A practical audit in four moves, with Sean M. Duncan, CPA.",
    url: "/downloads/ep-303-profit-leak-audit.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 304,
    label: "The Non-Responder Reset Kit",
    description:
      "A consultation toolkit for the patient who says “I did everything, but nothing worked” - four pause points before the next procedure.",
    url: "/downloads/ep-304-non-responder-reset-kit.pdf",
    meta: "PDF · 10 pages",
  },
  {
    episode: 305,
    label: "The Owner Bottleneck Reset Kit",
    description:
      "A practical 7-day reset to move one recurring operational task off your desk without losing accountability, continuity or patient trust.",
    url: "/downloads/ep-305-owner-bottleneck-reset-kit.pdf",
    meta: "PDF · 8 pages",
  },
];

/** Parse the sheet's `resources` cell: one "Label | URL" per line. */
export function parseResourceLines(episode: number, cell: string): EpisodeResource[] {
  return (cell || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.*?)\s*\|\s*(https?:\/\/\S+|\/\S+)\s*$/);
      if (m) return { episode, label: m[1].trim() || "Download", url: m[2].trim() };
      const bare = line.match(/^(https?:\/\/\S+)$/);
      return bare ? { episode, label: "Episode resource", url: bare[1] } : null;
    })
    .filter((r): r is EpisodeResource => r !== null);
}

/** Sheet resources first, then bundled PDFs; de-duplicated by URL. */
export function resourcesForEpisode(episode: number, fromSheet: EpisodeResource[] = []): EpisodeResource[] {
  const all = [...fromSheet, ...bundledResources.filter((r) => r.episode === episode)];
  const seen = new Set<string>();
  return all.filter((r) => (seen.has(r.url) ? false : (seen.add(r.url), true)));
}
