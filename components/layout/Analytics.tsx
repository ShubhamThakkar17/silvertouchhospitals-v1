"use client";

import Script from "next/script";
import { useEffect } from "react";
import { BRANCH_LIST } from "@/lib/site";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const BRANCH_BY_TEL = Object.fromEntries(BRANCH_LIST.map((b) => [b.phoneHref, b.id]));

/**
 * GA4 + Meta Pixel (loaded only when IDs are set) and one delegated click
 * listener that reports call, directions and WhatsApp clicks site-wide.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        track("call_click", { branch: BRANCH_BY_TEL[href] ?? a.dataset.branch ?? "other", page: location.pathname });
      } else if (a.dataset.track) {
        track(a.dataset.track, { branch: a.dataset.branch, page: location.pathname });
      } else if (href.includes("wa.me/")) {
        track("whatsapp_click", { page: location.pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
