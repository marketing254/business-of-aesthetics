"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const links = [
  { href: "/about", label: "About" },
  { href: "/podcast", label: "Podcast" },
  { href: "/events", label: "Events" },
  { href: "/panels", label: "Panels" },
  { href: "/resources", label: "Resources" },
  { href: "/speakers", label: "Speakers" },
  { href: "/contact", label: "Contact" },
];

const services = [
  {
    href: "/marketing",
    no: "01",
    title: "Marketing Services",
    sub: "MSM — SEO, Social, Web & Reputation, built for aesthetic specialists.",
  },
  {
    href: "/csm",
    no: "02",
    title: "Coaching (CSM)",
    sub: "1-on-1 practice coaching with Gary Bird — leadership, pricing, growth.",
  },
  {
    href: "/case-studies",
    no: "03",
    title: "Case Studies",
    sub: "Real client success stories from practices across North America.",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileSvc, setMobileSvc] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setOpen(false);
      setSvcOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const servicesActive = ["/marketing", "/csm", "/case-studies"].includes(
    pathname
  );

  return (
    <>
      {/* announcement bar */}
      <div
        className={`bg-navy-ink text-white/80 text-[12px] overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-2.5">
          <div className="flex items-center gap-5 whitespace-nowrap">
            <a
              href={site.phoneHref}
              className="hidden font-bold tracking-wide transition-colors hover:text-teal sm:block"
            >
              Toll-Free {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden tracking-wide transition-colors hover:text-teal md:block"
            >
              {site.email}
            </a>
          </div>
          <Link
            href="/podcast"
            className="group flex min-w-0 items-center gap-2.5 transition-colors hover:text-teal"
          >
            <span className="live-dot shrink-0" />
            <span className="truncate">
              <b className="font-extrabold text-teal">
                New · Ep {site.latestEpisode.number}
              </b>{" "}
              — {site.latestEpisode.guest}, {site.latestEpisode.title}
            </span>
            <span className="arr shrink-0 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* main navbar */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-cream/90 shadow-[0_10px_40px_-18px_rgba(19,42,84,0.25)] backdrop-blur-md"
            : "border-line/70 bg-cream"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="Business of Aesthetics — home">
            <Image
              src="/assets/logo.png"
              alt="Business of Aesthetics"
              width={196}
              height={57}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-10" : "h-12"
              }`}
            />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
            {links.slice(0, 4).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname === l.href ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}

            {/* services mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <button
                className={`nav-link flex items-center gap-1.5 ${
                  servicesActive ? "active" : ""
                }`}
                aria-expanded={svcOpen}
                onClick={() => setSvcOpen((v) => !v)}
              >
                Services
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    svcOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1l3.5 3.5L8 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                className={`absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4 transition-all duration-200 ${
                  svcOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1.5 opacity-0"
                }`}
              >
                <div className="grid grid-cols-[1.2fr_1fr] overflow-hidden rounded-[3px] border border-line bg-paper shadow-[0_40px_80px_-30px_rgba(12,18,41,0.35)]">
                  <div className="flex flex-col p-3">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="group/svc flex gap-4 rounded-[2px] p-4 transition-colors hover:bg-sand"
                      >
                        <span className="index-no text-[15px] leading-6">
                          {s.no}
                        </span>
                        <span>
                          <span className="block text-[14px] font-extrabold tracking-wide text-navy transition-colors group-hover/svc:text-teal-deep">
                            {s.title}
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">
                            {s.sub}
                          </span>
                        </span>
                        <span className="arr ml-auto self-center text-teal-deep opacity-0 transition-all group-hover/svc:translate-x-1 group-hover/svc:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="dark-canvas flex flex-col justify-between p-6">
                    <div>
                      <div className="kicker" style={{ color: "var(--color-teal)" }}>
                        Free
                      </div>
                      <p
                        className="display mt-3 text-[21px] leading-snug text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        60-minute Strategy Meeting with a{" "}
                        <em>senior advisor</em>.
                      </p>
                    </div>
                    <Link href="/msm" className="btn btn-teal mt-6 !px-5 !py-3">
                      Book a Meeting <span className="arr">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {links.slice(4).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname === l.href ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/msm" className="btn btn-navy hidden !px-6 !py-3.5 lg:inline-flex">
              Book a Meeting <span className="arr">→</span>
            </Link>

            {/* hamburger */}
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-[2px] border border-line bg-paper xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="h-[1.5px] w-5 bg-navy" />
              <span className="h-[1.5px] w-5 bg-navy" />
              <span className="h-[1.5px] w-5 bg-navy" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div
        className={`dark-canvas fixed inset-0 z-[60] flex flex-col overflow-y-auto transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          className="fixed right-5 top-5 z-[70] grid h-12 w-12 place-items-center rounded-[2px] border border-white/25 text-white transition-colors hover:border-teal hover:text-teal"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="flex min-h-full flex-col px-7 pb-10 pt-24">
          {open && (
            <nav className="menu-stagger flex flex-col" aria-label="Mobile">
              {links.slice(0, 4).map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                >
                  <span className="index-no text-[13px]" style={{ color: "var(--color-teal)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-[30px] text-white transition-colors group-hover:text-teal ${
                      pathname === l.href ? "!text-teal" : ""
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}

              <button
                className="flex w-full items-baseline gap-4 border-b border-white/10 py-4 text-left"
                onClick={() => setMobileSvc((v) => !v)}
                aria-expanded={mobileSvc}
              >
                <span className="index-no text-[13px]" style={{ color: "var(--color-teal)" }}>
                  05
                </span>
                <span
                  className="display text-[30px] text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Services
                </span>
                <span
                  className={`ml-auto self-center font-display text-[22px] text-teal transition-transform duration-200 ${
                    mobileSvc ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {mobileSvc && (
                <div className="flex flex-col border-b border-white/10 py-2 pl-10">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="py-2.5 text-[16px] font-bold text-white/85 transition-colors hover:text-teal"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}

              {links.slice(4).map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                >
                  <span className="index-no text-[13px]" style={{ color: "var(--color-teal)" }}>
                    {String(i + 6).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-[30px] text-white transition-colors group-hover:text-teal ${
                      pathname === l.href ? "!text-teal" : ""
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </nav>
          )}

          <div className="mt-auto pt-10">
            <Link href="/msm" className="btn btn-teal w-full">
              Book a Free Strategy Meeting <span className="arr">→</span>
            </Link>
            <div className="mt-6 flex flex-col gap-1.5 text-[13px] text-white/60">
              <a href={site.phoneHref} className="transition-colors hover:text-teal">
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-teal"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
