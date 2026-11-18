// components/Education.tsx
"use client";

import { motion } from "framer-motion";
import { education } from "@/content/portfolio";

const icons: Record<string, string> = {
  "Bachelor of Technology": "🎓",
  "Intermediate (MPC)": "📚",
};

export default function Education() {
  return (
    <section id="education" className="py-24 px-6" aria-label="Education">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="text-amber">Education</span>
          </h2>
          <p className="section-subtitle">
            Academic foundations that fuel my engineering mindset.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber/40 via-amber/15 to-transparent -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className={`relative flex flex-col sm:flex-row gap-6 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-amber/50 items-center justify-center text-lg z-10 shadow-[0_0_16px_rgba(252,163,17,0.3)]">
                  {icons[edu.degree] ?? "🏫"}
                </div>

                {/* Spacer on opposite side */}
                <div className="hidden sm:block flex-1" />

                {/* Card */}
                <div className="flex-1 sm:max-w-[calc(50%-3rem)]">
                  <div className="group bg-navy border border-white/8 rounded-2xl p-6 hover:border-amber/30 hover:shadow-[0_8px_32px_rgba(252,163,17,0.1)] transition-all duration-300">
                    {/* Period badge */}
                    <span className="inline-block px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-semibold border border-amber/20 mb-4">
                      {edu.period}
                    </span>

                    <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-amber transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-silver/70 text-sm font-medium mb-3">
                      {edu.field}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber/60 shrink-0">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-silver/60 text-sm">
                        {edu.institution}, {edu.location}
                      </span>
                    </div>

                    {/* Grade */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">{edu.gradeLabel}</p>
                        <p className="text-2xl font-heading font-bold text-amber">{edu.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
