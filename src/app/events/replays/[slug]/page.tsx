import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { fetchEventReplays } from "@/lib/sheet";

export const dynamic = "force-dynamic";

type ReplayDetailProps = {
  params: Promise<{ slug: string }>;
};

async function loadReplay(slug: string) {
  const replays = await fetchEventReplays();
  return replays.find((replay) => replay.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: ReplayDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const replay = await loadReplay(slug);
  if (!replay) return { title: "Event Replay" };

  return {
    title: `${replay.title} - Event Replay`,
    description: replay.summary || replay.description,
  };
}

function blocks(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function embedUrl(url: string) {
  const trimmed = url.trim();
  const youtube =
    trimmed.match(/youtu\.be\/([^?]+)/i) ||
    trimmed.match(/[?&]v=([^&]+)/i);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const vimeo = trimmed.match(/vimeo\.com\/(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return "";
}

export default async function EventReplayDetailPage({
  params,
}: ReplayDetailProps) {
  const { slug } = await params;
  const replay = await loadReplay(slug);
  if (!replay) notFound();

  const embed = embedUrl(replay.videoUrl);

  return (
    <>
      <section className="dark-canvas on-dark relative overflow-hidden">
        <div className="ghost-word right-[-4%] top-[50%] text-[clamp(110px,15vw,230px)]">
          replay
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-14 lg:pb-24 lg:pt-20">
          <Link href="/events#replays" className="linkline !text-teal">
            <span className="arr">&lt;-</span> Back to event replays
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.68fr_0.32fr]">
            <Reveal>
              <span className="kicker">Event Replay</span>
              <h1 className="display mt-6 text-[clamp(34px,5vw,66px)] text-white">
                {replay.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                <span>{replay.date}</span>
                <span>{replay.duration}</span>
                <span>{replay.category}</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="signal-panel border border-white/12 bg-white/[0.04] p-7">
                <span className="chip teal">Replay</span>
                <p className="mt-5 text-[14px] leading-relaxed text-white/70">
                  Watch the replay, then use the notes and transcript links to
                  review the decisions with your team.
                </p>
                <div className="mt-7 space-y-3">
                  {replay.videoUrl && (
                    <a
                      href={replay.videoUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-teal w-full"
                    >
                      Watch Source <span className="arr">-&gt;</span>
                    </a>
                  )}
                  {replay.descriptionIsLink && (
                    <a
                      href={replay.description}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-ghost-light w-full"
                    >
                      Briefing Doc
                    </a>
                  )}
                  {replay.transcript && (
                    <a
                      href={replay.transcript}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-ghost-light w-full"
                    >
                      Transcript
                    </a>
                  )}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          {embed ? (
            <Reveal>
              <div className="overflow-hidden border border-line bg-navy-ink">
                <iframe
                  src={embed}
                  title={replay.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
            </Reveal>
          ) : replay.imageUrl ? (
            <Reveal>
              <div className="signal-panel border border-line bg-paper p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={replay.imageUrl}
                  alt={replay.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[560px] w-full object-contain"
                />
              </div>
            </Reveal>
          ) : null}

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <Reveal>
              <div>
                <span className="kicker">Replay Notes</span>
                <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
                  Key takeaways and context.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-[15.5px] leading-relaxed text-muted">
                {blocks(replay.summary || "").map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {!replay.descriptionIsLink &&
                  blocks(replay.description || "").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Replay Library"
        primary={{ href: "/events#replays", label: "More Event Replays" }}
        secondary={{ href: "/panels", label: "Panel Replays" }}
      />
    </>
  );
}
