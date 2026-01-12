const LIMITLESS_ICON_URL = "https://limitless.exchange/images/logo.png";

const CATEGORY_MAP: Record<string, DyveCategory> = {
  sports: "sports",
  crypto: "crypto",
  economy: "economy",
  "company news": "business",
  daily: "crypto",
  "football matches": "sports",
  hourly: "crypto",
  "korean market": "world",
  "off the pitch": "sports",
  "pre-tge": "crypto",
  "this vs that": "this vs that",
  weekly: "crypto",
  中文预测专区: "crypto",
};

export function normalizeLimitlessMarket(
  market: ILimitlessMarketsCategoryData,
  category?: string,
): IUnifiedEvent {
  const unifiedMarkets: IUnifiedMarket[] = [];

  const normalizeSingleMarket = (
    m: ILimitlessMarket | ILimitlessMarketsCategoryData,
    parentTitle?: string,
  ): IUnifiedMarket => {
    const prices = m.prices || [0, 0];
    const yesPrice = prices[0] ?? 0;
    const noPrice = prices[1] ?? 0;

    const outcomes: IOutcome[] = [
      {
        label: "Yes",
        price: yesPrice,
        probability: yesPrice * 100,
      },
      {
        label: "No",
        price: noPrice,
        probability: noPrice * 100,
      },
    ];

    const questionText = parentTitle ? `${parentTitle} - ${m.title}` : m.title;

    return {
      id: m.id.toString(),
      source: "limitless",
      question: questionText,
      description: m.description || "",
      image: m.logo || "",
      volume: parseFloat(m.volumeFormatted || "0"),
      deadline: new Date(m.expirationDate),
      outcomes,
    };
  };

  if (market.markets && market.markets.length > 0) {
    unifiedMarkets.push(
      ...market.markets.map((m) => normalizeSingleMarket(m, market.title)),
    );
  } else if (market.prices && market.prices.length > 0) {
    unifiedMarkets.push(normalizeSingleMarket(market));
  }

  // Normalize category using CATEGORY_MAP
  const rawCategory = category?.toLowerCase() || "other";
  const normalizedCategory = CATEGORY_MAP[rawCategory] || rawCategory;

  const categoriesList = [
    {
      id: normalizedCategory,
      label: normalizedCategory
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug: normalizedCategory,
    },
  ];

  return {
    id: market.id.toString(),
    ticker: market.slug,
    slug: market.slug,
    title: market.title,
    description: market.description || "",
    icon: LIMITLESS_ICON_URL,
    image: market.ogImageURI || market.creator?.imageURI || "",
    markets: unifiedMarkets,
    source: "limitless",
    updatedAt: new Date(),
    categories: categoriesList,
  };
}
