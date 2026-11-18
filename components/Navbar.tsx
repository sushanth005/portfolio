// components/Navbar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-[0_1px_0_rgba(252,163,17,0.08),0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-heading text-xl font-bold text-white hover:text-amber transition-colors">
          <span className="text-amber">S</span>B
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium z-10 block transition-colors ${
                    isActive ? "text-amber" : "text-silver/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-amber/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="https://drive.google.com/file/d/1EXv9C2qDFtDzV5_T5vDFNIpQW339ngY6/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-4 py-2 rounded-lg bg-amber text-black text-sm font-semibold hover:shadow-[0_0_20px_rgba(252,163,17,0.4)] hover:bg-amber/90 transition-all"
        >
          Resume
        </a>

        <button
          suppressHydrationWarning
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-16 bg-black/97 backdrop-blur-xl z-40"
          >
            <ul className="flex flex-col items-center justify-center h-full gap-5">
              {navLinks.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                  <a
                    href={link.href}
                    onClick={closeMobile}
                    className={`text-2xl font-medium flex items-center min-h-[44px] transition-colors ${
                      activeSection === link.href.slice(1) ? "text-amber" : "text-silver/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}>
                <a href="https://drive.google.com/file/d/1EXv9C2qDFtDzV5_T5vDFNIpQW339ngY6/view?usp=drive_link" target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="mt-4 px-6 py-3 rounded-lg bg-amber text-black text-lg font-semibold hover:bg-amber/90 block transition-colors">
                  Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
