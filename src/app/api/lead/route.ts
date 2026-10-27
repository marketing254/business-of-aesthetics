import { NextResponse } from "next/server";

/**
 * Lead relay: browser → this route → Google Apps Script → Google Sheet.
 *
 * Keeping the Apps Script URL and shared secret server-side means the
 * browser never sees them, and there is no CORS dance with script.google.com.
 *
 * Env (set in Vercel → Project → Settings → Environment Variables):
 *   LEAD_WEBHOOK_URL  the Apps Script web-app /exec URL
 *   LEAD_SECRET       must equal LEAD_SECRET in appscript.gs
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_FORMS = new Set([
  "contact",
  "newsletter",
  "speaker_application",
  "podcast_gate",
  "event_replay_gate",
  "panel_replay_gate",
  "resource_download",
  "event_registration",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] LEAD_WEBHOOK_URL is not set - lead not stored");
    return NextResponse.json(
      { ok: false, error: "Lead capture is not configured" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const form = String(body.form || "");
  if (!ALLOWED_FORMS.has(form)) {
    return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  }
  const email = String(body.email || "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  // trim every string field; cap sizes so a hostile client can't bloat the sheet
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === "string" || typeof v === "number") {
      clean[k] = String(v).trim().slice(0, 5000);
    }
  }
  clean.email = email;
  clean.userAgent = req.headers.get("user-agent") ?? "";
  clean.secret = process.env.LEAD_SECRET ?? "";

  try {
    // Apps Script answers with a 302 to a googleusercontent URL; follow it.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean),
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    let status = "ok";
    try {
      status = (JSON.parse(text) as { status?: string }).status ?? "ok";
    } catch {
      /* Apps Script occasionally returns HTML on auth errors */
      if (!res.ok || /<html/i.test(text)) status = "error";
    }
    if (status !== "ok") {
      console.error("[lead] Apps Script rejected submission:", text.slice(0, 300));
      return NextResponse.json({ ok: false, error: "Could not store lead" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] relay failed:", err);
    return NextResponse.json({ ok: false, error: "Relay failed" }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: Boolean(process.env.LEAD_WEBHOOK_URL),
  });
}
