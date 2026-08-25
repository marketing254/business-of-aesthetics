import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import PanelExplorer from "@/components/PanelExplorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import TiltCard from "@/components/motion/TiltCard";
import Parallax from "@/components/motion/Parallax";
import {
  fetchEventPanels,
  fetchPanelReplays,
  type SheetEvent,
} from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Expert Panels",
  description:
    "Moderated live panels with senior aesthetic leaders — watch every replay free and see what's coming next.",
};

const panelTopics = [
  "Leadership",
  "Technology & AI",
  "Clinical Excellence",
  "Practice Management",
  "Financial Planning",
  "Hiring & Retention",
  "Patient Experience",
  "M&A",
  "Cybersecurity",
];

const comparison = [
  {
    matter: "Who's on stage",
    webinar: "Paid presenters pitching an audience",
    boa: "Operators who run the practices we talk about",
  },
  {
    matter: "Format",
    webinar: "One-way slideshow, vendor pitch at the end",
    boa: "2-5 voices in moderated, live debate",
  },
  {
    matter: "Topic selection",
    webinar: "Broad, evergreen, safely vague",
    boa: "Specific decisions practice owners face this quarter",
  },
  {
    matter: "Takeaways",
    webinar: "Inspiration you forget by Friday",
    boa: "Frameworks, benchmarks, scripts, warnings",
  },
];

function UpcomingPanel({ panel }: { panel: SheetEvent }) {
  return (
    <TiltCard maxTilt={5} className="card-frame group flex h-full flex-col p-7">
      <Link href={`/panels/${panel.slug}`} className="contents">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="index-no text-[15px]">
              {panel.day || panel.monthYear}
            </span>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {panel.time || "8:00 PM ET"}
            </div>
          </div>
          <span className="chip teal">Live Panel</span>
        </div>

        <h3 className="display mt-5 text-[24px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
          {panel.title}
        </h3>
        <p className="mt-4 line-clamp-5 flex-1 text-[14px] leading-relaxed text-muted">
          {panel.description}
        </p>

        <div className="mt-6 border-t border-line pt-4">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
            Panelists
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {panel.panelists.map((person) => (
              <span
                key={person.name}
                className="inline-flex items-center gap-2 border border-line bg-cream px-2.5 py-1.5 text-[12px] font-bold text-ink"
              >
                {person.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.imageUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-6 w-6 rounded-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-ink text-[9px] text-teal">
                    {person.initials}
                  </span>
                )}
                {person.name}
              </span>
            ))}
          </div>
        </div>

        <span className="linkline mt-7">
          Open panel <span className="arr">-&gt;</span>
        </span>
      </Link>
    </TiltCard>
  );
}

export default async function PanelsPage() {
  const [upcomingPanels, panelReplays] = await Promise.all([
    fetchEventPanels(),
    fetchPanelReplays(),
  ]);
  const latest = panelReplays[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <Parallax speed={0.15} className="ghost-word left-[-2%] top-[58%] text-[clamp(110px,15vw,230px)]">
          panels
        </Parallax>
        <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-14 lg:grid-cols-[0.95fr_1fr] lg:pt-20">
          <FadeUp>
            <span className="kicker">The BOA Expert Panel Series</span>
            <WordReveal
              text="Live debates between *senior aesthetic leaders*."
              className="display mt-6 text-[clamp(31px,3.9vw,52px)] text-navy"
            />
            <p className="mt-6 max-w-[590px] text-[16.5px] leading-relaxed text-muted">
              Moderated, 60-minute conversations with the operators shaping
              modern practice. Every session is recorded, every replay is
              free — with notes and transcripts on its own page.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#upcoming" className="btn btn-navy">
                Upcoming Panels <span className="arr">-&gt;</span>
              </a>
              <a href="#series" className="btn btn-outline">
                Replay Archive
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <Stagger className="signal-panel grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                { label: "Upcoming panels", value: upcomingPanels.length },
                { label: "Replay pages", value: panelReplays.length },
                { label: "Latest category", value: latest?.category || "Live" },
              ].map((stat) => (
                <StaggerItem key={stat.label} className="bg-paper p-7">
                  <div className="display text-[clamp(24px,3.3vw,36px)] leading-none text-teal-deep">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeUp>
        </div>
      </section>

      <Marquee items={panelTopics} />

      <section id="upcoming" className="scroll-mt-24 border-b border-line bg-paper py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[720px]">
                <span className="kicker">Upcoming Panels</span>
                <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-navy">
                  The next live <em>decision rooms</em>.
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  The next live sessions on the calendar — moderated debates you
                  can join in real time, with registration one click away.
                </p>
              </div>
              <Link href="/events" className="linkline">
                Full event calendar <span className="arr">-&gt;</span>
              </Link>
            </div>
          </FadeUp>

          <Stagger className="mt-12 grid gap-7 md:grid-cols-2">
            {upcomingPanels.map((panel) => (
              <StaggerItem key={panel.slug} className="h-full">
                <UpcomingPanel panel={panel} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="series" className="scroll-mt-24 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[720px]">
                <span className="kicker">Panel Replay Archive</span>
                <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-navy">
                  Replays with <em>their own pages</em>.
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  Filter the replay library by category, then open any session
                  for the full video, transcript, and supporting materials.
                </p>
              </div>
              <span className="chip">{panelReplays.length} Replays</span>
            </div>
          </FadeUp>
          <div className="mt-10">
            <PanelExplorer replays={panelReplays} />
          </div>
        </div>
      </section>

      <section className="dark-canvas on-dark relative overflow-hidden py-24 lg:py-28">
        <Parallax speed={0.15} className="ghost-word bottom-[-3%] right-[-2%] text-[clamp(100px,13vw,200px)]">
          candid
        </Parallax>
        <div className="relative mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[720px]">
              <span className="kicker">Why BOA Panels Are Different</span>
              <h2 className="display mt-5 text-[clamp(24px,3.1vw,35px)] text-white">
                Most webinars are content.{" "}
                <em>Ours are conversations that move practices.</em>
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="scroll-x mt-12">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/15 text-[10.5px] uppercase tracking-[0.22em]">
                    <th className="py-4 pr-6 font-semibold text-white/50">
                      What Matters
                    </th>
                    <th className="py-4 pr-6 font-semibold text-white/50">
                      Typical Webinars
                    </th>
                    <th className="py-4 font-semibold text-teal">
                      BOA Expert Panels
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.matter} className="border-b border-white/8">
                      <td className="py-5 pr-6 text-[13.5px] font-semibold text-white">
                        {row.matter}
                      </td>
                      <td className="py-5 pr-6 text-[13.5px] text-white/55">
                        {row.webinar}
                      </td>
                      <td className="py-5 text-[13.5px] font-semibold text-white/90">
                        {row.boa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaBand
        secondary={{ href: "/events", label: "View Event Calendar" }}
      />
    </>
  );
}
