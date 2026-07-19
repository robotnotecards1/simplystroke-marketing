import type { MetadataRoute } from "next";
import { SITE_URL, NOINDEX } from "@/lib/site";

export const dynamic = "force-static";

// Non-production builds (Vercel preview, or NEXT_PUBLIC_NOINDEX locally) block
// everything; production allows crawlers. See NOINDEX in lib/site.ts.
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome the AI crawlers. Blocking any of these means that
      // engine can never cite us, which is the whole point of the data pages.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
