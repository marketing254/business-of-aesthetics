"use client";

/**
 * Centered newsletter band. Captures the signup locally (same treatment as
 * the lead gate) until an email service is wired in; the form UX, states
 * and validation are production-ready.
 */

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/motion/Animate";

const KEY = "boa-newsletter";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) setDone(true);
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ email: clean, at: Date.now() }));
    } catch {}
    setDone(true);
  };

  return (
    <section className="border-t border-line bg-sand py-18 lg:py-20">
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
                className="w-full bg-transparent text-[14px] text-ink placeholder:text-muted focus:outline-none"
              />
              <button type="submit" className="btn btn-navy shrink-0 !px-5 !py-2.5">
                Subscribe
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
