export function normalizePolymarketEvent(
  event: GammaPolymarketEventResponse,
): IUnifiedEvent {
  const mappedCategories = (event.tags || []).reduce(
    (acc, tag) => {
      const targetSlug = CATEGORY_MAP[tag.slug];
      if (targetSlug && !acc.some((c) => c.slug === targetSlug)) {
        acc.push({
          id: targetSlug,
          label: targetSlug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          slug: targetSlug,
        });
      }
      return acc;
    },
    [] as { id: string; label: string; slug: string }[],
  );

  return {
    source: "polymarket",
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    image: event.image,
    icon: event.icon,
    categories: [
      ...mappedCategories,
      ...(event.new ? [{ id: "new", label: "New", slug: "new" }] : []),
      ...(event.featured
        ? [{ id: "featured", label: "Featured", slug: "featured" }]
        : []),
      ...(new Date(event.endDate) < new Date(Date.now() + 48 * 60 * 60 * 1000)
        ? [{ id: "closing-soon", label: "Closing Soon", slug: "closing_soon" }]
        : []),
    ],
    markets: event.markets.map(normalizePolymarketMarket),
    updatedAt: new Date(),
    ticker: event.ticker,
  };
}

const CATEGORY_MAP: Record<string, string> = {
  // movies
  movies: "movies",
  "box-office": "movies",
  hollywood: "movies",
  "best-of-2025": "movies",

  // finance / economy
  finance: "finance",
  economy: "economy",
  business: "business",
  exchange: "finance",
  ipos: "finance",
  stocks: "stocks",
  "micro-strategy": "stocks",

  // crypto
  crypto: "crypto",
  bitcoin: "crypto",
  ethereum: "crypto",
  solana: "crypto",

  // politics
  politics: "politics",
  elections: "elections",
  primaries: "elections",

  // general
  "2025-predictions": "2025-predictions",

  // climate / weather
  climate: "climate",
  "global-warming": "climate",
  weather: "weather",

  // science / tech
  science: "science",
  tech: "tech",

  // geography
  france: "geography",
  italy: "geography",
  world: "world",

  // Custom mappings for tags that might match our custom categories
  featured: "featured",
  "closing-soon": "closing_soon",
  trending: "featured",
};

function normalizePolymarketMarket(market: any): IUnifiedMarket {
  const outcomes = JSON.parse(market.outcomes ?? "[]");
  const prices = JSON.parse(market.outcomePrices ?? "[]");

  return {
    id: market.id,
    source: "polymarket",
    question: market.question,
    description: market.description,
    image: market.image,
    deadline: market.endDate,
    volume: Number(market.volume),
    outcomes: outcomes.map((label: string, i: number) => ({
      label,
      price: Number(prices[i] ?? 0),
      probability: Number(prices[i] ?? 0) * 100,
    })),
  };
}
