"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/funnel";

export default function ShopSuccess() {
  useEffect(() => {
    track("purchase");
    track("convert");
  }, []);

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <span className="font-label text-[11px] uppercase tracking-[0.22em] text-rust block mb-6">
          Bestellung bestätigt
        </span>
        <h1 className="font-display font-light text-ink text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] mb-6">
          Danke.
        </h1>
        <p className="font-label text-ink/65 text-base leading-relaxed mb-8">
          Dein Stück ist auf dem Weg zu dir. Handgemalt, einmalig, aus Wien —
          du wirst bald eine Bestätigungs-E-Mail erhalten.
        </p>
        <Link
          href="/"
          className="font-label text-xs uppercase tracking-[0.18em] text-ink/50 hover:text-rust transition-colors border-b border-ink/20 pb-0.5"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
