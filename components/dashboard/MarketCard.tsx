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
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface MarketCardProps {
  market: IUnifiedMarket;
}

export function MarketCard({ market }: MarketCardProps) {
  // const hasArbitrage = Math.random() > 0.7;
  // const arbApps = ["Kalshi", "Polymarket", "Gnosis"].filter(
  //   () => Math.random() > 0.5,
  // );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group hover:border-primary/20 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 transition-all hover:bg-zinc-900/60"
    >
      <div className="relative h-32 w-full overflow-hidden bg-zinc-800">
        {market.image ? (
          <Image
            src={market.image}
            alt={market.question}
            className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
            width={500}
            height={500}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-800 to-black p-4">
            <span className="text-xs tracking-widest text-zinc-600 uppercase">
              {market.source}
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2 rounded-lg border border-white/10 bg-black/60 p-1 backdrop-blur">
          <AppIconTooltip app={market.source} />
        </div>

        {/* <TooltipProvider>
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
        </TooltipProvider> */}
      </div>

      <div className="flex grow flex-col p-4">
        <h3 className="group-hover:text-primary mb-4 line-clamp-2 min-h-12 font-medium text-white transition-colors">
          {market.question}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2">
          {market.outcomes
            .slice(0, 2)
            .map((outcome: IOutcome, index: number) => (
              <div
                key={`${outcome.label}-${index}`}
                className="w-full space-y-1"
              >
                <Button
                  variant={
                    outcome.label.toLowerCase() === "yes"
                      ? "default"
                      : "secondary"
                  }
                  className="group/btn w-full rounded"
                >
                  <span className="group-hover/btn:hidden">
                    {outcome.label}
                  </span>
                  <span className="hidden text-white group-hover/btn:inline">
                    ¢{outcome.price.toFixed(2)}
                  </span>
                </Button>
                <p className="text-center font-mono text-xs text-white">
                  {outcome.probability.toFixed(0)}%
                </p>
              </div>
            ))}
          {market.outcomes.length > 2 && (
            <div className="pt-1 text-xs text-zinc-600">
              +{market.outcomes.length - 2} more outcomes
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-white/2 px-4 py-3 text-xs text-zinc-600">
        <span>Vol: ${(market.volume / 1000).toFixed(1)}k</span>
        <span>
          Close:{" "}
          {market.deadline
            ? new Date(market.deadline).toLocaleDateString()
            : "No Deadline"}
        </span>
      </div>
    </motion.div>
  );
}

function AppIconTooltip({ app }: { app: string }) {
  const getAppIcon = (app: string) => {
    switch (app.toLowerCase()) {
      case "polymarket":
        return <Icons.polymarketBlueWhiteIcon className="h-4 w-4" />;

      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500" title={app} />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{getAppIcon(app)}</TooltipTrigger>
        <TooltipContent className="border-primary text-primary border">
          {app}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
