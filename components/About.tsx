// components/About.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { identity, experience } from "@/content/portfolio";

function PhotoSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goTo = (idx: number, dir: number) => { setDirection(dir); setCurrent(idx); };
  const next = () => goTo((current + 1) % images.length, 1);
  const prev = () => goTo((current - 1 + images.length) % images.length, -1);
  useEffect(() => {
    timerRef.current = setTimeout(next, 3200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group select-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.55, ease: "easeInOut" }} className="absolute inset-0">
          <Image src={images[current]} alt={`About photo ${current + 1}`} fill className="object-cover" priority={current === 0} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber/80 hover:text-black transition-all" suppressHydrationWarning>‹</button>
      <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber/80 hover:text-black transition-all" suppressHydrationWarning>›</button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} suppressHydrationWarning onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Go to photo ${i + 1}`} className={`rounded-full transition-all duration-300 ${i === current ? "bg-amber w-5 h-2" : "bg-white/50 w-2 h-2 hover:bg-white"}`} />
        ))}
      </div>
      <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white/70">{current + 1} / {images.length}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6" aria-label="About">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">About <span className="text-amber">Me</span></h2>
          <p className="section-subtitle">Engineer at heart — shipping AI-powered products that solve real problems.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <PhotoSlideshow images={identity.aboutImages} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}>
            <p className="text-silver/80 text-lg leading-relaxed mb-6">
              I&apos;m a <strong className="text-white">{identity.roleLine}</strong> based in {identity.location}. I architect and ship end-to-end solutions — from deep-learning backends to polished, responsive frontends — with a focus on products that deliver real user value.
            </p>
            <p className="text-silver/80 text-lg leading-relaxed mb-6">
              My work spans voice deepfake detection systems, enterprise IT platforms, offline mobile communication for ISRO, and civic traffic management infrastructure. I thrive at the intersection of AI/ML and full-stack engineering.
            </p>
            {experience[0] && (
              <p className="text-silver/80 text-lg leading-relaxed mb-6">
                Most recently, I engineered production MERN-stack applications at <strong className="text-white">{experience[0].company}</strong> as a {experience[0].role}.
              </p>
            )}
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <div><span className="block text-2xl font-bold text-white font-heading">7+</span>Projects Shipped</div>
              <div><span className="block text-2xl font-bold text-white font-heading">Top 2%</span>of 40K+ Builders</div>
              <div><span className="block text-2xl font-bold text-amber font-heading">{identity.openTo}</span></div>
            </div>
            <div className="mt-6 flex gap-3">
              {identity.languages.map((lang) => (
                <span key={lang} className="px-3 py-1 rounded-full bg-navy text-silver/60 text-sm border border-white/10">{lang}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
