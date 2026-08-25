import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import { FadeUp, Stagger, StaggerItem, DrawLine } from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import TiltCard from "@/components/motion/TiltCard";
import Parallax from "@/components/motion/Parallax";
import {
  fetchEventPanels,
  fetchEventReplays,
  fetchEvents,
  type SheetEvent,
  type SheetReplay,
} from "@/lib/sheet";

export const dynamic = "force-dynamic";

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
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {event.time || "Time TBA"}
          </div>
        </div>
        <span className="chip teal">
          {event.kind === "event-panel" ? "Panel" : "Event"}
        </span>
      </div>

      <h3 className="display mt-5 text-[23px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
        {event.title}
      </h3>
      <p className="mt-4 line-clamp-5 flex-1 text-[14px] leading-relaxed text-muted">
        {event.description}
      </p>

      {event.panelists.length > 0 && (
        <div className="mt-6 border-t border-line pt-4">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
            Featured voices
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.panelists.slice(0, 4).map((person) => (
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
      )}

      <span className="linkline mt-7">
        View details <span className="arr">-&gt;</span>
      </span>
    </Link>
  );
}

function ReplayRow({ replay }: { replay: SheetReplay }) {
  return (
    <Link
      href={`/events/replays/${replay.slug}`}
      className="group grid gap-5 border-b border-line py-6 transition-colors hover:bg-paper md:grid-cols-[160px_1fr_auto] md:items-center"
    >
      <div>
        <span className="index-no text-[15px]">{replay.date}</span>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {replay.duration || "Replay"}
        </div>
      </div>
      <div>
        <span className="chip">{replay.category}</span>
        <h3 className="display mt-3 text-[22px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
          {replay.title}
        </h3>
      </div>
      <span className="linkline">
        Open replay <span className="arr">-&gt;</span>
      </span>
    </Link>
  );
}

export default async function EventsPage() {
  const [events, panels, replays] = await Promise.all([
    fetchEvents(),
    fetchEventPanels(),
    fetchEventReplays(),
  ]);

  const [featuredEvent, ...restEvents] = events;
  const yearGroups = groupEventsByYear(restEvents);

  return (
    <>
      <section className="relative overflow-hidden">
        <Parallax
          speed={0.14}
          className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]"
        >
          calendar
        </Parallax>
        <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-14 lg:grid-cols-[0.9fr_1fr] lg:pt-20">
          <div>
            <FadeUp>
              <span className="kicker">Events</span>
            </FadeUp>
            <WordReveal
              text="A cleaner calendar for *serious practice owners.*"
              className="display mt-6 text-[clamp(32px,4.1vw,52px)] text-navy"
            />
            <FadeUp delay={0.35}>
              <p className="mt-6 max-w-[580px] text-[17px] leading-relaxed text-muted">
                Live webinars, deep-dive workshops, and expert panels — plus a
                complete replay library. Updated the moment a new session is
                announced.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#calendar" className="btn btn-navy">
                  View Calendar <span className="arr">-&gt;</span>
                </a>
                <a href="#replays" className="btn btn-outline">
                  Watch Replays
                </a>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <div className="signal-panel grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                { label: "Scheduled events", value: events.length },
                { label: "Upcoming panels", value: panels.length },
                { label: "Event replays", value: replays.length },
              ].map((stat) => (
                <div key={stat.label} className="bg-paper p-7">
                  <div className="display text-[36px] leading-none text-teal-deep">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <Marquee
        items={[
          "Marketing",
          "Patient Experience",
          "Technology",
          "Leadership",
          "Operations",
          "Clinical Growth",
          "Finance",
          "Conversion",
        ]}
      />

      <section id="calendar" className="scroll-mt-24 border-b border-line bg-paper py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
              <div>
                <span className="kicker">Event Calendar</span>
                <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-navy">
                  Upcoming and scheduled <em>events</em>
                </h2>
              </div>
              <p className="max-w-[660px] text-[15.5px] leading-relaxed text-muted lg:pt-9">
                Every upcoming session on the BOA calendar — each one opens into
                its own page with the full description, featured voices, and
                registration.
              </p>
            </div>
          </FadeUp>

          {featuredEvent && (
            <div className="mt-14">
              <FadeUp>
                <span className="kicker">Next Up</span>
              </FadeUp>
              <div className="mt-5 lg:max-w-[640px]">
                <TiltCard maxTilt={7} className="h-full">
                  <EventCard event={featuredEvent} />
                </TiltCard>
              </div>
            </div>
          )}

          {yearGroups.length > 0 && (
            <div className="mt-16 space-y-16">
              {yearGroups.map((group) => (
                <div key={group.year ?? "tba"}>
                  <div className="mb-8 flex items-center gap-6">
                    <span className="display shrink-0 text-[clamp(37px,4.9vw,58px)] leading-none text-teal-deep/25">
                      {group.year ?? "TBA"}
                    </span>
                    <DrawLine className="h-px flex-1 bg-line" />
                  </div>
                  <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      <section className="dark-canvas on-dark py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[700px]">
                <span className="kicker">Event Panels</span>
                <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-white">
                  Live panels with <em>named experts</em>.
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">
                  Moderated expert panels scheduled alongside our events — meet
                  the panelists before you join live.
                </p>
              </div>
              <Link href="/panels" className="linkline !text-teal">
                Panel hub <span className="arr">-&gt;</span>
              </Link>
            </div>
          </FadeUp>

          <Stagger className="mt-12 grid gap-7 md:grid-cols-2">
            {panels.map((event) => (
              <StaggerItem key={event.slug} className="h-full">
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="replays" className="scroll-mt-24 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[700px]">
              <span className="kicker">Event Replays</span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,38px)] text-navy">
                A replay library that <em>does not feel buried</em>.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                The replay tab creates individual replay pages with video links,
                summaries, descriptions, and transcript references.
              </p>
            </div>
          </FadeUp>
          <DrawLine className="mt-10 h-px bg-line" />
          <Stagger className="border-t-0">
            {replays.map((replay) => (
              <StaggerItem key={replay.slug}>
                <ReplayRow replay={replay} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        secondary={{ href: "/panels", label: "View Panel Replays" }}
      />
    </>
  );
}
