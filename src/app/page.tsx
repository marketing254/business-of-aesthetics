import Link from "next/link";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import HeroScene from "@/components/HeroScene";
import SectionHead from "@/components/SectionHead";
import NewsletterBand from "@/components/NewsletterBand";
import TestimonialSlider from "@/components/TestimonialSlider";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import {
  fetchEventPanels,
  fetchPanelReplays,
  fetchPodcasts,
  isUpcoming,
} from "@/lib/sheet";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, breadcrumbJsonLd, graph, podcastSeriesJsonLd, webPageJsonLd } from "@/lib/seo";


export const metadata: Metadata = {
  title: "Business of Aesthetics - Podcast, Expert Panels & Growth for Aesthetic Practices",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

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

const authority = [
  { title: "19+ Years Leadership", copy: "Built by Ekwa Marketing, trusted since 2007 by aesthetic specialists." },
  { title: "HIPAA-Aware", copy: "Privacy-first practices baked into every recommendation we make." },
  { title: "4.9 / 5 Member Rating", copy: "From the practitioners we have supported across North America." },
  { title: "200+ Practices Served", copy: "Real clinics, real results, from solo to multi-location groups." },
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
  const nextPanel = upcomingPanels.filter(isUpcoming)[0];

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/", name: "Business of Aesthetics", description: DEFAULT_DESCRIPTION }),
          podcastSeriesJsonLd(podcasts),
          breadcrumbJsonLd([{ name: "Home", path: "/" }])
        )}
      />
      {/* ============ hero — centered, with cinematic 3D orbit ============ */}
      <section className="relative overflow-hidden">
        <HeroScene />
        <div className="relative mx-auto max-w-[900px] px-5 pb-14 pt-16 text-center lg:pb-16 lg:pt-24">
          <FadeUp eager>
            <span className="kicker center justify-center">
              Your Success Matters - Since 2007
            </span>
            <h1 className="display mx-auto mt-6 max-w-[780px] text-[clamp(34px,4.6vw,56px)] text-navy">
              The business education aesthetic leaders{" "}
              <em>never got in training.</em>
            </h1>
            <p className="lede mx-auto mt-6 max-w-[620px] text-[17px]">
              BOA brings dermatology, plastic surgery, and aesthetic leaders
              together to turn conversations into decisions - a weekly podcast,
              live expert panels, replays, and strategy sessions that connect
              directly to growth.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/marketing#book" className="btn btn-navy">
                Book a Free Strategy Meeting <span className="arr">→</span>
              </Link>
              <Link href="/podcast" className="btn btn-outline">
                Explore the Podcast
              </Link>
            </div>
            <div className="mx-auto mt-11 flex max-w-[640px] flex-wrap items-center justify-center gap-x-9 gap-y-3 border-t border-line pt-6 text-[13px] font-bold text-navy">
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

        {/* next live panel strip */}
        {nextPanel && (
          <div className="border-t border-line bg-paper">
            <div className="mx-auto max-w-[1180px] px-5">
              <Link
                href={`/panels/${nextPanel.slug}`}
                className="group flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-4 text-center text-[13px]"
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
                <span className="arr text-teal-deep transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ============ stats band ============ */}
      <section className="border-y border-line bg-paper py-14">
        <div className="mx-auto max-w-[1180px] px-5">
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
            {[
              { n: podcasts.length || 294, s: "+", label: "Podcast Episodes" },
              { n: panelReplays.length || 16, s: "+", label: "Panel Replays" },
              { n: 3700, s: "+", label: "Practitioners" },
              { n: 19, s: " yrs", label: "Industry Experience" },
            ].map((st) => (
              <StaggerItem key={st.label}>
                <div>
                  <div className="display text-[clamp(32px,3.6vw,44px)] leading-none text-navy">
                    <Counter target={st.n} suffix={st.s} />
                  </div>
                  <div className="mt-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                    {st.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-line pt-8">
            <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-muted">
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

      {/* ============ what we do ============ */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="What We Do"
            title={
              <>
                Four systems, <em>one growth loop.</em>
              </>
            }
            lede="Everything BOA publishes and builds serves the same goal: helping independent aesthetic practices make better business decisions."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <StaggerItem key={p.no} className="h-full">
                <Link
                  href={p.href}
                  className="card-frame group flex h-full flex-col p-7 text-left"
                >
                  <span className="display text-[30px] leading-none text-teal-deep/25 transition-colors duration-300 group-hover:text-teal-deep">
                    {p.no}
                  </span>
                  <h3 className="display mt-5 text-[21px] text-navy transition-colors group-hover:text-teal-deep">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                  <span className="linkline mt-6">
                    {p.cta} <span className="arr">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ latest episodes ============ */}
      <section className="border-y border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="The BOA Podcast"
            title={
              <>
                Latest <em>episodes</em>
              </>
            }
            lede={
              latestEpisode
                ? `Episode ${latestEpisode.episode} just dropped - new conversations arrive every week.`
                : "New conversations arrive every week."
            }
          />
          <Stagger className="mx-auto mt-12 max-w-[920px] overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px">
              {podcasts.slice(0, 3).map((episode) => (
                <StaggerItem key={episode.slug}>
                  <Link
                    href={`/podcast/${episode.slug}`}
                    className="group grid gap-4 bg-paper p-6 transition-colors hover:bg-cream sm:grid-cols-[110px_1fr_auto] sm:items-center sm:p-7"
                  >
                    <div>
                      <span className="index-no text-[15px]">
                        EP {episode.episode}
                      </span>
                      <div className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {episode.datePublished}
                      </div>
                    </div>
                    <div>
                      <span className="chip">{episode.category}</span>
                      <h3 className="mt-2.5 text-[16.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                        {episode.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] font-bold text-muted">
                        {episode.guestName}
                      </p>
                    </div>
                    <span className="linkline">
                      Listen <span className="arr">→</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
          <FadeUp className="mt-10 text-center">
            <Link href="/podcast" className="btn btn-outline">
              Browse All Episodes <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ============ recent replays ============ */}
      {latestReplays.length > 0 && (
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1180px] px-5">
            <SectionHead
              kicker="Expert Panels"
              title={
                <>
                  Recent <em>replay rooms</em>
                </>
              }
              lede="Moderated roundtables, recorded live - watch the full conversations on your schedule."
            />
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {latestReplays.map((replay) => (
                <StaggerItem key={replay.slug} className="h-full">
                  <Link
                    href={`/panels/replays/${replay.slug}`}
                    className="card-frame group flex h-full flex-col p-7"
                  >
                    <span className="chip teal self-start">{replay.category}</span>
                    <h3 className="display mt-5 flex-1 text-[20px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                      {replay.title}
                    </h3>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                      <span>{replay.date}</span>
                      <span className="linkline !text-[12px]">
                        Watch <span className="arr">→</span>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <FadeUp className="mt-10 text-center">
              <Link href="/panels#replays" className="btn btn-outline">
                Full Panel Archive <span className="arr">→</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ============ results ============ */}
      <section className="dark-canvas on-dark py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            dark
            kicker="Real Results"
            title={
              <>
                What happens when strategy meets <em>execution.</em>
              </>
            }
            lede="An independent dermatology practice, 14 months into a full BOA and MSM engagement."
          />
          <FadeUp delay={0.1}>
            <div className="mx-auto mt-12 max-w-[860px] overflow-hidden rounded-2xl border border-white/12 bg-navy-deep/60">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/10 text-[12px] font-semibold uppercase tracking-[0.2em]">
                <div className="p-5 text-white/50">Metric</div>
                <div className="border-l border-white/10 p-5 text-white/50">
                  Before BOA
                </div>
                <div className="border-l border-white/10 p-5 text-teal">
                  After 14 Months
                </div>
              </div>
              {[
                { label: "New patients / month", before: "47/mo", after: <Counter target={148} suffix="/mo" />, change: "+215%" },
                { label: "Google rating", before: "2.3 stars", after: <Counter target={4.8} decimals={1} suffix=" stars" />, change: "+109%" },
                { label: "Avg. monthly ad spend", before: "$1,200", after: <Counter target={3200} prefix="$" />, change: "8.4x ROI" },
                { label: "Google reviews total", before: "12", after: <Counter target={287} />, change: "+2,292%" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/10 last:border-b-0"
                >
                  <div className="flex items-center p-5 text-[12.5px] font-semibold uppercase tracking-wide text-white/85">
                    {r.label}
                  </div>
                  <div className="display flex items-center border-l border-white/10 p-5 text-[21px] text-white/40">
                    {r.before}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 border-l border-white/10 p-5">
                    <span className="display text-[21px] text-teal">
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

      {/* ============ why BOA ============ */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Why BOA"
            title={
              <>
                Built on <em>credibility</em>, not hype.
              </>
            }
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {authority.map((a) => (
              <StaggerItem key={a.title} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-paper p-7 text-center">
                  <h3 className="text-[15px] font-semibold text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {a.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ testimonials ============ */}
      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Why People Love Us"
            title={
              <>
                From the <em>community</em>
              </>
            }
            className="mb-12"
          />
          <FadeUp delay={0.1}>
            <TestimonialSlider />
          </FadeUp>
        </div>
      </section>

      {/* ============ community ============ */}
      <section className="dark-canvas on-dark py-18 lg:py-20">
        <div className="mx-auto max-w-[680px] px-5 text-center">
          <FadeUp>
            <span className="kicker center justify-center">
              Be Part of Our Community
            </span>
            <h2 className="display mt-4 text-[clamp(24px,3vw,32px)] text-white">
              3,700+ practitioners, <em>one private group.</em>
            </h2>
            <p className="lede mx-auto mt-4 max-w-[520px]">
              Candid questions, honest answers, zero gatekeeping - join the BOA
              Facebook community where aesthetic leaders compare notes every
              day.
            </p>
            <a
              href="https://www.facebook.com/groups/BusinessOfAesthetics"
              target="_blank"
              rel="noopener"
              className="btn btn-teal mt-8"
            >
              Join the BOA Facebook Group <span className="arr">→</span>
            </a>
          </FadeUp>
        </div>
      </section>

      <NewsletterBand />
      <CtaBand />
    </>
  );
}
