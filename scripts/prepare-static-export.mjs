/**
 * Prepares the codebase for a GitHub Pages static export build.
 *
 * Run ONLY in CI (the Pages workflow) — it appends `generateStaticParams`
 * to the dynamic [slug] routes so `next build` with STATIC_EXPORT=1 can
 * enumerate every page. The repo itself stays purely server-rendered
 * (per-request live sheet data on Vercel/Node hosts), because the presence
 * of generateStaticParams would flip those routes to static caching.
 */

import { readFileSync, writeFileSync } from "node:fs";

const routes = [
  ["src/app/podcast/[slug]/page.tsx", "fetchPodcasts"],
  ["src/app/events/[slug]/page.tsx", "fetchEvents"],
  ["src/app/events/replays/[slug]/page.tsx", "fetchEventReplays"],
  ["src/app/panels/[slug]/page.tsx", "fetchEventPanels"],
  ["src/app/panels/replays/[slug]/page.tsx", "fetchPanelReplays"],
];

for (const [path, fetcher] of routes) {
  let src = readFileSync(path, "utf8");
  if (src.includes("generateStaticParams")) {
    console.log(`skip (already present): ${path}`);
    continue;
  }

  // make sure the fetcher is imported from @/lib/sheet
  if (!new RegExp(`\\b${fetcher}\\b`).test(src)) {
    src = src.replace(
      /import \{([^}]*)\} from "@\/lib\/sheet";/,
      (m, inner) =>
        `import {${inner.trimEnd().replace(/,\s*$/, "")}, ${fetcher} } from "@/lib/sheet";`
    );
  }

  src += `
export async function generateStaticParams() {
  const items = await ${fetcher}();
  return items.map((item) => ({ slug: item.slug }));
}
`;
  writeFileSync(path, src);
  console.log(`generateStaticParams added: ${path}`);
}

// the speakers API route must be force-static for `output: export`
// (it becomes a JSON snapshot baked at build time; on servers it stays live)
{
  const apiPath = "src/app/api/speakers/route.ts";
  let api = readFileSync(apiPath, "utf8");
  // defensively strip any per-request marker, then mark static
  api = api.replace(/export const dynamic = "force-dynamic";[ \t]*\r?\n?/g, "");
  if (!api.includes("force-static")) {
    api = `export const dynamic = "force-static";\n\n` + api;
    writeFileSync(apiPath, api);
    console.log(`force-static added: ${apiPath}`);
  }
}

console.log("static-export preparation complete");
