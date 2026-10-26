import type { Metadata, Viewport } from "next";
import { asset } from "@/lib/asset";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import GlobalSearch from "@/components/GlobalSearch";
import BackToTop from "@/components/BackToTop";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  graph,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const heading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Business of Aesthetics - Podcast, Expert Panels & Growth for Aesthetic Practices",
    template: "%s | Business of Aesthetics",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "business of aesthetics",
    "aesthetic practice marketing",
    "dermatology practice growth",
    "plastic surgery practice management",
    "med spa business podcast",
    "aesthetic medicine podcast",
    "aesthetic practice webinars",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  alternates: { canonical: "./", types: { "application/rss+xml": "/feed.xml" } },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Business of Aesthetics - Where Aesthetic Leaders Grow",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Business of Aesthetics - Where Aesthetic Leaders Grow",
    description: DEFAULT_DESCRIPTION,
  },
  icons: { icon: asset("/assets/logo.png"), apple: asset("/assets/logo.png") },
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5faf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1322" },
  ],
};

/* Applies the saved (or system) theme before first paint - no flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("boa-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <JsonLd data={graph(organizationJsonLd(), websiteJsonLd())} />
      </head>
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GlobalSearch />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
