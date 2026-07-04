"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Diamond, Feather, PenTool, Sparkles } from "lucide-react";
import ConversionForm from "@/components/ConversionForm";
import { VideoLoop } from "@/components/VideoLoop";
import { TiltStage } from "@/components/TiltStage";
import { FadeUp, WordStagger, EASE_OUT } from "@/components/motion";

// The one element no competitor could ship after a logo swap: the signature
// scene isn't a product photo — it's a pointer-tiltable wax-seal reading
// "0/1", the atelier's core promise (echtes Unikat, nie wiederholt, signiert)
// cast as a living, rotating object rather than a claim in a sentence.

// ── Data ──────────────────────────────────────────────────────────────────────

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
    body: "Brüche und Übergänge beweisen: ein Mensch hat es gemalt.",
  },
  {
    image: "/images/material.png",
    index: "04",
    label: "Signatur",
    headline: "Signiert. Datiert.",
    body: "Jede Jacke einmalig — nie ein zweites Mal gemalt.",
  },
];

const WERDEGANG = [
  {
    index: "01",
    year: "2019",
    headline: "Erste Jacke.",
    body: "Handbemalt und verkauft an eine Fremde am Flohmarkt Wien.",
  },
  {
    index: "02",
    year: "2021",
    headline: "Warteliste eröffnet.",
    body: "Die Nachfrage übersteigt die Kapazität — erste Auftragsarbeiten entstehen.",
  },
  {
    index: "03",
    year: "2023",
    headline: "100. Unikat.",
    body: "Hundert handbemalte Jacken übergeben. Kein Stück wie das andere.",
  },
  {
    index: "04",
    year: "2025",
    headline: "Nur Auftragsarbeiten.",
    body: "Das Atelier widmet sich seit 2025 ausschließlich individuellen Aufträgen.",
  },
];

const QUOTES = [
  { id: "q1", initials: "KM", text: "Jeder wollte wissen, wer das gemacht hat.", author: "K.M., Wien" },
  { id: "q2", initials: "LT", text: "Kein Stück erzählt so viel wie dieses.", author: "L.T., Graz" },
  { id: "q3", initials: "SV", text: "Man spürt, dass jemand nachgedacht hat.", author: "S.V., Wien" },
];

const STATS = [
  { value: 40, suffix: "+", label: "Stunden pro Jacke" },
  { value: 1, suffix: "/1", label: "Jedes Stück ein Original" },
  { value: 6, suffix: "", label: "Aufträge pro Quartal" },
  { value: 0, suffix: "", label: "Jemals wiederholt" },
];

// ── Ticker divider — a poster-edge strip used as the hard-cut handoff ───────

function TickerDivider({
  text,
  tone,
}: {
  text: string;
  tone: "acid" | "pink" | "navy";
}) {
  const toneClasses = {
    acid: "bg-acid text-noir",
    pink: "bg-pink text-noir",
    navy: "bg-navy text-acid",
  }[tone];
  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="flex items-center gap-4 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em]">
          {text}
          <Diamond className="h-2.5 w-2.5" strokeWidth={1.5} aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative z-10 overflow-hidden py-3 ${toneClasses}`}>
      <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}

// ── Hero — fixed video, overrides the archetype's own poster hero ──────────

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
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.72)_0%,rgba(10,10,10,0.4)_45%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-b from-transparent to-noir" />

        <motion.div
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          className="relative z-20 max-w-[760px] px-6 md:px-12 lg:px-20"
        >
          <span className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
            <Feather className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Atelier Wien — seit 2019
          </span>
          <WordStagger
            mount
            lines={["NIE KOPIERT.", "NIE WIEDERHOLT."]}
            className="font-display uppercase text-paper leading-[0.85] tracking-tight text-[clamp(3rem,10vw,9rem)]"
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
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper"
            >
              Der Prozess <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            </motion.a>
          </FadeUp>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: copyOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-9 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/50">Scroll</span>
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

// ── Poster Showcase (Part A of features) — pinned duotone hard-cuts ────────

function IndexRail({ active, count }: { active: number; count: number }) {
  return (
    <div className="absolute -left-8 top-0 hidden h-full w-px bg-paper/10 lg:block">
      <motion.span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-acid"
        animate={{ top: `${(active / (count - 1 || 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
    </div>
  );
}

function ShowcaseCaption({
  index,
  active,
  setActive,
  item,
}: {
  index: number;
  active: number;
  setActive: (i: number) => void;
  item: (typeof PROCESS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0% -45% 0%" });
  const isActive = active === index;

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return (
    <div ref={ref} className="relative flex min-h-[80vh] flex-col justify-center">
      <motion.div animate={{ opacity: isActive ? 1 : 0.3 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
        <span className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-acid">
          {item.index} — {item.label}
        </span>
        <h3 className="mb-5 font-display uppercase text-paper leading-[0.85] text-[clamp(2.5rem,6vw,5rem)]">
          {item.headline}
        </h3>
        <p className="max-w-xs font-label text-sm leading-[1.7] text-paper/60">{item.body}</p>
      </motion.div>
    </div>
  );
}

function PosterShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="relative hidden md:sticky md:top-0 md:flex md:h-screen md:items-center">
          <IndexRail active={active} count={PROCESS.length} />
          <div className="duotone duo-navy-pink relative aspect-[4/5] max-h-[68vh] w-full overflow-hidden rounded-sm">
            {PROCESS.map((item, i) => (
              <motion.div
                key={item.image}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.05 }}
              >
                <Image
                  src={item.image}
                  alt={item.headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </div>
          <span className="absolute -right-10 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50 lg:block">
            0{active + 1} / 04
          </span>
        </div>

        <div className="hidden flex-col md:flex">
          {PROCESS.map((item, i) => (
            <ShowcaseCaption key={item.image} index={i} active={active} setActive={setActive} item={item} />
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-14 md:hidden">
          {PROCESS.map((item) => (
            <FadeUp key={`m-${item.image}`}>
              <div className="duotone duo-navy-pink relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-sm">
                <Image src={item.image} alt={item.headline} fill className="object-cover" sizes="100vw" />
              </div>
              <span className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-acid">
                {item.index} — {item.label}
              </span>
              <h3 className="mb-3 font-display uppercase text-paper leading-[0.9] text-[clamp(2rem,7vw,3rem)]">
                {item.headline}
              </h3>
              <p className="font-label text-sm leading-[1.7] text-paper/60">{item.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Signature Scene — pointer-aware wax-seal object, "0/1" cast in resin ───

function SignatureScene() {
  return (
    <TiltStage className="relative h-36 w-36 md:h-44 md:w-44">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-noir/60 blur-md"
        style={{ transform: "translateZ(-1.5px) scale(1.12)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border-[3px] border-navy"
        style={{ transform: "translateZ(-0.75px)" }}
      />
      <div
        className="absolute inset-[6px] rounded-full bg-acid"
        style={{ transform: "translateZ(0px)" }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: "translateZ(0.75px)" }}
      >
        <span className="font-display text-noir text-3xl md:text-4xl leading-none">0/1</span>
        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-noir/70">nie wiederholt</span>
      </div>
      <div
        aria-hidden
        className="absolute left-3 top-3 h-8 w-10 rounded-full bg-paper/50 blur-sm mix-blend-screen"
        style={{ transform: "translateZ(1.5px)" }}
      />
    </TiltStage>
  );
}

// ── Bento Strip (Part B of features) — dense, asymmetric card recipes ──────

function BentoStrip() {
  return (
    <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[190px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-paper/10 bg-noir p-6 lg:row-span-2"
      >
        <span className="absolute top-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50 flex items-center gap-2">
          <Sparkles className="h-3 w-3" strokeWidth={1.5} aria-hidden /> Echtes Unikat
        </span>
        <SignatureScene />
        <span className="absolute bottom-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
          Jede Signatur ein Original.
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
        className="relative overflow-hidden rounded-2xl border border-paper/10 bg-noir lg:row-span-2"
      >
        <VideoLoop src="/videos/hero.mp4" poster="/images/hero.png" className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-noir/40" />
        <span className="absolute top-5 left-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80">
          Atelier Wien
        </span>
        <span className="absolute bottom-5 left-5 font-display uppercase text-paper text-3xl leading-none">
          Seit 2019
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-paper/10 bg-noir p-6 text-center"
      >
        <span className="font-display text-paper leading-none text-5xl md:text-6xl drop-shadow">0/1</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">Nie wiederholt.</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
        className="noise-overlay flex flex-col justify-center rounded-2xl bg-[#3D0F26] p-5 md:p-6"
      >
        <p className="font-label font-medium text-lg leading-snug text-paper">
          Kein Druck. Keine Schablone.
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
          Nur die Hand, die führt.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.32 }}
        className="flex flex-col justify-between rounded-2xl border border-paper/10 bg-noir p-5 md:p-6"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">Handwerk</span>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[Feather, PenTool, Diamond, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ background: "rgba(255,255,255,0.10)" }}
              className="liquid-glass flex h-14 w-14 items-center justify-center rounded-xl md:h-16 md:w-16"
            >
              <Icon className="h-5 w-5 text-paper/80" strokeWidth={1.5} aria-hidden />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
        whileHover={{ y: -4 }}
        className="liquid-glass flex flex-col justify-between rounded-2xl p-5 md:p-6"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">Shop</span>
        <div>
          <p className="font-display uppercase text-paper leading-[0.9] text-2xl md:text-3xl">
            Einzelstücke ansehen
          </p>
          <Link
            href="/shop"
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-acid hover:opacity-70 transition-opacity"
          >
            Zum Shop <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="prozess" className="relative z-10 bg-noir py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-16 max-w-lg md:mb-20">
          <span className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Der Prozess
          </span>
          <h2 className="font-display uppercase text-paper leading-[0.85] text-[clamp(2.75rem,7vw,6rem)]">
            Vier Schritte.
          </h2>
        </FadeUp>

        <PosterShowcase />

        <div className="mt-24 md:mt-32">
          <BentoStrip />
        </div>
      </div>
    </section>
  );
}

// ── Social Proof — marquee rows of signature-monogram tiles ────────────────

function MonogramRow({ direction }: { direction: "left" | "right" }) {
  const tiles = [...QUOTES, ...QUOTES, ...QUOTES];
  const row = (
    <div className="flex shrink-0 items-center gap-5 pr-5">
      {tiles.map((q, i) => (
        <div
          key={`${q.id}-${i}`}
          className="liquid-glass flex h-14 w-14 shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16"
        >
          <span className="font-display text-paper text-lg">{q.initials}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
      <div
        className={`flex w-max hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

function SocialProofSection() {
  const quote = QUOTES[0];
  return (
    <section className="relative z-10 bg-pink py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <p className="font-label italic text-noir/80 text-base md:text-lg">
          „{quote.text}“ — {quote.author}
        </p>
      </div>
      <div className="mt-12 flex flex-col gap-4 md:mt-16">
        <MonogramRow direction="left" />
        <MonogramRow direction="right" />
      </div>
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
      <div className="font-display tabular-nums leading-none text-acid text-[clamp(3.5rem,8vw,6rem)]">
        {display}
        {suffix}
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">{label}</p>
    </div>
  );
}

function NumbersBand() {
  return (
    <section className="relative z-10 bg-noir px-4 py-20 md:px-8 md:py-24">
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

// ── Story — Numbered Steps Rail (Werdegang) ─────────────────────────────────

function StoryStep({ step, index }: { step: (typeof WERDEGANG)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="relative flex-1 px-2">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 select-none font-display uppercase text-noir/10 text-[clamp(4rem,9vw,7rem)] leading-none"
      >
        {step.index}
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.1 }}
        className="relative z-10 pt-16 md:pt-24"
      >
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-pink">{step.year}</span>
        <h3 className="mb-3 font-display uppercase text-noir leading-[0.9] text-[clamp(1.5rem,3vw,2rem)]">
          {step.headline}
        </h3>
        <p className="max-w-[22ch] font-label text-sm leading-[1.7] text-noir/60">{step.body}</p>
      </motion.div>
    </div>
  );
}

function StorySection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, amount: 0.3 });
  return (
    <section id="werdegang" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper py-24 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.35)] md:-mt-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-16 max-w-xl md:mb-24">
          <span className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-navy">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Werdegang
          </span>
          <h2 className="font-display uppercase text-noir leading-[0.85] text-[clamp(2.75rem,6vw,5rem)]">
            Wien, seit 2019.
          </h2>
        </FadeUp>

        <div ref={lineRef} className="relative hidden md:block">
          <svg className="absolute left-0 top-[52px] h-px w-full overflow-visible" aria-hidden>
            <motion.line
              x1="0" y1="0" x2="100%" y2="0"
              stroke="#0B1F63" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE_OUT }}
            />
          </svg>
          <div className="flex">
            {WERDEGANG.map((step, i) => (
              <StoryStep key={step.index} step={step} index={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-14 border-l border-navy/20 pl-6 md:hidden">
          {WERDEGANG.map((step, i) => (
            <div key={step.index} className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 -left-2 select-none font-display uppercase text-noir/10 text-[4.5rem] leading-none"
              >
                {step.index}
              </span>
              <FadeUp delay={i * 0.05} className="relative z-10 pt-10">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-pink">{step.year}</span>
                <h3 className="mb-3 font-display uppercase text-noir leading-[0.9] text-[clamp(1.5rem,7vw,2rem)]">
                  {step.headline}
                </h3>
                <p className="font-label text-sm leading-[1.7] text-noir/60">{step.body}</p>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Full-Bleed Type CTA ─────────────────────────────────────────────────────

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const reduced = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-acid underline underline-offset-4"
    >
      {children}
    </motion.a>
  );
}

function CTASection() {
  return (
    <section id="anfrage" className="relative z-10 overflow-hidden bg-noir px-4 py-24 md:px-8 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
        <div className="flex w-max animate-marquee-left">
          {[0, 1].map((i) => (
            <span key={i} className="font-display uppercase text-paper/[0.07] text-[16rem] leading-none pr-12">
              JM JM JM JM
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
          Auftragsarbeiten — begrenzt pro Quartal
        </span>
        <WordStagger
          lines={["DEINE GESCHICHTE.", "DEIN UNIKAT."]}
          className="font-display uppercase text-paper leading-[0.85] text-[clamp(2.75rem,9vw,7rem)]"
        />
        <FadeUp delay={0.3} className="mt-10">
          <MagneticLink href="#anfrage-form">Anfrage stellen ↓</MagneticLink>
        </FadeUp>
      </div>

      <div id="anfrage-form" className="relative z-10 mx-auto mt-20 max-w-lg scroll-mt-32">
        <div className="[&_input]:border-paper/25 [&_input]:bg-transparent [&_input]:text-paper [&_input]:font-label [&_input]:focus:border-acid [&_textarea]:border-paper/25 [&_textarea]:bg-transparent [&_textarea]:text-paper [&_textarea]:font-label [&_textarea]:focus:border-acid [&_label>span]:font-mono [&_label>span]:text-paper/50 [&_button]:rounded-full [&_button]:bg-acid [&_button]:px-8 [&_button]:py-3.5 [&_button]:font-mono [&_button]:text-xs [&_button]:font-medium [&_button]:uppercase [&_button]:tracking-[0.18em] [&_button]:text-noir [&_button]:transition-transform [&_button]:duration-300 [&_button]:hover:scale-[1.04] [&_button]:active:scale-95">
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerDivider tone="acid" text="Nie wiederholt ◆ Signiert & datiert ◆ Wien seit 2019" />
      <FeaturesSection />
      <TickerDivider tone="navy" text="0/1 ◆ Handgemalt ◆ Kein Druck, keine Schablone" />
      <SocialProofSection />
      <TickerDivider tone="acid" text="Warteliste seit 2021 ◆ Begrenzte Aufträge pro Quartal" />
      <NumbersBand />
      <StorySection />
      <TickerDivider tone="pink" text="Deine Geschichte ◆ Dein Unikat ◆ Anfrage stellen" />
      <CTASection />
    </>
  );
}
