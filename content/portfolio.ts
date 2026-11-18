// content/portfolio.ts
// Single source of truth for all portfolio data.
// Used by page sections, case studies, resume, and chatbot knowledge.

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: "ai" | "fullstack" | "mobile" | "civic";
  oneLiner: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  aiIntegration?: string;
  useCases: string[];
  github: string;
  live?: string;
  hackathon?: string;
}

export interface Achievement {
  title: string;
  date: string;
  organization: string;
  description: string;
  images: string[];
  certificate?: string;
  linkedin?: string;
  relatedProject?: string; // slug
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  gradeLabel: string; // "CGPA" | "Percentage"
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  techUsed: string[];
  relatedProject?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export const identity = {
  name: "Sushanth Bandari",
  location: "Hyderabad, India",
  email: "sushanth1208@gmail.com",
  phone: "+91 8919741818",
  roleLine: "Full-Stack Developer & AI Engineer",
  openTo: "Open to Internships",
  languages: ["English", "Telugu", "Hindi"],
  pillars: [
    "Full-Stack Engineering",
    "AI & Machine Learning",
    "System Design",
    "UI/UX Design",
    "Cloud & DevOps",
    "Problem Solving",
  ],
  heroImage: "/assets/home.png",
  aboutImages: ["/assets/about1.jpg", "/assets/about2.jpg", "/assets/about3.jpg"],
  chatbotAvatar: "/assets/chatbot.png",
};

export const socials: SocialLink[] = [
  { platform: "Email", url: "mailto:sushanth1208@gmail.com", label: "sushanth1208@gmail.com" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/sushanth-bandari-510bb3378/", label: "LinkedIn" },
  { platform: "GitHub", url: "https://github.com/sushanth005", label: "GitHub" },
  { platform: "Twitter", url: "https://x.com/SushanthBandari", label: "X (Twitter)" },
  { platform: "Instagram", url: "https://www.instagram.com/yo_sushanth", label: "Instagram" },
];

export const skillGroups = [
  {
    title: "Languages & Web",
    skills: [
      "Python", "Java", "C", "JavaScript", "SQL", "C++",
      "HTML", "CSS", "Tailwind CSS", "React.js", "Node.js",
      "Express.js", "FastAPI", "REST APIs",
    ],
  },
  {
    title: "AI & Data",
    skills: [
      "OpenAI API", "Gemini API", "Groq API", "Hugging Face",
      "LLM Integration", "Vector Embeddings", "Machine Learning",
      "Data Analysis", "Prompt Engineering", "Data Visualization",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Docker", "Microsoft Azure", "Google Cloud Platform",
      "Git", "GitHub", "Android Studio", "MongoDB", "PostgreSQL",
      "ChatGPT", "Claude", "Google Gemini", "GitHub Copilot",
      "Cursor AI", "Google AI Studio", "Perplexity AI", "Groq",
      "v0", "Antigravity", "Figma",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "dhvanisense",
    title: "DhvaniSense",
    client: "HCL Guvi",
    category: "ai",
    oneLiner: "Deep learning–based voice authenticity system achieving ~99% accuracy in distinguishing AI-generated from human speech.",
    description:
      "An end-to-end audio intelligence pipeline that classifies voice samples as human or AI-generated. The system leverages a fine-tuned Wav2Vec2 transformer, served through a production-grade FastAPI backend with API key authentication. Initially deployed on GCP, then migrated to Microsoft Azure to maintain continuous availability.",
    keyFeatures: [
      "Classifies AI-generated vs. human voice with ~99% accuracy",
      "Processes MP3/WAV audio via Librosa and FFmpeg pipelines",
      "Automates model training, validation, and performance reporting",
      "Exposes secure REST endpoints with API key authentication",
      "Accepts Base64-encoded audio payloads for seamless integration",
      "Containerized with Docker for reproducible cloud deployment",
    ],
    techStack: [
      "Python", "FastAPI", "PyTorch", "Librosa", "NumPy", "Pandas",
      "Scikit-learn", "FFmpeg", "Docker", "Uvicorn", "GCP", "Microsoft Azure",
    ],
    aiIntegration:
      "Fine-tuned Facebook Wav2Vec2 transformer on custom voice datasets using PyTorch, achieving ~99% binary classification accuracy across AI-generated and human voice samples.",
    useCases: [
      "Deepfake voice detection",
      "Audio authenticity verification",
      "Voice fraud prevention",
      "AI-generated speech identification",
    ],
    github: "https://github.com/sushanth005/dhvanisense",
  },
  {
    slug: "coffee-with-cinema",
    title: "Coffee-with-Cinema",
    client: "NASSCOM",
    category: "ai",
    oneLiner: "Generative AI filmmaking suite that converts story concepts into screenplays, storyboards, and production budgets.",
    description:
      "A full-cycle film pre-production platform powered by large language models and diffusion-based image generation. Users input a story concept and receive a structured screenplay, character profiles with arcs and motivations, AI-generated cinematic storyboards, shot lists with camera compositions, sound design recommendations, and production budget breakdowns — all exportable as PDF, DOCX, or TXT.",
    keyFeatures: [
      "Generates structured screenplays from natural-language story concepts",
      "Builds character profiles with motivations, arcs, and relationships",
      "Renders photorealistic storyboard frames via Stable Diffusion XL",
      "Produces detailed shot lists with camera angles and compositions",
      "Delivers sound design and scoring recommendations per scene",
      "Estimates production budgets with itemized cost breakdowns",
      "Manages multiple projects with persistent storage and versioning",
      "Exports deliverables in PDF, DOCX, and TXT formats",
    ],
    techStack: [
      "Python", "Flask", "Groq API", "Llama 3.3 70B", "Hugging Face",
      "Stable Diffusion XL", "HTML5", "CSS3", "JavaScript",
      "ReportLab", "python-docx",
    ],
    aiIntegration:
      "Orchestrates Groq-hosted Llama 3.3 70B for structured screenplay and production content generation, paired with Hugging Face Stable Diffusion XL for photorealistic storyboard rendering.",
    useCases: [
      "Film pre-production",
      "Screenplay development",
      "Creative storytelling",
      "Visual planning",
      "Independent filmmaking",
    ],
    github: "https://github.com/sushanth005/Coffee-With-Cinema",
  },
  {
    slug: "servicedesk-pro",
    title: "ServiceDesk Pro",
    client: "WiseAcad by SuntekCorp",
    category: "fullstack",
    oneLiner: "Enterprise ITSM platform with AI-driven ticket triage, SLA automation, and asset lifecycle management.",
    description:
      "A production-grade IT service management system built on the MERN stack. The platform automates incident resolution through LLM-powered ticket classification, enforces SLA compliance with business-hours–aware escalation, tracks hardware and software assets across their lifecycle, and provides role-based dashboards with exportable analytics.",
    keyFeatures: [
      "Triages incoming tickets automatically via Groq LLM classification",
      "Enforces SLA compliance with business-hours–aware escalation rules",
      "Tracks hardware and software assets across their full lifecycle",
      "Implements role-based access control spanning five organizational roles",
      "Surfaces knowledge-base articles with AI-powered recommendations",
      "Visualizes operational metrics through interactive analytics dashboards",
      "Secures access with JWT authentication and maintains audit logs",
      "Exports reports in CSV and PDF formats for stakeholder review",
    ],
    techStack: [
      "MongoDB", "Express.js", "React.js", "Node.js", "Groq API",
      "LLaMA 3.3 70B", "JWT", "Mongoose", "Zod", "Recharts", "Docker",
    ],
    aiIntegration:
      "Integrates Groq-hosted Llama 3.3 70B for real-time ticket triage, automated priority classification, knowledge-base recommendations, and solution synthesis, with a deterministic fallback engine for guaranteed classification.",
    useCases: [
      "Enterprise IT support",
      "Helpdesk automation",
      "Incident management",
      "IT asset tracking",
      "Service-level monitoring",
    ],
    github: "https://github.com/sushanth005/servicedesk-pro",
    live: "https://servicedesk-pro-three.vercel.app/",
  },
  {
    slug: "itantra",
    title: "iTantra",
    client: "ISRO (SIH 2026)",
    category: "mobile",
    oneLiner: "Offline multilingual voice transceiver for ISRO — enabling emergency communication over Bluetooth and Wi-Fi Direct.",
    description:
      "A mobile-first communication system developed for ISRO's Smart India Hackathon problem statement (SIH26173). The Android application converts speech to compact text packets using on-device quantized AI models, transmits them over low-bandwidth Bluetooth Classic or Wi-Fi Direct, and reconstructs natural-sounding audio on the receiving device — all without internet connectivity.",
    keyFeatures: [
      "Enables offline voice communication without internet dependency",
      "Supports 10 Indian languages and English for multilingual reach",
      "Converts speech to text and text to speech using on-device AI",
      "Provides push-to-talk walkie-talkie interface for intuitive operation",
      "Triggers emergency alert mode with priority message routing",
      "Transmits low-bitrate text packets for bandwidth-constrained links",
      "Runs quantized ONNX models for efficient on-device inference",
      "Connects via Bluetooth Classic and Wi-Fi Direct protocols",
    ],
    techStack: [
      "Kotlin", "Android Studio", "Jetpack Compose", "ONNX Runtime",
      "AI4Bharat IndicConformer", "Indic-VITS", "Silero VAD",
      "Protocol Buffers", "Python", "Gradle",
    ],
    aiIntegration:
      "Deploys AI4Bharat IndicConformer and Indic-VITS speech models for multilingual STT and TTS, Silero Voice Activity Detection for endpoint detection, and INT8 quantization via ONNX Runtime for efficient on-device processing.",
    useCases: [
      "Emergency communication",
      "Disaster response",
      "Remote-area connectivity",
      "Multilingual communication",
      "Low-bandwidth distress messaging",
    ],
    github: "https://github.com/sushanth005/itantra",
    hackathon: "Smart India Hackathon 2026 — SIH26173 (ISRO)",
  },
  {
    slug: "intelli-credit",
    title: "Intelli-Credit",
    client: "AI Project",
    category: "ai",
    oneLiner: "Automated corporate credit appraisal engine with Five-Cs risk scoring and AI-generated Credit Appraisal Memos.",
    description:
      "An intelligent credit risk assessment platform that automates business loan evaluation end-to-end. The system parses multi-format financial documents, extracts structured indicators (EBITDA, PAT, DSCR, ICR), performs GST–bank transaction reconciliation for anomaly detection, conducts web-based due diligence, and generates explainable lending decisions through a configurable Five-Cs scoring engine.",
    keyFeatures: [
      "Parses multi-format financial documents for structured data extraction",
      "Detects anomalies through GST–bank transaction reconciliation",
      "Conducts AI-powered due diligence via real-time web research",
      "Scores creditworthiness using a weighted Five-Cs risk engine",
      "Automates lending decisions with explainable scoring rationale",
      "Generates comprehensive PDF Credit Appraisal Memo reports",
    ],
    techStack: [
      "Python", "FastAPI", "React.js", "Vite", "Google Gemini API",
      "Serper.dev", "pdfplumber", "PyPDF2", "ReportLab", "Recharts", "Axios",
    ],
    aiIntegration:
      "Leverages Google Gemini 1.5 Flash for financial data interpretation, research synthesis, and credit decision support; Serper.dev for real-time external information retrieval and due diligence automation.",
    useCases: [
      "Corporate credit risk modeling",
      "Automated loan underwriting",
      "Financial statement analysis",
      "Regulatory due diligence",
      "Lending decision support",
    ],
    github: "https://github.com/sushanth005/Intelli-Credit-AI-Powered-Corporate-Credit-Appraisal-Engine",
  },
  {
    slug: "pravaha",
    title: "Pravaha",
    client: "Dept. of Police, Telangana Govt.",
    category: "civic",
    oneLiner: "Graph-based urban traffic management platform for Hyderabad with real-time diversion planning and police deployment.",
    description:
      "An intelligent traffic orchestration system that models Hyderabad's road network as a weighted graph using OpenStreetMap data. The platform computes optimal diversions via Dijkstra's algorithm, automates barricade placement and police resource allocation, detects scheduling conflicts across concurrent events, and delivers real-time WebSocket alerts — supported by a cross-platform volunteer reporting app with offline synchronization.",
    keyFeatures: [
      "Models urban road networks as weighted graphs using OSM data",
      "Computes optimal traffic diversions via Dijkstra's algorithm",
      "Automates barricade placement and police resource deployment",
      "Detects multi-event scheduling conflicts with WebSocket alerts",
      "Processes multilingual event reports through AI-powered analysis",
      "Provides a cross-platform volunteer app with offline synchronization",
    ],
    techStack: [
      "Python", "FastAPI", "React", "TypeScript", "Expo",
      "React Native", "MapLibre GL", "OpenStreetMap", "NetworkX",
      "SciPy", "Shapely", "GeoPandas", "SQLite", "PostgreSQL",
      "PostGIS", "Groq API", "WebSockets",
    ],
    aiIntegration:
      "Groq API for multilingual event reporting and voice input processing.",
    useCases: [
      "Urban traffic management",
      "Emergency incident response",
      "Public event planning",
      "VIP convoy coordination",
      "Police resource allocation",
    ],
    github: "https://github.com/sushanth005/Pravaha",
  },
  {
    slug: "tark-ai",
    title: "Tark AI",
    client: "Personal Project",
    category: "fullstack",
    oneLiner: "AI career assistant that scores resumes against job descriptions, generates cover letters, and conducts mock interviews.",
    description:
      "A comprehensive career optimization platform that evaluates resumes against target job descriptions using LLM-powered analysis. The system produces detailed ATS compatibility scores, identifies skill gaps with actionable recommendations, generates personalized DOCX cover letters, and conducts contextual mock interviews with structured feedback — all backed by secure authentication and persistent assessment history.",
    keyFeatures: [
      "Scores resumes against job descriptions with AI-powered ATS analysis",
      "Parses uploaded PDF resumes for automated content extraction",
      "Identifies job-specific skill gaps with actionable recommendations",
      "Generates personalized cover letters exported as DOCX documents",
      "Conducts interactive AI mock interviews with structured feedback",
      "Secures user sessions with JWT authentication and assessment history",
      "Visualizes career analytics through interactive dashboards with PDF exports",
      "Supports light and dark mode for comfortable user experience",
    ],
    techStack: [
      "React 19", "Vite", "Tailwind CSS", "Node.js", "Express.js",
      "MongoDB", "Mongoose", "Groq API", "Llama 3.1 8B Instant",
      "JWT", "Multer", "pdf-ts", "Recharts", "Axios",
    ],
    aiIntegration:
      "Leverages Groq-hosted Llama 3.1 for ATS scoring, resume gap analysis, personalized cover letter generation, and contextual mock interview feedback with structured evaluation rubrics.",
    useCases: [
      "ATS resume optimization",
      "Career assistance",
      "Cover letter generation",
      "Mock interviews",
      "Job application analytics",
    ],
    github: "https://github.com/sushanth005/Tark-AI",
    live: "https://tark-ai-three.vercel.app/",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Finalist – India AI Impact Buildathon 2026",
    date: "Feb 2026",
    organization: "HCL Guvi",
    description:
      "Recognized in the top 2% of 40,000+ AI practitioners at the HCL GUVI India AI Impact Buildathon 2026, held at Bharat Mandapam, New Delhi. Presented DhvaniSense — an AI voice deepfake detection system achieving ~99% classification accuracy using fine-tuned Wav2Vec2 and PyTorch — competing among 15,000+ teams at a national-level innovation summit.",
    images: ["/assets/hcl1.jpg", "/assets/hcl2.jpg"],
    certificate: "https://drive.google.com/file/d/1Vf2Toyo40NkimqAvLNTz-UQRA6UyCGvT/view?usp=drive_link",
    linkedin:
      "https://www.linkedin.com/posts/sushanth-bandari-510bb3378_indiaaiimpactsummit2026-hackathon-buildathon-activity-7442945867575382016-HfuV",
    relatedProject: "dhvanisense",
  },
  {
    title: "2nd Runner Up – GENAI FORGE Hackathon",
    date: "Feb 2026",
    organization: "NASSCOM",
    description:
      "Awarded 3rd place at the GENAI Forge Hackathon — NASSCOM AI-Assisted Developer Marathon, a national competition backed by Google. Demonstrated Coffee-with-Cinema, a generative AI platform that transforms story concepts into complete film pre-production packages including screenplays, storyboards, and budgets.",
    images: ["/assets/nasscom.jpg"],
    certificate: "https://drive.google.com/file/d/1OnanG50fOl8VIUmB_BDm31--YWPbIq6O/view",
    linkedin: "https://lnkd.in/p/d4v68dfm",
    relatedProject: "coffee-with-cinema",
  },
  {
    title: "Guinness World Records™ – Agentathon 2025",
    date: "2025",
    organization: "Google Developer Groups Hyderabad",
    description:
      "Competed in the 36-hour Agentathon organized by Google Developer Groups Hyderabad — certified by Guinness World Records™ as the world's largest agentic AI hackathon. Developed an AI-powered content creation and social media automation agent using Google AI tools.",
    images: ["/assets/agentathon1.jpeg", "/assets/agentathon2.jpg", "/assets/agentathon3.jpg"],
    certificate: "https://drive.google.com/file/d/1izPcsemrilZSK4_AjIdeK4NyGE-l4Ym1/view?usp=sharing",
    linkedin: "https://lnkd.in/p/dZd4CMKr",
  },
  {
    title: "Contributed at AI Impact Summit 2026",
    date: "2026",
    organization: "AI Impact Summit 2026",
    description:
      "Represented emerging AI innovation at the India AI Impact Summit 2026 at Bharat Mandapam, New Delhi — engaging with industry leaders, researchers, and global technology practitioners shaping the future of artificial intelligence.",
    images: ["/assets/summit.jpg"],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    institution: "Anurag University",
    location: "Hyderabad, India",
    period: "2024 – 2028",
    grade: "8.45",
    gradeLabel: "CGPA",
  },
  {
    degree: "Intermediate (MPC)",
    field: "Mathematics, Physics & Chemistry",
    institution: "Narayana IIT Academy",
    location: "Hyderabad, India",
    period: "2022 – 2024",
    grade: "95.6%",
    gradeLabel: "Percentage",
  },
];

export const experience: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "WiseAcad by SuntekCorp",
    period: "April 2026 – June 2026",
    location: "On-site, Hyderabad",
    description:
      "Engineered responsive, production-grade web applications using the MERN stack in a collaborative on-site environment. Delivered end-to-end feature development spanning React frontends, Express/Node backends, MongoDB data modeling, and REST API integration, adhering to industry-standard development workflows and deployment practices.",
    techUsed: [
      "MongoDB", "Express.js", "React.js", "Node.js", "JavaScript",
      "REST APIs", "Git", "GitHub",
    ],
    relatedProject: "servicedesk-pro",
  },
];

// Category filter labels for the Works section
export const categoryFilters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "mobile", label: "Mobile" },
  { key: "civic", label: "Civic" },
] as const;
