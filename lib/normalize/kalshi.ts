const CATEGORY_MAP: Record<string, string> = {
  politics: "politics",
  elections: "elections",
  finance: "finance",
  economy: "economy",
  stocks: "stocks",
  crypto: "crypto",
  climate: "climate and weather",
  weather: "climate and weather",
  science: "science",
  tech: "tech",
  sports: "sports",
  world: "world",
};

export function normalizeKalshiMarket(
  market: KalshiMarket,
  category?: string,
): IUnifiedEvent {
  const categorySlug =
    CATEGORY_MAP[category?.toLowerCase() || ""] ||
    category?.toLowerCase() ||
    "other";

  const categories: { id: string; label: string; slug: string }[] = [];

  if (categorySlug) {
    categories.push({
      id: categorySlug,
      label: categorySlug
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug: categorySlug,
    });
  }

  const closeTime = new Date(market.close_time);
  if (closeTime < new Date(Date.now() + 48 * 60 * 60 * 1000)) {
    categories.push({
      id: "closing-soon",
      label: "Closing Soon",
      slug: "closing_soon",
    });
  }

  const yesPrice = market.yes_ask;
  const noPrice = market.no_ask;

  const unifiedMarket: IUnifiedMarket = {
    id: market.ticker,
    source: "kalshi",
    question: market.title
      .toLowerCase()
      .includes(market.yes_sub_title.toLowerCase())
      ? market.title
      : market.title + " - " + market.yes_sub_title,
    description: market.rules_primary || market.subtitle || "",
    image: "",
    volume: market.volume || 0,
    deadline: closeTime,
    outcomes: [
      {
        label: "Yes",
        price: yesPrice,
        probability: yesPrice,
      },
      {
        label: "No",
        price: noPrice,
        probability: noPrice,
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
    image: "",
    markets: [unifiedMarket],
    source: "kalshi",
    updatedAt: new Date(),
    categories,
  };
}
