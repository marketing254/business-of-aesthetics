import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import { caseStudies } from "@/lib/data";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import TiltCard from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real success stories from aesthetic practices using BOA, MSM, and CSM coaching.",
};

const numbers = [
  { v: "3,700+", label: "Practices supported" },
  { v: "$240M+", label: "Revenue generated" },
  { v: "200+", label: "Coaching clients" },
  { v: "4.9★", label: "Average rating" },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          proof
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <FadeUp>
            <span className="kicker">Case Studies · Success Stories</span>
            <WordReveal
              text="Real practices. *Real results.*"
              className="display mt-6 text-[clamp(32px,4.1vw,50px)] text-navy"
            />
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
              A look at how aesthetic practitioners across North America have
              used the BOA community, MSM, and CSM coaching to grow with clarity
              and confidence.
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
            <div className="offset-frame card-frame relative mx-auto max-w-[460px] bg-sand p-9">
              <span className="kicker">By The Numbers</span>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9">
                {numbers.map((n) => (
                  <div key={n.label} className="stat-rule">
                    <div className="display text-[clamp(26px,3vw,36px)] leading-none text-navy">
                      {n.v}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                      {n.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Marquee />

      {/* cards */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <StaggerItem key={c.title} className="grid h-full">
                <TiltCard maxTilt={4} className="card-frame group relative flex h-full flex-col overflow-hidden">
                  <article className="flex h-full flex-col p-8">
                    <span className="chip solid self-start">{c.badge}</span>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {c.metrics.map((m) => (
                        <span key={m} className="chip teal !py-2.5 !px-4 !text-[12.5px]">
                          {m}
                        </span>
                      ))}
                    </div>
                    <h3 className="display mt-6 text-[21px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                      {c.title}
                    </h3>
                    <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted">
                      {c.body}
                    </p>
                    <Link href="/msm" className="linkline mt-5">
                      Read full story <span className="arr">→</span>
                    </Link>
                  </article>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* by the numbers */}
      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[640px]">
              <span className="kicker">By The Numbers</span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy">
                Aggregate impact across the <em>BOA community</em>
              </h2>
            </div>
          </FadeUp>
          <Stagger className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {numbers.map((n) => (
              <StaggerItem key={n.label}>
                <div className="stat-rule">
                  <div className="display text-[clamp(31px,3.6vw,43px)] leading-none text-navy">
                    {n.v}
                  </div>
                  <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                    {n.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* cta */}
      <section className="bg-paper py-20 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <FadeUp>
            <h2 className="display text-[clamp(24px,3.0vw,32px)] text-navy">
              Want to be the next <em>success story?</em>
            </h2>
            <p className="mt-4 text-[15.5px] text-muted">
              It starts with a free 60-minute Marketing Strategy Meeting. No
              pressure, no pitch.
            </p>
            <Link href="/msm" className="btn btn-navy mt-8">
              Book Your Strategy Meeting <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
