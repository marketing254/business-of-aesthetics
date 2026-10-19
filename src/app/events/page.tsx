import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import {
  fetchEventPanels,
  fetchEventReplays,
  fetchEvents,
  isUpcoming,
  type SheetEvent,
  type SheetReplay,
  thumbUrl,
} from "@/lib/sheet";

const LATEST_REPLAYS_LIMIT = 12;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Live webinars, expert panels, and a complete replay library for aesthetic medicine professionals.",
};

type YearGroup = { year: number | null; events: SheetEvent[] };

function groupEventsByYear(events: SheetEvent[]): YearGroup[] {
  const map = new Map<number | null, SheetEvent[]>();
  for (const event of events) {
    const key = event.year;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(event);
  }
  return Array.from(map.entries())
    .map(([year, events]) => ({ year, events }))
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

function EventCard({ event }: { event: SheetEvent }) {
  const href =
    event.kind === "event-panel" ? `/panels/${event.slug}` : `/events/${event.slug}`;

  return (
    <Link href={href} className="card-frame group flex h-full flex-col p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="index-no text-[15px]">
            {event.day || event.monthYear || "BOA"}
          </span>
          <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
            {event.time || "Time TBA"}
          </div>
        </div>
        <span className="chip teal">
          {event.kind === "event-panel" ? "Panel" : "Event"}
        </span>
      </div>

      <h3 className="display mt-5 text-[21px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
        {event.title}
      </h3>
      <p className="mt-4 line-clamp-5 flex-1 text-[14px] leading-relaxed text-muted">
        {event.description}
      </p>

      {event.panelists.length > 0 && (
        <div className="mt-6 border-t border-line pt-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
            Featured voices
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.panelists.slice(0, 4).map((person) => (
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
      )}

      <span className="linkline mt-7">
        View details <span className="arr">→</span>
      </span>
    </Link>
  );
}

function ReplayRow({ replay }: { replay: SheetReplay }) {
  return (
    <Link
      href={`/events/replays/${replay.slug}`}
      className="card-frame group flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="chip">{replay.category}</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
          {replay.date}
        </span>
      </div>
      <h3 className="mt-4 flex-1 text-[16.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
        {replay.title}
      </h3>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
          {replay.duration || "Full session"}
        </span>
        <span className="linkline">
          Watch <span className="arr">→</span>
        </span>
      </div>
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

export default async function EventsPage() {
  const [events, panels, replays] = await Promise.all([
    fetchEvents(),
    fetchEventPanels(),
    fetchEventReplays(),
  ]);

  const upcomingEvents = events.filter(isUpcoming);
  const upcomingPanels = panels.filter(isUpcoming);
  const latestReplays = replays.slice(0, LATEST_REPLAYS_LIMIT);

  const [featuredEvent, ...restEvents] = upcomingEvents;
  const yearGroups = groupEventsByYear(restEvents);

  return (
    <>
      <PageHero
        kicker="Events"
        title={
          <>
            A cleaner calendar for <em>serious practice owners.</em>
          </>
        }
        lede="Live webinars, deep-dive workshops, and expert panels - plus a complete replay library. Updated the moment a new session is announced."
      >
        <a href="#calendar" className="btn btn-navy">
          View Calendar <span className="arr">→</span>
        </a>
        <a href="#replays" className="btn btn-outline">
          Watch Replays
        </a>
      </PageHero>

      {/* stats */}
      <section className="border-b border-line bg-paper py-12">
        <Stagger className="mx-auto grid max-w-[880px] grid-cols-3 gap-6 px-5 text-center">
          {[
            { label: "Scheduled events", value: upcomingEvents.length },
            { label: "Upcoming panels", value: upcomingPanels.length },
            { label: "Event replays", value: replays.length },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="display text-[clamp(28px,3.2vw,40px)] leading-none text-teal-deep">
                {stat.value}
              </div>
              <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* calendar */}
      <section id="calendar" className="scroll-mt-24 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Event Calendar"
            title={
              <>
                Upcoming and scheduled <em>events</em>
              </>
            }
            lede="Every upcoming session on the BOA calendar - each one opens into its own page with the full description, featured voices, and registration."
          />

          {upcomingEvents.length > 0 ? (
            <>
              {featuredEvent && (
                <FadeUp>
                  <div className="mx-auto mt-14 max-w-[680px]">
                    <div className="mb-5 text-center">
                      <span className="kicker center justify-center">
                        Next Up
                      </span>
                    </div>
                    <EventCard event={featuredEvent} />
                  </div>
                </FadeUp>
              )}

              {yearGroups.length > 0 && (
                <div className="mt-16 space-y-16">
                  {yearGroups.map((group) => (
                    <div key={group.year ?? "tba"}>
                      <div className="mb-8 flex items-center gap-6">
                        <span className="h-px flex-1 bg-line" aria-hidden />
                        <span className="display shrink-0 text-[clamp(26px,3.4vw,38px)] leading-none text-teal-deep/40">
                          {group.year ?? "TBA"}
                        </span>
                        <span className="h-px flex-1 bg-line" aria-hidden />
                      </div>
                      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {group.events.map((event) => (
                          <StaggerItem key={event.slug} className="h-full">
                            <EventCard event={event} />
                          </StaggerItem>
                        ))}
                      </Stagger>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mt-14">
              <StayTunedCard />
            </div>
          )}
        </div>
      </section>

      {/* panels */}
      <section className="dark-canvas on-dark py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            dark
            kicker="Event Panels"
            title={
              <>
                Live panels with <em>named experts.</em>
              </>
            }
            lede="Moderated expert panels scheduled alongside our events - meet the panelists before you join live."
          />

          {upcomingPanels.length > 0 ? (
            <Stagger className="mx-auto mt-12 grid max-w-[980px] gap-6 md:grid-cols-2">
              {upcomingPanels.map((event) => (
                <StaggerItem key={event.slug} className="h-full">
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-12">
              <StayTunedCard />
            </div>
          )}

          <FadeUp className="mt-12 text-center">
            <Link href="/panels" className="btn btn-ghost-light">
              Visit the Panel Hub <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* replays */}
      <section id="replays" className="scroll-mt-24 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Latest Replays"
            title={
              <>
                A replay library that <em>does not feel buried.</em>
              </>
            }
            lede={`The ${latestReplays.length} most recent event replays - each one opens into its own page with the full video, summary, and description.`}
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestReplays.map((replay) => (
              <StaggerItem key={replay.slug}>
                <ReplayRow replay={replay} />
              </StaggerItem>
            ))}
          </Stagger>
          {replays.length > LATEST_REPLAYS_LIMIT && (
            <p className="mt-8 text-center text-[13px] text-muted">
              Showing the {LATEST_REPLAYS_LIMIT} most recent replays. Older
              sessions stay reachable from their related event and panel pages.
            </p>
          )}
        </div>
      </section>

      <CtaBand secondary={{ href: "/panels", label: "View Panel Replays" }} />
    </>
  );
}
