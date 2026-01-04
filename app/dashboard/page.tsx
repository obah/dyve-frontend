"use client";

import { useEffect, useState } from "react";

import { DashboardFilters } from "../components/dashboard/DashboardFilters";
import { MarketCard } from "../components/dashboard/MarketCard";
import { Navbar } from "../components/landing/Navbar";
import { useGetEventsByCategory } from "@/hooks/useGetEventsByCategory";

export default function Dashboard() {
  // State
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>(["Polymarket"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [markets, setMarkets] = useState<IUnifiedMarket[]>([]);

  // Fetch events based on category
  const { data: eventsData, isLoading } =
    useGetEventsByCategory(selectedCategory);

  useEffect(() => {
    if (eventsData) {
      // 1. Flatten markets from all events in the category
      // 2. Filter by selected event (if any)
      // 3. Filter by selected apps
      // 4. Filter by search query

      let filtered = eventsData.flatMap((event: IUnifiedEvent) => {
        // Filter by Event Selection
        if (selectedEvent && event.id !== selectedEvent) return [];

        // Attach Source to market for app filtering (if not already present on market)
        return event.markets.map((m) => ({ ...m, source: event.source }));
      });

      // Filter by Apps (Source)
      if (selectedApps.length > 0) {
        filtered = filtered.filter((m: IUnifiedMarket) =>
          selectedApps.some(
            (app) => app.toLowerCase() === m.source.toLowerCase(),
          ),
        );
      }

      // Filter by Search
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((m: IUnifiedMarket) =>
          m.question.toLowerCase().includes(lowerQuery),
        );
      }

      setMarkets(filtered);
    }
  }, [eventsData, selectedEvent, selectedApps, searchQuery]);

  const toggleFavorite = (item: string) => {
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <main className="selection:bg-primary/20 min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20">
        <DashboardFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedApps={selectedApps}
          setSelectedApps={setSelectedApps}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          events={eventsData || []}
        />

        <div className="container mx-auto mb-4 px-4 py-10">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white capitalize">
            {selectedCategory.replace("_", " ")} Feed
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
