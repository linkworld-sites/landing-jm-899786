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
    <main className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid block mb-6">
          Bestellung bestätigt
        </span>
        <h1 className="font-display uppercase text-paper text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.85] mb-6">
          Danke.
        </h1>
        <p className="font-label text-paper/65 text-base leading-relaxed mb-8">
          Dein Stück ist auf dem Weg zu dir. Handgemalt, einmalig, aus Wien —
          du wirst bald eine Bestätigungs-E-Mail erhalten.
        </p>
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 hover:text-acid transition-colors border-b border-paper/20 pb-0.5"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
