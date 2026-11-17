// app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-5">
        {/* Spinning ring */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-transparent border-t-amber animate-spin" />
        {/* Chatbot icon — circular */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber/40 shadow-[0_0_30px_rgba(252,163,17,0.4)]">
          <Image
            src="/assets/chatbot.png"
            alt="Loading"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Dots */}
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber"
              style={{ animation: `loadBounce 1s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
        <style>{`
          @keyframes loadBounce {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
}
