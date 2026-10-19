import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import PanelExplorer from "@/components/PanelExplorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import {
  fetchEventPanels,
  fetchPanelReplays,
  isUpcoming,
  type SheetEvent,
  thumbUrl,
} from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Expert Panels",
  description:
    "Moderated live panels with senior aesthetic leaders - watch every replay free and see what's coming next.",
};

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
    <Link
      href={`/panels/${panel.slug}`}
      className="card-frame group flex h-full flex-col p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="index-no text-[15px]">
            {panel.day || panel.monthYear}
          </span>
          <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
            {panel.time || "8:00 PM ET"}
          </div>
        </div>
        <span className="chip teal">Live Panel</span>
      </div>

      <h3 className="display mt-5 text-[21px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
        {panel.title}
      </h3>
      <p className="mt-4 line-clamp-5 flex-1 text-[14px] leading-relaxed text-muted">
        {panel.description}
      </p>

      <div className="mt-6 border-t border-line pt-4">
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
          Panelists
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {panel.panelists.map((person) => (
            <span
              key={person.name}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-2.5 py-1.5 text-[12px] font-bold text-ink"
            >
              {person.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbUrl(person.imageUrl, 120)}
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
        Open panel <span className="arr">→</span>
      </span>
    </Link>
  );
}

function StayTunedCard() {
  return (
    <div className="card-frame mx-auto flex max-w-[640px] flex-col items-center gap-4 p-10 text-center sm:p-14">
      <span className="kicker center justify-center">Stay Tuned</span>
      <h3 className="display text-[24px] text-navy sm:text-[28px]">
        This session has concluded.
      </h3>
      <p className="max-w-[440px] text-[14.5px] leading-relaxed text-muted">
        The next live session will be announced here soon - keep an eye on
        this page or join the list.
      </p>
      <Link href="/contact" className="btn btn-outline mt-2">
        Get Notified
      </Link>
    </div>
  );
}

export default async function PanelsPage() {
  const [panels, panelReplays] = await Promise.all([
    fetchEventPanels(),
    fetchPanelReplays(),
  ]);
  const upcomingPanels = panels.filter(isUpcoming);
  const latest = panelReplays[0];

  return (
    <>
      <PageHero
        kicker="The BOA Expert Panel Series"
        title={
          <>
            Live debates between <em>senior aesthetic leaders.</em>
          </>
        }
        lede="Moderated, 60-minute conversations with the operators shaping modern practice. Every session is recorded, every replay is free - with notes on its own page."
      >
        <a href="#upcoming" className="btn btn-navy">
          Upcoming Panels <span className="arr">→</span>
        </a>
        <a href="#replays" className="btn btn-outline">
          Replay Archive
        </a>
      </PageHero>

      {/* stats */}
      <section className="border-b border-line bg-paper py-12">
        <Stagger className="mx-auto grid max-w-[880px] grid-cols-3 gap-6 px-5 text-center">
          {[
            { label: "Upcoming panels", value: upcomingPanels.length },
            { label: "Replay pages", value: panelReplays.length },
            { label: "Latest category", value: latest?.category || "Live" },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="display text-[clamp(22px,2.8vw,34px)] leading-none text-teal-deep">
                {stat.value}
              </div>
              <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* upcoming */}
      <section id="upcoming" className="scroll-mt-24 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Upcoming Panels"
            title={
              <>
                The next live <em>decision rooms.</em>
              </>
            }
            lede="The next live sessions on the calendar - moderated debates you can join in real time, with registration one click away."
          />

          {upcomingPanels.length > 0 ? (
            <Stagger className="mx-auto mt-12 grid max-w-[980px] gap-6 md:grid-cols-2">
              {upcomingPanels.map((panel) => (
                <StaggerItem key={panel.slug} className="h-full">
                  <UpcomingPanel panel={panel} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-12">
              <StayTunedCard />
            </div>
          )}

          <FadeUp className="mt-10 text-center">
            <Link href="/events" className="linkline">
              Full event calendar <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* replay archive */}
      <section
        id="replays"
        className="scroll-mt-24 border-y border-line bg-paper py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Panel Replay Archive"
            title={
              <>
                Replays with <em>their own pages.</em>
              </>
            }
            lede={`Filter the ${panelReplays.length}-session replay library by category, then open any session for the full video and supporting materials.`}
          />
          <div className="mt-10">
            <PanelExplorer replays={panelReplays} />
          </div>
        </div>
      </section>

      {/* why different */}
      <section className="dark-canvas on-dark py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            dark
            kicker="Why BOA Panels Are Different"
            title={
              <>
                Most webinars are content.{" "}
                <em>Ours are conversations that move practices.</em>
              </>
            }
          />

          <FadeUp delay={0.1}>
            <div className="scroll-x mx-auto mt-12 max-w-[980px]">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/15 text-[12px] uppercase tracking-[0.22em]">
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

      <CtaBand secondary={{ href: "/events", label: "View Event Calendar" }} />
    </>
  );
}
