import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { FadeUp, Stagger, StaggerItem, DrawLine } from "@/components/motion/Animate";
import TiltCard from "@/components/motion/TiltCard";
import { fetchPanelReplays, videoEmbedUrl } from "@/lib/sheet";

type PanelReplayProps = {
  params: Promise<{ slug: string }>;
};

async function loadReplay(slug: string) {
  const replays = await fetchPanelReplays();
  return replays.find((replay) => replay.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: PanelReplayProps): Promise<Metadata> {
  const { slug } = await params;
  const replay = await loadReplay(slug);
  if (!replay) return { title: "Panel Replay" };

  return {
    title: `${replay.title} - Panel Replay`,
    description: replay.summary || replay.description,
  };
}

function blocks(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function PanelReplayPage({ params }: PanelReplayProps) {
  const { slug } = await params;
  const replay = await loadReplay(slug);
  if (!replay) notFound();

  const embed = videoEmbedUrl(replay.videoUrl);

  return (
    <>
      <section className="dark-canvas on-dark relative overflow-hidden">
        <div className="ghost-word right-[-4%] top-[50%] text-[clamp(110px,15vw,230px)]">
          replay
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-14 lg:pb-24 lg:pt-20">
          <Link href="/panels#series" className="linkline !text-teal">
            <span className="arr">&lt;-</span> Back to panel replays
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.68fr_0.32fr]">
            <FadeUp>
              <span className="kicker">Panel Replay</span>
              <h1 className="display mt-6 text-[clamp(29px,4.1vw,50px)] text-white">
                {replay.title}
              </h1>
              <Stagger className="mt-6 flex flex-wrap gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/55">
                <StaggerItem>
                  <span>{replay.date}</span>
                </StaggerItem>
                <StaggerItem>
                  <span>{replay.duration}</span>
                </StaggerItem>
                <StaggerItem>
                  <span>{replay.category}</span>
                </StaggerItem>
              </Stagger>
            </FadeUp>

            <FadeUp delay={0.12}>
              <aside className="signal-panel border border-white/12 bg-white/[0.04] p-7">
                <span className="chip teal">Replay</span>
                <p className="mt-5 text-[14px] leading-relaxed text-white/70">
                  Watch the panel and keep the source documents close for team
                  review, training, or follow-up planning.
                </p>
                <Stagger className="mt-7 space-y-3">
                  {replay.videoUrl && (
                    <StaggerItem>
                      <a
                        href={replay.videoUrl}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-teal w-full"
                      >
                        Watch Source <span className="arr">-&gt;</span>
                      </a>
                    </StaggerItem>
                  )}
                  {replay.descriptionIsLink && (
                    <StaggerItem>
                      <a
                        href={replay.description}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-ghost-light w-full"
                      >
                        Description Doc
                      </a>
                    </StaggerItem>
                  )}
                  {replay.transcript && (
                    <StaggerItem>
                      <a
                        href={replay.transcript}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-ghost-light w-full"
                      >
                        Transcript
                      </a>
                    </StaggerItem>
                  )}
                </Stagger>
              </aside>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          {embed ? (
            <FadeUp>
              <TiltCard maxTilt={5} className="overflow-hidden border border-line bg-navy-ink">
                <iframe
                  src={embed}
                  title={replay.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </TiltCard>
            </FadeUp>
          ) : (
            <FadeUp>
              <div className="signal-panel flex flex-col items-center justify-center gap-4 border border-line bg-sand px-8 py-20 text-center">
                <span className="chip teal">{replay.category || "Replay"}</span>
                <p className="display text-[clamp(24px,3vw,34px)] text-navy">
                  {replay.videoUrl
                    ? "Watch this session via the source link above."
                    : "Video coming to this replay soon."}
                </p>
                <p className="max-w-[440px] text-[14px] leading-relaxed text-muted">
                  In the meantime, the notes below cover the full panel.
                </p>
              </div>
            </FadeUp>
          )}

          <DrawLine className="mt-14 h-px w-full bg-line" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <FadeUp>
              <div>
                <span className="kicker">Panel Notes</span>
                <h2 className="display mt-5 text-[clamp(24px,3.1vw,33px)] text-navy">
                  What to revisit.
                </h2>
              </div>
            </FadeUp>
            <Stagger className="space-y-5 text-[15.5px] leading-relaxed text-muted">
              {blocks(replay.summary || "").map((line) => (
                <StaggerItem key={line}>
                  <p>{line}</p>
                </StaggerItem>
              ))}
              {!replay.descriptionIsLink &&
                blocks(replay.description || "").map((line) => (
                  <StaggerItem key={line}>
                    <p>{line}</p>
                  </StaggerItem>
                ))}
            </Stagger>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Panel Archive"
        primary={{ href: "/panels#series", label: "More Panel Replays" }}
        secondary={{ href: "/events", label: "Event Calendar" }}
      />
    </>
  );
}
