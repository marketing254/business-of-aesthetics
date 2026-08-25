import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { FadeUp, DrawLine } from "@/components/motion/Animate";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the Business of Aesthetics website and community.",
};

const sections = [
  {
    title: "Use of the site",
    body: "You agree to use this website for lawful purposes only. You may not use the site to distribute harmful content, infringe on others' intellectual property, or misrepresent your identity.",
  },
  {
    title: "Content ownership",
    body: "All podcast episodes, articles, videos, and graphics on this site are the property of Business of Aesthetics or its content partners and are protected by copyright. You may share links freely, but please do not republish full content without permission.",
  },
  {
    title: "Coaching & marketing services",
    body: "BOA offers coaching (CSM) and marketing services (MSM) through partnerships with Ekwa Marketing. The terms of any specific coaching or marketing engagement will be governed by a separate written agreement.",
  },
  {
    title: "Disclaimer",
    body: "The content on this website is for educational purposes and does not constitute medical, legal, or financial advice. Always consult qualified professionals before making decisions about your practice.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent allowed by law, Business of Aesthetics is not liable for any indirect, incidental, or consequential damages arising from your use of the site or its content.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact",
    body: (
      <>
        Questions about these terms? Email{" "}
        <a
          href="mailto:ideas@businessofaesthetics.org"
          className="font-bold text-teal-deep underline"
        >
          ideas@businessofaesthetics.org
        </a>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-[880px] px-5 pb-16 pt-16 lg:pt-20">
          <FadeUp>
            <span className="kicker">Legal</span>
            <h1 className="display mt-6 text-[clamp(31px,4.1vw,46px)] text-navy">
              Terms of <em>Service</em>
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Last updated: March 26, 2026. By using this website, you agree to
              the terms outlined below.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-[880px] px-5">
          {sections.map((s, i) => (
            <FadeUp key={s.title} delay={Math.min(i * 0.05, 0.2)}>
              <div className="relative grid gap-4 py-9 sm:grid-cols-[56px_1fr] sm:gap-8">
                {i < sections.length - 1 && (
                  <DrawLine className="absolute bottom-0 left-0 h-px w-full bg-line" />
                )}
                <span className="index-no text-[16px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="display text-[23px] text-navy">{s.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
