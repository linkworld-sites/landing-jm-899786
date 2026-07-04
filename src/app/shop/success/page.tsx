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
    <main className="min-h-screen bg-linen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-6">
          Bestellung bestätigt
        </span>
        <h1 className="font-heading font-medium text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] mb-6">
          Danke.
        </h1>
        <p className="font-body text-ink/65 text-base leading-relaxed mb-8">
          Dein Stück ist auf dem Weg zu dir. Handgemalt, einmalig, aus Wien —
          du wirst bald eine Bestätigungs-E-Mail erhalten.
        </p>
        <Link
          href="/"
          className="text-xs font-body uppercase tracking-[0.18em] text-ink/50 hover:text-sienna transition-colors border-b border-ink/20 pb-0.5"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
