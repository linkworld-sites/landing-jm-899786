import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JM — Handbemalte Jeansjacken-Unikate aus Wien",
  description:
    "Jede Jacke ein Unikat. Handbemalte Denim-Einzelstücke und Auftragsarbeiten aus dem Atelier Wien — von einem Künstler, für eine Person.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-linen text-ink font-body antialiased">
        <FunnelTracker />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
