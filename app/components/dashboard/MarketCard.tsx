"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, AlertTriangle, Info } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarketCardProps {
  market: any; // Using any for now to align with the mapped type in page.tsx
}

export function MarketCard({ market }: MarketCardProps) {
  // Random Arbitrage Logic for Demo
  const hasArbitrage = Math.random() > 0.7;
  const arbApps = ["Kalshi", "Polymarket", "Gnosis"].filter(
    () => Math.random() > 0.5,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group hover:border-primary/20 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 transition-all hover:bg-zinc-900/60"
    >
      {/* Image Header */}
      <div className="relative h-32 w-full overflow-hidden bg-zinc-800">
        {market.image ? (
          <img
            src={market.image}
            alt={market.question}
            className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-800 to-black p-4">
            <span className="text-xs tracking-widest text-zinc-600 uppercase">
              {market.source}
            </span>
          </div>
        )}

        {/* App Icon Badge */}
        <div className="absolute top-2 right-2 rounded border border-white/10 bg-black/60 p-1 backdrop-blur">
          {/* Placeholder Icon */}
          <div
            className="h-4 w-4 rounded-full bg-blue-500"
            title={market.source}
          />
        </div>

        {/* Arbitrage Badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`absolute top-2 left-2 rounded border bg-black/60 p-1.5 backdrop-blur ${hasArbitrage ? "border-green-500/50 text-green-400" : "border-zinc-700/50 text-zinc-600"}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-zinc-900 text-zinc-300">
              {hasArbitrage ? (
                <p>Arbitrage opportunity on: {arbApps.join(", ")}</p>
              ) : (
                <p>No arbitrage currently available</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-4">
        <h3 className="group-hover:text-primary mb-4 line-clamp-2 min-h-[3rem] font-medium text-white transition-colors">
          {market.question}
        </h3>

        {/* Outcomes */}
        <div className="mt-auto space-y-2">
          {market.outcomes.slice(0, 2).map((outcome: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm"
            >
              <span className="max-w-[60%] truncate text-zinc-400">
                {outcome.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-white">
                  {outcome.probability.toFixed(0)}%
                </span>
                <span className="text-primary/80 font-mono text-xs">
                  ${outcome.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          {market.outcomes.length > 2 && (
            <div className="pt-1 text-xs text-zinc-600">
              +{market.outcomes.length - 2} more outcomes
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-white/5 bg-white/2 px-4 py-3 text-xs text-zinc-600">
        <span>Vol: ${(market.volume / 1000).toFixed(1)}k</span>
        <span>
          {market.deadline
            ? new Date(market.deadline).toLocaleDateString()
            : "No Deadline"}
        </span>
      </div>
    </motion.div>
  );
}
