/**
 * Video reviews shown on /reviews.
 *
 * ADD A REVIEW: copy one block below and fill it in. Paste the Vimeo link in
 * any form - the full embed snippet, https://vimeo.com/123?share=copy, or
 * just the ID - the page extracts the video ID itself.
 *
 *   {
 *     category: "podcast",                 // "podcast" | "panel"  (drives the filter tabs)
 *     tag: "BOA Podcast Guest",            // the small label above the stars
 *     stars: 5,                            // 1-5
 *     quote: "…",                          // their words, no outer quote marks needed
 *     name: "Sean Duncan, CPA",
 *     role: "Founder, SMD Consulting & Accounting",
 *     vimeo: "https://player.vimeo.com/video/1242805767",
 *     // panels only (optional):
 *     panel: "Panel topic as it appeared on the event",
 *     date: "Oct 6, 2026",
 *   },
 *
 * Newest first within each category. Initials for the avatar come from the
 * name automatically. Source for panel rows: BOA Panel Testimonials.xlsx.
 */

export type ReviewCategory = "podcast" | "panel";

export interface Review {
  category: ReviewCategory;
  tag: string;
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  role: string;
  /** Vimeo embed snippet, link or numeric ID */
  vimeo: string;
  /** panel reviews: the panel topic */
  panel?: string;
  /** panel reviews: the panel date, e.g. "Oct 6, 2026" */
  date?: string;
}

export const CATEGORY_LABEL: Record<ReviewCategory, string> = {
  podcast: "Podcast Guests",
  panel: "Expert Panelists",
};

export const reviews: Review[] = [
  /* ── Podcast guests ─────────────────────────────────────────────────── */
  {
    category: "podcast",
    tag: "BOA Podcast Guest",
    stars: 5,
    quote:
      "I love working with Business of Aesthetics because they're here to educate and not sell… I can be part of something that's actually there to contribute and not just a sales pitch.",
    name: "Sean Duncan, CPA",
    role: "Founder, SMD Consulting & Accounting",
    vimeo: "https://player.vimeo.com/video/1242805767",
  },
  {
    category: "podcast",
    tag: "BOA Podcast Guest",
    stars: 5,
    quote:
      "It's about helping each other in the end, because we are in the same industry. It's good to share what you know and what you learned and help young colleagues.",
    name: "Dr. Alexis Delobaux",
    role: "Plastic Surgeon & President, Body Contouring Academy",
    vimeo: "https://vimeo.com/1243613684",
  },

  /* ── Expert panelists ───────────────────────────────────────────────── */
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "They also send you the questions in advance, so you have time to kind of put your research together… when I jump into the webinar, everything's all set and it makes it super nice.",
    name: "Chelsea Zainea, CPA",
    role: "Owner & Founder of Peak Financial Wellness",
    vimeo: "https://vimeo.com/1243120855",
    panel: "When a Busy Aesthetic Practice Stops Paying Off: Capacity, Margin, and the Practice Calendar",
    date: "Oct 21, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "It was great partnering with Business of Aesthetics. Everyone was very helpful… they did prep us… and gave us a lot of support with putting together this webinar.",
    name: "Erica Connor",
    role: "Multi-Site Aesthetics Operations Executive, Co-Founder, ELEVE Advisory Group",
    vimeo: "https://vimeo.com/1243120857",
    panel: "When a Busy Aesthetic Practice Stops Paying Off: Capacity, Margin, and the Practice Calendar",
    date: "Oct 21, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "I just feel like the conversations are so genuine… It is such a joy to have these conversations and the staff at Business of Aesthetics is fantastic to work with as well.",
    name: "Jessica Wisner",
    role: "Head of Client Education & Product Evangelism at Symplast",
    vimeo: "https://vimeo.com/1243120852",
    panel: "Getting Found When Aesthetic Patients Start Looking: Aesthetic Search Visibility Ahead of the Year's Busiest Quarter",
    date: "Oct 6, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "I absolutely love being part of the panel because they make it extremely streamlined and easy for us to be a panelist… they really match you with wonderful people to have a conversation with.",
    name: "Melissa DelFino",
    role: "Founder, Modern Distinction LLC",
    vimeo: "https://vimeo.com/1243120856",
    panel: "Getting Found When Aesthetic Patients Start Looking: Aesthetic Search Visibility Ahead of the Year's Busiest Quarter",
    date: "Oct 6, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "It was incredible. So from the moment that I was reached out to, it was thoroughly organized… I love how you put together these dynamic groups of people with multiple perspectives.",
    name: "Christin Trujillo",
    role: "Founding Partner & Senior Consultant at Maven Financial",
    vimeo: "https://vimeo.com/1243136954",
    panel: "The Q4 Aesthetic Marketing Sprint: What to Do in October to Make Q4 Your Highest-Revenue Quarter",
    date: "Sep 15, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "Honestly, being on this panel was probably the highlight of my week… I think it's an opportunity to teach and learn at the same time, and to be honest, there aren't a lot of environments that cultivate that experience.",
    name: "Joshua Suchanek",
    role: "Marketing Director, Management Consulting at Skytale Group",
    vimeo: "https://vimeo.com/1243136950",
    panel: "The Q4 Aesthetic Marketing Sprint: What to Do in October to Make Q4 Your Highest-Revenue Quarter",
    date: "Sep 15, 2026",
  },
  {
    category: "panel",
    tag: "BOA Panel Guest",
    stars: 5,
    quote:
      "I really enjoyed being on this panel… both times I feel like I was paired up with the right co-panelists… I would absolutely recommend that other people join panels on the Business of Aesthetics webinars.",
    name: "Jennifer Church Kilkenny",
    role: "Owner, Total Social Solutions",
    vimeo: "https://vimeo.com/1243136949",
    panel: "The Q4 Aesthetic Marketing Sprint: What to Do in October to Make Q4 Your Highest-Revenue Quarter",
    date: "Sep 15, 2026",
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
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "") // drop honorifics
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Strip any outer quote marks so the page can add its own consistently. */
export function cleanQuote(q: string): string {
  return q.trim().replace(/^[“"]+|[”"]+$/g, "");
}

export function averageStars(list: Review[] = reviews): number {
  if (!list.length) return 0;
  return Math.round((list.reduce((s, r) => s + r.stars, 0) / list.length) * 10) / 10;
}

export function countBy(cat: ReviewCategory, list: Review[] = reviews): number {
  return list.filter((r) => r.category === cat).length;
}
