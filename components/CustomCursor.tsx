// components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setHidden(false);

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Track hover on interactive elements
    const addHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(!!isInteractive);
    };

    const animate = () => {
      // Dot snaps fast
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }
      // Ring follows with smooth lag
      ringX = lerp(ringX, dotX, 0.12);
      ringY = lerp(ringY, dotY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    animate();

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousemove", addHover);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousemove", addHover);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (hidden && typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot — snappy */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width: clicking ? "6px" : hovering ? "10px" : "8px",
          height: clicking ? "6px" : hovering ? "10px" : "8px",
          marginLeft: clicking ? "-3px" : hovering ? "-5px" : "-4px",
          marginTop: clicking ? "-3px" : hovering ? "-5px" : "-4px",
          borderRadius: "50%",
          backgroundColor: hovering ? "#FFFFFF" : "#FCA311",
          transition: "width 0.15s, height 0.15s, background-color 0.2s, margin 0.15s",
          opacity: hidden ? 0 : 1,
          boxShadow: hovering
            ? "0 0 12px rgba(252,163,17,0.8)"
            : "0 0 8px rgba(252,163,17,0.6)",
        }}
      />

      {/* Outer ring — laggy follow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{
          width: clicking ? "28px" : hovering ? "44px" : "36px",
          height: clicking ? "28px" : hovering ? "44px" : "36px",
          marginLeft: clicking ? "-14px" : hovering ? "-22px" : "-18px",
          marginTop: clicking ? "-14px" : hovering ? "-22px" : "-18px",
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "rgba(252,163,17,0.6)" : "rgba(252,163,17,0.4)"}`,
          backgroundColor: hovering ? "rgba(252,163,17,0.06)" : "transparent",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s, margin 0.2s",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}
