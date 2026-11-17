// components/Skills.tsx
"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/content/portfolio";
import SkillIcon from "./SkillIcon";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-navy/30" aria-label="Skills">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Skills & <span className="text-amber">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with across the stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="bg-navy border border-white/6 rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: gi * 0.15 }}
            >
              <h3 className="text-lg font-semibold text-amber mb-6 font-heading">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 border border-white/5 hover:border-amber/30 transition-colors"
                  >
                    <SkillIcon name={skill} size={18} />
                    <span className="text-sm text-silver/80">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
