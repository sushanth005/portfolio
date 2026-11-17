// components/ParticlesBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface GridNode {
  x: number;
  y: number;
  baseAlpha: number;
  alpha: number;
  active: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number; // 0→1 draw-in animation
  alpha: number;
  life: number; // seconds remaining
  maxLife: number;
}

interface SignalPulse {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number; // 0→1 position along line
  speed: number;
}

const GRID_SPACING = 60;
const ACTIVE_RATIO = 0.08; // ~8% of nodes are active
const NODE_RADIUS = 1.2;
const ACTIVE_NODE_RADIUS = 2;
const CONNECTION_MAX_DIST = GRID_SPACING * 3;
const MOUSE_RADIUS = 150;
const SIGNAL_INTERVAL = 3000; // ms between signal pulses
const MAX_CONNECTIONS = 30;

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    let nodes: GridNode[] = [];
    let connections: Connection[] = [];
    let signals: SignalPulse[] = [];
    let mouse = { x: -9999, y: -9999 };
    let lastSignalTime = 0;
    let lastTime = 0;
    let tempConnections: Connection[] = []; // mouse-triggered

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      connections = [];
      signals = [];
      tempConnections = [];

      const cols = Math.ceil(canvas.width / GRID_SPACING) + 1;
      const rows = Math.ceil(canvas.height / GRID_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const isActive = Math.random() < ACTIVE_RATIO;
          nodes.push({
            x: c * GRID_SPACING,
            y: r * GRID_SPACING,
            baseAlpha: 0.08,
            alpha: 0.08,
            active: isActive,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 1.5,
          });
        }
      }

      // Create initial connections between nearby active nodes
      const activeIndices = nodes
        .map((n, i) => (n.active ? i : -1))
        .filter((i) => i >= 0);

      for (let i = 0; i < activeIndices.length; i++) {
        for (let j = i + 1; j < activeIndices.length; j++) {
          const a = nodes[activeIndices[i]];
          const b = nodes[activeIndices[j]];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_MAX_DIST && Math.random() < 0.4) {
            connections.push({
              from: activeIndices[i],
              to: activeIndices[j],
              progress: 0,
              alpha: 0.15,
              life: 8 + Math.random() * 12,
              maxLife: 8 + Math.random() * 12,
            });
            if (connections.length >= MAX_CONNECTIONS) break;
          }
        }
        if (connections.length >= MAX_CONNECTIONS) break;
      }
    };

    const spawnSignal = () => {
      if (connections.length === 0) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      if (conn.progress < 1) return; // only on fully drawn connections
      const a = nodes[conn.from];
      const b = nodes[conn.to];
      signals.push({
        fromX: a.x,
        fromY: a.y,
        toX: b.x,
        toY: b.y,
        progress: 0,
        speed: 0.4 + Math.random() * 0.6,
      });
    };

    const draw = (timestamp: number) => {
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw grid dots ---
      for (const node of nodes) {
        // Mouse proximity brightening
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseInfluence = mdist < MOUSE_RADIUS ? 1 - mdist / MOUSE_RADIUS : 0;

        if (node.active) {
          // Pulsing active node
          node.pulsePhase += node.pulseSpeed * dt;
          const pulse = 0.3 + Math.sin(node.pulsePhase) * 0.25;
          node.alpha = pulse + mouseInfluence * 0.4;

          // Glow
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, ACTIVE_NODE_RADIUS * 4
          );
          gradient.addColorStop(0, `rgba(252,163,17,${node.alpha * 0.6})`);
          gradient.addColorStop(1, "rgba(252,163,17,0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, ACTIVE_NODE_RADIUS * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, ACTIVE_NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(252,163,17,${Math.min(node.alpha + 0.2, 1)})`;
          ctx.fill();
        } else {
          // Passive grid dot
          const alpha = node.baseAlpha + mouseInfluence * 0.15;
          ctx.beginPath();
          ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      // --- Mouse temporary connections ---
      if (mouse.x > 0 && mouse.y > 0) {
        // Find nodes near mouse
        const nearNodes: number[] = [];
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS * 0.7) {
            nearNodes.push(i);
          }
        }
        // Draw temp connections between nearby nodes
        for (let i = 0; i < nearNodes.length && i < 6; i++) {
          for (let j = i + 1; j < nearNodes.length && j < 6; j++) {
            const a = nodes[nearNodes[i]];
            const b = nodes[nearNodes[j]];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < GRID_SPACING * 2) {
              const alpha = (1 - dist / (GRID_SPACING * 2)) * 0.2;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(252,163,17,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // --- Draw persistent connections ---
      for (let i = connections.length - 1; i >= 0; i--) {
        const conn = connections[i];
        // Animate draw-in
        if (conn.progress < 1) {
          conn.progress = Math.min(conn.progress + dt * 0.8, 1);
        }
        conn.life -= dt;
        if (conn.life <= 0) {
          connections.splice(i, 1);
          continue;
        }

        const a = nodes[conn.from];
        const b = nodes[conn.to];
        const fadeAlpha = conn.life < 2 ? conn.life / 2 : 1;
        const drawEnd = conn.progress;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(
          a.x + (b.x - a.x) * drawEnd,
          a.y + (b.y - a.y) * drawEnd
        );
        ctx.strokeStyle = `rgba(252,163,17,${conn.alpha * fadeAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Replenish connections
      if (connections.length < MAX_CONNECTIONS * 0.6 && Math.random() < 0.02) {
        const activeIndices = nodes
          .map((n, i) => (n.active ? i : -1))
          .filter((i) => i >= 0);
        if (activeIndices.length >= 2) {
          const ai = activeIndices[Math.floor(Math.random() * activeIndices.length)];
          const a = nodes[ai];
          // Find a nearby active node
          for (const bi of activeIndices) {
            if (bi === ai) continue;
            const b = nodes[bi];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_MAX_DIST) {
              connections.push({
                from: ai,
                to: bi,
                progress: 0,
                alpha: 0.12 + Math.random() * 0.08,
                life: 6 + Math.random() * 10,
                maxLife: 6 + Math.random() * 10,
              });
              break;
            }
          }
        }
      }

      // --- Signal pulses ---
      if (timestamp - lastSignalTime > SIGNAL_INTERVAL) {
        spawnSignal();
        lastSignalTime = timestamp;
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed * dt;
        if (s.progress >= 1) {
          signals.splice(i, 1);
          continue;
        }

        const x = s.fromX + (s.toX - s.fromX) * s.progress;
        const y = s.fromY + (s.toY - s.fromY) * s.progress;

        // Bright dot
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        gradient.addColorStop(0, "rgba(252,163,17,0.9)");
        gradient.addColorStop(0.4, "rgba(252,163,17,0.3)");
        gradient.addColorStop(1, "rgba(252,163,17,0)");
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
