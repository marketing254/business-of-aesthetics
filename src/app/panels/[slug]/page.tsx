import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { fetchEventPanels } from "@/lib/sheet";

export const dynamic = "force-dynamic";

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
      <section className="dark-canvas on-dark relative overflow-hidden">
        <div className="ghost-word right-[-4%] top-[50%] text-[clamp(110px,15vw,230px)]">
          live
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-14 lg:pb-24 lg:pt-20">
          <Link href="/panels#upcoming" className="linkline !text-teal">
            <span className="arr">&lt;-</span> Back to panels
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.7fr_0.3fr]">
            <Reveal>
              <span className="kicker">{panel.monthYear || "Live Panel"}</span>
              <h1 className="display mt-6 text-[clamp(34px,5vw,66px)] text-white">
                {panel.title}
              </h1>
              <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-white/75">
                {panel.description}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <aside className="signal-panel border border-white/12 bg-white/[0.04] p-7">
                <span className="chip teal">Live Panel</span>
                <dl className="mt-6 space-y-5 text-[13px]">
                  <div>
                    <dt className="font-extrabold uppercase tracking-[0.18em] text-white/50">
                      Date
                    </dt>
                    <dd className="mt-1 font-bold text-white">
                      {panel.dateLabel || panel.monthYear}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-extrabold uppercase tracking-[0.18em] text-white/50">
                      Time
                    </dt>
                    <dd className="mt-1 font-bold text-white">
                      {panel.time || "8:00 PM ET"}
                    </dd>
                  </div>
                </dl>
                <div className="mt-7 border-t border-white/10 pt-6">
                  {panel.registerUrl ? (
                    <a
                      href={panel.registerUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-teal w-full"
                    >
                      Register <span className="arr">-&gt;</span>
                    </a>
                  ) : (
                    <Link href="/contact" className="btn btn-ghost-light w-full">
                      Ask About This Panel
                    </Link>
                  )}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-20">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">Panelists</span>
              <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
                The voices in the room.
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {panel.panelists.map((person, index) => (
              <Reveal key={person.name} delay={(index % 3) * 70} className="h-full">
                <div className="card-frame flex h-full items-center gap-5 p-6">
                  {person.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="h-20 w-20 shrink-0 rounded-full border border-line object-cover object-top"
                    />
                  ) : (
                    <span className="dark-canvas grid h-20 w-20 shrink-0 place-items-center rounded-full">
                      <span className="display text-[24px] italic text-teal">
                        {person.initials}
                      </span>
                    </span>
                  )}
                  <div>
                    <h3 className="display text-[22px] text-navy">
                      {person.name}
                    </h3>
                    <div className="mt-1 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-teal-deep">
                      Featured panelist
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Join Live"
        primary={
          panel.registerUrl
            ? { href: panel.registerUrl, label: "Register for This Panel" }
            : { href: "/events", label: "View Event Calendar" }
        }
        secondary={{ href: "/panels#series", label: "Watch Replays" }}
      />
    </>
  );
}
