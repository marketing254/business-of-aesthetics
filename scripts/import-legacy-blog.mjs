/**
 * Imports the real blog articles from the old WordPress site into
 * src/lib/blog-articles.json (the "blog" custom post type, plus the small
 * "grow-a-business" and "marketing-tips" types). The 297 podcast show-note
 * posts already live in blog-data.json; this file holds the editorial
 * articles that were missing from the first export.
 *
 * The old server is only reachable by IP now (the domain points at Vercel),
 * so requests go to LEGACY_IP with a Host header. Images inside articles and
 * featured images are downloaded into public/wp-content/... so they keep
 * working at the same path.
 *
 *   node scripts/import-legacy-blog.mjs
 */
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import https from "node:https";

const LEGACY_IP = process.env.LEGACY_IP || "209.59.177.84";
const HOST = "www.businessofaesthetics.org";
// Only the "blog" type has real article bodies. "grow-a-business" and
// "marketing-tips" were video/ACF posts with 0-50 words of text - importing
// them would create thin pages, so they stay redirected to /blog.
const TYPES = [{ rest: "blog", category: "Article" }];

const agent = new https.Agent({ rejectUnauthorized: false, servername: HOST });
function get(path, binary = false) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { host: LEGACY_IP, path, method: "GET", agent, headers: { Host: HOST, "User-Agent": "BOA-importer/1.0" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = new URL(res.headers.location, `https://${HOST}`);
          return resolve(get(loc.pathname + loc.search, binary));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          resolve({ status: res.statusCode, headers: res.headers, body: binary ? buf : buf.toString("utf8") });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘").replace(/&#8220;|&ldquo;/g, "“").replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–").replace(/&#8212;|&mdash;/g, "—").replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const mirrored = new Map();
async function mirror(url) {
  // https://www.businessofaesthetics.org/wp-content/uploads/... -> /wp-content/uploads/...
  const m = url.match(/^https?:\/\/(?:www\.)?businessofaesthetics\.org(\/wp-content\/uploads\/[^?#"' ]+)/i);
  if (!m) return url; // external image: leave as is
  const path = m[1];
  if (mirrored.has(path)) return path;
  const dest = join("public", decodeURIComponent(path));
  if (!existsSync(dest)) {
    try {
      const res = await get(path, true);
      if (res.status === 200 && (res.headers["content-type"] || "").startsWith("image/")) {
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, res.body);
      } else {
        console.log("  image skipped", path, res.status);
      }
    } catch (e) {
      console.log("  image failed", path, e.message);
    }
  }
  mirrored.set(path, path);
  return path;
}

/** Keep only clean semantic HTML: p, h2-h4, lists, links, emphasis, quotes, images. */
async function sanitize(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(script|style|iframe|form|noscript|svg)[\s\S]*?<\/\1>/gi, "");
  // images: mirror + reduce to src/alt
  const imgs = [...s.matchAll(/<img\b[^>]*>/gi)];
  for (const im of imgs) {
    const src = (im[0].match(/\bsrc="([^"]+)"/i) || [])[1] || (im[0].match(/\bdata-src="([^"]+)"/i) || [])[1] || "";
    const alt = (im[0].match(/\balt="([^"]*)"/i) || [])[1] || "";
    const local = src ? await mirror(src) : "";
    s = s.replace(im[0], local ? `<img src="${local}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy">` : "");
  }
  // links: keep href only, make internal links relative
  s = s.replace(/<a\b[^>]*href="([^"]+)"[^>]*>/gi, (_, href) => {
    let h = href.replace(/^https?:\/\/(?:www\.)?businessofaesthetics\.org/i, "");
    if (!h) h = "/";
    const ext = /^https?:\/\//i.test(h);
    return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}>`;
  });
  // headings: h1 -> h2, normalise h5/h6 -> h4
  s = s.replace(/<(\/?)h1\b[^>]*>/gi, "<$1h2>").replace(/<(\/?)h[56]\b[^>]*>/gi, "<$1h4>");
  s = s.replace(/<(h[234])\b[^>]*>/gi, "<$1>");
  // strip attributes from the simple tags we keep
  s = s.replace(/<(p|ul|ol|li|blockquote|strong|em|b|i|br|figure|figcaption)\b[^>]*>/gi, (m, t) => `<${t.toLowerCase()}>`);
  s = s.replace(/<(\/?)b>/gi, "<$1strong>").replace(/<(\/?)i>/gi, "<$1em>");
  // unwrap everything else (div, span, section, table-ish, figure wrappers)
  s = s.replace(/<\/?(?!(?:p|h2|h3|h4|ul|ol|li|a|img|strong|em|blockquote|br|figure|figcaption)\b)[a-z][a-z0-9-]*\b[^>]*>/gi, "");
  s = s.replace(/<figure>\s*(<img[^>]*>)\s*<\/figure>/gi, "<p>$1</p>");
  s = s.replace(/<\/?figure>|<\/?figcaption>/gi, "");
  // drop empty paragraphs / whitespace runs
  s = s.replace(/<p>(\s|&nbsp;|<br>)*<\/p>/gi, "");
  s = s.replace(/\s*\n\s*/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

const text = (h) => decode(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const out = [];
for (const t of TYPES) {
  let page = 1;
  for (;;) {
    const res = await get(`/wp-json/wp/v2/${t.rest}?per_page=100&page=${page}&_embed=1&status=publish`);
    if (res.status !== 200) { console.log(t.rest, "HTTP", res.status); break; }
    const items = JSON.parse(res.body);
    if (!items.length) break;
    for (const p of items) {
      const title = text(p.title?.rendered || "");
      const html = await sanitize(p.content?.rendered || "");
      const plain = text(html);
      const words = plain.split(/\s+/).filter(Boolean).length;
      const firstPara = text((html.match(/<p>([\s\S]*?)<\/p>/) || [, ""])[1]);
      const excerptSrc = p.excerpt?.rendered ? text(p.excerpt.rendered) : firstPara || plain;
      const excerpt = excerptSrc.length > 220 ? excerptSrc.slice(0, 217).replace(/\s+\S*$/, "") + "…" : excerptSrc;
      const feat = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      const image = feat ? await mirror(feat) : "";
      out.push({
        slug: p.slug,
        title,
        date: p.date.slice(0, 10),
        modified: (p.modified || p.date).slice(0, 10),
        dateLabel: fmtDate(p.date),
        category: t.category,
        excerpt,
        readMins: Math.max(1, Math.round(words / 200)),
        sourceUrl: p.link,
        image: image || undefined,
        html,
      });
      console.log(`${t.rest}: ${p.slug} (${words} words${image ? ", image" : ""})`);
    }
    if (items.length < 100) break;
    page++;
  }
}
out.sort((a, b) => (a.date < b.date ? 1 : -1));
writeFileSync("src/lib/blog-articles.json", JSON.stringify(out, null, 1) + "\n");
console.log(`\nwrote ${out.length} articles to src/lib/blog-articles.json; mirrored ${mirrored.size} image(s)`);
