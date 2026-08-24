import Link from "next/link";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSignalScene from "@/components/HeroSignalScene";
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
  const featuredPanels = upcomingPanels.slice(0, 2);

  return (
    <>
      <section className="hero-signal dark-canvas on-dark hero-microgrid relative overflow-hidden">
        <HeroSignalScene />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,41,0.96)_0%,rgba(12,18,41,0.78)_44%,rgba(12,18,41,0.22)_100%)]" />
        <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 xl:block">
          <div className="flex items-center gap-5 [writing-mode:vertical-rl]">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/35">
              Business of Aesthetics
            </span>
            <span className="h-20 w-px bg-teal/60" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-teal">
              Live Signal Map
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-16 lg:min-h-[780px] lg:grid-cols-[0.9fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
          <Reveal>
            <span className="kicker">Your Success Matters - Since 2007</span>
            <h1 className="display mt-6 max-w-[760px] text-[clamp(44px,7vw,92px)] text-white">
              The operating system for <em>aesthetic practice growth</em>.
            </h1>
            <p className="mt-6 max-w-[580px] text-[17px] leading-relaxed text-white/75">
              BOA is where dermatology, plastic surgery, and aesthetic leaders
              turn conversations into decisions: podcasts, live panels,
              replays, and strategy sessions that connect directly to growth.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/msm" className="btn btn-teal">
                Book Strategy Meeting <span className="arr">-&gt;</span>
              </Link>
              <Link href="/podcast" className="btn btn-ghost-light">
                Explore the Archive
              </Link>
            </div>

            <div className="mt-10 grid max-w-[620px] gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-3">
              {[
                { value: "60 min", label: "1-on-1 audit" },
                { value: "294", label: "podcast episodes" },
                { value: "Live", label: "sheet database" },
              ].map((stat) => (
                <div key={stat.label} className="bg-navy-ink/65 p-5">
                  <div className="display text-[28px] text-white">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-teal">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="ml-auto w-full max-w-[520px] lg:pt-32">
              <div className="signal-panel border border-white/12 bg-white/[0.045] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <span className="chip teal">Latest Signal</span>
                  <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                    <span className="live-dot" /> Live
                  </span>
                </div>

                {latestEpisode ? (
                  <Link
                    href={`/podcast/${latestEpisode.slug}`}
                    className="group mt-6 block border-t border-white/10 pt-6"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal">
                      Episode {latestEpisode.episode}
                    </div>
                    <h2 className="display mt-3 text-[clamp(24px,2.9vw,34px)] leading-tight text-white group-hover:text-teal">
                      {latestEpisode.title}
                    </h2>
                    <div className="mt-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/55">
                      {latestEpisode.guestName} - {latestEpisode.category}
                    </div>
                  </Link>
                ) : (
                  <p className="mt-6 border-t border-white/10 pt-6 text-[14px] text-white/65">
                    Podcast data is syncing from the BOA Sheet.
                  </p>
                )}

                <div className="mt-7 grid gap-px overflow-hidden border border-white/10 bg-white/10">
                  {featuredPanels.map((panel) => (
                    <Link
                      key={panel.slug}
                      href={`/panels/${panel.slug}`}
                      className="group bg-navy-ink/60 p-4 transition-colors hover:bg-navy-ink"
                    >
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                        Upcoming panel - {panel.monthYear || panel.dateLabel}
                      </div>
                      <div className="mt-2 text-[14px] font-extrabold leading-snug text-white group-hover:text-teal">
                        {panel.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1280px] gap-px overflow-hidden px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {authority.map((a, i) => (
            <Reveal key={a.no} delay={i * 80}>
              <div className="stat-rule h-full pr-6">
                <span className="index-no text-[14px]">{a.no}</span>
                <h3 className="mt-2 text-[15.5px] font-extrabold text-navy">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {a.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-8">
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.24em] text-muted">
              Trusted by leaders in aesthetic medicine
            </span>
            {orgs.map((o) => (
              <span
                key={o}
                className="display text-[17px] italic text-navy/40 transition-colors hover:text-navy"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <span className="kicker">What We Do</span>
                <h2 className="display mt-5 text-[clamp(30px,4vw,54px)] text-navy">
                  Four systems, <em>one growth loop</em>.
                </h2>
              </div>
              <p className="max-w-[720px] text-[16px] leading-relaxed text-muted lg:pt-10">
                The podcast creates insight, events create live momentum, panels
                create sharper decisions, and MSM turns the best ideas into a
                practical plan for your market.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.no} delay={i * 80} className="h-full">
                <Link
                  href={p.href}
                  className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-cream"
                >
                  <span className="index-no text-[16px]">{p.no}</span>
                  <h3 className="display mt-8 text-[24px] text-navy transition-colors group-hover:text-teal-deep">
                    {p.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                  <span className="linkline mt-8">
                    {p.cta} <span className="arr">-&gt;</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-canvas on-dark relative overflow-hidden py-24 lg:py-32">
        <div className="ghost-word right-[-4%] top-[8%] text-[clamp(120px,16vw,250px)]">
          results
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="kicker">By the Numbers</span>
            <h2 className="display mt-5 text-[clamp(32px,4.2vw,54px)] text-white">
              Growth that is measured, not <em>imagined</em>.
            </h2>
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-white/75">
              Aesthetic practices do not grow on theory. They grow on
              disciplined execution, peer insight, useful data, and consistent
              patient acquisition systems.
            </p>
            <Link href="/about" className="btn btn-teal mt-9">
              Read Our Story <span className="arr">-&gt;</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
              {[
                { n: 3700, s: "+", label: "Practitioners" },
                { n: podcasts.length || 294, s: "+", label: "Podcast Episodes" },
                { n: panelReplays.length || 16, s: "+", label: "Panel Replays" },
                { n: 19, s: " yrs", label: "Industry Experience" },
              ].map((st) => (
                <div key={st.label} className="bg-navy-ink/70 p-7">
                  <div className="display text-[clamp(38px,4.5vw,58px)] leading-none text-white">
                    <Counter target={st.n} suffix={st.s} />
                  </div>
                  <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-teal">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="kicker">The BOA Podcast</span>
                <h2 className="display mt-4 text-[clamp(30px,4vw,48px)] text-navy">
                  Latest <em>database episodes</em>
                </h2>
              </div>
              <Link href="/podcast" className="linkline">
                All Episodes <span className="arr">-&gt;</span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line">
            {podcasts.slice(0, 3).map((episode) => (
              <Reveal key={episode.slug}>
                <Link
                  href={`/podcast/${episode.slug}`}
                  className="group grid gap-5 bg-paper p-6 transition-colors hover:bg-cream md:grid-cols-[130px_1fr_auto] md:items-center"
                >
                  <div>
                    <span className="index-no text-[15px]">
                      EP {episode.episode}
                    </span>
                    <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="kicker">Expert Panels</span>
                <h2 className="display mt-4 text-[clamp(30px,4vw,48px)] text-navy">
                  Recent <em>replay rooms</em>
                </h2>
              </div>
              <Link href="/panels#series" className="linkline">
                Panel Archive <span className="arr">-&gt;</span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {latestReplays.map((replay, index) => (
              <Reveal key={replay.slug} delay={index * 80} className="h-full">
                <Link
                  href={`/panels/replays/${replay.slug}`}
                  className="card-frame group flex h-full flex-col p-7"
                >
                  <span className="chip teal self-start">{replay.category}</span>
                  <h3 className="display mt-5 flex-1 text-[23px] leading-snug text-navy group-hover:text-teal-deep">
                    {replay.title}
                  </h3>
                  <div className="mt-6 border-t border-line pt-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-muted">
                    {replay.date} - {replay.duration || "Replay"}
                  </div>
                  <span className="linkline mt-5">
                    Watch replay <span className="arr">-&gt;</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <span className="kicker center justify-center">Real Results</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                What happens when strategy meets <em>execution</em>.
              </h2>
              <p className="mt-4 text-[16px] text-muted">
                An independent dermatology practice, 14 months into a full BOA
                and MSM engagement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-14 max-w-[900px] overflow-hidden rounded-[3px] border border-line bg-paper">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-line bg-cream text-[10.5px] font-extrabold uppercase tracking-[0.2em]">
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
                  <div className="flex items-center p-5 text-[13px] font-extrabold uppercase tracking-wide text-navy">
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
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="kicker center justify-center">
                Why People Love Us
              </span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                From the <em>community</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <TestimonialSlider />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
