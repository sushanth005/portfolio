// content/knowledge.ts
// Chatbot knowledge base derived from portfolio.ts
// Local keyword matching — no API keys needed.

import { identity, socials, projects, achievements, experience, skillGroups } from "./portfolio";

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

function buildKnowledgeBase(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  // Identity
  entries.push({
    keywords: ["who", "name", "about", "introduce", "yourself", "sushanth"],
    answer: `I'm ${identity.name}, a ${identity.roleLine} based in ${identity.location}. I speak ${identity.languages.join(", ")}. I'm currently ${identity.openTo.toLowerCase()}.`,
  });

  // Contact
  entries.push({
    keywords: ["contact", "email", "mail", "phone", "reach", "connect", "hire"],
    answer: `You can reach Sushanth at:\n• Email: ${identity.email}\n• Phone: ${identity.phone}\n• ${socials.filter(s => s.platform !== "Email").map(s => `${s.platform}: ${s.url}`).join("\n• ")}`,
  });

  // Internship status
  entries.push({
    keywords: ["internship", "open", "available", "hire", "job", "work", "opportunity"],
    answer: `Yes! Sushanth is currently open to internships. He's a ${identity.roleLine} based in ${identity.location}. Feel free to reach out at ${identity.email}.`,
  });

  // Skills
  entries.push({
    keywords: ["skills", "technologies", "tech", "stack", "languages", "tools", "what can", "know"],
    answer: skillGroups.map(g => `**${g.title}:** ${g.skills.join(", ")}`).join("\n\n"),
  });

  // Projects overview
  entries.push({
    keywords: ["projects", "built", "work", "portfolio", "what have", "products", "made"],
    answer: `Sushanth has built ${projects.length} major projects:\n${projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.oneLiner}`).join("\n")}`,
  });

  // Individual project entries
  for (const p of projects) {
    entries.push({
      keywords: [
        p.slug,
        ...p.title.toLowerCase().split(/[\s-]+/),
        ...(p.client ? p.client.toLowerCase().split(/[\s()]+/).filter(Boolean) : []),
      ],
      answer: `**${p.title}** (${p.client})\n${p.description}\n\n**Tech Stack:** ${p.techStack.join(", ")}\n${p.aiIntegration ? `**AI Integration:** ${p.aiIntegration}\n` : ""}**GitHub:** ${p.github}${p.live ? `\n**Live:** ${p.live}` : ""}`,
    });
  }

  // Achievements
  entries.push({
    keywords: ["achievements", "awards", "hackathon", "won", "accomplishments", "recognition", "finalist"],
    answer: achievements.map(a => `• **${a.title}** (${a.organization}, ${a.date}) — ${a.description.split(".")[0]}.`).join("\n"),
  });

  // Experience
  entries.push({
    keywords: ["experience", "internship", "wiseacad", "suntekcorp", "work experience", "job"],
    answer: experience.map(e => `**${e.role}** at ${e.company}\n${e.period} | ${e.location}\n${e.description}\nTech: ${e.techUsed.join(", ")}`).join("\n\n"),
  });

  // Location
  entries.push({
    keywords: ["location", "where", "city", "based", "live", "hyderabad"],
    answer: `Sushanth is based in ${identity.location}.`,
  });

  return entries;
}

export const knowledgeBase = buildKnowledgeBase();

export const suggestedQuestions = [
  "What have you built?",
  "Are you open to internships?",
  "Walk me through DhvaniSense",
  "What's your tech stack?",
  "How do I contact you?",
];

export function findAnswer(query: string): string {
  const q = query.toLowerCase().trim();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += kw.length; // longer keyword matches = more specific
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return "I'm not sure about that — I can only answer questions about Sushanth's projects, skills, experience, and achievements. Try one of the suggested questions, or head to the Contact section to reach out directly!";
}
