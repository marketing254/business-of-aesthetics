/**
 * Blog library - the full article archive imported from the original
 * businessofaesthetics.org WordPress blog (fetched via its REST API and
 * sanitized to clean semantic HTML). Local data, so blog routes are fully
 * static in both hosting modes.
 */

import episodeNotes from "./blog-data.json";
import articles from "./blog-articles.json";

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, e.g. 2026-09-02 */
  date: string;
  /** ISO date of the last edit (falls back to date) */
  modified?: string;
  dateLabel: string;
  category: string;
  excerpt: string;
  readMins: number;
  sourceUrl: string;
  /** sanitized article body (p, h2-h4, lists, links, blockquotes only) */
  html: string;
  /** "article" = editorial blog post; "episode" = podcast show notes/transcript */
  kind: BlogKind;
  /** featured image (local /wp-content path) when the article has one */
  image?: string;
}

export type BlogKind = "article" | "episode";

type RawPost = Omit<BlogPost, "kind" | "image"> & { image?: string };

/** Newest first across both sources; articles win ties. */
export const blogPosts: BlogPost[] = [
  ...(articles as RawPost[]).map((p) => ({ ...p, kind: "article" as const })),
  ...(episodeNotes as RawPost[]).map((p) => ({ ...p, kind: "episode" as const, category: "Episode Notes" })),
].sort((a, b) => (a.date === b.date ? (a.kind === "article" ? -1 : 1) : a.date < b.date ? 1 : -1));

export const blogArticles = blogPosts.filter((p) => p.kind === "article");

/** Lightweight shape for listings/search - no article body. */
export interface BlogCard {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  readMins: number;
  kind: BlogKind;
  category: string;
  image?: string;
}

export function blogCards(): BlogCard[] {
  return blogPosts.map(({ slug, title, dateLabel, excerpt, readMins, kind, category, image }) => ({
    slug,
    title,
    dateLabel,
    excerpt,
    readMins,
    kind,
    category,
    image,
  }));
}

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

/** Other posts of the same kind, newest first, excluding the current one. */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts.filter((p) => p.kind === post.kind && p.slug !== post.slug).slice(0, limit);
}
