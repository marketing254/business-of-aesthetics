/**
 * Video reviews shown on /reviews.
 *
 * ADD A REVIEW: copy one block below and fill it in. Paste the Vimeo link in
 * any form - the full embed snippet, https://vimeo.com/123, or just the ID -
 * the page extracts the video ID itself.
 *
 *   {
 *     tag: "BOA Podcast Guest",            // the small label above the stars
 *     stars: 5,                            // 1-5
 *     quote: "…",                          // their words, no outer quote marks needed
 *     name: "Sean Duncan, CPA",
 *     role: "Founder, SMD Consulting & Accounting",
 *     vimeo: "https://player.vimeo.com/video/1242805767",
 *   },
 *
 * Newest first. Initials for the avatar come from the name automatically.
 */

export interface Review {
  tag: string;
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  role: string;
  /** Vimeo embed snippet, link or numeric ID */
  vimeo: string;
}

export const reviews: Review[] = [
  {
    tag: "BOA Podcast Guest",
    stars: 5,
    quote:
      "I love working with Business of Aesthetics because they're here to educate and not sell… I can be part of something that's actually there to contribute and not just a sales pitch.",
    name: "Sean Duncan, CPA",
    role: "Founder, SMD Consulting & Accounting",
    vimeo: "https://player.vimeo.com/video/1242805767",
  },
];

/* ── helpers used by the page ─────────────────────────────────────────── */

export function vimeoId(input: string): string {
  const m = (input || "").match(/vimeo\.com\/(?:video\/)?(\d+)/i) || (input || "").match(/^\s*(\d{6,})\s*$/);
  return m ? m[1] : "";
}

export function vimeoEmbedUrl(input: string): string {
  const id = vimeoId(input);
  return id ? `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1` : "";
}

/** Public Vimeo thumbnail (no API key needed) - used as the click-to-play poster. */
export function vimeoPoster(input: string): string {
  const id = vimeoId(input);
  return id ? `https://vumbnail.com/${id}_large.jpg` : "";
}

export function initials(name: string): string {
  return name
    .replace(/,.*$/, "") // drop credentials after the comma
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function averageStars(list: Review[] = reviews): number {
  if (!list.length) return 0;
  return Math.round((list.reduce((s, r) => s + r.stars, 0) / list.length) * 10) / 10;
}
