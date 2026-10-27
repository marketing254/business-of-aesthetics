"use client";

/**
 * Lead capture client. Every form on the site calls submitLead(); the
 * payload goes to our own /api/lead route (same origin, no CORS), which
 * forwards it to the Google Apps Script web app that writes to the
 * "BOA — Website Data" spreadsheet (one tab per form).
 *
 * Form names must match FORM_CONFIG in appscript.gs.
 */

export type LeadForm =
  | "contact"
  | "newsletter"
  | "speaker_application"
  | "podcast_gate"
  | "event_replay_gate"
  | "panel_replay_gate"
  | "resource_download"
  | "event_registration";

export interface LeadResult {
  ok: boolean;
  error?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export async function submitLead(
  form: LeadForm,
  data: Record<string, string | number | undefined>
): Promise<LeadResult> {
  const payload = {
    form,
    ...data,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    const ok = res.ok && json.ok !== false;
    track(form, ok);
    return { ok, error: ok ? undefined : json.error || `HTTP ${res.status}` };
  } catch (err) {
    track(form, false);
    return { ok: false, error: (err as Error).message };
  }
}

/** GA4 / GTM conversion event - no-op when analytics isn't loaded. */
function track(form: LeadForm, ok: boolean) {
  if (typeof window === "undefined") return;
  const name = ok ? "generate_lead" : "lead_submit_failed";
  const params = { form_name: form, method: "website_form" };
  try {
    if (window.gtag) window.gtag("event", name, params);
    else if (window.dataLayer) window.dataLayer.push({ event: name, ...params });
  } catch {
    /* ignore */
  }
}
