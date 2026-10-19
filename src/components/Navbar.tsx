"use client";

/**
 * Standard site navigation - built for clarity.
 * One sticky row: logo left, the site's sections in plain words (two of
 * them with dropdowns: Events and Resources), and a single booking CTA
 * right. A slim announcement strip sits above and scrolls away; mobile
 * gets a hamburger + full-screen menu with the same groups expanded.
 */

import Link from "next/link";
import { asset } from "@/lib/asset";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

export interface NavChild {
  href: string;
  label: string;
  hint?: string;
}

export interface NavItem {
  href: string;
  label: string;
  /** paths (prefix match) that light this item up */
  match?: string[];
  children?: NavChild[];
  /** static HTML page outside the app router - use a full page load */
  plain?: boolean;
}

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/podcast", label: "Podcast" },
  {
    href: "/events",
    label: "Events",
    match: ["/events", "/panels"],
    children: [
      { href: "/events", label: "Upcoming Events", hint: "Live webinars & workshops" },
      { href: "/panels", label: "Expert Panels", hint: "Moderated live roundtables" },
      { href: "/events#replays", label: "Event Replays", hint: "Watch past webinars free" },
      { href: "/panels#replays", label: "Panel Replays", hint: "Every panel recording" },
    ],
  },
  { href: "/marketing", label: "Marketing" },
  {
    href: "/resources",
    label: "Resources",
    match: ["/resources", "/blog"],
    children: [
      { href: "/blog", label: "Blog", hint: "Growth articles for practices" },
    ],
  },
  { href: "/speakers", label: "Speakers" },
  { href: "/contact", label: "Contact" },
];

function isActive(item: NavItem, pathname: string) {
  const paths = item.match ?? [item.href];
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Desktop item with a hover/focus/click dropdown. */
function DesktopDropdown({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`nav-link relative inline-flex items-center gap-1.5 ${
          active ? "text-teal-deep" : ""
        }`}
      >
        {item.label}
        <Chevron open={open} />
        {active && <ActiveMark />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.21, 1] }}
            className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-4"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_48px_-24px_rgba(19,42,84,0.35)]">
              {item.children!.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors hover:bg-sand focus:bg-sand focus:outline-none"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal opacity-60 transition-opacity group-hover:opacity-100" />
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-navy transition-colors group-hover:text-teal-deep">
                      {c.label}
                    </span>
                    {c.hint && (
                      <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                        {c.hint}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

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
            className="group flex min-w-0 items-center gap-2.5 py-1 transition-colors hover:text-teal"
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
            {navItems.map((item) => {
              const active = isActive(item, pathname);
              if (item.children) {
                return <DesktopDropdown key={item.href} item={item} active={active} />;
              }
              if (item.plain) {
                return (
                  <a key={item.href} href={item.href} className="nav-link relative">
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link relative ${active ? "text-teal-deep" : ""}`}
                >
                  {item.label}
                  {active && <ActiveMark />}
                </Link>
              );
            })}
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
                {navItems.map((item, i) => {
                  const active = isActive(item, pathname);
                  const isOpen = expanded === item.href;
                  return (
                    <div key={item.href} className="border-b border-white/10">
                      <div className="flex items-baseline gap-4 py-3.5">
                        <span
                          className="index-no text-[13px]"
                          style={{ color: "var(--color-teal)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.plain ? (
                          <a
                            href={item.href}
                            className="display flex-1 text-[27px] text-white transition-colors hover:text-teal"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={`display flex-1 text-[27px] text-white transition-colors hover:text-teal ${
                              active ? "!text-teal" : ""
                            }`}
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.label}
                          </Link>
                        )}
                        {item.children && (
                          <button
                            type="button"
                            aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                            aria-expanded={isOpen}
                            onClick={() =>
                              setExpanded((v) => (v === item.href ? null : item.href))
                            }
                            className="grid h-9 w-9 shrink-0 place-items-center self-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-teal hover:text-teal"
                          >
                            <Chevron open={isOpen} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {item.children && isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.21, 1] }}
                            className="overflow-hidden pl-9"
                          >
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className="block py-2.5 text-[16px] text-white/80 transition-colors hover:text-teal"
                                >
                                  {c.label}
                                  {c.hint && (
                                    <span className="block text-[12px] text-white/45">
                                      {c.hint}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                            <li className="pb-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
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
