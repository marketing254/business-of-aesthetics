/**
 * Mirrors every image the Google Sheet still references on the OLD WordPress
 * host (https://www.businessofaesthetics.org/wp-content/uploads/...) into
 * public/wp-content/uploads/... so the files keep working on Vercel after the
 * domain moves - at the very same URL. The site renders them as relative
 * /wp-content/... paths through the Next image optimizer (resized + WebP).
 *
 *   node scripts/mirror-legacy-media.mjs            # download missing files
 *   node scripts/mirror-legacy-media.mjs --check    # list only, no download
 *
 * Re-run whenever editors paste a WordPress image URL into the sheet (after
 * cutover they should upload to Drive instead - Drive links need no mirroring).
 * Requires the old host to still be reachable; run it BEFORE DNS cutover.
 */
import { mkdirSync, existsSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const SHEET_ID = process.env.BOA_SHEET_ID || "1RUbqWwqnIacOiUmuXpnV_hK88LEgMNORBIyb80tSRas";
const GIDS = ["466360483", "1881150164", "1663508458", "159718304", "805556650", "603031698"];
// the old WordPress origin - override with LEGACY_ORIGIN if the old host is
// parked on another hostname/IP after cutover
const LEGACY_ORIGIN = process.env.LEGACY_ORIGIN || "https://www.businessofaesthetics.org";
const check = process.argv.includes("--check");

const urls = new Set();
for (const gid of GIDS) {
  const csv = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`).then((r) => r.text());
  for (const m of csv.matchAll(/https?:\/\/(?:www\.)?businessofaesthetics\.org\/wp-content\/uploads\/[^\s"',)<>]+/g)) {
    urls.add(m[0].replace(/[.,;]+$/, ""));
  }
}
// static content files that were carried over from WordPress
import { readFileSync } from "node:fs";
for (const f of ["src/lib/data.ts", "src/lib/speakers-archive.ts"]) {
  const txt = readFileSync(f, "utf8");
  for (const m of txt.matchAll(/https?:\/\/(?:www\.)?businessofaesthetics\.org\/wp-content\/uploads\/[^\s"'`,)<>]+/g)) urls.add(m[0]);
  // already-localized paths ("/wp-content/uploads/...") still need the file
  for (const m of txt.matchAll(/["'`](\/wp-content\/uploads\/[^\s"'`,)<>]+)/g)) urls.add(LEGACY_ORIGIN + m[1]);
  const WP = txt.match(/const WP = "([^"]+)"/)?.[1];
  if (WP) for (const m of txt.matchAll(/archive\([^)]*?"([^"]+\.(?:jpe?g|png|webp))"\s*\)/g)) urls.add((WP.startsWith("http") ? WP : LEGACY_ORIGIN + WP) + "/" + m[1]);
}
console.log(`${urls.size} legacy image URL(s) referenced in the sheet + static data`);

let ok = 0, skipped = 0, failed = 0, bytes = 0;
for (const url of urls) {
  const path = new URL(url).pathname; // /wp-content/uploads/....
  const dest = join("public", decodeURIComponent(path));
  if (existsSync(dest)) { skipped++; continue; }
  if (check) { console.log("missing:", path); continue; }
  try {
    const res = await fetch(LEGACY_ORIGIN + path, { headers: { "User-Agent": "BOA-media-mirror/1.0" } });
    if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/")) throw new Error(`HTTP ${res.status} ${res.headers.get("content-type")}`);
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    bytes += buf.length; ok++;
    console.log("saved", path, `${Math.round(buf.length / 1024)}k`);
  } catch (e) {
    failed++;
    console.log("FAILED", path, e.message);
  }
}
console.log(`\ndownloaded ${ok} (${Math.round(bytes / 1024)}k), already present ${skipped}, failed ${failed}`);
if (!check && existsSync("public/wp-content")) {
  let total = 0, n = 0;
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else { total += statSync(p).size; n++; }
    }
  };
  walk("public/wp-content");
  console.log(`public/wp-content now holds ${n} files, ${Math.round(total / 1024)}k`);
}
