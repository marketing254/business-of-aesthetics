/**
 * Prefix local /assets paths with the deployment base path.
 * On GitHub Pages the site lives under /<repo-name>/, and next/image with
 * `unoptimized` does not apply basePath to string srcs — so every local
 * image path must go through this helper.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
