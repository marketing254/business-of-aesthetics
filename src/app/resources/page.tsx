import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import NewsletterBand from "@/components/NewsletterBand";
import KbExplorer from "@/components/KbExplorer";
import ResourceDownloads from "@/components/ResourceDownloads";
import { bundledResources, type EpisodeResource } from "@/lib/episode-resources";
import { fetchPodcasts } from "@/lib/sheet";
import { tools } from "@/lib/data";
import { blogPosts } from "@/lib/blog";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import JsonLd from "@/components/JsonLd";
import { kbFaqs } from "@/lib/data";
import { breadcrumbJsonLd, faqPageJsonLd, graph, webPageJsonLd } from "@/lib/seo";


export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blogs, tools and a Knowledge Base / FAQ built for aesthetic practitioners - growth insights, practical calculators and answers to the questions we hear most.",
};

export default async function ResourcesPage() {
  // only show downloads for episodes that are actually published in the sheet
  const podcasts = await fetchPodcasts();
  const live = new Set(podcasts.map((p) => p.episode));
  const freebies: EpisodeResource[] = [
    ...podcasts.flatMap((p) => p.resources),
    ...bundledResources.filter((r) => live.has(r.episode)),
  ]
    .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
    .sort((a, b) => b.episode - a.episode);
  const kbStats = [
    { v: "294+", label: "Podcast Episodes" },
    { v: "297+", label: "Articles Published" },
    { v: "20+", label: "Live Webinars" },
    { v: String(freebies.length), label: "Free Downloads" },
  ];
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/resources", name: "Resources for Aesthetic Practices", description: metadata.description as string, type: "CollectionPage" }),
          faqPageJsonLd(kbFaqs.map((f) => ({ q: f.q, a: f.a }))),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])
        )}
      />
      <PageHero
        kicker="Resources"
        title={
          <>
            Practical wisdom for <em>growing a modern practice.</em>
          </>
        }
        lede="Our living library of blogs, working tools and the most common questions we hear from dermatology, plastic surgery and med-spa owners. Built to help you act - not just read."
      >
        <a href="#blogs" className="btn btn-navy">
          Explore Blogs <span className="arr">→</span>
        </a>
        <a href="#faq" className="btn btn-outline">
          Open the FAQ
        </a>
      </PageHero>

      {/* section nav */}
      <div className="sticky top-[57px] z-30 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] justify-start gap-8 overflow-x-auto px-5 py-3.5 sm:justify-center">
          {[
            { href: "#blogs", no: "01", label: "Blogs" },
            { href: "#tools", no: "02", label: "Tools" },
            { href: "#faq", no: "03", label: "Knowledge Base / FAQ" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="flex shrink-0 items-baseline gap-2.5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-teal-deep"
            >
              <span className="index-no">{s.no}</span> {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* blogs */}
      <section id="blogs" className="scroll-mt-32 bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Section 01 · Blogs"
            title={
              <>
                Insights from the front lines of{" "}
                <em>aesthetic practice growth.</em>
              </>
            }
            lede="Strategies, stories and field-tested tactics - published every week by practitioners and senior marketers who live inside this industry."
          />

          {/* latest articles from the real archive */}
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <Link
                  href={`/blog/${a.slug}`}
                  className="card-frame group flex h-full flex-col p-7"
                >
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {a.dateLabel} · {a.readMins} min read
                  </div>
                  <h3 className="mt-3 flex-1 text-[16px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                    {a.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
                    {a.excerpt}
                  </p>
                  <span className="linkline mt-5">
                    Read article <span className="arr">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp className="mt-10 text-center">
            <Link href="/blog" className="btn btn-outline">
              Browse All {blogPosts.length} Articles <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* tools */}
      <section
        id="tools"
        className="scroll-mt-32 border-y border-line bg-sand py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Section 02 · Tools"
            title={
              <>
                Free tools we actually <em>use with our clients.</em>
              </>
            }
            lede="Short, focused calculators and worksheets - nothing fluffy. Each one is built to give you a real answer in five minutes or less."
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <StaggerItem key={t.title} className="h-full">
                <div className="card-frame flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="chip">{t.tag}</span>
                    <span className="index-no text-[14px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-[19px] text-navy">
                    {t.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {t.desc}
                  </p>
                  <Link href="/contact" className="linkline mt-5">
                    {t.cta} <span className="arr">→</span>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* free episode downloads */}
      <section id="freebies" className="scroll-mt-32 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Free Practice Resources"
            title={
              <>
                Playbooks and toolkits from <em>recent episodes.</em>
              </>
            }
            lede="Each guide turns one podcast conversation into a practical, printable workbook for your team. Free to download - enter your details once and every resource on the site unlocks."
          />
          <div className="mt-12">
            {freebies.length > 0 ? (
              <ResourceDownloads
                resources={freebies}
                layout="grid"
                gateLabel="the free practice resources"
              />
            ) : (
              <p className="text-center text-[15px] text-muted">New resources are added with each episode - check back soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* knowledge base */}
      <section id="faq" className="scroll-mt-32 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Section 03 · Knowledge Base / FAQ"
            title={
              <>
                Answers to the questions we <em>hear every single week.</em>
              </>
            }
            lede="If you're evaluating BOA - or just trying to grow a practice in 2026 - start here. Pick a category to jump to relevant questions."
          />
          <div className="mt-12">
            <KbExplorer />
          </div>

          {/* stats */}
          <div className="mx-auto mt-16 grid max-w-[980px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {kbStats.map((s) => (
              <div key={s.label} className="bg-paper p-7 text-center">
                <div className="display text-[30px] text-navy">{s.v}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand />

      <CtaBand
        eyebrow="Still have a question?"
        title={
          <>
            Talk to a real human on <em>our team.</em>
          </>
        }
        copy="If you didn't find what you were looking for in the Knowledge Base, book a free 60-minute strategy meeting - or just send us a note. We reply to every email personally."
        primary={{ href: "/marketing#book", label: "Book My Strategy Meeting" }}
        secondary={{ href: "/contact", label: "Contact the Team" }}
      />
    </>
  );
}
