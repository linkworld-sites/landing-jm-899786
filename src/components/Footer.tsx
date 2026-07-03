"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 bg-linen border-t border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Logotype + location */}
          <div>
            <span className="font-heading font-bold italic text-[clamp(3rem,8vw,5rem)] text-ink/15 leading-none block select-none">
              JM
            </span>
            <p className="mt-3 text-sm font-body text-ink/50 italic">
              Atelier: Wien, Österreich
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body uppercase tracking-[0.18em] text-ink/60 hover:text-sienna transition-colors"
            >
              Instagram
            </a>
            <Link
              href="/blog"
              className="text-sm font-body uppercase tracking-[0.18em] text-ink/60 hover:text-sienna transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/shop"
              className="text-sm font-body uppercase tracking-[0.18em] text-ink/60 hover:text-sienna transition-colors"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-12 pt-6 border-t border-ink/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <p className="text-xs font-body text-ink/40">
            © {new Date().getFullYear()} JM. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal/privacy"
              className="text-xs font-body text-ink/40 hover:text-ink/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/legal/cookies"
              className="text-xs font-body text-ink/40 hover:text-ink/70 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
