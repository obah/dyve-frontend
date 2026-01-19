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
import { MarketBuyModal } from "./MarketBuyModal";
import { useState } from "react";

interface MarketCardProps {
  market: IUnifiedMarket;
}

export function MarketCard({ market }: MarketCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<IOutcome | null>(null);
  /*
   * Local state for modal visibility and selected outcome.
   * Internal modal state (amount, contracts) is now handled inside MarketBuyModal.
   */
  const handleOpenBuy = (outcome: IOutcome) => {
    setSelectedOutcome(outcome);
    setIsDialogOpen(true);
  };

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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenBuy(outcome);
                  }}
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
      <MarketBuyModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedOutcome={selectedOutcome}
        allOutcomes={market.outcomes}
        marketQuestion={market.question}
      />
    </motion.div>
  );
}

function AppIconTooltip({ app }: { app: string }) {
  const getAppIcon = (app: string) => {
    switch (app.toLowerCase()) {
      case "polymarket":
        return <Icons.polymarketBlueWhiteIcon className="h-4 w-4" />;
      case "limitless":
        return <Icons.limitlessLogo className="h-4 w-4" />;
      case "kalshi":
        return (
          <div className="flex h-4 w-4 items-center justify-center bg-[#09C285] text-center text-black">
            K
          </div>
        );
      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500" title={app} />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{getAppIcon(app)}</TooltipTrigger>
        <TooltipContent className="border-primary text-primary border capitalize">
          {app}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
