import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import KbExplorer from "@/components/KbExplorer";
import { featuredArticle, articles, tools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blogs, tools and a Knowledge Base / FAQ built for aesthetic practitioners — growth insights, practical calculators and answers to the questions we hear most.",
};

const kbStats = [
  { v: "284+", label: "Podcast Episodes" },
  { v: "120+", label: "Articles Published" },
  { v: "20+", label: "Live Webinars" },
  { v: "9", label: "Free Tools" },
];

export default function ResourcesPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          learn
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Resources</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,64px)] text-navy">
              Practical wisdom for <em>growing a modern practice.</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Our living library of blogs, working tools and the most common
              questions we hear from dermatology, plastic surgery and med-spa
              owners. Built to help you act — not just read.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#blogs" className="btn btn-navy">
                Explore Blogs <span className="arr">→</span>
              </a>
              <a href="#faq" className="btn btn-outline">
                Open the FAQ
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="offset-frame tone-img relative mx-auto aspect-[4/3] max-w-[500px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/resources-hero.jpg"
                alt="The BOA resource library"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* section nav */}
      <div className="sticky top-[57px] z-30 border-y border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] gap-8 overflow-x-auto px-5 py-3.5">
          {[
            { href: "#blogs", no: "01", label: "Blogs" },
            { href: "#tools", no: "02", label: "Tools" },
            { href: "#faq", no: "03", label: "Knowledge Base / FAQ" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="flex shrink-0 items-baseline gap-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy transition-colors hover:text-teal-deep"
            >
              <span className="index-no">{s.no}</span> {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* blogs */}
      <section id="blogs" className="scroll-mt-32 bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[720px]">
              <span className="kicker">Section 01 · Blogs</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Insights from the front lines of{" "}
                <em>aesthetic practice growth.</em>
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                Strategies, stories and field-tested tactics — published every
                week by practitioners and senior marketers who live inside this
                industry.
              </p>
            </div>
          </Reveal>

          {/* featured */}
          <Reveal delay={100}>
            <a
              href="#blogs"
              className="card-frame group mt-12 grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="tone-img relative min-h-[280px]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
                <span className="chip teal absolute left-5 top-5">
                  {featuredArticle.tag}
                </span>
              </div>
              <div className="flex flex-col justify-center p-9 lg:p-14">
                <h3 className="display text-[clamp(23px,2.5vw,32px)] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {featuredArticle.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                  {featuredArticle.desc}
                </p>
                <div className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.16em] text-muted">
                  {featuredArticle.date} · {featuredArticle.read} ·{" "}
                  {featuredArticle.author}
                </div>
                <span className="linkline mt-6">
                  Read the full article <span className="arr">→</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* grid */}
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 80} className="h-full">
                <a
                  href="#blogs"
                  className="card-frame group flex h-full flex-col overflow-hidden"
                >
                  <div className="tone-img relative aspect-[16/9]">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="chip solid absolute left-4 top-4">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display flex-1 text-[18px] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      {a.desc}
                    </p>
                    <div className="mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted">
                      {a.date} · {a.read}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#blogs" className="btn btn-outline">
              Browse all articles <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* tools */}
      <section id="tools" className="scroll-mt-32 border-y border-line bg-sand py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[720px]">
              <span className="kicker">Section 02 · Tools</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Free tools we actually <em>use with our clients.</em>
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                Short, focused calculators and worksheets — nothing fluffy. Each
                one is built to give you a real answer in five minutes or less.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 70} className="h-full">
                <div className="card-frame flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="chip">{t.tag}</span>
                    <span className="index-no text-[14px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-[20px] text-navy">
                    {t.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {t.desc}
                  </p>
                  <Link href="/contact" className="linkline mt-5">
                    {t.cta} <span className="arr">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* knowledge base */}
      <section id="faq" className="scroll-mt-32 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[720px]">
              <span className="kicker">Section 03 · Knowledge Base / FAQ</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Answers to the questions we <em>hear every single week.</em>
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                If you&apos;re evaluating BOA — or just trying to grow a
                practice in 2026 — start here. Click a category on the left to
                jump to relevant questions.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <KbExplorer />
          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
            {kbStats.map((s) => (
              <div key={s.label} className="bg-paper p-7 text-center">
                <div className="display text-[32px] text-navy">{s.v}</div>
                <div className="mt-1 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-teal-deep">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Still have a question?"
        title={
          <>
            Talk to a real human on <em>our team.</em>
          </>
        }
        copy="If you didn't find what you were looking for in the Knowledge Base, book a free 60-minute strategy meeting — or just send us a note. We reply to every email personally."
        primary={{ href: "/msm", label: "Book My Strategy Meeting" }}
        secondary={{ href: "/contact", label: "Contact the Team" }}
      />
    </>
  );
}
