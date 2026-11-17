// app/resume/page.tsx
import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume — Sushanth Bandari",
  description: "Print-ready resume of Sushanth Bandari — Full-Stack Developer & AI Builder.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
