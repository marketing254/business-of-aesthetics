import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { FadeUp, Stagger, StaggerItem, DrawLine } from "@/components/motion/Animate";
import TiltCard from "@/components/motion/TiltCard";
import { fetchEvents } from "@/lib/sheet";

type EventDetailProps = {
  params: Promise<{ slug: string }>;
};

async function loadEvent(slug: string) {
  const events = await fetchEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Event" };

  return {
    title: event.title,
    description: event.description,
  };
}

function blocks(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[52%] text-[clamp(110px,15vw,230px)]">
          event
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-14 lg:pb-24 lg:pt-20">
          <Link href="/events#calendar" className="linkline">
            <span className="arr">&lt;-</span> Back to events
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.72fr_0.28fr]">
            <div>
              <FadeUp>
                <span className="kicker">{event.monthYear || "BOA Event"}</span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="display mt-6 text-[clamp(31px,4.1vw,52px)] text-navy">
                  {event.title}
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-muted">
                  {blocks(event.description)[0]}
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.15}>
              <TiltCard maxTilt={6}>
                <aside className="signal-panel border border-line bg-paper p-7">
                  <span className="chip teal">Event</span>
                  <dl className="mt-6 space-y-5 text-[13px]">
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.18em] text-muted">
                        Date
                      </dt>
                      <dd className="mt-1 font-bold text-ink">
                        {event.dateLabel || event.monthYear}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.18em] text-muted">
                        Time
                      </dt>
                      <dd className="mt-1 font-bold text-ink">
                        {event.time || "Time TBA"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.18em] text-muted">
                        Panelists
                      </dt>
                      <dd className="mt-2 space-y-2">
                        {event.panelists.length ? (
                          <Stagger className="space-y-2">
                            {event.panelists.map((person) => (
                              <StaggerItem key={person.name}>
                                <span className="flex items-center gap-2 font-bold text-ink">
                                  {person.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={person.imageUrl}
                                      alt=""
                                      referrerPolicy="no-referrer"
                                      className="h-8 w-8 rounded-full object-cover object-top"
                                    />
                                  ) : (
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-ink text-[10px] text-teal">
                                      {person.initials}
                                    </span>
                                  )}
                                  {person.name}
                                </span>
                              </StaggerItem>
                            ))}
                          </Stagger>
                        ) : (
                          "To be announced"
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 border-t border-line pt-6">
                    {event.registerUrl ? (
                      <a
                        href={event.registerUrl}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-navy w-full"
                      >
                        Register <span className="arr">-&gt;</span>
                      </a>
                    ) : (
                      <Link href="/contact" className="btn btn-outline w-full">
                        Ask About This Event
                      </Link>
                    )}
                  </div>
                </aside>
              </TiltCard>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <DrawLine className="mx-auto h-px max-w-[1280px] bg-line" />
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pt-16 lg:grid-cols-[0.28fr_0.72fr]">
          <FadeUp>
            <div>
              <span className="kicker">What You Will Learn</span>
              <h2 className="display mt-5 text-[clamp(24px,3.1vw,33px)] text-navy">
                The working brief.
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ul className="space-y-0">
              {blocks(event.description).map((line, i) => (
                <li
                  key={line}
                  className="grid grid-cols-[44px_1fr] items-baseline gap-4 border-b border-line py-5 text-[15.5px] leading-relaxed text-ink/85 last:border-b-0"
                >
                  <span className="index-no text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
        <DrawLine className="mx-auto mt-16 h-px max-w-[1280px] bg-line" />
      </section>

      <CtaBand
        eyebrow="Keep Learning"
        title={
          <>
            Browse the rest of the <em>event system.</em>
          </>
        }
        copy="The calendar, panel schedule, and replay archive are always current — check back for the next live session."
        primary={{ href: "/events", label: "All Events" }}
        secondary={{ href: "/events#replays", label: "Event Replays" }}
      />
    </>
  );
}
