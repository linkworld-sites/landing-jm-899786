import type { Metadata } from "next";
import { Anton, Oswald, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-label",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JM — Handbemalte Jeansjacken-Unikate aus Wien",
  description:
    "Jede Jacke ein Unikat. Handbemalte Denim-Einzelstücke und Auftragsarbeiten aus dem Atelier Wien — von einem Künstler, für eine Person.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${anton.variable} ${oswald.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-noir text-paper font-label antialiased">
        {/* No-JS fallback: scroll/mount-triggered reveals render opacity:0
            inline until a script runs them; without JS that never happens,
            so force everything visible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <FunnelTracker />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
