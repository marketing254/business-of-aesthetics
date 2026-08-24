import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import { caseStudies } from "@/lib/data";

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
          <Reveal>
            <span className="kicker">Case Studies · Success Stories</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,66px)] text-navy">
              Real practices. <em>Real results.</em>
            </h1>
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
          </Reveal>
          <Reveal delay={120}>
            <div className="offset-frame tone-img relative mx-auto aspect-[4/5] max-w-[460px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/casestudies-hero.jpg"
                alt="Success stories from aesthetic practices"
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

      {/* cards */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80} className="h-full">
                <article className="card-frame group flex h-full flex-col overflow-hidden">
                  <div className="tone-img relative aspect-[16/10]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="chip solid absolute left-4 top-4">
                      {c.badge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="display text-[21px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                      {c.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.metrics.map((m) => (
                        <span key={m} className="chip teal">
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted">
                      {c.body}
                    </p>
                    <Link href="/msm" className="linkline mt-5">
                      Read full story <span className="arr">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* by the numbers */}
      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">By The Numbers</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Aggregate impact across the <em>BOA community</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 80}>
                <div className="stat-rule">
                  <div className="display text-[clamp(36px,4.4vw,56px)] leading-none text-navy">
                    {n.v}
                  </div>
                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal-deep">
                    {n.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-paper py-20 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <Reveal>
            <h2 className="display text-[clamp(28px,3.6vw,42px)] text-navy">
              Want to be the next <em>success story?</em>
            </h2>
            <p className="mt-4 text-[15.5px] text-muted">
              It starts with a free 60-minute Marketing Strategy Meeting. No
              pressure, no pitch.
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
