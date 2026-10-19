"use client";

/**
 * Centered newsletter band. Signups are written to the "Newsletter" tab of
 * the Google Sheet via /api/lead; the browser remembers a completed signup
 * so returning visitors aren't nagged.
 */

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/motion/Animate";
import { submitLead } from "@/lib/lead";

const KEY = "boa-newsletter";

export default function NewsletterBand({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) setDone(true);
    } catch {}
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || busy) return;
    setBusy(true);
    setError("");
    const res = await submitLead("newsletter", { email: clean, source });
    setBusy(false);
    if (!res.ok) {
      setError("Couldn't subscribe right now - please try again in a moment.");
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ email: clean, at: Date.now() }));
    } catch {}
    setDone(true);
  };

  return (
    <section id="newsletter" className="border-t border-line bg-sand py-18 lg:py-20">
      <div className="mx-auto max-w-[680px] px-5 text-center">
        <FadeUp>
          <span className="kicker center justify-center">The Weekly Brief</span>
          <h2 className="display mt-4 text-[clamp(24px,2.9vw,32px)] text-navy">
            One useful idea for your practice, <em>every week.</em>
          </h2>
          <p className="lede mx-auto mt-4 max-w-[520px]">
            New episodes, upcoming panels, and one growth insight worth your
            inbox. No noise, unsubscribe anytime.
          </p>

          {done ? (
            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-teal/40 bg-teal-soft/60 px-6 py-3 text-[13.5px] font-semibold text-navy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-teal-deep"><path d="M20 6 9 17l-5-5"/></svg>
              You&apos;re on the list - see you Tuesday.
            </div>
          ) : (
            <>
              <form
                onSubmit={submit}
                className="mx-auto mt-8 flex max-w-[460px] items-center gap-2 rounded-full border border-line bg-paper p-1.5 pl-5 transition-colors focus-within:border-teal"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourpractice.com"
                  aria-label="Email address"
                  autoComplete="email"
                  className="w-full bg-transparent py-2 text-[14px] text-ink placeholder:text-muted focus:outline-none"
                />
                <button type="submit" disabled={busy} className="btn btn-navy shrink-0 !px-5 !py-2.5">
                  {busy ? "..." : "Subscribe"}
                </button>
              </form>
              {error && (
                <p role="alert" className="mt-3 text-[12.5px] text-red-600">
                  {error}
                </p>
              )}
            </>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
