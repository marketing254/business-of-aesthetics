import Link from "next/link";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import TestimonialSlider from "@/components/TestimonialSlider";
import {
  FadeUp,
  Stagger,
  StaggerItem,
  DrawLine,
} from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import TiltCard from "@/components/motion/TiltCard";
import Parallax from "@/components/motion/Parallax";
import Magnetic from "@/components/motion/Magnetic";
import Aurora from "@/components/motion/Aurora";
import PillarRail from "@/components/motion/PillarRail";
import {
  fetchEventPanels,
  fetchPanelReplays,
  fetchPodcasts,
} from "@/lib/sheet";

export const dynamic = "force-dynamic";

const authority = [
  {
    no: "01",
    title: "19+ Years Leadership",
    copy: "Built by Ekwa Marketing, trusted since 2007 by aesthetic specialists.",
  },
  {
    no: "02",
    title: "HIPAA-Aware",
    copy: "Privacy-first practices baked into every recommendation we make.",
  },
  {
    no: "03",
    title: "4.9 / 5 Member Rating",
    copy: "From the practitioners we have supported across North America.",
  },
  {
    no: "04",
    title: "200+ Practices Served",
    copy: "Real clinics, real results, from solo to multi-location groups.",
  },
];

const pillars = [
  {
    no: "01",
    title: "The BOA Podcast",
    copy: "Weekly conversations with the most useful voices in aesthetic medicine. Real lessons, real numbers, no fluff.",
    href: "/podcast",
    cta: "Open the Archive",
  },
  {
    no: "02",
    title: "Live Events",
    copy: "Workshops and webinars for the decisions practice owners are making this quarter.",
    href: "/events",
    cta: "View Calendar",
  },
  {
    no: "03",
    title: "Expert Panels",
    copy: "Moderated roundtables with operators, clinicians, and advisors who can disagree usefully.",
    href: "/panels",
    cta: "Watch Replays",
  },
  {
    no: "04",
    title: "Marketing Services",
    copy: "SEO, Social, Web, and Reputation, built specifically for aesthetic specialists by Ekwa Marketing.",
    href: "/marketing",
    cta: "Explore MSM",
  },
];

const orgs = ["ASLMS", "AAD", "ASPS", "AmSpa", "IAPAM", "ASDS"];

export default async function Home() {
  const [podcasts, upcomingPanels, panelReplays] = await Promise.all([
    fetchPodcasts(),
    fetchEventPanels(),
    fetchPanelReplays(),
  ]);

  const latestEpisode = podcasts[0];
  const latestReplays = panelReplays.slice(0, 3);
  const nextPanel = upcomingPanels[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <Aurora intensity={0.55} />
        <Parallax
          speed={0.1}
          className="ghost-word left-[-2%] top-[58%] text-[clamp(120px,16vw,260px)]"
        >
          aesthetics
        </Parallax>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-24">
          <div>
            <FadeUp>
              <span className="kicker">Your Success Matters - Since 2007</span>
            </FadeUp>
            <WordReveal
              as="h1"
              className="display mt-6 max-w-[680px] text-[clamp(36px,4.6vw,58px)] text-navy"
              text="The operating system for *aesthetic practice growth*."
            />
            <FadeUp delay={0.3}>
              <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted">
                BOA is where dermatology, plastic surgery, and aesthetic leaders
                turn conversations into decisions: podcasts, live panels,
                replays, and strategy sessions that connect directly to growth.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <Link href="/msm" className="btn btn-navy">
                    Book Strategy Meeting <span className="arr">-&gt;</span>
                  </Link>
                </Magnetic>
                <Link href="/podcast" className="linkline !text-[13px]">
                  Explore the Archive <span className="arr">-&gt;</span>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-9 gap-y-3 border-t border-line pt-6 text-[13px] font-bold text-navy">
                <span>
                  <b className="text-teal-deep">60-min</b> 1-on-1 audit
                </span>
                <span>
                  <b className="text-teal-deep">100% free</b>, no obligation
                </span>
                <span>
                  <b className="text-teal-deep">4.9/5</b> from 200+ practices
                </span>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.14}>
            <div className="relative mx-auto w-full max-w-[480px]">
              {latestEpisode ? (
                <TiltCard
                  maxTilt={4}
                  className="signal-panel border border-line bg-sand p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                      <span className="live-dot" /> Latest Episode
                    </span>
                    <span className="chip teal">{latestEpisode.category}</span>
                  </div>
                  <div className="display mt-6 text-[clamp(30px,3vw,38px)] leading-none text-navy/80">
                    {String(latestEpisode.episode).padStart(2, "0")}
                  </div>
                  <Link
                    href={`/podcast/${latestEpisode.slug}`}
                    className="group mt-4 block"
                  >
                    <h2 className="line-clamp-2 text-[16px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                      {latestEpisode.title}
                    </h2>
                    <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                      {latestEpisode.guestName}
                    </p>
                    <span className="linkline mt-5">
                      Listen now <span className="arr">-&gt;</span>
                    </span>
                  </Link>
                </TiltCard>
              ) : (
                <div className="signal-panel border border-line bg-sand p-8">
                  <span className="kicker">The BOA Podcast</span>
                  <h2 className="display mt-4 text-[26px] text-navy">
                    New episodes drop every week.
                  </h2>
                </div>
              )}

              <div className="mt-5 grid grid-cols-3 gap-6 rounded-2xl border border-line bg-paper p-6">
                <div className="stat-rule">
                  <div className="display text-[26px] leading-none text-navy">
                    <Counter target={podcasts.length || 294} suffix="+" />
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Episodes
                  </div>
                </div>
                <div className="stat-rule">
                  <div className="display text-[26px] leading-none text-navy">
                    <Counter target={panelReplays.length || 16} suffix="+" />
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Replays
                  </div>
                </div>
                <div className="stat-rule">
                  <div className="display text-[26px] leading-none text-navy">
                    <Counter target={19} suffix=" yrs" />
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Experience
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {nextPanel && (
          <div className="border-t border-line bg-paper">
            <div className="mx-auto max-w-[1280px] px-5">
              <Link
                href={`/panels/${nextPanel.slug}`}
                className="group flex flex-wrap items-center gap-x-5 gap-y-1 py-4 text-[13px]"
              >
                <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-teal-deep">
                  <span className="live-dot" /> Next Live Panel
                </span>
                <span className="font-bold text-navy transition-colors group-hover:text-teal-deep">
                  {nextPanel.title}
                </span>
                <span className="font-bold uppercase tracking-[0.14em] text-muted">
                  {nextPanel.dateLabel || nextPanel.monthYear}
                </span>
                <span className="arr ml-auto text-teal-deep transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
              </Link>
            </div>
          </div>
        )}
      </section>

      <Marquee />

      <section className="bg-paper">
        <Stagger className="mx-auto grid max-w-[1280px] gap-px overflow-hidden px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {authority.map((a) => (
            <StaggerItem key={a.no}>
              <div className="stat-rule h-full pr-6">
                <span className="index-no text-[14px]">{a.no}</span>
                <h3 className="mt-2 text-[15.5px] font-semibold text-navy">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {a.copy}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-8">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-muted">
              Trusted by leaders in aesthetic medicine
            </span>
            {orgs.map((o) => (
              <span
                key={o}
                className="display text-[17px] text-navy/40 transition-colors hover:text-navy"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PillarRail
        kicker="What We Do"
        heading="Four systems, one growth loop."
        items={pillars}
      />

      <section className="dark-canvas on-dark relative overflow-hidden py-24 lg:py-32">
        <Parallax speed={0.12} className="ghost-word right-[-4%] top-[8%] text-[clamp(120px,16vw,250px)]">
          results
        </Parallax>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp>
            <span className="kicker">By the Numbers</span>
            <WordReveal
              as="h2"
              className="display mt-5 text-[clamp(27px,3.4vw,41px)] text-white"
              text="Growth that is measured, not *imagined*."
            />
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-white/75">
              Aesthetic practices do not grow on theory. They grow on
              disciplined execution, peer insight, useful data, and consistent
              patient acquisition systems.
            </p>
            <Magnetic className="mt-9 inline-block">
              <Link href="/about" className="btn btn-teal">
                Read Our Story <span className="arr">-&gt;</span>
              </Link>
            </Magnetic>
          </FadeUp>
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {[
              { n: 3700, s: "+", label: "Practitioners" },
              { n: podcasts.length || 294, s: "+", label: "Podcast Episodes" },
              { n: panelReplays.length || 16, s: "+", label: "Panel Replays" },
              { n: 19, s: " yrs", label: "Industry Experience" },
            ].map((st) => (
              <StaggerItem key={st.label}>
                <div className="bg-navy-ink/70 p-7">
                  <div className="display text-[clamp(32px,3.7vw,44px)] leading-none text-white">
                    <Counter target={st.n} suffix={st.s} />
                  </div>
                  <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
                    {st.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="kicker">The BOA Podcast</span>
                <WordReveal
                  as="h2"
                  className="display mt-4 text-[clamp(26px,3.3vw,36px)] text-navy"
                  text="Latest *episodes*"
                />
              </div>
              <Link href="/podcast" className="linkline">
                All Episodes <span className="arr">-&gt;</span>
              </Link>
            </div>
          </FadeUp>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {podcasts.slice(0, 3).map((episode) => (
              <StaggerItem key={episode.slug}>
                <Link
                  href={`/podcast/${episode.slug}`}
                  className="group grid gap-5 bg-paper p-6 transition-colors hover:bg-cream md:grid-cols-[130px_1fr_auto] md:items-center"
                >
                  <div>
                    <span className="index-no text-[15px]">
                      EP {episode.episode}
                    </span>
                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {episode.datePublished}
                    </div>
                  </div>
                  <div>
                    <span className="chip">{episode.category}</span>
                    <h3 className="display mt-3 text-[24px] leading-snug text-navy group-hover:text-teal-deep">
                      {episode.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-bold text-muted">
                      {episode.guestName}
                    </p>
                  </div>
                  <span className="linkline">
                    Listen <span className="arr">-&gt;</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="kicker">Expert Panels</span>
                <WordReveal
                  as="h2"
                  className="display mt-4 text-[clamp(26px,3.3vw,36px)] text-navy"
                  text="Recent *replay rooms*"
                />
              </div>
              <Link href="/panels#series" className="linkline">
                Panel Archive <span className="arr">-&gt;</span>
              </Link>
            </div>
          </FadeUp>
          <Stagger className="mt-12 grid gap-7 md:grid-cols-3">
            {latestReplays.map((replay) => (
              <StaggerItem key={replay.slug} className="h-full">
                <TiltCard maxTilt={4} className="h-full">
                  <Link
                    href={`/panels/replays/${replay.slug}`}
                    className="card-frame group flex h-full flex-col p-7"
                  >
                    <span className="chip teal self-start">{replay.category}</span>
                    <h3 className="display mt-5 flex-1 text-[23px] leading-snug text-navy group-hover:text-teal-deep">
                      {replay.title}
                    </h3>
                    <div className="mt-6 border-t border-line pt-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {replay.date} - {replay.duration || "Replay"}
                    </div>
                    <span className="linkline mt-5">
                      Watch replay <span className="arr">-&gt;</span>
                    </span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="mx-auto max-w-[720px] text-center">
              <span className="kicker center justify-center">Real Results</span>
              <WordReveal
                as="h2"
                className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy"
                text="What happens when strategy meets *execution*."
              />
              <p className="mt-4 text-[16px] text-muted">
                An independent dermatology practice, 14 months into a full BOA
                and MSM engagement.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mx-auto mt-14 max-w-[900px] overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-line bg-cream text-[10.5px] font-semibold uppercase tracking-[0.2em]">
                <div className="p-5 text-muted">Metric</div>
                <div className="border-l border-line p-5 text-muted">
                  Before BOA
                </div>
                <div className="border-l border-line p-5 text-teal-deep">
                  After 14 Months
                </div>
              </div>
              {[
                {
                  label: "New patients / month",
                  before: "47/mo",
                  after: <Counter target={148} suffix="/mo" />,
                  change: "+215%",
                },
                {
                  label: "Google rating",
                  before: "2.3 stars",
                  after: <Counter target={4.8} decimals={1} suffix=" stars" />,
                  change: "+109%",
                },
                {
                  label: "Avg. monthly ad spend",
                  before: "$1,200",
                  after: <Counter target={3200} prefix="$" />,
                  change: "8.4x ROI",
                },
                {
                  label: "Google reviews total",
                  before: "12",
                  after: <Counter target={287} />,
                  change: "+2,292%",
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-line last:border-b-0"
                >
                  <div className="flex items-center p-5 text-[13px] font-semibold uppercase tracking-wide text-navy">
                    {r.label}
                  </div>
                  <div className="display flex items-center border-l border-line p-5 text-[22px] text-navy/40">
                    {r.before}
                  </div>
                  <div className="flex items-center gap-3 border-l border-line bg-teal-soft/40 p-5">
                    <span className="display text-[22px] text-teal-deep">
                      {r.after}
                    </span>
                    <span className="chip teal !text-[9.5px]">{r.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="kicker center justify-center">
                Why People Love Us
              </span>
              <WordReveal
                as="h2"
                className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy"
                text="From the *community*"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <TestimonialSlider />
          </FadeUp>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
