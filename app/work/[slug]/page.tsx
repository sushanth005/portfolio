// app/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/portfolio";
import CaseStudyContent from "./CaseStudyContent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Sushanth Bandari`,
    description: project.oneLiner,
    openGraph: {
      title: `${project.title} — Sushanth Bandari`,
      description: project.oneLiner,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-silver">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/#works"
          className="text-sm text-muted hover:text-amber transition-colors inline-flex items-center gap-1 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Back to Works
        </Link>
      </div>

      <CaseStudyContent project={project} />
    </main>
  );
}
