import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { fetchPodcasts } from "@/lib/sheet";

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

  const image = episode.posterImage || episode.guestPhotoUrl;

  return (
    <>
      <section className="dark-canvas on-dark relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[48%] text-[clamp(120px,16vw,250px)]">
          episode
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-14 lg:pb-24 lg:pt-20">
          <Link href="/podcast#episodes" className="linkline !text-teal">
            <span className="arr">&lt;-</span> Back to archive
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
            <Reveal>
              <span className="kicker">Episode {episode.episode}</span>
              <h1 className="display mt-6 text-[clamp(34px,5vw,68px)] text-white">
                {episode.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/55">
                <span>{episode.guestName}</span>
                <span>{episode.datePublished}</span>
                <span>{episode.category}</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="signal-panel border border-white/12 bg-white/[0.04] p-6">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-navy-ink">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={episode.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="display text-[64px] italic text-teal">
                        {episode.initials}
                      </span>
                    </div>
                  )}
                </div>
                {episode.audioSource && (
                  <audio
                    controls
                    src={episode.audioSource}
                    className="mt-5 w-full"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 lg:grid-cols-[0.7fr_0.3fr]">
          <article>
            <Reveal>
              <span className="kicker">Episode Notes</span>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-muted">
                {paragraphs(episode.description).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </article>

          <Reveal delay={100}>
            <aside className="card-frame p-7">
              <h2 className="display text-[24px] text-navy">Listen and read</h2>
              <div className="mt-5 space-y-3">
                {episode.audioSource && (
                  <a
                    href={episode.audioSource}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-navy w-full"
                  >
                    Open Audio <span className="arr">-&gt;</span>
                  </a>
                )}
                {episode.transcriptUrl && (
                  <a
                    href={episode.transcriptUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-outline w-full"
                  >
                    Transcript
                  </a>
                )}
                {episode.episodeUrl && (
                  <a
                    href={episode.episodeUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-outline w-full"
                  >
                    Original BOA Page
                  </a>
                )}
              </div>
              <dl className="mt-7 space-y-4 border-t border-line pt-6 text-[13px]">
                <div>
                  <dt className="font-extrabold uppercase tracking-[0.18em] text-muted">
                    Guest
                  </dt>
                  <dd className="mt-1 font-bold text-ink">{episode.guestName}</dd>
                </div>
                <div>
                  <dt className="font-extrabold uppercase tracking-[0.18em] text-muted">
                    Category
                  </dt>
                  <dd className="mt-1 font-bold text-ink">{episode.category}</dd>
                </div>
                <div>
                  <dt className="font-extrabold uppercase tracking-[0.18em] text-muted">
                    Published
                  </dt>
                  <dd className="mt-1 font-bold text-ink">
                    {episode.datePublished}
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      {(newer || older) && (
        <section className="border-y border-line bg-paper py-16">
          <div className="mx-auto grid max-w-[1280px] gap-px overflow-hidden border border-line bg-line px-0 md:grid-cols-2">
            {newer && (
              <Link
                href={`/podcast/${newer.slug}`}
                className="group bg-paper p-7 transition-colors hover:bg-cream"
              >
                <span className="linkline">
                  Newer episode <span className="arr">-&gt;</span>
                </span>
                <h3 className="display mt-3 text-[22px] text-navy group-hover:text-teal-deep">
                  EP {newer.episode}: {newer.title}
                </h3>
              </Link>
            )}
            {older && (
              <Link
                href={`/podcast/${older.slug}`}
                className="group bg-paper p-7 transition-colors hover:bg-cream"
              >
                <span className="linkline">
                  Older episode <span className="arr">-&gt;</span>
                </span>
                <h3 className="display mt-3 text-[22px] text-navy group-hover:text-teal-deep">
                  EP {older.episode}: {older.title}
                </h3>
              </Link>
            )}
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Make It Practical"
        title={
          <>
            Turn this episode into <em>your next move.</em>
          </>
        }
        copy="Bring your goals, market, and current numbers to a free strategy meeting. We will help you translate the idea into a plan."
        primary={{ href: "/msm", label: "Book a Strategy Meeting" }}
        secondary={{ href: "/podcast#episodes", label: "Browse More Episodes" }}
      />
    </>
  );
}
