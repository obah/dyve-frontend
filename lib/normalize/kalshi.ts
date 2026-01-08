/**
 * Normalizes Kalshi market data into a unified event format.
 * Since Kalshi API returns individual markets (not grouped events like Polymarket),
 * each market becomes its own event with a single market.
 */

const CATEGORY_MAP: Record<string, string> = {
  // Politics
  politics: "politics",
  elections: "elections",

  // Finance
  finance: "finance",
  economy: "economy",
  stocks: "stocks",

  // Crypto
  crypto: "crypto",

  // Climate / Weather
  climate: "climate",
  weather: "weather",

  // Science / Tech
  science: "science",
  tech: "tech",

  // Sports
  sports: "sports",

  // World / Geography
  world: "world",
};

export function normalizeKalshiMarket(market: KalshiMarkets): IUnifiedEvent {
  const categorySlug =
    CATEGORY_MAP[market.category?.toLowerCase()] ||
    market.category?.toLowerCase() ||
    "other";

  const categories: { id: string; label: string; slug: string }[] = [];

  if (categorySlug) {
    categories.push({
      id: categorySlug,
      label: categorySlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug: categorySlug,
    });
  }

  // Add "closing-soon" category if market closes within 48 hours
  const closeTime = new Date(market.close_time);
  if (closeTime < new Date(Date.now() + 48 * 60 * 60 * 1000)) {
    categories.push({
      id: "closing-soon",
      label: "Closing Soon",
      slug: "closing_soon",
    });
  }

  // Calculate prices - Kalshi uses cents, so we need to convert
  const yesPrice = market.yes_ask / 100 || market.last_price / 100;
  const noPrice = market.no_ask / 100 || 1 - yesPrice;

  const unifiedMarket: IUnifiedMarket = {
    id: market.ticker,
    source: "kalshi",
    question: market.title,
    description: market.rules_primary || market.subtitle || "",
    image: "", // Kalshi doesn't provide images for individual markets
    volume: market.volume || 0,
    deadline: closeTime,
    outcomes: [
      {
        label: market.yes_sub_title || "Yes",
        price: yesPrice,
        probability: yesPrice * 100,
      },
      {
        label: market.no_sub_title || "No",
        price: noPrice,
        probability: noPrice * 100,
      },
    ],
  };

  return {
    id: market.ticker,
    ticker: market.ticker,
    slug: market.ticker.toLowerCase(),
    title: market.title,
    description: market.rules_primary || market.subtitle || "",
    icon: "",
    image: "", // Kalshi doesn't provide images
    markets: [unifiedMarket],
    source: "kalshi",
    updatedAt: new Date(),
    categories,
  };
}
