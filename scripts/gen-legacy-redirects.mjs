/**
 * Builds src/lib/legacy-redirects.json - 301 map from the old WordPress
 * URLs (businessofaesthetics.org, Yoast sitemaps captured 2026-10-19) to
 * the new Next.js routes, so rankings and backlinks carry over on cutover.
 *
 * Re-run after importing more legacy content:  node scripts/gen-legacy-redirects.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const posts = JSON.parse(readFileSync("src/lib/blog-data.json", "utf8"));
const slugs = new Set(posts.map((p) => p.slug));
const byPrefix = new Map();
for (const p of posts) {
  const key = p.slug.split("-").slice(0, 6).join("-");
  if (!byPrefix.has(key)) byPrefix.set(key, p.slug);
}

// Root-level WordPress post slugs that are NOT 1:1 in blog-data.json
// (slug drift between the sitemap and the REST export). Prefix-matched below.
const ROOT_POSTS_UNMATCHED = `
podcast-show
pathway-to-excellence-lessons-from-an-award-winning-facial-plastic-and-reconstructive-surgeon-dr-jason-d-bloom
technologies-that-would-take-your-practice-to-the-next-level-through-the-lenses-of-an-industry-veteran
how-a-cross-country-move-resulted-in-a-thriving-plastic-and-dermatology-center-for-one-plastic-surgeon
how-elizabeth-mcrae-md-facp-reinvigorated-her-practice-during-covid-bringing-two-new-technologies-to-her-patients
dr-philip-werschler-and-pamela-werschlers-experience-with-laseropteks-picolo-genuine-picosecond-laser-technology
marketing-lessons-from-the-trenches-jeff-richmond-shares-his-15-years-of-experience-with-aesthetics-marketing
what-madonna-looked-like-at-the-grammys-lessons-from-dr-jeanine-downie-on-how-to-create-natural-looking-results
treating-dermatologic-and-cosmetic-patients-of-color-one-african-american-dermatologists-journey-to-give-better-access
balancing-it-all-navigating-parenthood-professional-success-as-a-plastic-surgeon-with-dr-lindsey-pennington
from-scratch-to-success-dr-lauren-umstattds-journey-to-a-thriving-facial-plastic-surgery-practice
why-the-most-successful-aesthetic-practices-have-a-6-month-marketing-plan-and-why-others-fail-without-one
breaking-the-regenerative-plateau-how-clinics-can-differentiate-diversify-and-scale-beyond-bio-stimulators-in-2026
when-social-media-shuts-you-down-how-plastic-surgeons-can-thrive-despite-stricter-ad-content-rules
surviving-market-saturation-strategic-pivots-capex-defense-and-smart-scaling-in-a-high-density-market
`.trim().split("\n");

const out = [];
const seen = new Set();
const add = (source, destination) => {
  if (seen.has(source)) return;
  seen.add(source);
  out.push({ source, destination, permanent: true });
};

// 1. every imported article: /<slug>/ (old) -> /blog/<slug> (new)
for (const slug of slugs) add(`/${slug}`, `/blog/${slug}`);

// 2. drifted slugs -> best prefix match, else the blog index
for (const slug of ROOT_POSTS_UNMATCHED) {
  if (slugs.has(slug)) continue;
  const key = slug.split("-").slice(0, 6).join("-");
  add(`/${slug}`, byPrefix.has(key) ? `/blog/${byPrefix.get(key)}` : "/blog");
}

writeFileSync(
  "src/lib/legacy-redirects.json",
  JSON.stringify(out, null, 0) + "\n"
);
console.log(`wrote ${out.length} legacy post redirects`);
