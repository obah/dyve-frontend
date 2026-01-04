"use client";

import { motion } from "framer-motion";
import { CircleCheck, Database, Layers, XCircle } from "lucide-react";

export function PainPointSection() {
  return (
    <section
      id="pain-points"
      className="w-full overflow-hidden border-y border-white/5 bg-zinc-950 py-12 md:py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-zinc-200 md:text-3xl">
            Stop chasing volume across three different chains.
          </h2>
          <p className="mt-2 text-zinc-500">
            Unified searching, tracking, and execution.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 opacity-80 md:gap-16">
          {/* Fake Logos for protocols */}
          <div className="group flex cursor-default items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-blue-500/20">
              <Layers className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Polymarket</span>
            <CircleCheck className="text-primary ml-1 h-4 w-4" />
          </div>

          <div className="group flex cursor-default items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-green-500/20">
              <Database className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Kalshi</span>
            <CircleCheck className="text-primary ml-1 h-4 w-4" />
          </div>

          <div className="group flex cursor-default items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-purple-500/20">
              <Layers className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Crypto.com</span>
            <CircleCheck className="text-primary ml-1 h-4 w-4" />
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 flex justify-center gap-8 md:gap-24">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">$450M+</div>
            <div className="mt-1 text-sm tracking-wider text-zinc-500 uppercase">
              Total Volume Tracked
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">12,000+</div>
            <div className="mt-1 text-sm tracking-wider text-zinc-500 uppercase">
              Active Markets
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
