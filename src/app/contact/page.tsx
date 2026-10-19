import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { site } from "@/lib/data";
import { FadeUp, FadeIn, Stagger, StaggerItem } from "@/components/motion/Animate";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, graph, webPageJsonLd } from "@/lib/seo";


export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Business of Aesthetics team. Questions, partnerships, or speaking interest - we'd love to hear from you.",
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
    a: 'Yes - we partner with select manufacturers and vendors who genuinely serve our community. Use the contact form and select "Partnership" so we can route your message to the right person.',
  },
  {
    q: "How fast will I hear back?",
    a: "We respond to almost every message within one business day. If your question is about a specific upcoming event, we'll get back to you the same day.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/contact", name: "Contact Business of Aesthetics", description: metadata.description as string, type: "ContactPage" }),
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])
        )}
      />
      <PageHero
        kicker="Contact Us"
        title={
          <>
            Let&apos;s start a <em>conversation.</em>
          </>
        }
        lede="Questions, partnership ideas, podcast guest pitches or speaking interest - we'd love to hear from you. We typically respond within one business day."
        compact
      >
        <a href={`mailto:${site.email}`} className="btn btn-navy">
          {site.email}
        </a>
        <a href={site.phoneHref} className="btn btn-outline">
          {site.phone}
        </a>
      </PageHero>

      {/* info + form */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp>
            <div className="card-frame">
              <div className="border-b border-line p-7 pb-5">
                <h3 className="display text-[24px] text-navy">
                  Reach us directly
                </h3>
              </div>
              <Stagger className="divide-y divide-line">
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
                    value:
                      "1810 E Sahara Ave Suite #1471, Las Vegas, NV 89104, USA",
                    sub: "",
                  },
                  {
                    label: "Business Hours",
                    value: site.hours,
                    sub: "Closed weekends & US holidays",
                  },
                ].map((row) => (
                  <StaggerItem key={row.label} className="flex gap-5 p-6">
                    <div className="w-[110px] shrink-0 pt-0.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                      {row.label}
                    </div>
                    <div className="min-w-0">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={
                            row.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            row.href.startsWith("http") ? "noopener" : undefined
                          }
                          className="inline-block py-1 text-[14.5px] font-bold text-navy transition-colors hover:text-teal-deep"
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
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="flex items-center gap-5 border-t border-line p-6">
                <div className="w-[110px] shrink-0 text-[12px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                  Follow Us
                </div>
                <div className="flex flex-wrap gap-2.5">
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
          </FadeUp>

          <FadeUp delay={0.1}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>

      {/* map */}
      <section className="border-y border-line bg-sand py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Find Us"
            title={
              <>
                Visit our <em>office</em>
              </>
            }
            lede="1810 E Sahara Ave Suite #1471, Las Vegas, NV 89104"
          />
          <FadeIn delay={0.1}>
            <div className="card-frame mt-10 h-[380px] overflow-hidden">
              <MapEmbed />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* faq */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[780px] px-5">
          <SectionHead
            kicker="Quick Questions"
            title={
              <>
                Before you <em>write</em>
              </>
            }
          />
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
