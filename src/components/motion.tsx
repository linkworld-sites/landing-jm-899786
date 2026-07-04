"use client";

import { motion, useReducedMotion } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade-up entrance reveal — the one reusable reveal used page-wide.
 * `mount` animates immediately once mounted instead of waiting on a
 * scroll-linked IntersectionObserver — use it for content that is already
 * in the viewport at load (the hero), where "reveal on scroll into view"
 * doesn't apply and gating on it only risks content that never appears.
 */
export function FadeUp({
  children,
  delay = 0,
  className,
  mount = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  mount?: boolean;
}) {
  const reduced = useReducedMotion();
  const visible = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={mount ? (reduced ? {} : visible) : undefined}
      whileInView={mount ? undefined : reduced ? {} : visible}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      viewport={mount ? undefined : { once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line headline reveal — each line masked, translating up from 112%. */
export function LineReveal({
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
            initial={reduced ? {} : { y: "112%" }}
            whileInView={reduced ? {} : { y: 0 }}
            transition={{
              duration: 1.1,
              ease: EASE_EDITORIAL,
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

/**
 * Word-stagger headline — every word its own span, fading up in sequence.
 * `lines` are AUTHORED line breaks (not auto-wrap) so a headline can be
 * composed of short, intentional lines; the stagger delay counts words
 * continuously across all lines.
 */
export function WordStagger({
  lines,
  as: Tag = "h1",
  className,
  wordClassName,
  mount = false,
}: {
  lines: string[];
  as?: "h1" | "h2" | "div";
  className?: string;
  wordClassName?: string;
  /** Animate on mount rather than on scroll-into-view — see FadeUp. */
  mount?: boolean;
}) {
  const reduced = useReducedMotion();
  const visible = { opacity: 1, y: 0 };
  let globalIndex = 0;
  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <div key={li} className="flex flex-wrap gap-x-[0.25em]">
          {line.split(" ").map((w) => {
            const i = globalIndex++;
            return (
              <span key={i} className="overflow-hidden inline-block leading-[1.05] pb-[0.08em]">
                <motion.span
                  initial={reduced ? {} : { opacity: 0, y: 32 }}
                  animate={mount ? (reduced ? {} : visible) : undefined}
                  whileInView={mount ? undefined : reduced ? {} : visible}
                  viewport={mount ? undefined : { once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.08 }}
                  className={`inline-block ${wordClassName ?? ""}`}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </div>
      ))}
    </Tag>
  );
}
