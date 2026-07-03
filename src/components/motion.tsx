"use client";

import { motion, useReducedMotion } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade-up entrance reveal — the one reusable reveal used page-wide. */
export function FadeUp({
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
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      viewport={{ once: true, amount: 0.2 }}
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

/** Word-stagger headline — every word its own span, fading up in sequence. */
export function WordStagger({
  text,
  as: Tag = "h1",
  className,
  wordClassName,
}: {
  text: string;
  as?: "h1" | "h2" | "div";
  className?: string;
  wordClassName?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={`flex flex-wrap gap-x-[0.25em] ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block leading-[1.05] pb-[0.08em]">
          <motion.span
            initial={reduced ? {} : { opacity: 0, y: 32 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.08 }}
            className={`inline-block ${wordClassName ?? ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
