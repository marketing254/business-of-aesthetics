import { NextResponse } from "next/server";
import { fetchSpeakers } from "@/lib/sheet";

export async function GET() {
  const speakers = await fetchSpeakers();
  return NextResponse.json(speakers, {
    headers: { "Cache-Control": "no-store" },
  });
}
