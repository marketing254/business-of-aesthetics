/**
 * SEO helpers: canonical site URL + JSON-LD builders.
 *
 * Every builder returns a plain object; render it with <JsonLd data={...} />.
 * Keep schema truthful to what is visible on the page - Google treats
 * mismatches as spam.
 */

import { site } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";
import type {
  SheetEvent,
  SheetPodcast,
  SheetReplay,
  SheetSpeaker,
} from "@/lib/sheet";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.businessofaesthetics.org"
).replace(/\/$/, "");

export const SITE_NAME = "Business of Aesthetics";
export const DEFAULT_DESCRIPTION =
  "Business of Aesthetics (BOA) is the podcast, expert-panel and education community for leaders in dermatology, plastic surgery and medical aesthetics - practice growth, marketing, operations and leadership.";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PODCAST_ID = `${SITE_URL}/podcast#series`;
export const LOGO_URL = `${SITE_URL}/assets/logo.png`;

export function abs(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** "Sep 2, 2026" | "2026-09-02" | "September 2026" -> ISO date or undefined */
export function toIsoDate(label?: string): string | undefined {
  if (!label) return undefined;
  const t = label.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** "1h 12m" | "72 min" | "1:12:30" -> ISO 8601 duration */
export function toIsoDuration(label?: string): string | undefined {
  if (!label) return undefined;
  const t = label.toLowerCase();
  const hms = t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (hms) {
    const [h, m, s] = hms[3]
      ? [Number(hms[1]), Number(hms[2]), Number(hms[3])]
      : [0, Number(hms[1]), Number(hms[2])];
    return `PT${h ? `${h}H` : ""}${m}M${s ? `${s}S` : ""}`;
  }
  const h = t.match(/(\d+)\s*h/);
  const m = t.match(/(\d+)\s*m/);
  if (h || m) return `PT${h ? `${h[1]}H` : ""}${m ? `${m[1]}M` : ""}`;
  return undefined;
}

export function strip(text: string, max = 300) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

type Json = Record<string, unknown>;

export function organizationJsonLd(): Json {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "BOA",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 196, height: 57 },
    description: DEFAULT_DESCRIPTION,
    foundingDate: "2019",
    founder: [
      { "@type": "Person", name: "Naren Arulrajah", jobTitle: "Co-Founder; Founder & CEO, Ekwa Marketing" },
      { "@type": "Person", name: "Jeffrey Richmond", jobTitle: "Co-Founder" },
    ],
    parentOrganization: { "@type": "Organization", name: "Ekwa Marketing", url: site.ekwa },
    email: site.email,
    telephone: "+1-855-466-4580",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1810 E Sahara Ave Suite #1471",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89104",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-855-466-4580",
      contactType: "customer service",
      email: site.email,
      availableLanguage: "English",
    },
    sameAs: [
      site.socials.instagram,
      site.socials.facebook,
      site.socials.linkedin.replace(/\/posts\/.*$/, "/"),
    ],
    knowsAbout: [
      "Aesthetic medicine practice management",
      "Dermatology practice marketing",
      "Plastic surgery practice growth",
      "Med spa operations",
      "Patient acquisition and retention",
    ],
  };
}

export function websiteJsonLd(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function podcastSeriesJsonLd(latest?: SheetPodcast[]): Json {
  return {
    "@type": "PodcastSeries",
    "@id": PODCAST_ID,
    name: "Business of Aesthetics Podcast",
    url: `${SITE_URL}/podcast`,
    description:
      "Weekly conversations with the leading minds in dermatology, plastic surgery and aesthetics about growing a successful, fulfilling practice.",
    image: LOGO_URL,
    publisher: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    inLanguage: "en-US",
    genre: ["Business", "Health", "Medical aesthetics"],
    ...(latest?.length
      ? {
          hasPart: latest.slice(0, 10).map((e) => ({
            "@type": "PodcastEpisode",
            "@id": `${SITE_URL}/podcast/${e.slug}#episode`,
            name: e.title,
            episodeNumber: e.episode,
            url: `${SITE_URL}/podcast/${e.slug}`,
          })),
        }
      : {}),
  };
}

export function podcastEpisodeJsonLd(e: SheetPodcast): Json {
  return {
    "@type": "PodcastEpisode",
    "@id": `${SITE_URL}/podcast/${e.slug}#episode`,
    url: `${SITE_URL}/podcast/${e.slug}`,
    name: e.title,
    episodeNumber: e.episode,
    datePublished: toIsoDate(e.datePublished),
    description: strip(e.description, 500),
    image: e.posterImage || e.guestPhotoUrl || LOGO_URL,
    partOfSeries: { "@id": PODCAST_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    ...(e.guestName
      ? { actor: [{ "@type": "Person", name: e.guestName }] }
      : {}),
    ...(e.audioSource
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: e.audioSource,
            encodingFormat: "audio/mpeg",
          },
        }
      : {}),
  };
}

export function blogPostingJsonLd(p: BlogPost): Json {
  const words = p.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${p.slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
    url: `${SITE_URL}/blog/${p.slug}`,
    headline: strip(p.title, 110),
    description: strip(p.excerpt, 300),
    datePublished: p.date,
    dateModified: p.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: `${SITE_URL}/opengraph-image`,
    articleSection: p.category,
    wordCount: words,
    timeRequired: `PT${p.readMins}M`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

export function eventJsonLd(e: SheetEvent, path: string): Json {
  const start = toIsoDate(e.dateIso || e.dateLabel);
  return {
    "@type": "Event",
    "@id": `${abs(path)}#event`,
    url: abs(path),
    name: e.title,
    description: strip(e.description, 500),
    ...(start ? { startDate: start } : {}),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: e.registerUrl || abs(path),
    },
    organizer: { "@id": ORG_ID },
    performer: e.panelists.map((p) => ({ "@type": "Person", name: p.name })),
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: e.registerUrl || abs(path),
    },
    image: e.panelists.find((p) => p.imageUrl)?.imageUrl || LOGO_URL,
  };
}

export function videoObjectJsonLd(r: SheetReplay, path: string, embedUrl?: string): Json {
  return {
    "@type": "VideoObject",
    "@id": `${abs(path)}#video`,
    url: abs(path),
    name: r.title,
    description: strip(r.summary || r.description, 500) || r.title,
    thumbnailUrl: r.imageUrl || LOGO_URL,
    uploadDate: toIsoDate(r.date) ?? "2024-01-01",
    ...(toIsoDuration(r.duration) ? { duration: toIsoDuration(r.duration) } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    ...(r.videoUrl ? { contentUrl: r.videoUrl } : {}),
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    genre: r.category,
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function speakerListJsonLd(speakers: SheetSpeaker[]): Json {
  return {
    "@type": "ItemList",
    name: "Business of Aesthetics featured speakers",
    url: `${SITE_URL}/speakers`,
    numberOfItems: speakers.length,
    itemListElement: speakers.slice(0, 50).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: s.name,
        ...(s.title ? { jobTitle: s.title } : {}),
        ...(s.company ? { worksFor: { "@type": "Organization", name: s.company } } : {}),
        ...(s.imageUrl ? { image: s.imageUrl } : {}),
        ...(s.linkedin || s.website
          ? { sameAs: [s.linkedin, s.website].filter(Boolean).map((u) => u.trim()) }
          : {}),
      },
    })),
  };
}

export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): Json {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/** Wrap one or more nodes in a single @graph document. */
export function graph(...nodes: (Json | null | undefined | false)[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
