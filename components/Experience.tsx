// components/Experience.tsx
"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/portfolio";
import SkillIcon from "./SkillIcon";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-navy/20" aria-label="Experience">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Work <span className="text-amber">Experience</span></h2>
          <p className="section-subtitle">Professional experience engineering production software.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {experience.map((exp, i) => (
            <motion.div key={exp.company} className="card p-8 relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.15 }}>
              <div className="absolute -left-3 top-10 w-6 h-6 rounded-full bg-amber border-4 border-black hidden md:block" />
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">{exp.role}</h3>
                  <p className="text-amber font-medium">{exp.company}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-silver/80">{exp.period}</p>
                  <p className="text-muted">{exp.location}</p>
                </div>
              </div>
              <p className="text-silver/60 leading-relaxed mb-6">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.techUsed.map((tech) => (
                  <div key={tech} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/5 text-sm text-silver/70">
                    <SkillIcon name={tech} size={14} />{tech}
                  </div>
                ))}
              </div>
              {exp.relatedProject && <a href={`/work/${exp.relatedProject}`} className="text-sm text-amber hover:text-amber/80 transition-colors">View related project: ServiceDesk Pro →</a>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
