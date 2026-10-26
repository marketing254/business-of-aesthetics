import Link from "next/link";
import { asset } from "@/lib/asset";
import Image from "next/image";
import { site } from "@/lib/data";

const explore = [
  { href: "/about", label: "About Us" },
  { href: "/podcast", label: "Podcast" },
  { href: "/events", label: "Events" },
  { href: "/events#replays", label: "Event Replays" },
  { href: "/panels", label: "Expert Panels" },
  { href: "/panels#replays", label: "Panel Replays" },
  { href: "/speakers", label: "Speakers" },
];

const resourcesCol = [
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/resources#freebies", label: "Free Downloads" },
  { href: "/marketing", label: "Marketing (MSM)" },
  { href: "/coaching", label: "BOA Practice System" },
  { href: "/marketing#book", label: "Free Strategy Meeting" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dark-canvas on-dark">
      <div className="mx-auto max-w-[1280px] px-5 pt-6">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src={asset("/assets/logo.png")}
              alt="Business of Aesthetics"
              width={196}
              height={57}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-white/65">
              A modern platform bringing leaders in Dermatology, Plastic Surgery
              and Aesthetics together to grow successful, fulfilling practices.
            </p>
            <div className="mt-6 flex gap-2.5" aria-label="Social media">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener"
                title="Instagram"
                aria-label="Business of Aesthetics on Instagram"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/80 transition-all hover:border-teal hover:bg-teal hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener"
                title="Facebook"
                aria-label="Business of Aesthetics on Facebook"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/80 transition-all hover:border-teal hover:bg-teal hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener"
                title="LinkedIn"
                aria-label="Business of Aesthetics on LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/80 transition-all hover:border-teal hover:bg-teal hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            <a
              href={site.ekwa}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block border border-white/15 px-4 py-2.5 text-[12px] tracking-wider text-white/60 transition-colors hover:border-teal/50 hover:text-white/85"
            >
              Powered by <strong className="text-teal">Ekwa Marketing</strong>
            </a>
          </div>

          <nav aria-label="Explore">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.24em] text-teal">
              Explore
            </h4>
            <ul className="mt-5 space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1 text-[14px] text-white/70 transition-colors hover:text-teal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources and services">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.24em] text-teal">
              Resources
            </h4>
            <ul className="mt-5 space-y-2.5">
              {resourcesCol.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1 text-[14px] text-white/70 transition-colors hover:text-teal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.24em] text-teal">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-2.5 text-[14px] text-white/70">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-1 transition-colors hover:text-teal"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-block py-1 transition-colors hover:text-teal">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="inline-block py-1 transition-colors hover:text-teal"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="pt-1 leading-relaxed text-white/50">{site.address}</li>
            </ul>
            <h4 className="mt-8 text-[12px] font-semibold uppercase tracking-[0.24em] text-teal">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-[14px] text-white/70">
              <li>
                <Link href="/privacy" className="inline-block py-1 transition-colors hover:text-teal">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-block py-1 transition-colors hover:text-teal">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-[12.5px] text-white/45 sm:flex-row">
          <span>© {year} Business of Aesthetics. All Rights Reserved.</span>
          <span>
            Powered by{" "}
            <a
              href={site.ekwa}
              target="_blank"
              rel="noopener"
              className="inline-block py-2 text-teal transition-colors hover:text-white"
            >
              Ekwa Marketing
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
