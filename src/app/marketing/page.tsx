import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Marketing Services (MSM)",
  description:
    "Proven marketing for aesthetic practices — SEO, social media, websites and reputation, all tailored to dermatology, plastic surgery and aesthetics.",
};

const pillars = [
  {
    no: "01",
    title: "SEO",
    copy: "Rank higher and attract local patients who are actively searching for aesthetic services in your area.",
    points: [
      "Local SEO & Google Business Profile",
      "Content built for high-intent keywords",
      "Technical optimization & site speed",
    ],
  },
  {
    no: "02",
    title: "Social Media",
    copy: "Build a recognizable brand across Instagram, Facebook and YouTube — without burning out.",
    points: [
      "Content strategy & production",
      "Community engagement",
      "Paid social campaigns",
    ],
  },
  {
    no: "03",
    title: "Website",
    copy: "Modern, conversion-focused websites that reflect the quality of your work and make it easy to book.",
    points: [
      "Custom design & UX",
      "Mobile-first & lightning fast",
      "Built-in conversion tracking",
    ],
  },
  {
    no: "04",
    title: "Reputation",
    copy: "Earn and showcase the reviews that build patient trust — and turn happy patients into referrals.",
    points: [
      "Review generation systems",
      "Reputation monitoring",
      "Reply & recovery support",
    ],
  },
];

const process = [
  { no: "01", title: "Discover", copy: "We learn your goals, market and patients." },
  { no: "02", title: "Plan", copy: "You get a custom strategy built around what works." },
  { no: "03", title: "Execute", copy: "We do the work — you focus on patient care." },
  { no: "04", title: "Refine", copy: "Monthly reporting and continuous improvement." },
];

export default function MarketingPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          grow
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Marketing</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,64px)] text-navy">
              Grow your practice with{" "}
              <em>marketing that actually works.</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Four focus areas, no fluff. Built specifically for dermatology,
              plastic surgery and aesthetic practices that want to attract more
              of the right patients.
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
            <div className="offset-frame tone-img relative mx-auto aspect-[4/5] max-w-[460px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/hero-marketing.jpg"
                alt="Marketing for aesthetic practices"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* pillars */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">Four Focus Areas</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Everything you need, <em>nothing you don&apos;t.</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.no} delay={i * 80} className="h-full">
                <div className="group h-full bg-paper p-8 transition-colors hover:bg-cream">
                  <span className="display text-[42px] italic text-teal-deep/25 transition-colors group-hover:text-teal-deep/60">
                    {p.no}
                  </span>
                  <h3 className="display mt-3 text-[24px] text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[13px] font-semibold text-ink/85">
                        <span className="mt-[8px] h-1 w-3 shrink-0 bg-teal" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">How It Works</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                A simple, <em>proven process</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.no} delay={i * 80} className="h-full">
                <div className="relative h-full border-l border-line pl-7">
                  <span
                    className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-teal"
                    aria-hidden
                  />
                  <span className="index-no text-[14px]">{s.no}</span>
                  <h3 className="display mt-2 text-[22px] text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* results */}
      <section className="dark-canvas on-dark relative overflow-hidden py-24">
        <div className="ghost-word bottom-[-6%] left-[-2%] text-[clamp(100px,14vw,220px)]">
          proof
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">Real Results</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-white">
                What growth <em>looks like</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-white/70">
                Numbers from real practices in our community.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              {
                v: "3.2×",
                title: "Patient Inquiries",
                copy: "Average increase within 12 months.",
              },
              {
                v: "200+",
                title: "Practices Supported",
                copy: "From start-ups to multi-location clinics.",
              },
              {
                v: "#1",
                title: "Local Rankings",
                copy: "Across hundreds of high-intent search terms.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="stat-rule">
                  <div className="display text-[clamp(44px,5vw,64px)] leading-none text-white">
                    {s.v}
                  </div>
                  <div className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[13.5px] text-white/65">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta box */}
      <section className="border-b border-line bg-sand py-20 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <Reveal>
            <h2 className="display text-[clamp(28px,3.6vw,42px)] text-navy">
              Ready to <em>grow?</em>
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              Get a free 60-minute Marketing Strategy Meeting with a senior
              advisor. No pressure, no pitch — just a clear, custom plan for
              your practice.
            </p>
            <Link href="/msm" className="btn btn-navy mt-8">
              Book Your Strategy Meeting <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
