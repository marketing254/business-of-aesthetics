import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
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
    "Live BOA events, event panels, and replay pages powered by the BOA Google Sheet database.",
};

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
          <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
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
          <div className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-teal-deep">
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
        <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
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

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          calendar
        </div>
        <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-14 lg:grid-cols-[0.9fr_1fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Events</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,68px)] text-navy">
              A cleaner calendar for <em>serious practice owners</em>.
            </h1>
            <p className="mt-6 max-w-[580px] text-[17px] leading-relaxed text-muted">
              The event system now reads straight from the BOA Sheet: event
              schedule, panel schedule, replay library, panelists, registration
              links, and detail pages.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#calendar" className="btn btn-navy">
                View Calendar <span className="arr">-&gt;</span>
              </a>
              <a href="#replays" className="btn btn-outline">
                Watch Replays
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="signal-panel grid gap-px overflow-hidden border border-line bg-line">
              {[
                { label: "Scheduled events", value: events.length },
                { label: "Upcoming panels", value: panels.length },
                { label: "Event replays", value: replays.length },
              ].map((stat) => (
                <div key={stat.label} className="bg-paper p-7">
                  <div className="display text-[48px] italic leading-none text-teal-deep">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
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
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
              <div>
                <span className="kicker">Event Calendar</span>
                <h2 className="display mt-5 text-[clamp(30px,4vw,50px)] text-navy">
                  Upcoming and scheduled <em>events</em>
                </h2>
              </div>
              <p className="max-w-[660px] text-[15.5px] leading-relaxed text-muted lg:pt-9">
                These rows come from the `events` Sheet tab. Each event opens
                into its own internal page with panelists, description, and
                registration action.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Reveal key={event.slug} delay={(index % 3) * 70} className="h-full">
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-canvas on-dark py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[700px]">
                <span className="kicker">Event Panels</span>
                <h2 className="display mt-5 text-[clamp(30px,4vw,50px)] text-white">
                  Live panels with <em>named experts</em>.
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">
                  Pulled from `event-panels`, including panelist names and Drive
                  profile images where available.
                </p>
              </div>
              <Link href="/panels" className="linkline !text-teal">
                Panel hub <span className="arr">-&gt;</span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {panels.map((event, index) => (
              <Reveal key={event.slug} delay={(index % 2) * 80} className="h-full">
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="replays" className="scroll-mt-24 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[700px]">
              <span className="kicker">Event Replays</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,50px)] text-navy">
                A replay library that <em>does not feel buried</em>.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                The replay tab creates individual replay pages with video links,
                summaries, descriptions, and transcript references.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 border-t border-line">
            {replays.map((replay) => (
              <ReplayRow key={replay.slug} replay={replay} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        secondary={{ href: "/panels", label: "View Panel Replays" }}
      />
    </>
  );
}
