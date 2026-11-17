import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sushanth Bandari — Full-Stack Developer & AI Builder",
  description:
    "Portfolio of Sushanth Bandari — Full-stack developer and AI builder from Hyderabad, India. Open to internships. Building real-world AI solutions.",
  keywords: [
    "Sushanth Bandari",
    "Full Stack Developer",
    "AI Builder",
    "Portfolio",
    "MERN Stack",
    "Machine Learning",
    "Hyderabad",
  ],
  authors: [{ name: "Sushanth Bandari" }],
  icons: {
    icon: "/assets/chatbot.png",
    apple: "/assets/chatbot.png",
  },
  openGraph: {
    title: "Sushanth Bandari — Full-Stack Developer & AI Builder",
    description:
      "Full-stack developer and AI builder from Hyderabad, India. Open to internships.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
