"use client";

import { useState } from "react";
import { Star, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const APPS = ["Polymarket", "Kalshi", "Azuro", "Gnosis"];
const CATEGORIES = [
  "Politics",
  "Crypto",
  "Sports",
  "Business",
  "Science",
  "Movies",
];
const STATUS_FILTERS = ["New", "Trending", "High Liquidity", "Ending Soon"];

export function DashboardFilters() {
  const [selectedApps, setSelectedApps] = useState<string[]>(["Polymarket"]);
  const [selectedCategory, setSelectedCategory] = useState("Politics");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Trending",
  ]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleApp = (app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app],
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const toggleFavorite = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  // Sort items based on favorites
  const sortedApps = [...APPS].sort((a, b) => {
    if (favorites.includes(a) && !favorites.includes(b)) return -1;
    if (!favorites.includes(a) && favorites.includes(b)) return 1;
    return 0;
  });

  return (
    <div className="sticky top-20 z-30 space-y-6 border-b border-white/5 bg-black/80 py-6 pb-6 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-4 px-4">
        {/* Row 1: Apps */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-zinc-500">
            Platforms:
          </span>
          {sortedApps.map((app) => (
            <button
              key={app}
              onClick={() => toggleApp(app)}
              className={cn(
                "group relative flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                selectedApps.includes(app)
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-white/5 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800",
              )}
            >
              <span className="relative z-10">{app}</span>
              <Star
                onClick={(e) => toggleFavorite(e, app)}
                className={cn(
                  "h-3 w-3 transition-colors hover:text-yellow-400",
                  favorites.includes(app)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-700 opacity-0 group-hover:opacity-100",
                )}
              />
            </button>
          ))}
        </div>

        {/* Row 2: Categories (Tabs) */}
        <div className="flex w-full flex-wrap items-center gap-1 border-b border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "relative border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                selectedCategory === cat
                  ? "border-primary text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Row 3: Status Filters & Search */}
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={cn(
                  "rounded border px-3 py-1 text-xs font-medium transition-all",
                  selectedStatuses.includes(status)
                    ? "border-white/20 bg-zinc-800 text-white"
                    : "border-transparent bg-transparent text-zinc-500 hover:text-zinc-300",
                )}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-1/2">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search markets..."
              className="focus:border-primary/50 w-full rounded-full border border-white/10 bg-zinc-900 py-1.5 pr-4 pl-9 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
