import type { NextConfig } from "next";

/**
 * Two hosting modes from one codebase:
 *
 * - Default (Vercel/Netlify/any Node host): server-rendered, Google-Sheet
 *   content is fetched per request — edits appear instantly.
 * - STATIC_EXPORT=1 (GitHub Pages): full static export to `out/` with the
 *   sheet data baked in at build time; the Pages workflow rebuilds on push
 *   and on a schedule so content stays reasonably fresh.
 *
 * NEXT_BASE_PATH is set by the Pages workflow to "/<repo-name>" so assets
 * and links resolve under the project subpath.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: process.env.NEXT_BASE_PATH || "",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
