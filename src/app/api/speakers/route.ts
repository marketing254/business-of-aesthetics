import { NextResponse } from "next/server";
import { fetchSpeakers } from "@/lib/sheet";

export const dynamic = "force-dynamic";

export async function GET() {
  const speakers = await fetchSpeakers();
  return NextResponse.json(speakers, {
    headers: { "Cache-Control": "no-store" },
  });
}
