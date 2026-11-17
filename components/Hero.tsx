// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { identity, socials } from "@/content/portfolio";
import SocialIcon from "./SocialIcon";

const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "Problem Solver",
  "UI/UX Designer",
  "ML Practitioner",
];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (reduced.current) { setDisplayed(ROLES[0]); return; }

    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return (
    <span className="text-amber">
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-amber ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

function StatBadge({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl bg-navy/80 backdrop-blur-sm border border-white/8 shadow-lg"
    >
      <span className="text-xl font-heading font-bold text-white">{value}</span>
      <span className="text-xs text-muted mt-0.5">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [floatY, setFloatY] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start: number | null = null;
    let rafId: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      setFloatY(Math.sin((ts - start) / 1000 * 0.9) * 10);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(252,163,17,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 25%, rgba(20,33,61,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 60% 90%, rgba(252,163,17,0.05) 0%, transparent 65%)",
      }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-8 items-center pt-20 pb-20">
        <motion.div style={{ y: textY }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <span className="text-amber text-xs font-semibold tracking-wider uppercase">{identity.openTo}</span>
          </motion.div>

          <motion.h1 className="font-heading font-bold text-white leading-[1.05] mb-4" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            {identity.name.split(" ").map((word, i) => (
              <span key={word} className={i === 1 ? "text-amber" : ""}>{word}{i === 0 ? " " : ""}</span>
            ))}
          </motion.h1>

          <motion.p className="text-xl md:text-2xl font-medium mb-6 h-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <TypewriterRole />
          </motion.p>

          <motion.div className="flex flex-wrap gap-2 mb-7" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            {identity.pillars.map((p, i) => (
              <motion.span key={p} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }} className="px-3 py-1 rounded-full bg-white/5 text-silver/55 text-xs border border-white/8 hover:border-amber/40 hover:text-silver/80 transition-all cursor-default">
                {p}
              </motion.span>
            ))}
          </motion.div>

          <motion.p className="text-muted text-sm mb-8 flex items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {identity.location}
          </motion.p>

          <motion.div className="flex gap-4 flex-wrap" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5 }}>
            <a href="#works" className="group relative px-7 py-3.5 rounded-xl bg-amber text-black font-semibold text-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(252,163,17,0.4)] active:scale-95">
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber to-[#fdb94d] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-xl border border-white/15 text-white font-semibold text-sm hover:border-amber/50 hover:bg-amber/8 transition-all active:scale-95">Get In Touch</a>
            <a href="https://drive.google.com/file/d/1EXv9C2qDFtDzV5_T5vDFNIpQW339ngY6/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-xl border border-amber/20 text-amber font-semibold text-sm hover:border-amber/50 hover:bg-amber/8 transition-all active:scale-95">Resume ↗</a>
          </motion.div>

          <motion.div className="flex items-center gap-1 mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.5 }}>
            {socials.map((s) => (
              <a key={s.platform} href={s.url} target={s.url.startsWith("mailto:") ? undefined : "_blank"} rel={s.url.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={s.platform} title={s.label} className="group flex items-center justify-center w-10 h-10 rounded-xl text-silver/75 hover:text-amber hover:bg-amber/15 border border-white/10 hover:border-amber/40 transition-all hover:scale-110 hover:shadow-[0_0_12px_rgba(252,163,17,0.3)]">
                <SocialIcon platform={s.platform} size={18} />
              </a>
            ))}
            <span className="ml-3 text-xs text-silver/50 tracking-wide hidden sm:block">Let&apos;s connect</span>
          </motion.div>
        </motion.div>

        <motion.div className="relative flex justify-center items-center" style={{ y: imageY }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <div className="absolute rounded-full border border-amber/15" style={{ width: "620px", height: "620px" }} />
          <div className="absolute rounded-full border border-amber/8" style={{ width: "680px", height: "680px" }} />
          <div className="absolute w-96 h-96 rounded-full bg-amber/15 blur-[100px]" />
          <div className="absolute w-64 h-64 rounded-full bg-navy/40 blur-[70px] translate-x-24 -translate-y-20" />

          <div className="relative z-10" style={{ transform: `translateY(${floatY}px)`, transition: "transform 0.05s linear" }}>
            <div className="relative w-96 h-96 md:w-[560px] md:h-[560px]">
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 100px rgba(252,163,17,0.25), 0 0 0 1px rgba(252,163,17,0.15)" }} />
              <Image src={identity.heroImage} alt={`Portrait of ${identity.name}`} fill className="object-contain drop-shadow-2xl" priority />
            </div>
          </div>

          <div className="absolute -left-4 top-1/4 z-20"><StatBadge value="7+" label="Real World Solutions" delay={1.0} /></div>
          <div className="absolute -right-4 bottom-1/4 z-20"><StatBadge value="Top 2%" label="of 40K+ Builders" delay={1.15} /></div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-20"><StatBadge value="2×" label="Hackathon Winner" delay={1.3} /></div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}>
        <span className="text-[10px] text-muted uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-muted" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </motion.div>
      </motion.div>


    </section>
  );
}
