import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import LeadGate from "@/components/LeadGate";
import ShareBar from "@/components/ShareBar";
import ReplayNotes from "@/components/ReplayNotes";
import TranscriptView from "@/components/TranscriptView";
import VideoEmbed from "@/components/VideoEmbed";
import { FadeUp } from "@/components/motion/Animate";
import {
  driveFileId,
  fetchDocText,
  fetchDriveTranscript,
  fetchPanelReplays,
  fetchTranscript,
  structureNotes,
  videoEmbedUrl,
  type TranscriptBlock,
  legacyReplaySlug,
} from "@/lib/sheet";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, graph, videoObjectJsonLd } from "@/lib/seo";


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
  if (!replay) {
    const all = await fetchPanelReplays();
    const match = all.find((r) => legacyReplaySlug(r) === slug);
    if (match) permanentRedirect(`/panels/replays/${match.slug}`);
    notFound();
  }

  const embed = videoEmbedUrl(replay.videoUrl);
  // when the sheet's description cell is a Google Doc link, pull its content
  // onto the page and structure it (meta grid + sections)
  const noteLines = replay.descriptionIsLink
    ? await fetchDocText(replay.description)
    : blocks(replay.description || "");
  const notes = structureNotes(noteLines);
  const summaryLines = blocks(replay.summary || "");

  // transcript: Google Doc or Drive file (WebVTT / plain text)
  let transcript: TranscriptBlock[] = [];
  let transcriptFileId = "";
  if (replay.transcript) {
    if (/docs\.google\.com\/document/i.test(replay.transcript)) {
      transcript = await fetchTranscript(replay.transcript);
    } else if (driveFileId(replay.transcript)) {
      transcript = await fetchDriveTranscript(replay.transcript);
      if (!transcript.length) transcriptFileId = driveFileId(replay.transcript);
    }
  }

  return (
    <>
      <JsonLd
        data={graph(
          videoObjectJsonLd(replay, `/panels/replays/${replay.slug}`, embed || undefined),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Expert Panels", path: "/panels" },
            { name: "Replays", path: "/panels#replays" },
            { name: replay.title, path: `/panels/replays/${replay.slug}` },
          ])
        )}
      />
      {/* centered header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/panels#replays" className="linkline">
              <span className="arr">&lt;-</span> Back to panel replays
            </Link>

            <div className="mx-auto mt-8 max-w-[820px] text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="kicker center justify-center">
                  Panel Replay
                </span>
                {replay.category && (
                  <span className="chip teal">{replay.category}</span>
                )}
              </div>
              <h1 className="display mx-auto mt-5 text-[clamp(27px,3.7vw,42px)] text-navy">
                {replay.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                {replay.date && <span>Recorded {replay.date}</span>}
                {replay.duration && (
                  <>
                    <span className="text-line">·</span>
                    <span>{replay.duration}</span>
                  </>
                )}
              </div>
              <div className="mt-5 flex justify-center">
                <ShareBar title={replay.title} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* video */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-[980px] px-5">
          {embed ? (
            <FadeUp>
              <LeadGate label="this replay" variant="panel" meta={{ form: "panel_replay_gate", title: replay.title, slug: replay.slug, date: replay.date }}>
                <VideoEmbed embedUrl={embed} title={replay.title} poster={replay.imageUrl || undefined} />
              </LeadGate>
            </FadeUp>
          ) : replay.videoUrl ? (
            <FadeUp>
              <LeadGate label="this replay" variant="panel" meta={{ form: "panel_replay_gate", title: replay.title, slug: replay.slug, date: replay.date }}>
                <div className="grid aspect-video place-items-center rounded-2xl border border-line bg-sand">
                  <a
                    href={replay.videoUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-navy"
                  >
                    Watch the Replay <span className="arr">→</span>
                  </a>
                </div>
              </LeadGate>
            </FadeUp>
          ) : (
            <FadeUp>
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-sand px-8 py-20 text-center">
                <span className="chip teal">{replay.category || "Replay"}</span>
                <p className="display text-[clamp(24px,3vw,32px)] text-navy">
                  Video coming to this replay soon.
                </p>
                <p className="max-w-[440px] text-[14px] leading-relaxed text-muted">
                  In the meantime, the notes below cover the full session.
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* notes */}
      <section className="border-t border-line bg-paper py-18 lg:py-20">
        <div className="mx-auto max-w-[780px] px-5">
          <FadeUp>
            <div className="text-center">
              <span className="kicker center justify-center">Panel Notes</span>
              <h2 className="display mt-4 text-[clamp(23px,2.8vw,30px)] text-navy">
                What to revisit.
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="mt-10">
              {summaryLines.length > 0 && (
                <div className="mb-8 space-y-4 text-[15px] leading-[1.85] text-ink/85">
                  {summaryLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
              <ReplayNotes notes={notes} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* transcript */}
      {(transcript.length > 0 || transcriptFileId) && (
        <section className="border-t border-line py-18 lg:py-20">
          <div className="mx-auto max-w-[880px] px-5">
            <FadeUp>
              <div className="text-center">
                <span className="kicker center justify-center">Transcript</span>
                <h2 className="display mt-4 text-[clamp(23px,2.8vw,30px)] text-navy">
                  Read the full conversation.
                </h2>
              </div>
            </FadeUp>
            <div className="mt-9">
              {transcript.length > 0 ? (
                <TranscriptView blocks={transcript} />
              ) : (
                <div className="card-frame overflow-hidden">
                  <iframe
                    src={`https://drive.google.com/file/d/${transcriptFileId}/preview`}
                    title={`Transcript - ${replay.title}`}
                    loading="lazy"
                    className="h-[640px] w-full border-0"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Panel Archive"
        primary={{ href: "/panels#replays", label: "More Panel Replays" }}
        secondary={{ href: "/events", label: "Event Calendar" }}
      />
    </>
  );
}
