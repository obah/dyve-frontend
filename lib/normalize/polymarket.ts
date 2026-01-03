export function normalizePolymarketEvent(
  event: GammaPolymarketEventResponse,
): IUnifiedEvent {
  return {
    source: "polymarket",
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    image: event.image,
    icon: event.icon,
    markets: event.markets.map(normalizePolymarketMarket),
    updatedAt: new Date(),
    ticker: event.ticker,
  };
}

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
