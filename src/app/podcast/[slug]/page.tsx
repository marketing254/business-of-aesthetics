import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeUp } from "@/components/motion/Animate";
import TranscriptView from "@/components/TranscriptView";
import { fetchPodcasts, fetchTranscript } from "@/lib/sheet";
import { platforms } from "@/lib/data";

export const dynamic = "force-dynamic";

type PodcastDetailProps = {
  params: Promise<{ slug: string }>;
};

async function loadEpisode(slug: string) {
  const episodes = await fetchPodcasts();
  const index = episodes.findIndex((episode) => episode.slug === slug);
  return {
    episode: index >= 0 ? episodes[index] : null,
    newer: index > 0 ? episodes[index - 1] : null,
    older: index >= 0 && index < episodes.length - 1 ? episodes[index + 1] : null,
  };
}

export async function generateMetadata({
  params,
}: PodcastDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const { episode } = await loadEpisode(slug);
  if (!episode) return { title: "Podcast Episode" };

  return {
    title: `Episode ${episode.episode} - ${episode.title}`,
    description: episode.description,
  };
}

function paragraphs(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function PodcastDetailPage({ params }: PodcastDetailProps) {
  const { slug } = await params;
  const { episode, newer, older } = await loadEpisode(slug);
  if (!episode) notFound();

  const transcript = episode.transcriptUrl
    ? await fetchTranscript(episode.transcriptUrl)
    : [];
  const transcriptDocId =
    episode.transcriptUrl.match(/document\/d\/([\w-]+)/)?.[1] ?? "";

  return (
    <>
      {/* ============ header + player ============ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1180px] px-5 pb-4 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/podcast#episodes" className="linkline">
              <span className="arr">&lt;-</span> Back to all episodes
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="kicker">Episode #{episode.episode}</span>
              {episode.category && <span className="chip">{episode.category}</span>}
            </div>

            <h1 className="display mt-5 max-w-[1000px] text-[clamp(26px,3.4vw,41px)] text-navy">
              {episode.title}
            </h1>

            <div className="mt-4 text-[14px] font-semibold text-muted">
              {episode.datePublished}
              {episode.guestName && (
                <>
                  {" "}
                  · with{" "}
                  <span className="font-semibold text-navy">
                    {episode.guestName}
                  </span>
                </>
              )}
            </div>
          </FadeUp>

          {/* player card */}
          <FadeUp delay={0.1}>
            <div className="card-frame mt-9 flex flex-col items-center gap-6 p-5 sm:flex-row sm:p-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
                {episode.guestPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={episode.guestPhotoUrl}
                    alt={episode.guestName || episode.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="dark-canvas grid h-full w-full place-items-center">
                    <span className="display text-[24px] text-teal">
                      {episode.initials}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  <span className="live-dot" /> Listen to this episode
                </div>
                {episode.audioSource ? (
                  <audio
                    controls
                    preload="metadata"
                    src={episode.audioSource}
                    className="mt-3 w-full"
                  />
                ) : (
                  <p className="mt-3 text-[13.5px] text-muted">
                    Audio for this episode is being prepared.
                  </p>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============ show notes + sidebar ============ */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-5 lg:grid-cols-[1fr_320px]">
          <FadeUp>
            <article>
              <span className="kicker">Episode Show Notes</span>
              <h2 className="display mt-4 text-[clamp(24px,3vw,34px)] text-navy">
                About This Episode
              </h2>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-muted">
                {paragraphs(episode.description).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          </FadeUp>

          <div className="space-y-6 lg:sticky lg:top-28">
            <FadeUp delay={0.08}>
              <aside className="card-frame p-7">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                  Listen Anywhere
                </div>
                <h3 className="display mt-2 text-[22px] text-navy">
                  Subscribe to the Show
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  New episodes every week. Follow on your favourite platform.
                </p>
                <div className="mt-5 space-y-2.5">
                  {platforms.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center justify-between rounded-xl border border-line bg-cream px-4 py-3 text-[13.5px] font-semibold text-navy transition-all hover:border-teal hover:bg-paper hover:text-teal-deep"
                    >
                      {p.name}
                      <span className="arr transition-transform group-hover:translate-x-1">
                        -&gt;
                      </span>
                    </a>
                  ))}
                </div>
              </aside>
            </FadeUp>

            <FadeUp delay={0.14}>
              <aside className="card-frame p-7">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                  Episode Details
                </div>
                <dl className="mt-4 space-y-4 text-[13px]">
                  {episode.guestName && (
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.16em] text-muted">
                        Guest
                      </dt>
                      <dd className="mt-1 font-bold text-ink">
                        {episode.guestName}
                      </dd>
                    </div>
                  )}
                  {episode.category && (
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.16em] text-muted">
                        Category
                      </dt>
                      <dd className="mt-1 font-bold text-ink">
                        {episode.category}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-muted">
                      Published
                    </dt>
                    <dd className="mt-1 font-bold text-ink">
                      {episode.datePublished}
                    </dd>
                  </div>
                  {episode.contactInfo && (
                    <div>
                      <dt className="font-semibold uppercase tracking-[0.16em] text-muted">
                        Connect with the guest
                      </dt>
                      <dd className="mt-1 whitespace-pre-line break-words font-semibold leading-relaxed text-ink">
                        {episode.contactInfo}
                      </dd>
                    </div>
                  )}
                </dl>
              </aside>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============ transcript ============ */}
      {(transcript.length > 0 || transcriptDocId) && (
        <section id="transcript" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-[1180px] px-5">
            <FadeUp>
              <h2 className="display text-[clamp(24px,3vw,34px)] text-navy">
                Episode Transcript
              </h2>
            </FadeUp>
            <div className="mt-7">
              {transcript.length > 0 ? (
                <TranscriptView blocks={transcript} />
              ) : (
                <div className="card-frame overflow-hidden">
                  <iframe
                    src={`https://docs.google.com/document/d/${transcriptDocId}/preview`}
                    title={`Transcript — Episode ${episode.episode}`}
                    loading="lazy"
                    className="h-[720px] w-full border-0"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============ prev / next ============ */}
      {(newer || older) && (
        <section className="pb-4">
          <div className="mx-auto grid max-w-[1180px] gap-5 px-5 md:grid-cols-2">
            {older ? (
              <FadeUp>
                <Link
                  href={`/podcast/${older.slug}`}
                  className="card-frame group block h-full p-7"
                >
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                    &lt;- Previous Episode
                  </span>
                  <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                    {older.title}
                  </h3>
                </Link>
              </FadeUp>
            ) : (
              <div />
            )}
            {newer && (
              <FadeUp delay={0.08}>
                <Link
                  href={`/podcast/${newer.slug}`}
                  className="card-frame group block h-full p-7 md:text-right"
                >
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                    Next Episode -&gt;
                  </span>
                  <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                    {newer.title}
                  </h3>
                </Link>
              </FadeUp>
            )}
          </div>
        </section>
      )}

      {/* ============ guest CTA ============ */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <FadeUp>
            <span className="kicker center justify-center">
              Share Your Expertise
            </span>
            <h2 className="display mt-4 text-[clamp(24px,3.0vw,32px)] text-navy">
              Want to be a guest on <em>the show?</em>
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[15.5px] leading-relaxed text-muted">
              We&apos;re always looking for practice owners, clinicians, and
              industry experts with valuable insights to share with our
              audience.
            </p>
            <Link href="/speakers" className="btn btn-navy mt-8">
              Apply to Be a Guest <span className="arr">-&gt;</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
