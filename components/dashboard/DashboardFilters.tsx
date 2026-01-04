"use client";

import { useGetCategories } from "@/hooks/useGetCategories";
import { Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const APPS = ["Polymarket", "Kalshi", "Azuro", "Gnosis"];
const CUSTOM_CATEGORIES = [
  { label: "Featured", slug: "featured" },
  { label: "New", slug: "new" },
  { label: "Ending Soon", slug: "closing_soon" },
];

interface DashboardFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedEvent: string | null;
  setSelectedEvent: (eventId: string | null) => void;
  selectedApps: string[];
  setSelectedApps: (apps: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (item: string) => void;
  events: IUnifiedEvent[];
}

export function DashboardFilters({
  selectedCategory,
  setSelectedCategory,
  selectedEvent,
  setSelectedEvent,
  selectedApps,
  setSelectedApps,
  searchQuery,
  setSearchQuery,
  favorites,
  toggleFavorite,
  events,
}: DashboardFiltersProps) {
  const { data: liveCategories } = useGetCategories();

  // Scroll Container Logic
  const categoriesRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const [categoriesScroll, setCategoriesScroll] = useState({
    left: false,
    right: false,
  });
  const [eventsScroll, setEventsScroll] = useState({
    left: false,
    right: false,
  });

  const checkScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setScroll: (val: { left: boolean; right: boolean }) => void,
  ) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setScroll({
        left: scrollLeft > 10,
        right: scrollLeft + clientWidth < scrollWidth - 10,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkScroll(categoriesRef, setCategoriesScroll);
      checkScroll(eventsRef, setEventsScroll);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const cats = categoriesRef.current;
    const evs = eventsRef.current;

    cats?.addEventListener("scroll", () =>
      checkScroll(categoriesRef, setCategoriesScroll),
    );
    evs?.addEventListener("scroll", () =>
      checkScroll(eventsRef, setEventsScroll),
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      cats?.removeEventListener("scroll", () =>
        checkScroll(categoriesRef, setCategoriesScroll),
      );
      evs?.removeEventListener("scroll", () =>
        checkScroll(eventsRef, setEventsScroll),
      );
    };
  }, [liveCategories, events]);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    left: boolean,
  ) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: left ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleApp = (app: string) => {
    setSelectedApps(
      selectedApps.includes(app)
        ? selectedApps.filter((a) => a !== app)
        : [...selectedApps, app],
    );
  };

  const sortedApps = [...APPS].sort((a, b) => {
    if (favorites.includes(a) && !favorites.includes(b)) return -1;
    if (!favorites.includes(a) && favorites.includes(b)) return 1;
    return 0;
  });

  return (
    <div className="sticky top-20 z-30 space-y-4 border-b border-white/5 bg-black/80 py-4 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-4 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(app);
                  }}
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

          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets..."
              className="focus:border-primary/50 w-full rounded-full border border-white/10 bg-zinc-900 py-1.5 pr-4 pl-9 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="group/nav relative flex w-full items-center gap-1">
          <div className="flex items-center gap-2 border-b border-white/5 pb-1">
            {CUSTOM_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSelectedEvent(null);
                }}
                className={cn(
                  "border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === cat.slug
                    ? "border-primary text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-white" />

          {categoriesScroll.left && (
            <button
              onClick={() => scroll(categoriesRef, true)}
              className="absolute left-64 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div
            ref={categoriesRef}
            className="scrollbar-hide flex items-center gap-1 overflow-x-scroll border-b border-white/5 pb-1"
          >
            {liveCategories
              ?.filter(
                (cat) => cat.slug !== "featured" && cat.slug !== "closing_soon",
              )
              .map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setSelectedEvent(null);
                  }}
                  className={cn(
                    "border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === cat.slug
                      ? "border-primary text-white"
                      : "border-transparent text-zinc-500 hover:text-zinc-300",
                  )}
                >
                  {cat.label}
                </button>
              ))}
          </div>

          {categoriesScroll.right && (
            <button
              onClick={() => scroll(categoriesRef, false)}
              className="absolute -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Row 3: Events List (Horizontal Scroll) */}
        {events.length > 0 && (
          <div className="group/events relative">
            {eventsScroll.left && (
              <button
                onClick={() => scroll(eventsRef, true)}
                className="absolute top-1/2 -left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-black"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            <div
              ref={eventsRef}
              className="scrollbar-hide flex w-full gap-3 overflow-x-auto pb-2"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className={cn(
                  "flex h-12 min-w-fit items-center gap-3 rounded-lg border px-3 transition-colors",
                  selectedEvent === null
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-white/5 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800",
                )}
              >
                <span className="text-sm font-medium">All Events</span>
              </button>

              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event.id)}
                  className={cn(
                    "flex h-12 max-w-[300px] min-w-[200px] items-center gap-3 rounded-lg border px-3 text-left transition-colors",
                    selectedEvent === event.id
                      ? "bg-primary/10 border-primary"
                      : "border-white/5 bg-zinc-900/50 hover:bg-zinc-800",
                  )}
                >
                  {event.icon ? (
                    <Image
                      src={event.icon}
                      alt={event.title}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-zinc-700" />
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <span
                      className={cn(
                        "truncate text-sm font-medium",
                        selectedEvent === event.id
                          ? "text-white"
                          : "text-zinc-300",
                      )}
                    >
                      {event.title}
                    </span>
                    <span className="truncate text-xs text-zinc-500">
                      {event.ticker || event.source}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {eventsScroll.right && (
              <button
                onClick={() => scroll(eventsRef, false)}
                className="absolute top-1/2 -right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-black"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
