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

const CATEGORY_MAP: Record<string, DyveCategory> = {
  movies: "movies",
  "box-office": "movies",
  hollywood: "movies",
  "best-of-2025": "movies",
  finance: "finance",
  economy: "economy",
  business: "business",
  exchange: "finance",
  ipos: "finance",
  stocks: "finance",
  "micro-strategy": "finance",
  crypto: "crypto",
  bitcoin: "crypto",
  ethereum: "crypto",
  solana: "crypto",
  politics: "politics",
  elections: "politics",
  primaries: "politics",
  "2025-predictions": "2025-predictions",
  climate: "climate and weather",
  "global-warming": "climate and weather",
  weather: "climate and weather",
  science: "science and tech",
  tech: "science and tech",
  france: "world",
  italy: "world",
  world: "world",
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
      price: Number(prices[i] ?? 0) * 100,
      probability: Number(prices[i] ?? 0) * 100,
    })),
  };
}
