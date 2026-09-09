/**
 * Blog library - the full article archive imported from the original
 * businessofaesthetics.org WordPress blog (fetched via its REST API and
 * sanitized to clean semantic HTML). Local data, so blog routes are fully
 * static in both hosting modes.
 */

import raw from "./blog-data.json";

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, e.g. 2026-09-02 */
  date: string;
  dateLabel: string;
  category: string;
  excerpt: string;
  readMins: number;
  sourceUrl: string;
  /** sanitized article body (p, h2-h4, lists, links, blockquotes only) */
  html: string;
}

export const blogPosts = raw as BlogPost[];

/** Lightweight shape for listings/search - no article body. */
export interface BlogCard {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  readMins: number;
}

export function blogCards(): BlogCard[] {
  return blogPosts.map(({ slug, title, dateLabel, excerpt, readMins }) => ({
    slug,
    title,
    dateLabel,
    excerpt,
    readMins,
  }));
}

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
