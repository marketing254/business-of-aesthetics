"use client";

import { useState } from "react";

const applicationTypes = [
  "Podcast Guest",
  "Expert Panel Speaker",
  "Both - Podcast & Panel",
];

const topics = [
  "Practice Growth & Scaling",
  "Marketing & Patient Acquisition",
  "AI & Technology in Aesthetics",
  "Team Building & Culture",
  "Revenue & Financial Strategy",
  "Patient Experience & Retention",
  "Clinical Innovation & Trends",
  "Operations & Workflow",
  "Compliance & Risk Management",
  "Personal Branding & Reputation",
  "Mindset & Leadership",
  "Med Spa vs. Clinical Practice",
];

export default function SpeakerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card-frame p-10 text-center sm:p-14">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3 className="display mt-6 text-[30px] text-navy">
          Application Received!
        </h3>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-muted">
          Thank you for your interest in being a guest on the Business of
          Aesthetics. Naren and the team will review your application and get
          back to you within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card-frame p-8 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="sf-first">First Name *</label>
          <input id="sf-first" required placeholder="e.g. Sarah" />
        </div>
        <div className="field">
          <label htmlFor="sf-last">Last Name *</label>
          <input id="sf-last" required placeholder="e.g. Thompson" />
        </div>
        <div className="field">
          <label htmlFor="sf-title">Professional Title *</label>
          <input id="sf-title" required placeholder="e.g. Board-Certified Dermatologist" />
        </div>
        <div className="field">
          <label htmlFor="sf-org">Practice / Organization *</label>
          <input id="sf-org" required placeholder="e.g. Advanced Dermatology & Aesthetics" />
        </div>
        <div className="field">
          <label htmlFor="sf-email">Email Address *</label>
          <input id="sf-email" type="email" required placeholder="you@yourpractice.com" />
        </div>
        <div className="field">
          <label htmlFor="sf-phone">Phone Number</label>
          <input id="sf-phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="field">
          <label htmlFor="sf-type">Application Type *</label>
          <select id="sf-type" required defaultValue="">
            <option value="" disabled>
              Select one...
            </option>
            {applicationTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sf-topic">Preferred Topic *</label>
          <select id="sf-topic" required defaultValue="">
            <option value="" disabled>
              Select a topic area...
            </option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="sf-bio">Your Bio / Background *</label>
          <textarea
            id="sf-bio"
            required
            placeholder="Tell us about your experience, achievements, and what unique perspective you'd bring to our audience..."
          />
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="sf-url">Website, LinkedIn, or Social Profile</label>
          <input id="sf-url" type="url" placeholder="https://www.yourpractice.com" />
        </div>
      </div>

      <button type="submit" className="btn btn-teal mt-8 w-full">
        Submit Your Application <span className="arr">→</span>
      </button>
    </form>
  );
}
