"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Diamond, Feather, PenTool, Quote } from "lucide-react";
import ConversionForm from "@/components/ConversionForm";
import { VideoLoop } from "@/components/VideoLoop";
import { TiltStage } from "@/components/TiltStage";
import { FadeUp, WordStagger, LineReveal, EASE_OUT, EASE_EDITORIAL } from "@/components/motion";

// The one element no competitor could ship after a logo swap: the signature
// scene below isn't a product photo — it's a pointer-tiltable wax seal
// reading "0/1", the atelier's literal, load-bearing promise (nie wiederholt,
// signiert, datiert) cast as a living object standing in for a whole feature
// row instead of a claim in a sentence.

// ── Data ──────────────────────────────────────────────────────────────────

const PROCESS = [
  {
    image: "/images/hero.png",
    index: "01",
    label: "Grundierung",
    headline: "Rohe Leinwand.",
    body: "Handgrundiertes Denim, bevor ein einziger Pinselstrich fällt.",
  },
  {
    image: "/images/process.png",
    index: "02",
    label: "Auftrag",
    headline: "Schicht für Schicht.",
    body: "Acryl und Öl, Woche für Woche — kein Druck, keine Schablone.",
  },
  {
    image: "/images/detail.png",
    index: "03",
    label: "Detail",
    headline: "Aus der Nähe.",
    body: "Brüche und Übergänge beweisen: ein Mensch hat es gemalt, keine Maschine.",
  },
];

const TIMELINE = [
  { year: "2019", milestone: "Erste Jacke, handbemalt", place: "Flohmarkt Wien" },
  { year: "2021", milestone: "Warteliste eröffnet", place: "Atelier Wien" },
  { year: "2023", milestone: "100. Unikat übergeben", place: "Atelier Wien" },
  { year: "2025", milestone: "Nur noch Auftragsarbeiten", place: "Atelier Wien" },
];

const STATS = [
  { value: 100, suffix: "+", label: "Stunden pro Jacke" },
  { value: 1, suffix: "/1", label: "Jedes Stück ein Original" },
  { value: 2021, suffix: "", label: "Warteliste seit" },
  { value: 0, suffix: "", label: "Jemals wiederholt" },
];

const QUOTE = { text: "Jeder wollte wissen, wer das gemacht hat.", author: "K.M.", place: "Wien" };

// ── Hero — fixed video, overrides the archetype's own poster hero ─────────

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-0 h-screen w-full"
        style={reduced ? undefined : { scale: videoScale }}
      >
        <VideoLoop src="/videos/hero.mp4" poster="/images/hero.png" className="relative h-full w-full" />
      </motion.div>

      <section
        ref={sectionRef}
        className="relative z-10 flex min-h-screen flex-col justify-center bg-transparent pb-20"
      >
        {/* Engineered contrast — scrim clearing from the copy side */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(23,19,16,0.72)_0%,rgba(23,19,16,0.42)_45%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-b from-transparent to-ink" />

        <motion.div
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          className="relative z-20 max-w-[720px] px-6 md:px-12 lg:px-20"
        >
          <span className="mb-6 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-paper/70">
            <Feather className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Atelier Wien — seit 2019
          </span>
          <WordStagger
            mount
            lines={["Nie kopiert.", "Nie wiederholt."]}
            className="font-display font-light text-paper leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
          />
          <FadeUp mount delay={0.9} className="mt-6 max-w-sm">
            <p className="font-label text-base leading-relaxed text-paper/85 md:text-lg">
              Handbemalte Jeansjacken-Unikate — jedes Stück deine Geschichte,
              nie ein zweites Mal gemalt.
            </p>
          </FadeUp>
          <FadeUp mount delay={1.1} className="mt-10">
            <motion.a
              href="#prozess"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-label text-xs uppercase tracking-[0.18em] text-paper"
            >
              Der Prozess <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            </motion.a>
          </FadeUp>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: copyOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-9 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.32em] text-paper/50">Scroll</span>
          <motion.span
            className="h-8 w-px origin-top bg-paper/40"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>
    </>
  );
}

// ── Signature Scene — pointer-aware wax-seal object, "0/1" cast in resin ───

function SignatureScene() {
  return (
    <TiltStage className="relative mx-auto h-40 w-40 md:h-52 md:w-52">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-ink/60 blur-md"
        style={{ transform: "translateZ(-1.5px) scale(1.12)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border-[3px] border-stone"
        style={{ transform: "translateZ(-0.75px)" }}
      />
      <div
        className="absolute inset-[6px] rounded-full bg-rust"
        style={{ transform: "translateZ(0px)" }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: "translateZ(0.75px)" }}
      >
        <span className="font-display text-paper text-4xl md:text-5xl leading-none">0/1</span>
        <span className="mt-1 font-label text-[8px] uppercase tracking-[0.2em] text-paper/70">nie wiederholt</span>
      </div>
      <div
        aria-hidden
        className="absolute left-4 top-4 h-9 w-11 rounded-full bg-paper/50 blur-sm mix-blend-screen"
        style={{ transform: "translateZ(1.5px)" }}
      />
    </TiltStage>
  );
}

// ── Alternating Editorial Rows (features) ──────────────────────────────────

function FeatureRow({
  item,
  reverse,
  index,
}: {
  item: (typeof PROCESS)[number];
  reverse: boolean;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -32, reduced ? 0 : 32]);

  return (
    <div
      ref={rowRef}
      className={`grid items-center gap-y-8 md:grid-cols-12 md:gap-x-10 lg:gap-x-16 ${
        reverse ? "" : ""
      }`}
    >
      <div
        className={`md:col-span-7 ${
          reverse ? "md:order-2 md:-ml-12 lg:-ml-20" : "md:-mr-12 lg:-mr-20"
        }`}
      >
        <motion.div
          initial={reduced ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
          whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
          className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-sm"
        >
          <motion.div style={reduced ? undefined : { y: parallaxY }} className="absolute inset-[-8%]">
            <Image
              src={item.image}
              alt={item.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className={`md:col-span-4 ${reverse ? "md:order-1" : ""}`}>
        <FadeUp>
          <span className="mb-3 flex items-center gap-3 font-label text-xs uppercase tracking-[0.22em] text-rust">
            {item.index} — {item.label}
          </span>
          <h3 className="mb-5 font-display font-light text-ink leading-[1] text-[clamp(2.5rem,4.5vw,3.75rem)]">
            {item.headline}
          </h3>
          <p className="max-w-xs font-label text-base leading-[1.7] text-ink/60">{item.body}</p>
        </FadeUp>
      </div>
    </div>
  );
}

function FullBleedBreak() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, scale: 1.04 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: EASE_EDITORIAL }}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
    >
      <div className="relative aspect-[21/9] w-full">
        <Image
          src="/images/material.png"
          alt="Farbmaterial in Nahaufnahme"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 lg:left-20">
          <span className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.22em] text-paper/80">
            Material — Acryl &amp; Öl
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SignatureRow() {
  return (
    <div className="grid items-center gap-y-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
      <div className="md:col-span-7 md:-mr-12 lg:-mr-20">
        <FadeUp>
          <div className="flex aspect-[4/5] max-h-[70vh] w-full items-center justify-center rounded-sm border border-ink/10 bg-stone/[0.04]">
            <SignatureScene />
          </div>
        </FadeUp>
      </div>
      <div className="md:col-span-4">
        <FadeUp>
          <span className="mb-3 flex items-center gap-3 font-label text-xs uppercase tracking-[0.22em] text-rust">
            04 — Signatur
          </span>
          <h3 className="mb-5 font-display font-light text-ink leading-[1] text-[clamp(2.5rem,4.5vw,3.75rem)]">
            Signiert. Datiert.
          </h3>
          <p className="max-w-xs font-label text-base leading-[1.7] text-ink/60">
            Jede Jacke einmalig — nie ein zweites Mal gemalt. Die Signatur ist der Echtheitsnachweis.
          </p>
        </FadeUp>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section
      id="prozess"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper py-24 shadow-[0_-40px_80px_-40px_rgba(0,0,0,0.45)] md:-mt-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-20 max-w-lg md:mb-28">
          <span className="mb-2 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-rust">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Der Prozess
          </span>
          <h2 className="font-display font-light text-ink leading-[0.95] text-[clamp(2.75rem,7vw,6rem)]">
            Vier Schritte.
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-24 md:gap-32">
          {PROCESS.map((item, i) => (
            <FeatureRow key={item.image} item={item} reverse={i % 2 === 1} index={i} />
          ))}
          <FullBleedBreak />
          <SignatureRow />
        </div>
      </div>
    </section>
  );
}

// ── Social Proof — Glass Quote Panel ────────────────────────────────────────

function SocialProofSection() {
  const reduced = useReducedMotion();
  return (
    <section className="relative z-10 bg-paper px-6 pb-24 md:px-12 md:pb-32 lg:px-20">
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="noise-overlay relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-stone p-5 md:p-6"
      >
        <Quote
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-6 h-32 w-32 text-paper/[0.06] md:h-40 md:w-40"
          strokeWidth={1}
        />
        <span className="relative z-10 mb-4 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-paper/70">
          <Feather className="h-3 w-3" strokeWidth={1.5} aria-hidden />
          Stimme einer Kundin
          <Feather className="h-3 w-3" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="relative z-10 font-label text-[13.5px] leading-[1.6] text-paper/85 md:text-[15px]">
          „{QUOTE.text}“
        </p>
        <p className="relative z-10 mt-4 font-label text-sm font-semibold text-paper">
          {QUOTE.author} <span className="font-normal text-paper/60">— {QUOTE.place}</span>
        </p>
      </motion.div>
    </section>
  );
}

// ── Numbers Band ─────────────────────────────────────────────────────────

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let start: number | null = null;
    const duration = 1200;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-light tabular-nums leading-none text-paper text-[clamp(3.5rem,8vw,6rem)]">
        {display}
        {suffix}
      </div>
      <p className="mt-3 font-label text-[11px] uppercase tracking-[0.2em] text-paper/50">{label}</p>
    </div>
  );
}

function NumbersBand() {
  return (
    <section className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-ink px-4 py-24 shadow-[0_-40px_80px_-40px_rgba(0,0,0,0.5)] md:-mt-24 md:px-8 md:py-28">
      <FadeUp className="mx-auto mb-14 max-w-xl text-center md:mb-16">
        <p className="font-label text-sm leading-relaxed text-paper/50 md:text-base">
          Kein Fließband, keine Serie — nur Zeit, Farbe und ein Stück Stoff.
        </p>
      </FadeUp>
      <div className="mx-auto flex max-w-4xl flex-col sm:flex-row">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 py-8 sm:px-8 sm:py-0 ${i > 0 ? "border-t border-paper/15 sm:border-l sm:border-t-0" : ""}`}
          >
            <CountUpStat value={s.value} suffix={s.suffix} label={s.label} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Story — Compact Timeline Rows ───────────────────────────────────────────

function StorySection() {
  return (
    <section
      id="werdegang"
      className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-paper py-24 shadow-[0_-40px_80px_-40px_rgba(0,0,0,0.45)] md:-mt-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-14 max-w-xl md:mb-16">
          <span className="mb-2 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-rust">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Werdegang
          </span>
          <h2 className="mb-5 font-display font-light text-ink leading-[0.95] text-[clamp(2.5rem,6vw,4.5rem)]">
            Wien, seit 2019.
          </h2>
          <p className="font-label text-base leading-relaxed text-ink/60">
            Vom ersten handbemalten Stück am Flohmarkt bis zur Warteliste, die
            heute jedes Quartal über die Aufträge entscheidet.
          </p>
        </FadeUp>

        <div className="rounded-2xl border border-ink/10 px-6 py-2 md:px-8">
          {TIMELINE.map((row, i) => (
            <motion.div
              key={row.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}
              className={`grid grid-cols-[3.5rem_auto_1fr_auto] items-center gap-4 py-4 md:py-5 ${
                i > 0 ? "border-t border-ink/10" : ""
              }`}
            >
              <span className="font-label text-[13px] tabular-nums text-ink/50">{row.year}</span>
              <Diamond className="h-3 w-3 text-rust" strokeWidth={1.5} aria-hidden />
              <span className="font-label text-[14px] text-ink">{row.milestone}</span>
              <span className="font-label text-[13px] text-ink/40">{row.place}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Cinematic Video CTA ─────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      id="anfrage"
      className="relative z-10 -mt-16 overflow-hidden rounded-t-[2.5rem] bg-ink px-4 py-24 shadow-[0_-40px_80px_-40px_rgba(0,0,0,0.5)] md:-mt-24 md:px-8 md:py-36"
    >
      <div className="absolute inset-0 z-0 opacity-50">
        <VideoLoop src="/videos/hero.mp4" poster="/images/hero.png" className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-52 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-52 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-6 flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-paper/60">
          Auftragsarbeiten — begrenzt pro Quartal
        </span>
        <LineReveal
          lines={["Deine Geschichte.", "Dein Unikat."]}
          className="font-display font-light italic text-paper leading-[0.9] text-[clamp(2.75rem,9vw,6.5rem)]"
        />
        <FadeUp delay={0.45} className="mt-8">
          <p className="mx-auto max-w-md font-label text-base text-paper/60">
            Erzähl mir deine Idee — sechs Aufträge pro Quartal, jeder ein Original.
          </p>
        </FadeUp>
        <FadeUp delay={0.6} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#anfrage-form"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="liquid-glass rounded-full px-7 py-3.5 font-label text-xs uppercase tracking-[0.18em] text-paper"
          >
            Anfrage stellen
          </motion.a>
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-label text-xs uppercase tracking-[0.18em] text-ink"
          >
            Einzelstücke ansehen <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          </motion.a>
        </FadeUp>
      </div>

      <div id="anfrage-form" className="relative z-10 mx-auto mt-20 max-w-lg scroll-mt-32">
        <div className="[&_input]:border-paper/25 [&_input]:bg-transparent [&_input]:text-paper [&_input]:font-label [&_input]:focus:border-rust [&_textarea]:border-paper/25 [&_textarea]:bg-transparent [&_textarea]:text-paper [&_textarea]:font-label [&_textarea]:focus:border-rust [&_label>span]:font-label [&_label>span]:text-paper/50 [&_button]:rounded-full [&_button]:bg-rust [&_button]:px-8 [&_button]:py-3.5 [&_button]:font-label [&_button]:text-xs [&_button]:font-medium [&_button]:uppercase [&_button]:tracking-[0.18em] [&_button]:text-paper [&_button]:transition-transform [&_button]:duration-300 [&_button]:hover:scale-[1.04] [&_button]:active:scale-95">
          <ConversionForm
            startStep="intent"
            submitStep="convert"
            cta="Anfrage stellen"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "E-Mail", type: "email", required: true },
              { name: "vision", label: "Deine Idee — erzähl mir davon", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <NumbersBand />
      <StorySection />
      <CTASection />
    </>
  );
}
