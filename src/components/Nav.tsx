"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/funnel";

const LINKS = [
  { href: "/#prozess", label: "Prozess" },
  { href: "/#werdegang", label: "Werdegang" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-noir/95 backdrop-blur-sm border-b border-paper/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
        {/* Logotype */}
        <Link
          href="/"
          className="font-display uppercase text-2xl md:text-3xl tracking-tight text-paper leading-none"
        >
          JM
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <motion.span key={link.href} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
              <Link
                href={link.href}
                className="font-label font-medium text-[13px] uppercase tracking-[0.18em] text-paper/70 hover:text-acid transition-colors duration-200"
              >
                {link.label}
              </Link>
            </motion.span>
          ))}
          <motion.a
            href="/#anfrage"
            onClick={() => track("intent")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2 bg-acid text-noir font-mono text-[11px] font-medium uppercase tracking-[0.14em] rounded-full"
          >
            Auftrag anfragen
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          <span
            className={`h-px w-full bg-paper transition-transform duration-300 origin-center ${
              open ? "rotate-45 translate-y-[0.375rem]" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-paper transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-paper transition-transform duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[0.375rem]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-noir border-b border-paper/10"
          >
            <nav className="flex flex-col gap-0 px-6 py-6">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-label text-base text-paper/80 border-b border-paper/10 last:border-0 hover:text-acid transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/#anfrage"
                onClick={() => { setOpen(false); track("intent"); }}
                className="mt-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-acid"
              >
                Auftrag anfragen →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
