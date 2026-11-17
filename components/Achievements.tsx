// components/Achievements.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { achievements } from "@/content/portfolio";

function ImageSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goTo = (idx: number, dir: number) => { setDirection(dir); setCurrent(idx); };
  const next = () => goTo((current + 1) % images.length, 1);
  const prev = () => goTo((current - 1 + images.length) % images.length, -1);
  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setTimeout(next, 3500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, images.length]);
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl group" style={{ height: "220px" }}>
      <AnimatePresence initial={false}>
        <motion.div key={`bg-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
          <Image src={images[current]} alt="" fill className="object-cover scale-110" aria-hidden="true" />
          <div className="absolute inset-0" style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(0,0,0,0.5)" }} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div key={`img-${current}`} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-full h-full"><Image src={images[current]} alt={`Achievement photo ${current + 1}`} fill className="object-contain drop-shadow-2xl" /></div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 z-20 rounded-xl pointer-events-none" style={{ boxShadow: "inset 0 0 48px rgba(0,0,0,0.65)" }} />
      {images.length > 1 && (
        <>
          <button suppressHydrationWarning onClick={prev} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber/80 hover:text-black transition-all">‹</button>
          <button suppressHydrationWarning onClick={next} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-amber/80 hover:text-black transition-all">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {images.map((_, i) => (<button suppressHydrationWarning key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Show photo ${i + 1}`} className={`rounded-full transition-all duration-300 ${i === current ? "bg-amber w-4 h-2" : "bg-white/40 w-2 h-2 hover:bg-white/70"}`} />))}
          </div>
          <div className="absolute top-2 right-2 z-30 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white/70">{current + 1} / {images.length}</div>
        </>
      )}
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6" aria-label="Achievements">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <h2 className="section-title"><span className="text-amber">Achievements</span> & Recognition</h2>
          <p className="section-subtitle">National hackathon wins, industry summits, and world-record events.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((ach, i) => (
            <motion.div key={ach.title} className="card p-6" style={{ borderColor: "rgba(252,163,17,0.12)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <ImageSlideshow images={ach.images} />
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber text-xs font-semibold uppercase tracking-wider">{ach.organization}</span>
                  <span className="text-muted text-xs">• {ach.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-heading">{ach.title}</h3>
                <p className="text-silver/60 text-sm leading-relaxed mb-4">{ach.description}</p>
                <div className="flex flex-wrap gap-3">
                  {ach.certificate && <a href={ach.certificate} target="_blank" rel="noopener noreferrer" className="text-xs text-amber hover:text-amber/80 transition-colors">📜 Certificate</a>}
                  {ach.linkedin && <a href={ach.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-amber/70 hover:text-amber transition-colors">🔗 LinkedIn Post</a>}
                  {ach.relatedProject && <a href={`/work/${ach.relatedProject}`} className="text-xs text-white/50 hover:text-white transition-colors">📁 View Project</a>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
