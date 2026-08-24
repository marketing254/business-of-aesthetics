"use client";

import { useState } from "react";

const subjects = [
  "General inquiry",
  "Marketing services",
  "Joining the community",
  "Podcast guest pitch",
  "Event & speaking",
  "Partnership / sponsorship",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="card-frame p-8 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="display text-[26px] text-navy">Send us a message</h3>
      <p className="mt-2 text-[14px] text-muted">
        Fill out the form and we&apos;ll get back to you within one business day.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="cf-name">Your Name *</label>
          <input id="cf-name" required placeholder="Dr. Jane Smith" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email Address *</label>
          <input id="cf-email" type="email" required placeholder="you@yourpractice.com" />
        </div>
        <div className="field">
          <label htmlFor="cf-practice">Practice Name</label>
          <input id="cf-practice" placeholder="Smith Aesthetics (optional)" />
        </div>
        <div className="field">
          <label htmlFor="cf-subject">I&apos;m reaching out about</label>
          <select id="cf-subject" defaultValue={subjects[0]}>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="cf-message">Message *</label>
          <textarea id="cf-message" required placeholder="How can we help?" />
        </div>
      </div>

      <button
        type="submit"
        className={`btn mt-7 w-full ${sent ? "btn-teal" : "btn-navy"}`}
        disabled={sent}
      >
        {sent ? "✓ Message Sent — We will be in touch!" : "Send Message"}
      </button>
    </form>
  );
}
