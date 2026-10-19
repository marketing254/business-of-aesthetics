import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ShareBar from "@/components/ShareBar";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import { fetchEventPanels, thumbUrl } from "@/lib/sheet";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd, graph } from "@/lib/seo";


type PanelDetailProps = {
  params: Promise<{ slug: string }>;
};

async function loadPanel(slug: string) {
  const panels = await fetchEventPanels();
  return panels.find((panel) => panel.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: PanelDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const panel = await loadPanel(slug);
  if (!panel) return { title: "Panel" };

  return {
    title: panel.title,
    description: panel.description,
  };
}

export default async function PanelDetailPage({ params }: PanelDetailProps) {
  const { slug } = await params;
  const panel = await loadPanel(slug);
  if (!panel) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          eventJsonLd(panel, `/panels/${panel.slug}`),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Expert Panels", path: "/panels" },
            { name: panel.title, path: `/panels/${panel.slug}` },
          ])
        )}
      />
      {/* centered header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 pb-14 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/panels#upcoming" className="linkline">
              <span className="arr">&lt;-</span> Back to panels
            </Link>

            <div className="mx-auto mt-8 max-w-[820px] text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="kicker center justify-center">
                  {panel.monthYear || "Live Panel"}
                </span>
                <span className="chip teal">Live Panel</span>
              </div>
              <h1 className="display mx-auto mt-5 text-[clamp(27px,3.7vw,42px)] text-navy">
                {panel.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] font-semibold text-muted">
                <span>{panel.dateLabel || panel.monthYear}</span>
                <span className="text-line">·</span>
                <span>{panel.time || "8:00 PM ET"}</span>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                {panel.registerUrl ? (
                  <a
                    href={panel.registerUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-navy"
                  >
                    Register for This Panel <span className="arr">→</span>
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-outline">
                    Ask About This Panel
                  </Link>
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <ShareBar title={panel.title} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* about */}
      {panel.description && (
        <section className="py-16 lg:py-18">
          <div className="mx-auto max-w-[780px] px-5">
            <FadeUp>
              <div className="text-center">
                <span className="kicker center justify-center">
                  About This Panel
                </span>
              </div>
              <p className="mt-6 text-[16px] leading-[1.8] text-muted">
                {panel.description}
              </p>
            </FadeUp>
          </div>
        </section>
      )}

      {/* panelists */}
      <section className="border-t border-line bg-paper py-18 lg:py-20">
        <div className="mx-auto max-w-[1020px] px-5">
          <FadeUp>
            <div className="text-center">
              <span className="kicker center justify-center">Panelists</span>
              <h2 className="display mt-4 text-[clamp(23px,2.8vw,30px)] text-navy">
                The voices in the room.
              </h2>
            </div>
          </FadeUp>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {panel.panelists.map((person) => (
              <StaggerItem key={person.name} className="h-full">
                <div className="card-frame flex h-full flex-col items-center gap-4 p-7 text-center">
                  {person.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbUrl(person.imageUrl, 120)}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="h-24 w-24 shrink-0 rounded-full border border-line object-cover object-top"
                    />
                  ) : (
                    <span className="dark-canvas grid h-24 w-24 shrink-0 place-items-center rounded-full">
                      <span className="display text-[26px] text-teal">
                        {person.initials}
                      </span>
                    </span>
                  )}
                  <div>
                    <h3 className="display text-[20px] text-navy">
                      {person.name}
                    </h3>
                    <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                      Featured panelist
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        eyebrow="Join Live"
        primary={
          panel.registerUrl
            ? { href: panel.registerUrl, label: "Register for This Panel" }
            : { href: "/events", label: "View Event Calendar" }
        }
        secondary={{ href: "/panels#replays", label: "Watch Replays" }}
      />
    </>
  );
}
