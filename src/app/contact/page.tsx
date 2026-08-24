import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Business of Aesthetics team. Questions, partnerships, or speaking interest — we'd love to hear from you.",
};

const faqs = [
  {
    q: "How do I join the BOA community?",
    a: "Membership is free for verified aesthetic practitioners. Send us a quick message through the form above and we'll get you set up in our private community.",
  },
  {
    q: "I'd like to be a podcast guest. How do I pitch?",
    a: "We love guest pitches. Email ideas@businessofaesthetics.org with a short bio, the topic you'd like to discuss, and what makes your perspective unique.",
  },
  {
    q: "Do you work with manufacturers and vendors?",
    a: 'Yes — we partner with select manufacturers and vendors who genuinely serve our community. Use the contact form and select "Partnership" so we can route your message to the right person.',
  },
  {
    q: "How fast will I hear back?",
    a: "We respond to almost every message within one business day. If your question is about a specific upcoming event, we'll get back to you the same day.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          hello
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Contact Us</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,66px)] text-navy">
              Let&apos;s start a <em>conversation.</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Questions, partnership ideas, podcast guest pitches or speaking
              interest — we&apos;d love to hear from you. We typically respond
              within one business day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/msm" className="btn btn-navy">
                Book Strategy Meeting <span className="arr">→</span>
              </Link>
              <Link href="/podcast" className="linkline !text-[13px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Listen to the Podcast
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="offset-frame tone-img relative mx-auto aspect-[4/3] max-w-[500px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/contact-hero.jpg"
                alt="Get in touch with the BOA team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* info + form */}
      <section className="bg-paper py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card-frame divide-y divide-line">
              <div className="p-7 pb-5">
                <h3 className="display text-[26px] text-navy">
                  Reach us directly
                </h3>
              </div>
              {[
                {
                  label: "Email",
                  value: site.email,
                  href: `mailto:${site.email}`,
                  sub: "We reply within 1 business day",
                },
                {
                  label: "Toll-Free",
                  value: site.phone,
                  href: site.phoneHref,
                  sub: "Leave us a message any time",
                },
                {
                  label: "Community",
                  value: "Join the BOA Facebook Group",
                  href: site.socials.facebook,
                  sub: "3,700+ aesthetic practitioners",
                },
                {
                  label: "Podcast Guest",
                  value: "Apply to be a guest",
                  href: "/speakers",
                  sub: "We're always looking for great voices",
                },
                {
                  label: "WhatsApp",
                  value: "Chat on WhatsApp",
                  href: site.whatsapp,
                  sub: "Fastest way to reach us",
                },
                {
                  label: "Office",
                  value: "1810 E Sahara Ave Suite #1471, Las Vegas, NV 89104, USA",
                  sub: "",
                },
                {
                  label: "Business Hours",
                  value: site.hours,
                  sub: "Closed weekends & US holidays",
                },
              ].map((row) => (
                <div key={row.label} className="flex gap-5 p-6">
                  <div className="w-[110px] shrink-0 pt-0.5 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-teal-deep">
                    {row.label}
                  </div>
                  <div className="min-w-0">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel={row.href.startsWith("http") ? "noopener" : undefined}
                        className="text-[14.5px] font-bold text-navy transition-colors hover:text-teal-deep"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <div className="text-[14.5px] font-bold text-navy">
                        {row.value}
                      </div>
                    )}
                    {row.sub && (
                      <div className="mt-0.5 text-[12.5px] text-muted">
                        {row.sub}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-5 p-6">
                <div className="w-[110px] shrink-0 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-teal-deep">
                  Follow Us
                </div>
                <div className="flex gap-2.5">
                  {[
                    { label: "Instagram", href: site.socials.instagram },
                    { label: "Facebook", href: site.socials.facebook },
                    { label: "LinkedIn", href: site.socials.linkedin },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener"
                      className="chip transition-all hover:border-teal hover:text-teal-deep"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* map */}
      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">Find Us</span>
              <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
                Visit our <em>office</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                1810 E Sahara Ave Suite #1471, Las Vegas, NV 89104
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-frame mt-10 h-[380px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=1810+E+Sahara+Ave,+Las+Vegas,+NV+89104&output=embed"
                title="BOA office map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="py-24">
        <div className="mx-auto max-w-[820px] px-5">
          <Reveal>
            <span className="kicker">Quick Questions</span>
            <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
              Before you <em>write</em>
            </h2>
          </Reveal>
          <div className="mt-10">
            {faqs.map((f, i) => (
              <details key={f.q} className="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
