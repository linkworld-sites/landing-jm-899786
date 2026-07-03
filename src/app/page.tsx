"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { track } from "@/lib/funnel";
import ConversionForm from "@/components/ConversionForm";

// ── Types ─────────────────────────────────────────────────────────────────────

type Work = {
  id: string;
  title: string;
  material: string;
  status: "Verkauft" | "Verfügbar";
  image: string;
  size: "anchor" | "companion";
};

// ── Static data ───────────────────────────────────────────────────────────────

const WORKS: Work[] = [
  {
    id: "w1",
    title: "Abendhimmel",
    material: "Denim, Acryl, Öl",
    status: "Verkauft",
    image: "/images/hero.png",
    size: "anchor",
  },
  {
    id: "w2",
    title: "Wildwuchs",
    material: "Denim, Acryl",
    status: "Verfügbar",
    image: "/images/detail.png",
    size: "companion",
  },
  {
    id: "w3",
    title: "Roherde",
    material: "Denim, Öl",
    status: "Verkauft",
    image: "/images/material.png",
    size: "companion",
  },
];

const QUOTES = [
  {
    id: "q1",
    text: "Ich habe es zum ersten Mal getragen und jeder wollte wissen, wer das gemacht hat.",
    author: "K.M., Wien",
  },
  {
    id: "q2",
    text: "Kein Kleidungsstück, das ich besitze, erzählt so viel wie dieses.",
    author: "L.T., Graz",
  },
  {
    id: "q3",
    text: "Man spürt, dass jemand wirklich nachgedacht hat — über mich, über meine Geschichte.",
    author: "S.V., Wien",
  },
];

const COMMISSION_STEPS = [
  {
    num: "01",
    title: "Kontakt",
    body: "Du schreibst mir — über eine Idee, eine Erinnerung, eine Person. Nicht über Maße oder Farben.",
  },
  {
    num: "02",
    title: "Gespräch",
    body: "Wir sprechen. Ich will verstehen, was das Stück tragen soll, bevor ich den ersten Strich setze.",
  },
  {
    num: "03",
    title: "Entstehung",
    body: "Das Malen dauert Wochen. Ich schicke dir Zwischenschritte — du siehst, wie deine Geschichte Gestalt annimmt.",
  },
  {
    num: "04",
    title: "Übergabe",
    body: "Das Stück kommt zu dir. Ein Original, gefertigt im Atelier Wien. Signiert und datiert.",
  },
];

const ATELIER_IMAGES = [
  { src: "/images/process.png", caption: "Pinsel auf Denim — der erste Strich." },
  { src: "/images/material.png", caption: "Pigmente, Paletten, Stille." },
  { src: "/images/detail.png", caption: "Kurz vor der Fertigstellung." },
];

// ── Motion helpers ────────────────────────────────────────────────────────────

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LineReveal({
  lines,
  className,
  lineClassName,
  baseDelay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={reduced ? {} : { y: "110%" }}
            whileInView={reduced ? {} : { y: 0 }}
            transition={{
              duration: 1.1,
              ease: easeEditorial,
              delay: baseDelay + i * 0.12,
            }}
            viewport={{ once: true, amount: 0.1 }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-32 bg-transparent">
      {/* Gradient fade hero → linen */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-linen pointer-events-none z-10" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 max-w-5xl">
        <LineReveal
          lines={["Kein Stück", "wie das andere."]}
          lineClassName="font-heading font-bold text-white leading-[0.88] tracking-[-0.02em] text-[clamp(3.5rem,9.5vw,8rem)]"
        />
        <FadeUp delay={0.55} className="mt-6 max-w-sm">
          <p className="text-white/75 text-base md:text-lg font-body leading-relaxed">
            Handbemalte Jeansjacken-Unikate aus Wien.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Manifesto ─────────────────────────────────────────────────────────────────

function ManifestoStrip() {
  const reduced = useReducedMotion();
  const sentence =
    "Ich male nicht auf Stoff. Ich male auf das, was jemand trägt.";
  const chunk = `${sentence}   ·   ${sentence}   ·   ${sentence}   ·   ${sentence}   ·   `;

  return (
    <section className="relative z-10 bg-ink overflow-hidden py-10">
      <div
        className={`inline-block whitespace-nowrap ${reduced ? "" : "animate-jm-marquee"}`}
        aria-label={sentence}
      >
        <span className="font-heading font-semibold italic text-linen/90 text-[clamp(1.1rem,2.5vw,1.875rem)] tracking-wide">
          {chunk}
        </span>
        <span
          className="font-heading font-semibold italic text-linen/90 text-[clamp(1.1rem,2.5vw,1.875rem)] tracking-wide"
          aria-hidden
        >
          {chunk}
        </span>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduced = useReducedMotion();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? "0px" : "0px", reduced ? "0px" : "-60px"]
  );

  return (
    <section
      id="arbeiten"
      ref={ref}
      className="relative z-10 bg-linen py-24 md:py-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-5 gap-12 md:gap-0 items-start">
          {/* Left 60% — image with parallax */}
          <motion.div
            style={{ y }}
            className="md:col-span-3 relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src="/images/process.png"
              alt="Atelier — der Malprozess auf Denim"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </motion.div>

          {/* Right 40% — text offset down */}
          <div className="md:col-span-2 md:pt-[28%] md:pl-12 lg:pl-20">
            <FadeUp>
              <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-6">
                Der Prozess
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-heading font-bold text-ink leading-[1.05] text-[clamp(1.75rem,3.5vw,2.75rem)] mb-8">
                Langsame Arbeit.<br />Bleibendes Ergebnis.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-body text-ink/65 text-base leading-[1.8] mb-5">
                Jede Jacke beginnt mit einem Gespräch. Ich male keine Muster —
                ich male Bedeutung. Der Stoff wird grundiert, dann Schicht für
                Schicht aufgebaut wie auf einer Leinwand.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="font-body text-ink/65 text-base leading-[1.8] mb-5">
                Acryl und Öl auf Denim — das Ergebnis ist waschbar, haltbar und
                mit der Zeit immer schöner. Jede Jacke trägt die Spur der Hand,
                die sie gemalt hat.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="font-body text-ink/45 text-sm italic">
                Gefertigt und bemalt im Atelier, Wien.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Works grid ────────────────────────────────────────────────────────────────

function WorksSection() {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <section className="relative z-10 bg-linen pb-24 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeUp>
          <div className="flex items-baseline justify-between mb-14 md:mb-20">
            <div>
              <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-2">
                Einzelstücke
              </span>
              <h2 className="font-heading font-bold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.0]">
                Die Arbeiten
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:block text-xs font-body uppercase tracking-[0.18em] text-ink/50 hover:text-sienna transition-colors"
            >
              Alle ansehen →
            </Link>
          </div>
        </FadeUp>

        {/* Variable editorial grid */}
        <div className="flex flex-wrap items-start gap-6 md:gap-10">
          {WORKS.map((work, i) => (
            <motion.article
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easeOut, delay: i * 0.18 }}
              viewport={{ once: true, amount: 0.12 }}
              className={`group cursor-zoom-in ${
                work.size === "anchor"
                  ? "w-full md:w-[57%]"
                  : "w-full sm:w-[calc(50%-0.75rem)] md:w-[37%]"
              }`}
              onClick={() => setSelected(work)}
            >
              <motion.div
                whileHover={{ scale: 1.018 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative overflow-hidden ${
                  work.size === "anchor" ? "aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-[filter] duration-500 group-hover:brightness-[1.04]"
                  sizes={
                    work.size === "anchor"
                      ? "(max-width: 768px) 100vw, 60vw"
                      : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 35vw"
                  }
                />
              </motion.div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-medium text-base md:text-lg text-ink group-hover:text-sienna transition-colors duration-300">
                    {work.title}
                  </h3>
                  <p className="text-xs font-body text-ink/45 mt-1 tracking-wide">
                    {work.material}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-body uppercase tracking-[0.18em] mt-1 flex-shrink-0 ${
                    work.status === "Verfügbar" ? "text-sienna" : "text-ink/35"
                  }`}
                >
                  {work.status}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/shop"
            className="text-xs font-body uppercase tracking-[0.18em] text-ink/50 hover:text-sienna transition-colors"
          >
            Alle ansehen →
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-ink/92 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeEditorial }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 800px"
                />
              </div>
              <div className="mt-4 flex justify-between items-baseline">
                <div>
                  <h3 className="font-heading font-medium text-lg text-linen">
                    {selected.title}
                  </h3>
                  <p className="text-xs font-body text-linen/50 mt-1">
                    {selected.material}
                  </p>
                </div>
                <span className="text-xs font-body text-linen/60 uppercase tracking-[0.15em]">
                  {selected.status}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-linen/60 hover:text-linen text-xl leading-none"
                aria-label="Schließen"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Commission ────────────────────────────────────────────────────────────────

function CommissionSection() {
  return (
    <section id="commission" className="relative z-10 bg-surface py-24 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-5 gap-12 md:gap-0 items-start">
          {/* Left image ~40% */}
          <div className="md:col-span-2">
            <FadeUp>
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src="/images/material.png"
                  alt="Auftragsarbeit — Atelier Wien"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </FadeUp>
          </div>

          {/* Right: steps + form */}
          <div className="md:col-span-3 md:pl-16 lg:pl-24">
            <FadeUp>
              <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-6">
                Auftragsarbeit
              </span>
              <h2 className="font-heading font-bold text-ink leading-[1.05] text-[clamp(2rem,4vw,3.25rem)] mb-12">
                Deine Geschichte.<br />Dein Stück.
              </h2>
            </FadeUp>

            <div className="space-y-8 mb-16">
              {COMMISSION_STEPS.map((step, i) => (
                <FadeUp key={step.num} delay={0.08 * (i + 1)}>
                  <div className="flex gap-5 items-start">
                    <span className="font-heading font-bold text-sienna text-[2.25rem] leading-none flex-shrink-0 w-14">
                      {step.num}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-heading font-semibold text-ink text-base mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-ink/60 text-sm leading-[1.8]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.45}>
              <div className="border-t border-ink/12 pt-10">
                <p className="font-body text-ink/50 text-sm mb-8">
                  Anfragen werden einzeln bearbeitet — nur eine begrenzte Anzahl
                  Aufträge pro Quartal.
                </p>
                <ConversionForm
                  startStep="intent"
                  submitStep="convert"
                  cta="Anfrage stellen"
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "E-Mail", type: "email", required: true },
                    {
                      name: "vision",
                      label: "Deine Idee — erzähl mir davon",
                      type: "textarea",
                    },
                  ]}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Atelier ───────────────────────────────────────────────────────────────────

function AtelierSection() {
  return (
    <section id="atelier" className="relative z-10 bg-linen py-24 md:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeUp className="mb-14 md:mb-20">
          <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-2">
            Das Atelier
          </span>
          <h2 className="font-heading font-bold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.0]">
            Wien, Österreich
          </h2>
        </FadeUp>

        <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 md:pb-0 md:overflow-x-visible">
          {ATELIER_IMAGES.map((img, i) => (
            <FadeUp
              key={img.src}
              delay={i * 0.15}
              className="flex-shrink-0 w-[76vw] sm:w-[52vw] md:w-[calc(33.333%-1.667rem)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 76vw, 33vw"
                />
              </div>
              <p className="mt-3 text-xs font-body italic text-ink/50">
                {img.caption}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Quotes ────────────────────────────────────────────────────────────────────

function QuotesSection() {
  return (
    <section className="relative z-10 bg-surface py-24 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="space-y-20 md:space-y-32">
          {QUOTES.map((q, i) => (
            <FadeUp key={q.id} delay={i * 0.08}>
              <blockquote
                className={`max-w-2xl ${
                  i === 1
                    ? "ml-auto"
                    : i === 2
                    ? "md:ml-[20%]"
                    : ""
                }`}
              >
                <p className="font-heading font-medium italic text-ink leading-[1.2] text-[clamp(1.4rem,2.8vw,2.25rem)]">
                  &ldquo;{q.text}&rdquo;
                </p>
                <cite className="block mt-5 text-xs font-body not-italic text-ink/45 uppercase tracking-[0.18em]">
                  — {q.author}
                </cite>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative z-10 min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-ink">
      {/* Own background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-35"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient top */}
      <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-ink to-transparent z-10 pointer-events-none" />
      {/* Gradient bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-ink to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 text-center px-6 max-w-3xl w-full">
        <LineReveal
          lines={["Ein Drop.", "Wenige Stücke.", "Kein Nachdruck."]}
          lineClassName="font-heading font-bold italic text-white leading-[0.88] tracking-[-0.01em] text-[clamp(2.25rem,6vw,5rem)]"
          className="mb-8"
        />
        <FadeUp delay={0.5}>
          <p className="font-body text-white/55 text-base md:text-lg mb-10 max-w-md mx-auto">
            Nächster Drop angekündigt. Sei dabei, wenn neue Stücke in den Shop kommen.
          </p>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <motion.span
                whileHover={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                whileTap={{ scale: 0.97 }}
                className="glass-btn inline-flex items-center justify-center px-8 py-3.5 font-body text-xs uppercase tracking-[0.18em] text-white rounded-full cursor-pointer"
                onClick={() => track("intent")}
              >
                Shop ansehen
              </motion.span>
            </Link>
            <motion.a
              href="#commission"
              onClick={() => track("intent")}
              whileHover={{ backgroundColor: "rgba(200,68,10,0.92)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-8 py-3.5 font-body text-xs uppercase tracking-[0.18em] text-linen bg-sienna rounded-full cursor-pointer transition-colors duration-300"
            >
              Anfrage stellen
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* Fixed background video — z-0; hero section is transparent above it */}
      <video
        className="fixed inset-0 w-full h-screen object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <HeroSection />
      <ManifestoStrip />
      <ProcessSection />
      <WorksSection />
      <CommissionSection />
      <AtelierSection />
      <QuotesSection />
      <CTASection />
    </>
  );
}
