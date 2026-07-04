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
import { Diamond, PenTool } from "lucide-react";
import ConversionForm from "@/components/ConversionForm";
import { VideoLoop } from "@/components/VideoLoop";
import { TiltStage } from "@/components/TiltStage";
import { FadeUp, LineReveal, WordStagger, EASE_OUT } from "@/components/motion";

// The one element no competitor could ship after a logo swap: the pinned
// showcase photo is a pointer-tiltable object riding a raw-canvas backing,
// varnish gleam and a floating "signiert & datiert" tag — the atelier's
// signature-as-authenticity USP made into the page's living centerpiece.

// ── Data ──────────────────────────────────────────────────────────────────────

const SHOWCASE = [
  {
    image: "/images/hero.png",
    label: "01 — Die Grundierung",
    title: "Jede Jacke beginnt als Leinwand.",
    body: "Rohes Denim, grundiert von Hand — bevor ein einziger Pinselstrich fällt.",
  },
  {
    image: "/images/process.png",
    label: "02 — Der Auftrag",
    title: "Schicht für Schicht, Woche für Woche.",
    body: "Acryl und Öl auf Stoff. Kein Druck, keine Schablone — nur die Hand, die führt.",
  },
  {
    image: "/images/detail.png",
    label: "03 — Das Detail",
    title: "Aus der Nähe erzählt es mehr.",
    body: "Brüche, Übergänge, kleine Unregelmäßigkeiten — der Beweis, dass ein Mensch es gemalt hat.",
  },
  {
    image: "/images/material.png",
    label: "04 — Die Signatur",
    title: "Signiert. Datiert. Einmalig.",
    body: "Kein zweites Stück trägt dieselbe Geschichte. Jede Jacke ist die einzige ihrer Art.",
  },
];

const QUOTES = [
  {
    id: "q1",
    text: "Ich habe es zum ersten Mal getragen und jeder wollte wissen, wer das gemacht hat.",
    author: "K.M., Wien",
    piece: "Auftragsarbeit, 2025",
  },
  {
    id: "q2",
    text: "Kein Kleidungsstück, das ich besitze, erzählt so viel wie dieses.",
    author: "L.T., Graz",
    piece: "Einzelstück „Wildwuchs“",
  },
  {
    id: "q3",
    text: "Man spürt, dass jemand wirklich nachgedacht hat — über mich, über meine Geschichte.",
    author: "S.V., Wien",
    piece: "Auftragsarbeit, 2024",
  },
];

const STATS = [
  { value: 40, suffix: "+", label: "Stunden pro Jacke" },
  { value: 1, suffix: "/1", label: "Jedes Stück ein Original" },
  { value: 6, suffix: "", label: "Aufträge pro Quartal" },
  { value: 0, suffix: "", label: "Jemals wiederholt" },
];

const TIMELINE = [
  { period: "2019", role: "Erste handbemalte Jacke — verkauft an eine Fremde am Flohmarkt", place: "Wien" },
  { period: "2021", role: "Warteliste eröffnet sich, erste Auftragsarbeiten entstehen", place: "Atelier Wien" },
  { period: "2023", role: "Das hundertste Unikat wird übergeben", place: "Wien" },
  { period: "2025", role: "Das Atelier widmet sich ausschließlich Auftragsarbeiten", place: "Wien" },
];

// ── Hero ──────────────────────────────────────────────────────────────────────

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
        <VideoLoop
          src="/videos/hero.mp4"
          poster="/images/hero.png"
          className="relative h-full w-full"
        />
      </motion.div>

      <section
        ref={sectionRef}
        className="relative z-10 flex min-h-screen flex-col justify-center bg-transparent pb-16"
      >
        {/* Engineered contrast scrim — dark toward the copy, clear toward the window light */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(100deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.4)_38%,rgba(0,0,0,0.1)_62%,transparent_72%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-b from-transparent to-linen" />

        <motion.div
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          className="relative z-20 max-w-[720px] px-6 md:px-12 lg:px-20"
        >
          <WordStagger
            mount
            lines={["Kein Stück", "wie das andere."]}
            className="font-heading font-medium text-white leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,7.5vw,6rem)]"
          />
          <FadeUp mount delay={0.9} className="mt-6 max-w-sm">
            <p className="font-body text-base leading-relaxed text-white/85 md:text-lg">
              Jede Jacke ein Unikat — handbemalte Denim-Einzelstücke aus dem
              Atelier Wien.
            </p>
          </FadeUp>
          <FadeUp mount delay={1.1} className="mt-10">
            <motion.a
              href="#showcase"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-xs uppercase tracking-[0.18em] text-white"
            >
              Der Prozess ↓
            </motion.a>
          </FadeUp>
        </motion.div>

        {/* Quiet scroll cue */}
        <motion.div
          style={reduced ? undefined : { opacity: copyOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-9 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.32em] text-white/50">
            Scroll
          </span>
          <motion.span
            className="h-8 w-px origin-top bg-white/40"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>
    </>
  );
}

// ── Sticky Product Showcase (features) ───────────────────────────────────────

function ShowcaseCaption({
  index,
  active,
  setActive,
  item,
}: {
  index: number;
  active: number;
  setActive: (i: number) => void;
  item: (typeof SHOWCASE)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0% -45% 0%" });
  const isActive = active === index;

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return (
    <div ref={ref} className="flex min-h-[90vh] flex-col justify-center">
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <FadeUp>
          <span className="mb-4 flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.22em] text-sienna">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            {item.label}
          </span>
          <h3 className="mb-4 font-heading font-medium text-ink leading-[1.02] text-[clamp(2.5rem,4vw,4rem)]">
            {item.title}
          </h3>
          <p className="max-w-sm font-body text-base leading-[1.8] text-ink/60">
            {item.body}
          </p>
        </FadeUp>
      </motion.div>
    </div>
  );
}

function ShowcaseSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="showcase" className="relative z-10 bg-linen py-24 md:py-0">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Pinned visual — desktop only. Signature interactive scene: a
              pointer-tiltable stage with a raw-canvas backing behind the photo,
              a varnish gleam in front, and a floating signature tag riding
              closest to the viewer. */}
          <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:items-center">
            <TiltStage className="relative w-full max-h-[70vh] aspect-[4/5]">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-sm bg-[radial-gradient(circle_at_30%_20%,rgba(201,74,43,0.18),transparent_60%),linear-gradient(135deg,#DDD2BB,#C7B99C)]"
                style={{ transform: "translateZ(-40px) scale(1.08) rotate(-1.5deg)" }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                {SHOWCASE.map((item, i) => (
                  <motion.div
                    key={item.image}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.03 }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority={i === 0}
                    />
                  </motion.div>
                ))}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.14)_100%)]" />
              </div>
              <div
                aria-hidden
                className="liquid-glass absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full text-center"
                style={{ transform: "translateZ(60px) rotate(-6deg)" }}
              >
                <span className="font-heading italic leading-tight text-white text-[11px]">
                  signiert
                  <br />
                  &amp; datiert
                </span>
              </div>
            </TiltStage>
          </div>

          {/* Captions — desktop only, normal flow, drives the pin length exactly */}
          <div className="hidden flex-col md:flex">
            {SHOWCASE.map((item, i) => (
              <ShowcaseCaption key={item.image} index={i} active={active} setActive={setActive} item={item} />
            ))}
          </div>

          {/* Mobile — simple stacked image + caption pairs, no pin */}
          <div className="mt-2 flex flex-col gap-14 md:hidden">
            {SHOWCASE.map((item) => (
              <FadeUp key={`m-${item.image}`}>
                <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="100vw" />
                </div>
                <span className="mb-3 flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.22em] text-sienna">
                  <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                  {item.label}
                </span>
                <h3 className="mb-3 font-heading font-medium text-ink leading-[1.05] text-[clamp(1.5rem,5vw,2rem)]">
                  {item.title}
                </h3>
                <p className="font-body text-base leading-[1.8] text-ink/60">{item.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stacked Review Cards (social_proof) ──────────────────────────────────────

function ReviewCard({
  quote,
  index,
  accent,
}: {
  quote: (typeof QUOTES)[number];
  index: number;
  accent: boolean;
}) {
  const startRotate = [-3, 1, 4][index] ?? 0;
  const reduced = useReducedMotion();
  return (
    <motion.blockquote
      initial={reduced ? {} : { rotate: startRotate, y: 36, opacity: 0 }}
      whileInView={reduced ? {} : { rotate: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.1 }}
      className={`relative flex w-full flex-col rounded-sm p-8 shadow-[0_20px_50px_-20px_rgba(74,55,40,0.25)] md:w-1/3 ${
        index > 0 ? "md:-ml-6" : ""
      } ${accent ? "bg-sienna text-white" : "bg-linen text-ink"}`}
      style={{ zIndex: 10 + index }}
    >
      <p className={`font-heading font-medium italic leading-[1.35] text-[clamp(1.05rem,2vw,1.35rem)] ${accent ? "text-white" : "text-ink"}`}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-3">
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold ${
            accent ? "bg-white/20 text-white" : "bg-ink/10 text-ink"
          }`}
        >
          {quote.author.slice(0, 1)}
        </span>
        <div>
          <cite className={`block text-xs font-body not-italic uppercase tracking-[0.15em] ${accent ? "text-white/80" : "text-ink/60"}`}>
            {quote.author}
          </cite>
          <span className={`text-[11px] font-body ${accent ? "text-white/55" : "text-ink/40"}`}>{quote.piece}</span>
        </div>
      </div>
    </motion.blockquote>
  );
}

function SocialProofSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-linen to-surface py-24 md:py-44">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-16 max-w-lg md:mb-24">
          <span className="mb-2 flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.22em] text-sienna">
            <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            Stimmen
          </span>
          <h2 className="font-heading font-medium text-ink leading-[0.95] text-[clamp(2.75rem,5.5vw,4.5rem)]">
            Getragen. Erzählt.
          </h2>
        </FadeUp>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-0">
          {QUOTES.map((q, i) => (
            <ReviewCard key={q.id} quote={q} index={i} accent={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Numbers Band (stats) ─────────────────────────────────────────────────────

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
      <div className="font-heading font-normal tabular-nums leading-none text-linen text-[clamp(3.25rem,7vw,5.5rem)]">
        {display}
        {suffix}
      </div>
      <p className="mt-3 text-[11px] font-body uppercase tracking-[0.22em] text-linen/50">{label}</p>
    </div>
  );
}

function NumbersBand() {
  return (
    <section className="relative z-10 -mt-16 bg-gradient-to-b from-surface to-linen px-4 pb-16 pt-8 md:-mt-24 md:px-8 md:pb-24 md:pt-12">
      <div className="noise-overlay mx-auto max-w-6xl rounded-[2.5rem] bg-ink px-6 py-24 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] md:px-16">
        <FadeUp className="mx-auto mb-14 max-w-xl text-center md:mb-16">
          <p className="font-body text-sm leading-relaxed text-linen/50 md:text-base">
            Kein Fließband, keine Serie — nur Zeit, Farbe und ein Stück Stoff.
          </p>
        </FadeUp>
        <div className="mx-auto flex max-w-4xl flex-col sm:flex-row">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 py-8 sm:px-8 sm:py-0 ${
                i > 0 ? "border-t border-linen/15 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <CountUpStat value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Compact Timeline Rows (story) ────────────────────────────────────────────

function TimelineSection() {
  return (
    <section id="atelier" className="relative z-10 bg-linen py-24 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 md:grid-cols-5 md:gap-0">
          <div className="md:col-span-2">
            <FadeUp>
              <span className="mb-2 flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.22em] text-sienna">
                <PenTool className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                Werdegang
              </span>
              <h2 className="mb-6 font-heading font-medium text-ink leading-[0.95] text-[clamp(2.75rem,5vw,4rem)]">
                Wien, seit 2019.
              </h2>
              <p className="max-w-sm font-body text-base leading-[1.8] text-ink/60">
                Angefangen hat es mit einer einzigen Jacke und keinem Plan.
                Heute ist daraus ein Atelier geworden, das sich ausschließlich
                Auftragsarbeiten widmet — langsam, ehrlich, von Hand.
              </p>
            </FadeUp>
          </div>

          <div className="md:col-span-3 md:pl-16 lg:pl-24">
            <div className="flex flex-col gap-6 border-t border-ink/10 pt-8">
              {TIMELINE.map((row, i) => (
                <motion.div
                  key={row.period}
                  className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-4 md:grid-cols-[auto_auto_1fr_auto] md:gap-x-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}
                >
                  <span className="font-body text-[13px] tracking-wide text-ink/45 md:text-sm">
                    {row.period}
                  </span>
                  <Diamond className="h-3 w-3 text-sienna" strokeWidth={1.5} aria-hidden />
                  <span className="font-body text-[13px] leading-snug text-ink md:text-sm">{row.role}</span>
                  <span className="hidden font-body text-[13px] text-ink/45 md:block md:text-sm">
                    {row.place}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Split CTA Panel (cta) ────────────────────────────────────────────────────

function CTASection() {
  return (
    <section id="commission" className="relative z-10 bg-linen px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink">
        <div className="grid md:grid-cols-2">
          {/* Left — the ask */}
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20 lg:px-20">
            <LineReveal
              lines={["Deine Geschichte.", "Dein Stück."]}
              lineClassName="font-heading font-medium italic text-white leading-[0.88] tracking-[-0.01em] text-[clamp(2.75rem,5vw,4.25rem)]"
              className="mb-6"
            />
            <FadeUp delay={0.5}>
              <p className="mb-10 max-w-sm font-body text-white/60">
                Anfragen werden einzeln bearbeitet — nur eine begrenzte Anzahl
                Aufträge pro Quartal.
              </p>
            </FadeUp>
            <FadeUp delay={0.6}>
              <div className="[&_input]:border-white/25 [&_input]:text-white [&_input]:focus:border-white [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:focus:border-white [&_label>span]:text-white/50 [&_button]:rounded-full [&_button]:bg-white [&_button]:px-8 [&_button]:py-3.5 [&_button]:text-xs [&_button]:uppercase [&_button]:tracking-[0.18em] [&_button]:text-ink [&_button]:transition-transform [&_button]:duration-300 [&_button]:hover:scale-[1.04] [&_button]:active:scale-95">
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
            </FadeUp>
          </div>

          {/* Right — visual, slow Ken Burns drift */}
          <div className="relative min-h-[320px] overflow-hidden md:min-h-0">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            >
              <Image
                src="/images/material.png"
                alt="Pigmente und Denim im Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent md:bg-gradient-to-l" />
          </div>
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
      <ShowcaseSection />
      <SocialProofSection />
      <NumbersBand />
      <TimelineSection />
      <CTASection />
    </>
  );
}
