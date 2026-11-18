// app/resume/ResumeContent.tsx
"use client";

import { identity, socials, skillGroups, projects, achievements, experience, education } from "@/content/portfolio";

export default function ResumeContent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      {/* Print button - hidden in print */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-3">
        <a
          href="/"
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          ← Back to Portfolio
        </a>
        <button
          suppressHydrationWarning
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg bg-[#FCA311] text-black text-sm font-semibold hover:bg-[#e59300] transition-colors"
        >
          Download Resume
        </button>
      </div>

      <div className="max-w-[800px] mx-auto px-8 py-12 print:py-0 print:px-0">
        {/* Header */}
        <header className="mb-6 pb-4 border-b-2 border-gray-200">
          <h1 className="text-3xl font-bold">{identity.name}</h1>
          <p className="text-lg text-[#FCA311] font-medium mt-1">
            {identity.roleLine}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <span>{identity.email}</span>
            <span>{identity.phone}</span>
            <span>{identity.location}</span>
            {socials
              .filter((s) => s.platform === "LinkedIn" || s.platform === "GitHub")
              .map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  className="text-[#FCA311] hover:underline"
                >
                  {s.platform}
                </a>
              ))}
          </div>
        </header>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.institution} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree} — {edu.field}</h3>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
              <p className="text-sm text-[#FCA311] font-medium">{edu.institution} · {edu.location}</p>
              <p className="text-sm text-gray-600 mt-0.5">{edu.gradeLabel}: <strong>{edu.grade}</strong></p>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.company} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.role}</h3>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-sm text-[#FCA311] font-medium">
                {exp.company} · {exp.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.slug} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">
                  {p.title}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({p.client})
                  </span>
                </h3>
              </div>
              <p className="text-sm text-gray-600">{p.oneLiner}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {p.techStack.join(" · ")}
              </p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          {skillGroups.map((group) => (
            <div key={group.title} className="mb-2">
              <span className="font-medium text-sm">{group.title}: </span>
              <span className="text-sm text-gray-600">
                {group.skills.join(", ")}
              </span>
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Achievements
          </h2>
          {achievements.map((ach) => (
            <div key={ach.title} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm">{ach.title}</h3>
                <span className="text-xs text-gray-500">{ach.date}</span>
              </div>
              <p className="text-xs text-gray-500">{ach.organization}</p>
            </div>
          ))}
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Languages
          </h2>
          <p className="text-sm text-gray-600">
            {identity.languages.join(", ")}
          </p>
        </section>
      </div>
    </div>
  );
}
