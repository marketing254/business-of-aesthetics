import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ShareBar from "@/components/ShareBar";
import { FadeUp } from "@/components/motion/Animate";
import { fetchEvents, thumbUrl } from "@/lib/sheet";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd, graph } from "@/lib/seo";


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
    description: event.description.replace(/\s+/g, " ").slice(0, 160),
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, url: `/events/${event.slug}` },
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
      <JsonLd
        data={graph(
          eventJsonLd(event, `/events/${event.slug}`),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/events/${event.slug}` },
          ])
        )}
      />
      {/* centered header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 pb-14 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/events#calendar" className="linkline">
              <span className="arr">&lt;-</span> Back to events
            </Link>

            <div className="mx-auto mt-8 max-w-[820px] text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="kicker center justify-center">
                  {event.monthYear || "BOA Event"}
                </span>
                <span className="chip teal">Event</span>
              </div>
              <h1 className="display mx-auto mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
                {event.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] font-semibold text-muted">
                <span>{event.dateLabel || event.monthYear}</span>
                <span className="text-line">·</span>
                <span>{event.time || "Time TBA"}</span>
              </div>
              <p className="lede mx-auto mt-5 max-w-[640px]">
                {blocks(event.description)[0]}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                {event.registerUrl ? (
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-navy"
                  >
                    Register for This Event <span className="arr">→</span>
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-outline">
                    Ask About This Event
                  </Link>
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <ShareBar title={event.title} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* panelists */}
      {event.panelists.length > 0 && (
        <section className="border-b border-line bg-paper py-14">
          <div className="mx-auto max-w-[880px] px-5 text-center">
            <FadeUp>
              <span className="kicker center justify-center">
                Featured Voices
              </span>
              <div className="mt-7 flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
                {event.panelists.map((person) => (
                  <div key={person.name} className="w-[130px]">
                    {person.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbUrl(person.imageUrl, 120)}
                        alt={person.name}
                        referrerPolicy="no-referrer"
                        className="mx-auto h-20 w-20 rounded-full border border-line object-cover object-top"
                      />
                    ) : (
                      <span className="dark-canvas mx-auto grid h-20 w-20 place-items-center rounded-full">
                        <span className="display text-[20px] text-teal">
                          {person.initials}
                        </span>
                      </span>
                    )}
                    <div className="mt-3 text-[13.5px] font-semibold leading-snug text-navy">
                      {person.name}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* description */}
      <section className="py-18 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5">
          <FadeUp>
            <div className="text-center">
              <span className="kicker center justify-center">
                What You Will Learn
              </span>
              <h2 className="display mt-4 text-[clamp(23px,2.8vw,31px)] text-navy">
                The working brief.
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <ul className="mt-10">
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
      </section>

      <CtaBand
        eyebrow="Keep Learning"
        title={
          <>
            Browse the rest of the <em>event system.</em>
          </>
        }
        copy="The calendar, panel schedule, and replay archive are always current - check back for the next live session."
        primary={{ href: "/events", label: "All Events" }}
        secondary={{ href: "/events#replays", label: "Event Replays" }}
      />
    </>
  );
}
