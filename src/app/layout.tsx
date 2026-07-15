import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getSiteMeta } from "@/lib/site-meta";
import "./globals.css";

const SITE_URL = "https://9f0e90d0.run.linkworld.ai";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JM — Handbemalte Jeansjacken-Unikate aus Wien",
  description:
    "Jede Jacke ein Unikat. Handbemalte Denim-Einzelstücke und Auftragsarbeiten aus dem Atelier Wien — von einem Künstler, für eine Person.",
  verification: {
    google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { organization } = getSiteMeta();

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: organization.name,
    description: organization.description,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero.png`,
    foundingDate: organization.foundingDate,
    priceRange: organization.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: organization.addressLocality,
      addressCountry: organization.addressCountry,
    },
  };

  return (
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-label antialiased">
        {/* No-JS fallback: scroll/mount-triggered reveals render opacity:0
            inline until a script runs them; without JS that never happens,
            so force everything visible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <FunnelTracker />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
