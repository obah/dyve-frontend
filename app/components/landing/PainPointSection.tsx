"use client";

import { motion } from "framer-motion";
import { CircleCheck, Database, Layers, XCircle } from "lucide-react";

export function PainPointSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-zinc-950 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-200">
            Stop chasing volume across three different chains.
          </h2>
          <p className="text-zinc-500 mt-2">
            Unified searching, tracking, and execution.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
          {/* Fake Logos for protocols */}
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Layers className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Polymarket</span>
            <CircleCheck className="w-4 h-4 text-primary ml-1" />
          </div>

          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Database className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Kalshi</span>
            <CircleCheck className="w-4 h-4 text-primary ml-1" />
          </div>

          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Layers className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xl font-bold text-zinc-300">Crypto.com</span>
            <CircleCheck className="w-4 h-4 text-primary ml-1" />
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 flex justify-center gap-8 md:gap-24">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">$450M+</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider mt-1">
              Total Volume Tracked
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">12,000+</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider mt-1">
              Active Markets
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
