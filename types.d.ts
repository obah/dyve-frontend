type MarketSource = "polymarket" | "azuro" | "kalshi";

interface IOutcome {
  label: string;
  probability: number;
  price: number;
}

interface IUnifiedMarket {
  id: string;
  source: MarketSource;
  question: string;
  outcomes: IOutcome[];
  volume: number;
  deadline?: Date;
  description: string;
  image: string;
}

interface IUnifiedEvent {
  id: string;
  ticker: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  markets: IUnifiedMarket[];
  source: MarketSource;
  updatedAt: Date;
  categories: { id: string; label: string; slug: string }[];
}

interface GammaPolymarketEventResponse {
  id: string;
  ticker: string;
  slug: string;
  title: string;
  description: string;
  resolutionSource: string;
  startDate: Date;
  creationDate: Date;
  endDate: Date;
  image: string;
  icon: string;
  active: boolean;
  closed: boolean;
  archived: boolean;
  new: boolean;
  featured: boolean;
  restricted: boolean;
  liquidity: number;
  volume: number;
  openInterest: number;
  sortBy?: string;
  createdAt: Date;
  updatedAt: Date;
  competitive: number;
  volume24hr: number;
  volume1wk: number;
  volume1mo: number;
  volume1yr: number;
  enableOrderBook: boolean;
  liquidityClob: number;
  negRisk?: boolean;
  negRiskMarketID?: string;
  commentCount: number;
  markets: GammaPolymarketMarket[];
  tags: GammaPolymarketTag[];
  cyom: boolean;
  showAllOutcomes: boolean;
  showMarketImages: boolean;
  enableNegRisk: boolean;
  automaticallyActive: boolean;
  gmpChartMode?: string;
  negRiskAugmented: boolean;
  pendingDeployment: boolean;
  deploying: boolean;
  requiresTranslation: boolean;
  series?: GammaPolymarketSeries[];
  eventDate?: Date;
  startTime?: Date;
  seriesSlug?: string;
  featuredOrder?: number;
}

interface GammaPolymarketMarket {
  id: string;
  question: string;
  conditionId: string;
  slug: string;
  resolutionSource: string;
  endDate?: Date;
  liquidity?: string;
  startDate: Date;
  image: string;
  icon: string;
  description: string;
  outcomes: string[];
  outcomePrices?: string[];
  volume: string;
  active: boolean;
  closed: boolean;
  marketMakerAddress: string;
  createdAt: Date;
  updatedAt: Date;
  new: boolean;
  featured: boolean;
  submitted_by: string;
  archived: boolean;
  resolvedBy: string;
  restricted: boolean;
  groupItemTitle: string;
  groupItemThreshold: string;
  questionID: string;
  enableOrderBook: boolean;
  orderPriceMinTickSize: number;
  orderMinSize: number;
  volumeNum: number;
  liquidityNum?: number;
  endDateIso?: Date;
  startDateIso?: Date;
  hasReviewedDates?: boolean;
  volume24hr?: number;
  volume1wk: number;
  volume1mo: number;
  volume1yr: number;
  clobTokenIds: string;
  umaBond: string;
  umaReward: string;
  volume24hrClob?: number;
  volume1wkClob: number;
  volume1moClob: number;
  volume1yrClob: number;
  volumeClob: number;
  liquidityClob?: number;
  acceptingOrders: boolean;
  negRisk: boolean;
  negRiskMarketID?: string;
  negRiskRequestID?: string;
  ready: boolean;
  funded: boolean;
  acceptingOrdersTimestamp: Date;
  cyom: boolean;
  competitive?: number;
  pagerDutyNotificationEnabled: boolean;
  approved: boolean;
  rewardsMinSize: number;
  rewardsMaxSpread: number;
  spread: number;
  oneHourPriceChange?: number;
  oneWeekPriceChange?: number;
  oneMonthPriceChange?: number;
  lastTradePrice: number;
  bestAsk: number;
  automaticallyActive: boolean;
  clearBookOnStart: boolean;
  seriesColor?: string;
  showGmpSeries?: boolean;
  showGmpOutcome?: boolean;
  manualActivation: boolean;
  negRiskOther: boolean;
  umaResolutionStatuses: string[];
  pendingDeployment: boolean;
  deploying: boolean;
  rfqEnabled: boolean;
  holdingRewardsEnabled: boolean;
  feesEnabled: boolean;
  requiresTranslation: boolean;
  volume24hrAmm?: number;
  volume1wkAmm?: number;
  volume1moAmm?: number;
  volume1yrAmm?: number;
  volumeAmm?: number;
  liquidityAmm?: number;
  oneDayPriceChange?: number;
  oneYearPriceChange?: number;
  bestBid?: number;
  umaResolutionStatus?: string;
  customLiveness?: number;
  deployingTimestamp?: Date;
  gameStartTime?: string;
  closedTime?: string;
  umaEndDate?: Date;
  automaticallyResolved?: boolean;
}

interface GammaPolymarketSeries {
  id: string;
  ticker: string;
  slug: string;
  title: string;
  seriesType: string;
  recurrence: string;
  image: string;
  icon: string;
  active: boolean;
  closed: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  volume: number;
  liquidity: number;
  commentCount: number;
  requiresTranslation: boolean;
}

interface GammaPolymarketTag {
  id: string;
  label: string;
  slug: string;
  forceShow?: boolean;
  publishedAt?: string;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  requiresTranslation: boolean;
  isCarousel?: boolean;
  forceHide?: boolean;
}

interface KalshiMarketsResponse {
  cursor: string;
  markets: KalshiMarkets[];
}

interface KalshiMarkets {
  can_close_early: boolean;
  category: string;
  close_time: Date;
  created_time: Date;
  custom_strike: KalshiCustomStrike;
  event_ticker: string;
  expected_expiration_time: Date;
  expiration_time: Date;
  expiration_value: string;
  last_price: number;
  last_price_dollars: string;
  latest_expiration_time: Date;
  liquidity: number;
  liquidity_dollars: string;
  market_type: string;
  mve_collection_ticker: string;
  mve_selected_legs: KalshiMveSelectedLeg[];
  no_ask: number;
  no_ask_dollars: string;
  no_bid: number;
  no_bid_dollars: string;
  no_sub_title: string;
  notional_value: number;
  notional_value_dollars: string;
  open_interest: number;
  open_time: Date;
  previous_price: number;
  previous_price_dollars: string;
  previous_yes_ask: number;
  previous_yes_ask_dollars: string;
  previous_yes_bid: number;
  previous_yes_bid_dollars: string;
  price_level_structure: string;
  price_ranges: KalshiPriceRange[];
  response_price_units: string;
  result: string;
  risk_limit_cents: number;
  rules_primary: string;
  rules_secondary: string;
  settlement_timer_seconds: number;
  status: string;
  strike_type: string;
  subtitle: string;
  tick_size: number;
  ticker: string;
  title: string;
  volume: number;
  volume_24h: number;
  yes_ask: number;
  yes_ask_dollars: string;
  yes_bid: number;
  yes_bid_dollars: string;
  yes_sub_title: string;
}

interface KalshiCustomStrike {
  "Associated Events": string;
  "Associated Market Sides": string;
  "Associated Markets": string;
  "Multivariate Event Ticker": string;
}

interface KalshiMveSelectedLeg {
  event_ticker: string;
  market_ticker: string;
  side: MarketSide;
}

enum MarketSide {
  No = "no",
  Yes = "yes",
}

interface KalshiPriceRange {
  end: string;
  start: string;
  step: string;
}
