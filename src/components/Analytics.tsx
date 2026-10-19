"use client";

/**
 * Analytics loader - everything is opt-in via env vars so local/dev builds
 * stay clean. Set in Vercel → Settings → Environment Variables:
 *
 *   NEXT_PUBLIC_GA_ID       G-XXXXXXXXXX   Google Analytics 4 (gtag)
 *   NEXT_PUBLIC_GTM_ID      GTM-XXXXXXX    Google Tag Manager (optional; if set,
 *                                          put GA4 inside GTM instead of GA_ID)
 *   NEXT_PUBLIC_CLARITY_ID  xxxxxxxxxx     Microsoft Clarity (free heatmaps/recordings)
 *
 * App Router navigations don't reload the page, so a page_view is sent on
 * every pathname change. Lead submissions fire `generate_lead` from
 * src/lib/lead.ts - mark it as a key event (conversion) in GA4.
 */

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

function PageViews() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = search?.toString() ? `${pathname}?${search}` : pathname;
    try {
      if (GA_ID && window.gtag) {
        window.gtag("event", "page_view", {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
      } else if (GTM_ID && window.dataLayer) {
        window.dataLayer.push({ event: "page_view", page_path: url });
      }
    } catch {
      /* ignore */
    }
  }, [pathname, search]);

  return null;
}

export default function Analytics() {
  if (!GA_ID && !GTM_ID && !CLARITY_ID) return null;

  return (
    <>
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false,anonymize_ip:true});`}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}
