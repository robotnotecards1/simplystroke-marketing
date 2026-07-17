import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

// Required for `output: export` — the manifest is a Route Handler, so the
// static export needs it pinned to static generation.
export const dynamic = "force-static";

// PWA / Android home-screen manifest. Next serves this at /manifest.webmanifest
// and adds <link rel="manifest"> to every page automatically. The favicon,
// icon and apple-icon <link> tags come from the app/favicon.ico, app/icon.png
// and app/apple-icon.png file conventions — this only adds the installable
// icons (192/512 in public/) plus install metadata. Greens are the brand
// tokens from globals.css (--green-deep).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Golf Stroke Counter`,
    short_name: SITE_NAME,
    description:
      "The free, one-tap golf stroke counter and scorecard. No subscription, no account.",
    start_url: "/",
    display: "standalone",
    background_color: "#1B4332",
    theme_color: "#1B4332",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
