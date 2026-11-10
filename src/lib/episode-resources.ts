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
  // 306 and 307 are hosted on Google Drive (links from the podcasts sheet)
  {
    episode: 306,
    label: "The Aftercare Advantage Kit",
    description:
      "A treatment that went perfectly can still lose the patient. Four moves - promise, protect, prove, plan - to make the days after it earn the next booking, with Dr. Rob Knight.",
    url: "https://drive.google.com/uc?export=download&id=1krpPGb1-g2ObL_PMgjocZjjWhSjMxTvI",
    meta: "PDF · 12 pages",
  },
  {
    episode: 307,
    label: "The Brand-Ready Physician Checklist",
    description:
      "Audit your medical director against what aesthetic brands actually check before a launch, then build a plan to get on the shortlist. Based on insights from Megan Driscoll of EvolveMKD.",
    url: "https://drive.google.com/uc?export=download&id=1SNLwePnb5XrN4PPBP3lfEA-fFQUmpc2J",
    meta: "PDF · 7 pages",
  },
];

const GENERIC_LABEL = "Free episode resource";
const URL_RE = /(https?:\/\/\S+|\/downloads\/\S+)/i;

/** Google Drive share links -> direct download, so the browser saves the file instead of opening the Drive viewer. */
export function directDownloadUrl(url: string): string {
  const m =
    url.match(/drive\.google\.com\/file\/d\/([\w-]{20,})/i) ||
    url.match(/drive\.google\.com\/(?:open|uc)\?.*?id=([\w-]{20,})/i);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url;
}

/**
 * Parse a sheet cell into resources. Editors write it in any of these ways:
 *   Label | https://link          (one per line)
 *   Label                         (label on one line, link on the next)
 *   https://link
 *   https://link                  (bare link - gets a generic label)
 * Drive "view" links are turned into direct downloads.
 */
export function parseResourceLines(episode: number, cell: string): EpisodeResource[] {
  const lines = (cell || "")
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const out: EpisodeResource[] = [];
  let pendingLabel = "";
  for (const line of lines) {
    const piped = line.match(/^(.*?)\s*\|\s*(https?:\/\/\S+|\/\S+)\s*$/);
    if (piped) {
      out.push({ episode, label: piped[1].trim() || GENERIC_LABEL, url: directDownloadUrl(piped[2].trim()) });
      pendingLabel = "";
      continue;
    }
    const url = line.match(URL_RE);
    if (url) {
      const inline = line.replace(url[0], "").replace(/[\s:|\-–—]+$/g, "").trim();
      const label = inline || pendingLabel || GENERIC_LABEL;
      out.push({ episode, label: /^resources?$/i.test(label) ? GENERIC_LABEL : label, url: directDownloadUrl(url[0]) });
      pendingLabel = "";
      continue;
    }
    pendingLabel = line; // a label waiting for its link on the next line
  }
  return out;
}

/** Drive file id when the URL is a Drive link, otherwise the URL itself. */
function resourceKey(url: string): string {
  const m = url.match(/[?&]id=([\w-]{20,})/) || url.match(/\/file\/d\/([\w-]{20,})/);
  return m ? `drive:${m[1]}` : url;
}

/**
 * Bundled entries (which have proper titles and descriptions) first, then
 * sheet resources; de-duplicated by Drive file id / URL. A sheet link that
 * came without a label is dropped when the episode already has a bundled
 * resource - that is almost always the same file uploaded to Drive.
 */
export function resourcesForEpisode(episode: number, fromSheet: EpisodeResource[] = []): EpisodeResource[] {
  const bundled = bundledResources.filter((r) => r.episode === episode);
  const extra = fromSheet.filter((r) => !(bundled.length && r.label === GENERIC_LABEL));
  const seen = new Set<string>();
  return [...bundled, ...extra].filter((r) => {
    const k = resourceKey(r.url);
    return seen.has(k) ? false : (seen.add(k), true);
  });
}
