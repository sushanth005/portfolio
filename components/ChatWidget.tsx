// components/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { findAnswer, suggestedQuestions } from "@/content/knowledge";
import { identity } from "@/content/portfolio";

interface Message { role: "user" | "bot"; text: string; }

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: "Hey there! 👋 I'm Sushanth's portfolio assistant. Ask me about his projects, skills, or experience!" }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  const handleSend = (text?: string) => {
    const query = (text || input).trim();
    if (!query) return;
    setMessages((prev) => [...prev, { role: "user", text: query }, { role: "bot", text: findAnswer(query) }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber shadow-lg shadow-amber/20 flex items-center justify-center z-50 hover:scale-105 transition-transform" aria-label={isOpen ? "Close chat" : "Open chat assistant"} whileTap={{ scale: 0.95 }}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" /></svg>
        ) : (
          <div className="w-9 h-9 rounded-full overflow-hidden"><Image src={identity.chatbotAvatar} alt="Chat assistant" width={36} height={36} className="object-cover" /></div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-navy rounded-2xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden" role="dialog" aria-label="Chat with portfolio assistant">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-full overflow-hidden"><Image src={identity.chatbotAvatar} alt="" width={32} height={32} className="object-cover" /></div>
              <div><p className="text-sm font-semibold text-white">Portfolio Assistant</p><p className="text-xs text-muted">Ask about Sushanth</p></div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user" ? "bg-amber text-black rounded-br-sm" : "bg-black/50 text-silver/80 rounded-bl-sm border border-white/5"}`} style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {messages.length <= 2 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 shrink-0">
                {suggestedQuestions.map((q) => (<button suppressHydrationWarning key={q} onClick={() => handleSend(q)} className="px-2.5 py-1 text-xs rounded-full bg-black/50 text-silver/60 border border-white/10 hover:border-amber/30 hover:text-white transition-colors">{q}</button>))}
              </div>
            )}
            <div className="px-4 py-3 border-t border-white/10 shrink-0">
              <div className="flex gap-2">
                <label htmlFor="chat-input" className="sr-only">Ask a question</label>
                <input suppressHydrationWarning id="chat-input" ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything..." className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm placeholder:text-muted focus:outline-none focus:border-amber/50" />
                <button suppressHydrationWarning onClick={() => handleSend()} disabled={!input.trim()} className="px-3 py-2 rounded-lg bg-amber text-black font-semibold text-sm hover:bg-amber/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Send message">↑</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
