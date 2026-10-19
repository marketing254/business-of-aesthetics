import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeUp } from "@/components/motion/Animate";
import TranscriptView from "@/components/TranscriptView";
import LeadGate from "@/components/LeadGate";
import ShareBar from "@/components/ShareBar";
import EpisodeAudio from "@/components/EpisodeAudio";
import { fetchPodcasts, fetchTranscript, thumbUrl } from "@/lib/sheet";
import { platforms } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, graph, podcastEpisodeJsonLd } from "@/lib/seo";


type PodcastDetailProps = {
  params: Promise<{ slug: string }>;
};

function PlatformIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "Spotify":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.44a.62.62 0 0 1-.86.21c-2.36-1.44-5.33-1.77-8.83-.97a.63.63 0 0 1-.28-1.22c3.83-.88 7.12-.5 9.76 1.11a.62.62 0 0 1 .21.87Zm1.22-2.72a.78.78 0 0 1-1.08.26c-2.7-1.66-6.82-2.14-10.02-1.17a.78.78 0 1 1-.45-1.5c3.65-1.1 8.19-.57 11.29 1.33a.78.78 0 0 1 .26 1.08Zm.11-2.83c-3.24-1.92-8.6-2.1-11.7-1.16a.94.94 0 1 1-.54-1.8c3.56-1.08 9.47-.87 13.2 1.34a.94.94 0 0 1-.96 1.62Z" />
        </svg>
      );
    case "Apple Podcasts":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.4a2.9 2.9 0 0 1 2.9 2.9c0 1.11-.62 2.07-1.53 2.56.4.19.71.56.78 1.03l.55 3.55a.6.6 0 0 1-.59.69h-4.22a.6.6 0 0 1-.59-.69l.55-3.55c.07-.47.38-.84.78-1.03A2.9 2.9 0 0 1 9.1 8.3 2.9 2.9 0 0 1 12 5.4Zm0 9.3c1.98 0 3.75.55 4.98 1.4a.5.5 0 0 1 .13.68 8 8 0 0 1-10.22 0 .5.5 0 0 1 .13-.68c1.23-.85 3-1.4 4.98-1.4Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
        </svg>
      );
    case "Amazon Music":
      return (
        <svg {...common}>
          <path d="M9 3v10.55A3.5 3.5 0 1 0 11 16.5V7h5V3H9Z" />
        </svg>
      );
    case "Android":
      return (
        <svg {...common}>
          <path d="M6.5 8.5v6a1 1 0 0 0 1 1H8v2.5a1.25 1.25 0 0 0 2.5 0V15.5h3V18a1.25 1.25 0 0 0 2.5 0V15.5h.5a1 1 0 0 0 1-1v-6h-11Zm.9-1.3 1.1-1.9.5.29-1.06 1.85a5.7 5.7 0 0 1 8.12 0l-1.06-1.85.5-.29 1.1 1.9a5.68 5.68 0 0 1 1.94 4.13h-13a5.68 5.68 0 0 1 1.86-4.14ZM9.5 9.7a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm5 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4ZM4 9.3a1 1 0 0 1 1 1v3.4a1 1 0 1 1-2 0v-3.4a1 1 0 0 1 1-1Zm16 0a1 1 0 0 1 1 1v3.4a1 1 0 1 1-2 0v-3.4a1 1 0 0 1 1-1Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

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

  const description = episode.description.replace(/\s+/g, " ").slice(0, 160);
  return {
    title: `Episode ${episode.episode} - ${episode.title}`,
    description,
    alternates: { canonical: `/podcast/${episode.slug}` },
    openGraph: {
      type: "article",
      title: `Ep ${episode.episode}: ${episode.title}`,
      description,
      url: `/podcast/${episode.slug}`,
      ...(episode.posterImage || episode.guestPhotoUrl
        ? { images: [{ url: episode.posterImage || episode.guestPhotoUrl }] }
        : {}),
    },
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
      <JsonLd
        data={graph(
          podcastEpisodeJsonLd(episode),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Podcast", path: "/podcast" },
            { name: `Episode ${episode.episode}`, path: `/podcast/${episode.slug}` },
          ])
        )}
      />
      {/* ============ header + player ============ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1180px] px-5 pb-4 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/podcast#episodes" className="linkline">
              <span className="arr">&lt;-</span> Back to all episodes
            </Link>

            <div className="mx-auto mt-8 max-w-[880px] text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="kicker center justify-center">
                  Episode #{episode.episode}
                </span>
                {episode.category && (
                  <span className="chip">{episode.category}</span>
                )}
              </div>

              <h1 className="display mx-auto mt-5 text-[clamp(26px,3.4vw,40px)] text-navy">
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

              <div className="mt-5 flex justify-center">
                <ShareBar title={episode.title} />
              </div>
            </div>
          </FadeUp>

          {/* player card */}
          <FadeUp delay={0.1}>
            <div className="card-frame mx-auto mt-9 flex max-w-[880px] flex-col items-center gap-6 p-5 sm:flex-row sm:p-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
                {episode.guestPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbUrl(episode.guestPhotoUrl, 240)}
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
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  <span className="live-dot" /> Listen to this episode
                </div>
                {episode.audioSource ? (
                  <LeadGate label="this episode" meta={{ form: "podcast_gate", title: episode.title, slug: episode.slug, episode: episode.episode, date: episode.datePublished }}>
                    <div className="mt-3">
                      <EpisodeAudio
                        src={episode.audioSource}
                        slug={episode.slug}
                        title={episode.title}
                        href={`/podcast/${episode.slug}`}
                      />
                    </div>
                  </LeadGate>
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

              {(transcript.length > 0 || transcriptDocId) && (
                <div id="transcript" className="mt-14 scroll-mt-24 border-t border-line pt-10">
                  <span className="kicker">Transcript</span>
                  <h2 className="display mt-4 text-[clamp(22px,2.6vw,28px)] text-navy">
                    Read the full conversation
                  </h2>
                  <div className="mt-6">
                    {transcript.length > 0 ? (
                      <TranscriptView blocks={transcript} />
                    ) : (
                      <div className="card-frame overflow-hidden">
                        <iframe
                          src={`https://docs.google.com/document/d/${transcriptDocId}/preview`}
                          title={`Transcript - Episode ${episode.episode}`}
                          loading="lazy"
                          className="h-[640px] w-full border-0"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          </FadeUp>

          <div className="space-y-6 lg:sticky lg:top-28">
            <FadeUp delay={0.08}>
              <aside className="card-frame p-7">
                <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
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
                      <span className="flex items-center gap-3">
                        <span className="text-teal-deep">
                          <PlatformIcon name={p.name} />
                        </span>
                        {p.name}
                      </span>
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
                <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
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
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
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
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
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
