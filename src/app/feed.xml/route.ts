import { blogArticles } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * /feed.xml - RSS 2.0 feed of the editorial blog articles (newest 50).
 * Feed readers, Google Discover-style surfaces and several AI crawlers use
 * it to find new content quickly; it is advertised via <link rel="alternate">
 * on every page.
 */
export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const items = blogArticles.slice(0, 50);
  const lastBuild = items[0] ? new Date(items[0].modified || items[0].date).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${esc(SITE_NAME)} Blog</title>
  <link>${SITE_URL}/blog</link>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Practical articles on marketing, operations, finance and leadership for dermatology, plastic surgery and med spa practices.</description>
  <language>en-us</language>
  <lastBuildDate>${lastBuild}</lastBuildDate>
${items
  .map(
    (p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE_URL}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <category>${esc(p.category)}</category>
    <description>${esc(p.excerpt)}</description>${
      p.image ? `\n    <enclosure url="${SITE_URL}${p.image}" type="image/jpeg" length="0"/>` : ""
    }
    <content:encoded><![CDATA[${p.html.replace(/src="\/wp-content/g, `src="${SITE_URL}/wp-content`)}]]></content:encoded>
  </item>`
  )
  .join("\n")}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
