// components/Works.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryFilters } from "@/content/portfolio";
import SkillIcon from "./SkillIcon";

export default function Works() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Featured <span className="text-amber">Works</span></h2>
          <p className="section-subtitle">Production-grade products built from concept to deployment.</p>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
          {categoryFilters.map((cf) => (
            <button key={cf.key} suppressHydrationWarning onClick={() => setFilter(cf.key)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cf.key ? "bg-amber text-black" : "bg-navy text-silver/60 hover:text-white hover:bg-navy/80 border border-white/10"}`} aria-pressed={filter === cf.key}>
              {cf.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a key={project.slug} href={`/work/${project.slug}`} className="card p-6 flex flex-col cursor-pointer group" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                <span className="text-xs font-medium text-amber uppercase tracking-wider mb-3">{project.client}</span>
                <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-amber transition-colors">{project.title}</h3>
                <p className="text-silver/60 text-sm mb-4 flex-1">{project.oneLiner}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 6).map((tech) => (<SkillIcon key={tech} name={tech} size={16} className="opacity-60" />))}
                  {project.techStack.length > 6 && <span className="text-xs text-muted self-center">+{project.techStack.length - 6}</span>}
                </div>
                <div className="flex gap-3 mt-auto">
                  <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.github, "_blank", "noopener,noreferrer"); }} className="text-xs text-white/50 hover:text-amber transition-colors cursor-pointer">GitHub →</span>
                  {project.live && <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.live, "_blank", "noopener,noreferrer"); }} className="text-xs text-amber hover:text-amber/80 transition-colors cursor-pointer">Live Demo →</span>}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
