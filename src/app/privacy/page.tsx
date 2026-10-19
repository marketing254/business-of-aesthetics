import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { FadeUp, DrawLine } from "@/components/motion/Animate";

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
          className="inline-block py-1 font-bold text-teal-deep underline"
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
          className="inline-block py-1 font-bold text-teal-deep underline"
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
        <div className="mx-auto max-w-[880px] px-5 pb-14 pt-16 text-center lg:pt-20">
          <FadeUp>
            <span className="kicker center justify-center">Legal</span>
            <h1 className="display mt-5 text-[clamp(30px,4vw,44px)] text-navy">
              Privacy <em>Policy</em>
            </h1>
            <p className="lede mx-auto mt-5 max-w-[560px] text-[15.5px]">
              Last updated: March 26, 2026. We respect your privacy and are
              committed to protecting your personal data.
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
