"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";

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

type Status = "idle" | "sending" | "sent" | "error";

export default function SpeakerForm() {
  const [status, setStatus] = useState<Status>("idle");

  if (status === "sent") {
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "");
    setStatus("sending");
    const res = await submitLead("speaker_application", {
      firstName: get("firstName"),
      lastName: get("lastName"),
      title: get("title"),
      organization: get("organization"),
      email: get("email"),
      phone: get("phone"),
      applyingAs: get("applyingAs"),
      topic: get("topic"),
      bio: get("bio"),
      website: get("website"),
      company_website: get("company_website"),
    });
    setStatus(res.ok ? "sent" : "error");
  };

  return (
    <form className="card-frame p-8 sm:p-10" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="sf-first">First Name *</label>
          <input id="sf-first" name="firstName" required autoComplete="given-name" placeholder="e.g. Sarah" />
        </div>
        <div className="field">
          <label htmlFor="sf-last">Last Name *</label>
          <input id="sf-last" name="lastName" required autoComplete="family-name" placeholder="e.g. Thompson" />
        </div>
        <div className="field">
          <label htmlFor="sf-title">Professional Title *</label>
          <input id="sf-title" name="title" required placeholder="e.g. Board-Certified Dermatologist" />
        </div>
        <div className="field">
          <label htmlFor="sf-org">Practice / Organization *</label>
          <input id="sf-org" name="organization" required autoComplete="organization" placeholder="e.g. Advanced Dermatology & Aesthetics" />
        </div>
        <div className="field">
          <label htmlFor="sf-email">Email Address *</label>
          <input id="sf-email" name="email" type="email" required autoComplete="email" placeholder="you@yourpractice.com" />
        </div>
        <div className="field">
          <label htmlFor="sf-phone">Phone Number</label>
          <input id="sf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="field">
          <label htmlFor="sf-type">Application Type *</label>
          <select id="sf-type" name="applyingAs" required defaultValue="">
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
          <select id="sf-topic" name="topic" required defaultValue="">
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
            name="bio"
            required
            placeholder="Tell us about your experience, achievements, and what unique perspective you'd bring to our audience..."
          />
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="sf-url">Website, LinkedIn, or Social Profile</label>
          <input id="sf-url" name="website" type="url" placeholder="https://www.yourpractice.com" />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="sf-company-website">Company website</label>
          <input id="sf-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-teal mt-8 w-full">
        {status === "sending" ? "Submitting..." : "Submit Your Application"}{" "}
        <span className="arr">→</span>
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-[13px] text-red-500">
          We couldn&apos;t send your application. Please try again or email{" "}
          <a className="underline" href="mailto:ideas@businessofaesthetics.org">
            ideas@businessofaesthetics.org
          </a>
          .
        </p>
      )}
    </form>
  );
}
