/** GA4 + Meta Pixel event helper (brief 10). No-ops when IDs are not set. */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const FB_EVENTS: Record<string, string> = {
  call_click: "Contact",
  whatsapp_click: "Contact",
  form_submit: "Lead",
  directions_click: "FindLocation",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  const fb = FB_EVENTS[event];
  if (fb) window.fbq?.("track", fb, params);
  else window.fbq?.("trackCustom", event, params);
}
