"use client";

/**
 * Standard site navigation - built for clarity.
 * One sticky row: logo left, the site's sections in plain words, and a
 * single booking CTA right. A slim announcement strip sits above and
 * scrolls away; mobile gets a hamburger + full-screen menu.
 */

import Link from "next/link";
import { asset } from "@/lib/asset";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/data";

/** Sliding indicator shared across nav links via layoutId. */
function ActiveMark() {
  return (
    <motion.span
      layoutId="nav-active-mark"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className="absolute inset-x-0 -bottom-[2px] h-[1.5px] bg-teal"
    />
  );
}

const links = [
  { href: "/about", label: "About" },
  { href: "/podcast", label: "Podcast" },
  { href: "/events", label: "Events" },
  { href: "/panels", label: "Panels" },
  { href: "/marketing", label: "Marketing" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/speakers", label: "Speakers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* announcement strip */}
      <div className="bg-navy-ink text-[12px] text-white/80">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-2.5">
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
              <b className="font-semibold text-teal">
                New · Ep {site.latestEpisode.number}
              </b>{" "}
              - {site.latestEpisode.guest}, {site.latestEpisode.title}
            </span>
            <span className="arr shrink-0 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* main navbar */}
      <header
        className={`sticky top-0 z-50 border-b border-line bg-paper transition-shadow duration-300 ${
          scrolled ? "shadow-[0_16px_36px_-26px_rgba(19,42,84,0.4)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Business of Aesthetics - home"
          >
            <Image
              src={asset("/assets/logo.png")}
              alt="Business of Aesthetics"
              width={196}
              height={57}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link relative ${
                  pathname === l.href || pathname.startsWith(`${l.href}/`)
                    ? "text-teal-deep"
                    : ""
                }`}
              >
                {l.label}
                {(pathname === l.href || pathname.startsWith(`${l.href}/`)) && (
                  <ActiveMark />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new Event("boa:search"))}
              aria-label="Search the site (Ctrl+K)"
              title="Search (Ctrl+K)"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-navy transition-colors hover:border-teal hover:text-teal-deep"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <ThemeToggle className="hidden sm:grid" />
            <Link
              href="/marketing#book"
              className="btn btn-navy hidden !px-6 !py-3 lg:inline-flex"
            >
              Book a Meeting <span className="arr">→</span>
            </Link>

            {/* hamburger */}
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-paper xl:hidden"
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="dark-canvas fixed inset-0 z-[60] flex flex-col overflow-y-auto xl:hidden"
          >
            <div className="fixed left-5 top-5 z-[70]">
              <ThemeToggle className="!border-white/25 !text-white hover:!text-teal" />
            </div>
            <button
              className="fixed right-5 top-5 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-teal hover:text-teal"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <div className="flex min-h-full flex-col px-7 pb-10 pt-24">
              <nav className="menu-stagger flex flex-col" aria-label="Mobile">
                {links.map((l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-3.5"
                  >
                    <span
                      className="index-no text-[13px]"
                      style={{ color: "var(--color-teal)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-[27px] text-white transition-colors group-hover:text-teal ${
                        pathname === l.href ? "!text-teal" : ""
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {l.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <Link href="/marketing#book" className="btn btn-teal w-full">
                  Book a Free Strategy Meeting <span className="arr">→</span>
                </Link>
                <div className="mt-6 flex flex-col gap-1.5 text-[13px] text-white/60">
                  <a
                    href={site.phoneHref}
                    className="transition-colors hover:text-teal"
                  >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
