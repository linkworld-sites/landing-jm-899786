"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 bg-linen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10">
        <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-heading font-bold italic text-lg text-ink/70">JM</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-body uppercase tracking-[0.18em] text-ink/45">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sienna transition-colors"
            >
              Instagram
            </a>
            <Link href="/blog" className="hover:text-sienna transition-colors">
              Journal
            </Link>
            <Link href="/shop" className="hover:text-sienna transition-colors">
              Shop
            </Link>
            <Link href="/legal/privacy" className="hover:text-sienna transition-colors">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="hover:text-sienna transition-colors">
              Cookies
            </Link>
            <span className="text-ink/30 normal-case tracking-normal">
              © {new Date().getFullYear()} JM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
