import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { GA_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Golf Stroke Counter & One-Tap Scorecard App | ${SITE_NAME}`,
  description:
    "One tap counts your strokes. No math, no menus, no losing count mid-hole. The simple golf scorecard app built for ADHD golfers and anyone who forgets. Launching 2026.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable}`}>
      <head>
        {/* LCP image. It's a CSS background on .ss-hero, so the browser can't
            discover it until the stylesheet parses. Preloading pulls it
            forward and takes a visible bite out of Largest Contentful Paint. */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');`}
        </Script>
        {/* Umami: privacy-first, self-hosted web analytics (you own the data) */}
        <Script
          src="https://simplystroke-umami.vercel.app/script.js"
          data-website-id="20c6bcc0-8be5-429f-be45-51d4f57600cf"
          strategy="afterInteractive"
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
