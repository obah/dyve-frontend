"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

/**
 * Node position configuration.
 * x, y are percentages (0-100).
 * labelAlign determines if text is to the left or right of the dot.
 */
const NODES = [
  // Left Side (Markets)
  {
    id: "polymarket",
    label: "Polymarket",
    x: 10,
    y: 30,
    color: "#2563eb",
    labelAlign: "right",
  },
  {
    id: "kalshi",
    label: "Kalshi",
    x: 8,
    y: 70,
    color: "#16a34a",
    labelAlign: "right",
  },
  {
    id: "cortex",
    label: "Cortex",
    x: 15,
    y: 15,
    color: "#d946ef",
    labelAlign: "right",
  },

  // Right Side (Chains/Defi)
  {
    id: "gnosis",
    label: "Gnosis",
    x: 90,
    y: 30,
    color: "#134e4a",
    labelAlign: "left",
  },
  {
    id: "base",
    label: "Base",
    x: 92,
    y: 70,
    color: "#0052ff",
    labelAlign: "left",
  },
  {
    id: "quant",
    label: "Quant",
    x: 85,
    y: 15,
    color: "#f59e0b",
    labelAlign: "left",
  },
];

const ConnectionLine = ({
  startX,
  startY,
  endX,
  endY,
  delay,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}) => {
  // SVG Path logic: Curve from start to end with a control point
  const controlX = (startX + endX) / 2;
  //   const controlY = startY; // Simple curve

  const pathD = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;

  return (
    <g>
      {/* Base Line (dimmed) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />
      {/* Animated Stream Packet */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#gradient-stream)" // Use gradient ref
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="10 100" // The dash is the packet
        strokeDashoffset="110"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="110"
          to="-110" // Move across the path
          dur="3s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
};

export function HeroSection() {
  return (
    <section className="relative w-full h-[95vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white p-4">
      {/* Background Ambience - Restored Orange Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      {/* Node Network Layer (SVG Overlay) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Render Lines first so they are behind dots */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="gradient-stream"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#ff7824" /> {/* Brand Orange */}
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {NODES.map((node, i) => (
            <ConnectionLine
              key={`line-${node.id}`}
              startX={node.x}
              startY={node.y}
              endX={50} // Converge to center X
              endY={50} // Converge to center Y
              delay={i * 0.5}
            />
          ))}
        </svg>

        {/* Render Nodes (HTML for easier text handling) */}
        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="absolute flex items-center gap-3"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)", // Center on coordinate
              flexDirection: node.labelAlign === "left" ? "row-reverse" : "row",
            }}
          >
            {/* Dot */}
            <div className="relative">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ backgroundColor: node.color }}
              />
              <div className="w-3 h-3 rounded-full border border-white/20 shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] bg-black" />
              {/* Inner icon/color indicator */}
              <div
                className="absolute inset-0 m-auto w-1 h-1 rounded-full"
                style={{ backgroundColor: node.color }}
              />
            </div>

            {/* Label */}
            <div className="hidden md:block">
              <div className="text-sm font-medium text-zinc-300">
                {node.label}
              </div>
              <div className="text-[10px] text-zinc-600 font-mono tracking-wider">
                CONNECTING...
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content (Centered) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto space-y-8 mt-20 md:mt-0">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-zinc-400 border border-white/10 hover:border-primary/40 transition-colors cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
          <span>Public Beta</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-500 drop-shadow-2xl"
        >
          The <span className="text-white">Entire</span> Prediction Market.
          <br />
          <span className="text-primary">One Interface.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light"
        >
          Stop switching tabs. Discover, analyze, and trade across Polymarket,
          Kalshi, and Crypto.com from a single, unified dashboard.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6"
        >
          <button className="group relative px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all">
            <span className="flex items-center gap-2">
              Explore{" "}
              <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
            </span>
          </button>

          <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
