// components/Contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { identity, socials } from "@/content/portfolio";
import SocialIcon from "./SocialIcon";

interface FormState { name: string; email: string; subject: string; message: string; }

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const copyToClipboard = (text: string, label: string) => { navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2000); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); setForm({ name: "", email: "", subject: "", message: "" }); setTimeout(() => setSent(false), 4000); }, 800);
  };
  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <section id="contact" className="py-24 px-6" aria-label="Contact">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="section-title">Get In <span className="text-amber">Touch</span></h2>
          <p className="section-subtitle">{identity.openTo} — let&apos;s build something together.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="card p-8 h-full flex flex-col gap-6">
              <div>
                <p className="text-muted text-xs uppercase tracking-wider mb-1">Email</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={`mailto:${identity.email}`} className="text-lg font-semibold text-amber hover:text-amber/80 transition-colors break-all">{identity.email}</a>
                  <button suppressHydrationWarning onClick={() => copyToClipboard(identity.email, "email")} className="text-xs text-muted hover:text-white transition-colors shrink-0" aria-label="Copy email">{copied === "email" ? "✓ Copied!" : "📋"}</button>
                </div>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wider mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <a href={`tel:${identity.phone}`} className="text-lg font-semibold text-white hover:text-amber transition-colors">{identity.phone}</a>
                  <button suppressHydrationWarning onClick={() => copyToClipboard(identity.phone, "phone")} className="text-xs text-muted hover:text-white transition-colors" aria-label="Copy phone">{copied === "phone" ? "✓ Copied!" : "📋"}</button>
                </div>
              </div>
              <div><p className="text-muted text-xs uppercase tracking-wider mb-2">Location</p><p className="text-silver/80">📍 {identity.location}</p></div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wider mb-3">Socials</p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a key={social.platform} href={social.url} target={social.url.startsWith("mailto:") ? undefined : "_blank"} rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-silver/70 hover:text-amber hover:border-amber/30 transition-all text-sm" aria-label={social.platform}>
                      <SocialIcon platform={social.platform} size={15} /><span>{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-white/10"><p className="text-sm text-muted leading-relaxed">I&apos;m actively seeking internship opportunities. If you have a role or project in mind, I&apos;d love to hear about it.</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="card p-8 flex flex-col gap-5" noValidate>
              <h3 className="text-xl font-heading font-bold text-white">Send a Message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs text-muted uppercase tracking-wider">Name *</label>
                  <input id="contact-name" suppressHydrationWarning name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" className="px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-amber/60 focus:ring-1 focus:ring-amber/30 transition-colors text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs text-muted uppercase tracking-wider">Email *</label>
                  <input id="contact-email" suppressHydrationWarning name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-amber/60 focus:ring-1 focus:ring-amber/30 transition-colors text-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="text-xs text-muted uppercase tracking-wider">Subject</label>
                <input id="contact-subject" suppressHydrationWarning name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-amber/60 focus:ring-1 focus:ring-amber/30 transition-colors text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs text-muted uppercase tracking-wider">Message *</label>
                <textarea id="contact-message" suppressHydrationWarning name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about the opportunity, project, or just say hi..." className="px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-amber/60 focus:ring-1 focus:ring-amber/30 transition-colors text-sm resize-none" />
              </div>
              <button suppressHydrationWarning type="submit" disabled={!isValid || sending} className="w-full py-3.5 rounded-lg bg-amber text-black font-semibold text-sm hover:bg-amber/90 hover:shadow-[0_0_20px_rgba(252,163,17,0.3)] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {sending ? (<><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Opening mail client…</>) : sent ? (<>✓ Done! Check your mail client</>) : (<>Send Message ↗</>)}
              </button>
              <p className="text-xs text-muted text-center">Opens your default mail client with the message pre-filled.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
