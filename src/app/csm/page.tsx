import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Coaching Services (CSM)",
  description:
    "1:1 aesthetic practice coaching with Gary Bird. Build a practice you love without sacrificing clinical excellence.",
};

const pillarCards = [
  {
    badge: "Pillar 1",
    image: "/assets/stock-leadership.jpg",
    title: "Leadership & Mindset",
    copy: "Become the calm, confident owner your team needs. From burnout recovery to bold decision-making.",
  },
  {
    badge: "Pillar 2",
    image: "/assets/stock-team.jpg",
    title: "Team & Culture",
    copy: "Hire better, retain longer. Build a team that protects and elevates your brand.",
  },
  {
    badge: "Pillar 3",
    image: "/assets/stock-pricing.jpg",
    title: "Pricing & Profit",
    copy: "Set prices that respect your craft. Build margins that fund growth instead of stress.",
  },
  {
    badge: "Pillar 4",
    image: "/assets/stock-scaling.jpg",
    title: "Growth & Systems",
    copy: "From your first associate to a multi-location group — the systems that make scaling sustainable.",
  },
  {
    badge: "Pillar 5",
    image: "/assets/stock-patient.jpg",
    title: "Patient Experience",
    copy: "Turn every consult into a long-term patient relationship — and a stream of word-of-mouth referrals.",
  },
  {
    badge: "Pillar 6",
    image: "/assets/stock-mindset.jpg",
    title: "Owner Wellbeing",
    copy: "Build a practice that gives you energy instead of taking it. The business side of feeling great about your work.",
  },
];

const steps = [
  {
    no: "01",
    title: "Discovery Call",
    copy: "A free 60-minute conversation to understand where you are and where you want to be.",
  },
  {
    no: "02",
    title: "Custom Roadmap",
    copy: "Gary builds a 90-day plan around your top priorities — clinical, business, or personal.",
  },
  {
    no: "03",
    title: "Bi-Weekly Sessions",
    copy: "Live 1:1 coaching every two weeks, plus async support between sessions.",
  },
  {
    no: "04",
    title: "Measure & Iterate",
    copy: "Real metrics. Real check-ins. Real progress you can see in your bank account and your calendar.",
  },
];

const trust = [
  { title: "ICF Aligned", copy: "Coaching framework" },
  { title: "NDA Protected", copy: "Total confidentiality" },
  { title: "Outcome-Based", copy: "You measure success" },
  { title: "Industry Native", copy: "Aesthetics-only focus" },
];

export default function CsmPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word left-[-2%] top-[58%] text-[clamp(110px,15vw,230px)]">
          coach
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Coaching Services · CSM</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,64px)] text-navy">
              1:1 coaching with <em>Gary Bird</em> for aesthetic practice
              owners.
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Personalized coaching that helps you scale your practice without
              sacrificing your sanity. 19+ years of industry experience,
              distilled into a program built around your goals.
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
                src="/assets/csm-hero.jpg"
                alt="1:1 coaching for aesthetic practice owners"
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
            <div className="max-w-[680px]">
              <span className="kicker">Coaching Pillars</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                What we work on <em>together</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                Every coaching engagement is custom — but most owners need help
                in these areas.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {pillarCards.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80} className="h-full">
                <div className="card-frame group flex h-full flex-col overflow-hidden">
                  <div className="tone-img relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="chip solid absolute left-4 top-4">
                      {p.badge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="display text-[21px] text-navy transition-colors group-hover:text-teal-deep">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                      {p.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">How It Works</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                A coaching program that <em>fits your life</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={i * 80} className="h-full">
                <div className="h-full bg-paper p-8">
                  <span className="display text-[40px] italic text-teal-deep/30">
                    {s.no}
                  </span>
                  <h3 className="display mt-3 text-[20px] text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* trust badges */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <Reveal key={t.title} delay={i * 60}>
                <div className="flex items-center gap-4 border border-line bg-paper p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-teal-soft text-teal-deep">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <div>
                    <div className="text-[13.5px] font-extrabold text-navy">
                      {t.title}
                    </div>
                    <div className="text-[11.5px] text-muted">{t.copy}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-canvas on-dark py-24 text-center">
        <div className="mx-auto max-w-[680px] px-5">
          <Reveal>
            <span className="kicker center justify-center">Ready to Start?</span>
            <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-white">
              Your first coaching call is <em>on us.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-relaxed text-white/75">
              A no-pressure, no-pitch 60-minute conversation with Gary to see if
              coaching is the right fit for your practice.
            </p>
            <Link href="/msm" className="btn btn-teal mt-9">
              Book Your Free Call <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
