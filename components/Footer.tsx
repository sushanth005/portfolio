// components/Footer.tsx
"use client";

import { identity, socials } from "@/content/portfolio";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {identity.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socials
            .filter((s) => s.platform !== "Email")
            .map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-amber transition-colors"
                aria-label={social.platform}
              >
                <SocialIcon platform={social.platform} size={18} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
