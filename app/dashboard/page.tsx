"use client";

import { useEffect, useState } from "react";

import { DashboardFilters } from "../components/dashboard/DashboardFilters";
import { MarketCard } from "../components/dashboard/MarketCard";
import { Navbar } from "../components/landing/Navbar";
import { useUnifiedEvents } from "@/hooks/useUnifiedEvents";

export default function Dashboard() {
  const { data, isLoading } = useUnifiedEvents();
  const [markets, setMarkets] = useState<IUnifiedMarket[]>([]);

  useEffect(() => {
    if (data) {
      const allMarkets = data.flatMap((event: IUnifiedEvent) => event.markets);
      setMarkets(allMarkets);
    }
  }, [data]);

  return (
    <main className="selection:bg-primary/20 min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20">
        <DashboardFilters />

        <div className="container mx-auto mb-4 px-4 py-10">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Your Feed
          </h1>
          <p className="text-zinc-500">
            Discover, analyze, and maximize your earnings on your predictions.
          </p>
        </div>

        <div className="container mx-auto mt-8 px-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {markets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
              {markets.length === 0 && (
                <div className="col-span-full py-20 text-center text-zinc-500">
                  No markets found matching your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
