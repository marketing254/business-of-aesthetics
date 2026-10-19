"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";

const subjects = [
  "General inquiry",
  "Marketing services",
  "Joining the community",
  "Podcast guest pitch",
  "Event & speaking",
  "Partnership / sponsorship",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    const res = await submitLead("contact", {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      practice: String(fd.get("practice") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      company_website: String(fd.get("company_website") || ""), // honeypot
    });
    setStatus(res.ok ? "sent" : "error");
  };

  return (
    <form className="card-frame p-8 sm:p-10" onSubmit={onSubmit} noValidate={false}>
      <h3 className="display text-[26px] text-navy">Send us a message</h3>
      <p className="mt-2 text-[14px] text-muted">
        Fill out the form and we&apos;ll get back to you within one business day.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="cf-name">Your Name *</label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Dr. Jane Smith" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email Address *</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@yourpractice.com" />
        </div>
        <div className="field">
          <label htmlFor="cf-practice">Practice Name</label>
          <input id="cf-practice" name="practice" autoComplete="organization" placeholder="Smith Aesthetics (optional)" />
        </div>
        <div className="field">
          <label htmlFor="cf-subject">I&apos;m reaching out about</label>
          <select id="cf-subject" name="subject" defaultValue={subjects[0]}>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="cf-message">Message *</label>
          <textarea id="cf-message" name="message" required placeholder="How can we help?" />
        </div>
        {/* honeypot - hidden from humans, filled by bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-company-website">Company website</label>
          <input id="cf-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        className={`btn mt-7 w-full ${status === "sent" ? "btn-teal" : "btn-navy"}`}
        disabled={status === "sending" || status === "sent"}
      >
        {status === "sending"
          ? "Sending..."
          : status === "sent"
            ? "✓ Message Sent - We will be in touch!"
            : "Send Message"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-[13px] text-red-600">
          Something went wrong. Please email us directly at{" "}
          <a className="underline" href="mailto:ideas@businessofaesthetics.org">
            ideas@businessofaesthetics.org
          </a>
          .
        </p>
      )}
    </form>
  );
}
