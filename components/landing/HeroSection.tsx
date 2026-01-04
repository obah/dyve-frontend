"use client";

import Link from "next/link";
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
    <section className="relative flex h-[95vh] w-full flex-col items-center justify-center overflow-hidden bg-black p-4 text-white md:h-screen">
      {/* Background Ambience - Restored Orange Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.08)_0%,transparent_60%)]" />
      <div className="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 rounded-full opacity-50 blur-[150px]" />

      {/* Node Network Layer (SVG Overlay) */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        {/* Render Lines first so they are behind dots */}
        <svg
          className="h-full w-full"
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
                className="absolute inset-0 animate-ping rounded-full opacity-20"
                style={{ backgroundColor: node.color }}
              />
              <div className="h-3 w-3 rounded-full border border-white/20 bg-black shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]" />
              {/* Inner icon/color indicator */}
              <div
                className="absolute inset-0 m-auto h-1 w-1 rounded-full"
                style={{ backgroundColor: node.color }}
              />
            </div>

            {/* Label */}
            <div className="hidden md:block">
              <div className="text-sm font-medium text-zinc-300">
                {node.label}
              </div>
              <div className="font-mono text-[10px] tracking-wider text-zinc-600">
                CONNECTING...
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content (Centered) */}
      <div className="relative z-10 mx-auto mt-20 flex max-w-7xl flex-col items-center space-y-8 text-center md:mt-0">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass hover:border-primary/40 flex cursor-default items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-400 transition-colors"
        >
          <span className="bg-primary h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_var(--color-primary)]" />
          <span>Prediction market aggregation on steroids</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl font-bold tracking-tight text-zinc-500 drop-shadow-2xl md:text-7xl"
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
          className="max-w-2xl text-lg leading-relaxed font-light text-zinc-400 md:text-xl"
        >
          Stop switching tabs. Discover, analyze, and trade across several
          prediction markets on different chains from a single, unified
          dashboard.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="group relative rounded-full border border-white/10 bg-white/5 px-8 py-3 font-medium text-white transition-all hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              Explore{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />
            </span>
          </Link>

          <button
            onClick={() => {
              document
                .getElementById("pain-points")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:bg-zinc-200"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
