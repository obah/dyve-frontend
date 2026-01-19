"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../../../components/dashboard/portfolio/columns";
import { AppIcon } from "@/components/dashboard/AppIcon";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  Wallet,
  CheckCircle2,
  CircleDollarSign,
} from "lucide-react";

const positions: PortfolioPosition[] = [
  {
    id: "1",
    event: "Will Stripe IPO in 2024?",
    outcome: "Yes",
    cost: 500,
    potentialWinnings: 1000,
    platform: "polymarket",
    dateOpened: "2024-01-15",
    currentProbability: 45,
    previousProbability: 40,
    isFromDyve: true,
  },
  {
    id: "2",
    event: "Bitcoin > $100k by Q2 2025?",
    outcome: "No",
    cost: 300,
    potentialWinnings: 450,
    platform: "limitless",
    dateOpened: "2024-02-01",
    currentProbability: 60,
    previousProbability: 55,
    isFromDyve: false,
  },
  {
    id: "3",
    event: "US GDP Growth > 2% in 2024",
    outcome: "Yes",
    cost: 1000,
    potentialWinnings: 1800,
    platform: "kalshi",
    dateOpened: "2024-03-10",
    currentProbability: 55,
    previousProbability: 90,
    isFromDyve: true,
  },
  {
    id: "4",
    event: "Who will win the 2024 US Election?",
    outcome: "Biden",
    cost: 250,
    potentialWinnings: 800,
    platform: "polymarket",
    dateOpened: "2024-01-20",
    currentProbability: 30,
    previousProbability: 55,
    isFromDyve: false,
  },
  {
    id: "5",
    event: "Nvidia Market Cap > $3T",
    outcome: "Yes",
    cost: 600,
    potentialWinnings: 900,
    platform: "limitless",
    dateOpened: "2024-02-15",
    currentProbability: 70,
    previousProbability: 65,
    isFromDyve: false,
  },
];

export default function Portfolio() {
  const totalPositions = positions.length;
  const uniquePlatforms = Array.from(new Set(positions.map((p) => p.platform)));
  const totalCost = positions.reduce((acc, curr) => acc + curr.cost, 0);
  const totalPotentialWinnings = positions.reduce(
    (acc, curr) => acc + curr.potentialWinnings,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Portfolio</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Positions */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Total Positions
              </p>
              <h3 className="text-2xl font-bold text-white">
                {totalPositions}
              </h3>
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-500">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Platforms</p>
              <div className="flex items-center gap-2 pt-1">
                {uniquePlatforms.map((platform) => (
                  <AppIcon key={platform} app={platform} className="h-5 w-5" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
              <CircleDollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Cost</p>
              <h3 className="text-2xl font-bold text-white">
                {formatCurrency(totalCost)}
              </h3>
            </div>
          </div>
        </div>

        {/* Potential Winnings */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Potential Winnings
              </p>
              <h3 className="text-2xl font-bold text-green-400">
                {formatCurrency(totalPotentialWinnings)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Open Positions
        </h2>
        <DataTable columns={columns} data={positions} />
      </div>
    </div>
  );
}
