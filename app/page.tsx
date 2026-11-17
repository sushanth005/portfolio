// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function HomePage() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main id="main" className="relative z-10 page-transition">
        <Hero />
        <About />
        <Skills />
        <Works />
        <Achievements />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
