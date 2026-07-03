"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/funnel";

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
          : "bg-linen/96 backdrop-blur-sm border-b border-ink/8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
        {/* Logotype */}
        <Link
          href="/"
          className={`font-heading font-bold italic text-2xl md:text-3xl transition-colors duration-500 ${
            transparent ? "text-white" : "text-ink"
          }`}
        >
          JM
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/#arbeiten", label: "Arbeiten" },
            { href: "/#commission", label: "Auftragsarbeit" },
            { href: "/#atelier", label: "Atelier" },
            { href: "/blog", label: "Journal" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-body uppercase tracking-[0.18em] transition-colors duration-300 ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink/60 hover:text-sienna"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <motion.a
            href="/#commission"
            onClick={() => track("intent")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 bg-sienna text-white text-xs font-body uppercase tracking-[0.12em] rounded-full hover:opacity-90 transition-opacity"
          >
            Drop anfragen
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          <span
            className={`h-px w-full bg-current transition-transform duration-300 origin-center ${
              transparent ? "bg-white" : "bg-ink"
            } ${open ? "rotate-45 translate-y-[0.375rem]" : ""}`}
          />
          <span
            className={`h-px w-full bg-current transition-opacity duration-300 ${
              transparent ? "bg-white" : "bg-ink"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-full bg-current transition-transform duration-300 origin-center ${
              transparent ? "bg-white" : "bg-ink"
            } ${open ? "-rotate-45 -translate-y-[0.375rem]" : ""}`}
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
            className="md:hidden overflow-hidden bg-linen border-b border-ink/10"
          >
            <nav className="flex flex-col gap-0 px-6 py-6">
              {[
                { href: "/#arbeiten", label: "Arbeiten" },
                { href: "/#commission", label: "Auftragsarbeit" },
                { href: "/#atelier", label: "Atelier" },
                { href: "/blog", label: "Journal" },
                { href: "/shop", label: "Shop" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-body text-ink border-b border-ink/10 last:border-0 hover:text-sienna transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/#commission"
                onClick={() => { setOpen(false); track("intent"); }}
                className="mt-4 py-3 text-base font-body text-sienna font-medium"
              >
                Drop anfragen →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
