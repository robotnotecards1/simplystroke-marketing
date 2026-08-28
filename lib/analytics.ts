// Client-only analytics helpers. Every function guards `window`, so these are
// safe to import from server components — the bodies only run in the browser.
//
// PRIVACY: there is currently no consent gate on the site, so these events
// behave exactly like the existing gtag/Umami pageview. If a consent banner is
// added later, gate every call below behind it.
export type CtaEvent = "app_store_click" | "web_app_click";
export type HomepageEvent =
  | "homepage_demo_started"
  | "homepage_demo_stroke_logged"
  | "homepage_demo_undo_used"
  | "faq_opened"
  | "web_companion_clicked";
export type DeviceCategory = "mobile" | "tablet" | "desktop";

type CtaParams = {
  page_path: string;
  cta_location: string;
  cta_copy: string;
  device_category: DeviceCategory;
  destination: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

export function deviceCategory(): DeviceCategory {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

export function trackCta(
  event: CtaEvent,
  p: { cta_location: string; cta_copy: string; destination: string }
): void {
  if (typeof window === "undefined") return;
  const params: CtaParams = {
    page_path: window.location.pathname,
    device_category: deviceCategory(),
    cta_location: p.cta_location,
    cta_copy: p.cta_copy,
    destination: p.destination,
  };
  // transport_type 'beacon' so the hit survives the navigation to an external
  // site (App Store / web app) that immediately unloads this page.
  window.gtag?.("event", event, { ...params, transport_type: "beacon" });
  window.umami?.track(event, params); // optional privacy-first mirror
}

export function trackGuideEngaged(): void {
  if (typeof window === "undefined") return;
  const params = { page_path: window.location.pathname };
  window.gtag?.("event", "guide_engaged", params);
  window.umami?.track("guide_engaged", params);
}

/** Small, privacy-conscious interaction events used by the homepage. */
export function trackHomepageEvent(
  event: HomepageEvent,
  data: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === "undefined") return;
  const params = {
    page_path: window.location.pathname,
    device_category: deviceCategory(),
    ...data,
  };
  window.gtag?.("event", event, params);
  window.umami?.track(event, params);
}
