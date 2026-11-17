// components/SkillIcon.tsx
// Renders a simple-icons SVG for known tech, or a monogram for missing ones.
"use client";

import * as simpleIcons from "simple-icons";

// Map display names → simple-icons slug keys
const iconMap: Record<string, string> = {
  "Python": "siPython",
  "Java": "siJava",
  "C": "siC",
  "C++": "siCplusplus",
  "JavaScript": "siJavascript",
  "TypeScript": "siTypescript",
  "SQL": "siMysql",
  "HTML": "siHtml5",
  "HTML5": "siHtml5",
  "CSS": "siCss3",
  "CSS3": "siCss3",
  "Tailwind CSS": "siTailwindcss",
  "React.js": "siReact",
  "React": "siReact",
  "React 19": "siReact",
  "React Native": "siReact",
  "Node.js": "siNodedotjs",
  "Express.js": "siExpress",
  "FastAPI": "siFastapi",
  "Flask": "siFlask",
  "MongoDB": "siMongodb",
  "Mongoose": "siMongoose",
  "PostgreSQL": "siPostgresql",
  "Docker": "siDocker",
  "Microsoft Azure": "siMicrosoftazure",
  "Google Cloud Platform": "siGooglecloud",
  "GCP": "siGooglecloud",
  "Git": "siGit",
  "GitHub": "siGithub",
  "Android Studio": "siAndroidstudio",
  "Kotlin": "siKotlin",
  "Figma": "siFigma",
  "PyTorch": "siPytorch",
  "NumPy": "siNumpy",
  "Pandas": "siPandas",
  "Scikit-learn": "siScikitlearn",
  "Vite": "siVite",
  "Expo": "siExpo",
  "Recharts": "siReact",
  "OpenAI API": "siOpenai",
  "ChatGPT": "siOpenai",
  "Hugging Face": "siHuggingface",
  "Google Gemini": "siGooglegemini",
  "Gemini API": "siGooglegemini",
  "Google Gemini API": "siGooglegemini",
  "GitHub Copilot": "siGithubcopilot",
  "Claude": "siAnthropic",
  "Perplexity AI": "siPerplexity",
  "REST APIs": "siFastapi",
  "Gradle": "siGradle",
  "SQLite": "siSqlite",
  "Uvicorn": "siGunicorn",
  "Axios": "siAxios",
  "Machine Learning": "siTensorflow",
  "Data Analysis": "siPandas",
  "Data Visualization": "siPlotly",
  "Excel": "siMicrosoftexcel",
  "JWT": "siJsonwebtokens",
  "WebSockets": "siSocketdotio",
};

interface SkillIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function SkillIcon({ name, size = 20, className = "" }: SkillIconProps) {
  const key = iconMap[name];
  const icon = key ? (simpleIcons as Record<string, { svg: string; hex: string } | undefined>)[key] : undefined;

  if (icon) {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        title={name}
        dangerouslySetInnerHTML={{
          __html: icon.svg.replace(
            "<svg",
            `<svg width="${size}" height="${size}" fill="#${icon.hex}"`
          ),
        }}
      />
    );
  }

  // Monogram fallback
  const initials = name
    .split(/[\s/]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`inline-flex items-center justify-center rounded bg-navy text-silver/70 font-semibold ${className}`}
      style={{ width: size + 4, height: size + 4, fontSize: size * 0.5 }}
      title={name}
    >
      {initials}
    </span>
  );
}
