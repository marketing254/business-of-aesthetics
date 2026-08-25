import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import { FadeUp, Stagger, StaggerItem, DrawLine } from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import TiltCard from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "Coaching Services (CSM)",
  description:
    "1:1 aesthetic practice coaching with Gary Bird. Build a practice you love without sacrificing clinical excellence.",
};

const pillarCards = [
  {
    badge: "Pillar 1",
    title: "Leadership & Mindset",
    copy: "Become the calm, confident owner your team needs. From burnout recovery to bold decision-making.",
  },
  {
    badge: "Pillar 2",
    title: "Team & Culture",
    copy: "Hire better, retain longer. Build a team that protects and elevates your brand.",
  },
  {
    badge: "Pillar 3",
    title: "Pricing & Profit",
    copy: "Set prices that respect your craft. Build margins that fund growth instead of stress.",
  },
  {
    badge: "Pillar 4",
    title: "Growth & Systems",
    copy: "From your first associate to a multi-location group — the systems that make scaling sustainable.",
  },
  {
    badge: "Pillar 5",
    title: "Patient Experience",
    copy: "Turn every consult into a long-term patient relationship — and a stream of word-of-mouth referrals.",
  },
  {
    badge: "Pillar 6",
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
          <FadeUp>
            <span className="kicker">Coaching Services · CSM</span>
            <WordReveal
              text="1:1 coaching with *Gary Bird* for aesthetic practice owners."
              className="display mt-6 text-[clamp(32px,4.1vw,49px)] text-navy"
            />
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
          </FadeUp>
          <FadeUp delay={0.12}>
            <TiltCard maxTilt={5} className="offset-frame card-frame relative mx-auto max-w-[460px] bg-sand p-9">
              <span className="kicker">Coaching Pillars</span>
              <ul className="mt-8 space-y-5">
                {pillarCards.map((p, i) => (
                  <li
                    key={p.title}
                    className="flex items-baseline gap-5 border-b border-line pb-5 last:border-0 last:pb-0"
                  >
                    <span className="display text-[14px] text-teal-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[19px] text-navy">
                      {p.title}
                    </span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </FadeUp>
        </div>
      </section>

      <Marquee />

      {/* pillars */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[680px]">
              <span className="kicker">Coaching Pillars</span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy">
                What we work on <em>together</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                Every coaching engagement is custom — but most owners need help
                in these areas.
              </p>
            </div>
          </FadeUp>
          <Stagger className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {pillarCards.map((p, i) => (
              <StaggerItem key={p.title} className="h-full">
                <div className="card-frame group flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="chip">{p.badge}</span>
                    <span className="display text-[34px] text-teal-deep/25 transition-all duration-300 group-hover:scale-110 group-hover:text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-6 text-[21px] text-navy transition-colors group-hover:text-teal-deep">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* steps */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[680px]">
              <span className="kicker">How It Works</span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy">
                A coaching program that <em>fits your life</em>
              </h2>
            </div>
          </FadeUp>
          <div className="relative mt-14">
            <DrawLine className="absolute left-0 right-0 top-0 hidden h-px bg-line sm:block" />
            <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <StaggerItem key={s.no} className="h-full">
                  <div className="h-full bg-paper p-8">
                    <span className="display text-[30px] text-teal-deep/30">
                      {s.no}
                    </span>
                    <h3 className="display mt-3 text-[20px] text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                      {s.copy}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* trust badges */}
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <StaggerItem key={t.title}>
                <div className="flex items-center gap-4 border border-line bg-paper p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-teal-soft text-teal-deep">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <div>
                    <div className="text-[13.5px] font-semibold text-navy">
                      {t.title}
                    </div>
                    <div className="text-[11.5px] text-muted">{t.copy}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-canvas on-dark py-24 text-center">
        <div className="mx-auto max-w-[680px] px-5">
          <FadeUp>
            <span className="kicker center justify-center">Ready to Start?</span>
            <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-white">
              Your first coaching call is <em>on us.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-relaxed text-white/75">
              A no-pressure, no-pitch 60-minute conversation with Gary to see if
              coaching is the right fit for your practice.
            </p>
            <Link href="/msm" className="btn btn-teal mt-9">
              Book Your Free Call <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
