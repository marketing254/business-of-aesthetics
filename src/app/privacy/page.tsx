import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Business of Aesthetics community and website.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you voluntarily provide when you fill out a form, subscribe to the podcast, register for an event, or contact us. This typically includes your name, email address, practice name, and any messages you share with us.",
  },
  {
    title: "How we use your information",
    body: "We use your information to deliver podcast content, event invitations, marketing insights, and respond to your inquiries. We never sell your personal data, and we only share it with trusted partners (like Ekwa Marketing) who help us operate the BOA community.",
  },
  {
    title: "Cookies & analytics",
    body: "This site uses cookies and analytics tools to understand how visitors use the site so we can improve it. You can disable cookies in your browser at any time without losing core functionality.",
  },
  {
    title: "GDPR & CCPA rights",
    body: (
      <>
        If you are located in the European Union or California, you have the
        right to access, correct, or delete the personal data we hold about
        you. To exercise these rights, email{" "}
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
  {
    title: "Data security",
    body: "We take reasonable technical and organizational measures to protect your data, including encrypted storage, restricted access, and regular security reviews.",
  },
  {
    title: "Children's privacy",
    body: "BOA is designed for professional aesthetic practitioners and is not directed at children under 16. We do not knowingly collect data from children.",
  },
  {
    title: "Contact",
    body: (
      <>
        For any privacy questions, write to us at{" "}
        <a
          href="mailto:ideas@businessofaesthetics.org"
          className="font-bold text-teal-deep underline"
        >
          ideas@businessofaesthetics.org
        </a>{" "}
        or call (855) 466-4580.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-[880px] px-5 pb-16 pt-16 lg:pt-20">
          <Reveal>
            <span className="kicker">Legal</span>
            <h1 className="display mt-6 text-[clamp(36px,5vw,60px)] text-navy">
              Privacy <em>Policy</em>
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              Last updated: March 26, 2026. We respect your privacy and are
              committed to protecting your personal data.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-[880px] px-5">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 40, 160)}>
              <div className="grid gap-4 border-b border-line py-9 last:border-b-0 sm:grid-cols-[56px_1fr] sm:gap-8">
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
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
