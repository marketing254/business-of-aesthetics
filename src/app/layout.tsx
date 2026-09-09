import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import GlobalSearch from "@/components/GlobalSearch";
import BackToTop from "@/components/BackToTop";

const heading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Business of Aesthetics - Where Aesthetic Leaders Grow",
    template: "%s - Business of Aesthetics",
  },
  description:
    "The Business of Aesthetics brings together leaders in Dermatology, Plastic Surgery and Aesthetics to grow successful, fulfilling practices.",
  icons: { icon: asset("/assets/logo.png") },
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
      </head>
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GlobalSearch />
        <BackToTop />
      </body>
    </html>
  );
}
