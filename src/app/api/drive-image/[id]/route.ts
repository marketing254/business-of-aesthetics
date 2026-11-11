import { NextResponse } from "next/server";

/**
 * Same-origin relay for a Google Drive image whose thumbnail Google never
 * generated (lh3 returns 404 even though the file is public). Browsers block
 * Drive's own download endpoint as an <img> source, so the bytes come through
 * here. Only public files resolve; anything else is a 404.
 */
export const revalidate = 86400;

const ID_RE = /^[\w-]{20,}$/;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!ID_RE.test(id)) return new NextResponse(null, { status: 400 });

  const upstream = await fetch(
    `https://drive.google.com/uc?export=view&id=${id}`,
    { redirect: "follow", next: { revalidate: 86400 } },
  );
  const type = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !type.startsWith("image/")) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(upstream.body, {
    headers: {
      "content-type": type,
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
    },
  });
}
