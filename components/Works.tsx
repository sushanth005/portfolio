// components/Works.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryFilters } from "@/content/portfolio";
import SkillIcon from "./SkillIcon";
import type { Project } from "@/content/portfolio";

/* ── Inline detail modal ─────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-2xl bg-navy border border-white/10 rounded-2xl p-7 shadow-[0_0_60px_rgba(252,163,17,0.1)] overflow-y-auto max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            suppressHydrationWarning
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-silver/60 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <span className="text-xs font-semibold text-amber uppercase tracking-wider">{project.client}</span>
          <h3 className="font-heading text-2xl font-bold text-white mt-1 mb-2">{project.title}</h3>
          <p className="text-amber/80 text-sm mb-4">{project.oneLiner}</p>

          {/* Description */}
          <p className="text-silver/70 leading-relaxed mb-6">{project.description}</p>

          {/* Key Features */}
          {project.keyFeatures?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.keyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-silver/65 text-sm">
                    <span className="text-amber mt-0.5 shrink-0">▸</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/8 text-sm text-silver/70">
                  <SkillIcon name={tech} size={14} />
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          {project.useCases?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.useCases.map((uc) => (
                <span key={uc} className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs border border-amber/20">{uc}</span>
              ))}
            </div>
          )}

          {/* Hackathon badge */}
          {project.hackathon && (
            <div className="mb-6 p-4 rounded-xl bg-amber/8 border border-amber/20 text-sm text-silver/70">
              🏆 <span className="text-amber font-semibold">Hackathon:</span> {project.hackathon}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-3 flex-wrap">
            <a
              href={`/work/${project.slug}`}
              className="px-5 py-2.5 rounded-lg bg-amber text-black text-sm font-semibold hover:bg-amber/90 hover:shadow-[0_0_20px_rgba(252,163,17,0.3)] transition-all"
            >
              Full Case Study →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-silver text-sm font-medium hover:border-amber/30 hover:text-white transition-colors"
            >
              GitHub →
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-silver text-sm font-medium hover:border-amber/30 hover:text-white transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Works section ───────────────────────────── */
export default function Works() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Featured <span className="text-amber">Works</span></h2>
          <p className="section-subtitle">Production-grade products built from concept to deployment.</p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
          {categoryFilters.map((cf) => (
            <button key={cf.key} suppressHydrationWarning onClick={() => setFilter(cf.key)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cf.key ? "bg-amber text-black" : "bg-navy text-silver/60 hover:text-white hover:bg-navy/80 border border-white/10"}`} aria-pressed={filter === cf.key}>
              {cf.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                className="card p-6 flex flex-col cursor-pointer group"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
              >
                <span className="text-xs font-medium text-amber uppercase tracking-wider mb-3">{project.client}</span>
                <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-amber transition-colors">{project.title}</h3>
                <p className="text-silver/60 text-sm mb-4 flex-1">{project.oneLiner}</p>

                {/* Tech icons */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 6).map((tech) => (<SkillIcon key={tech} name={tech} size={16} className="opacity-60" />))}
                  {project.techStack.length > 6 && <span className="text-xs text-muted self-center">+{project.techStack.length - 6}</span>}
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-auto gap-3">
                  <div className="flex gap-3">
                    <span
                      onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank", "noopener,noreferrer"); }}
                      className="text-xs text-white/50 hover:text-amber transition-colors cursor-pointer"
                    >
                      GitHub →
                    </span>
                    {project.live && (
                      <span
                        onClick={(e) => { e.stopPropagation(); window.open(project.live, "_blank", "noopener,noreferrer"); }}
                        className="text-xs text-amber hover:text-amber/80 transition-colors cursor-pointer"
                      >
                        Live →
                      </span>
                    )}
                  </div>

                  {/* View button */}
                  <button
                    suppressHydrationWarning
                    onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                    className="px-3 py-1.5 rounded-lg bg-amber/10 text-amber text-xs font-semibold border border-amber/25 hover:bg-amber hover:text-black transition-all group-hover:border-amber/50"
                  >
                    View ↗
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
