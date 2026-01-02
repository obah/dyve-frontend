"use client";

import { useFetchActiveEvents } from "@/app/api/polymarket/fetch-active-events";
import { pricesToPercentages } from "@/lib/utils";
import { useEffect, useState } from "react";

import { DashboardFilters } from "../components/dashboard/DashboardFilters";
import { MarketCard } from "../components/dashboard/MarketCard";
import { Navbar } from "../components/landing/Navbar";

export default function Dashboard() {
  const { data, isLoading } = useFetchActiveEvents();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const parsedEvents = getUnifiedPolymarketEvents(data);
      // Flatten markets from events for the grid view
      const allMarkets = parsedEvents.flatMap((e) => e.markets);
      setEvents(allMarkets);
    }
  }, [data]);

  function getUnifiedPolymarketEvents(events: GammaPolymarketEventResponse[]) {
    return events.map((event) => {
      return {
        id: event.id,
        ticker: event.ticker,
        slug: event.slug,
        title: event.title,
        description: event.description,
        icon: event.icon,
        image: event.image,
        markets: event.markets.map((market) => {
          const outcomes =
            typeof market.outcomes === "string"
              ? JSON.parse(market.outcomes)
              : market.outcomes || [];
          const outcomePrices =
            typeof market.outcomePrices === "string"
              ? JSON.parse(market.outcomePrices)
              : market.outcomePrices || [];

          return {
            id: market.id,
            source: "polymarket",
            question: market.question,
            outcomes: outcomes.map((outcome: any, index: number) => ({
              label: outcome,
              price: outcomePrices[index] ? Number(outcomePrices[index]) : 0,
              probability: outcomePrices[index]
                ? pricesToPercentages(outcomePrices[index])
                : 0,
            })),
            volume: Number(market.volume),
            deadline: market.endDate ?? undefined,
            image: market.image,
            description: market.description,
          };
        }),
        source: "polymarket",
      };
    });
  }

  return (
    <main className="selection:bg-primary/20 min-h-screen bg-black text-white">
      {/* Navbar - Reused from Landing but could be a distinct Dashboard one later */}
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

        {/* Content Grid */}
        <div className="container mx-auto mt-8 px-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Render flattened markets */}
              {events.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
              {/* Empty State */}
              {events.length === 0 && (
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
