type MarketSource = "polymarket" | "limitless" | "kalshi" | "opinion";

type DyveCategory =
  | "politics"
  | "finance"
  | "economy"
  | "crypto"
  | "climate and weather"
  | "science and tech"
  | "sports"
  | "world"
  | "movies"
  | "business"
  | "featured"
  | "closing_soon"
  | "2025-predictions"
  | "2026-predictions"
  | "this vs that";

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

interface KalshiEventsResponse {
  cursor: string;
  events: KalshiEvent[];
  milestones: any[];
}

interface KalshiEvent {
  available_on_brokers?: boolean;
  category?: string;
  collateral_return_type?: string;
  event_ticker?: string;
  mutually_exclusive?: boolean;
  series_ticker?: string;
  strike_period?: string;
  sub_title?: string;
  title?: string;
}

interface KalshiEventMarketsResponse {
  event: KalshiEvent;
  markets: KalshiMarket[];
}

interface KalshiMarket {
  can_close_early: boolean;
  close_time: Date;
  created_time: Date;
  early_close_condition: string;
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
  rules_primary: string;
  rules_secondary: string;
  settlement_timer_seconds: number;
  status: string;
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

interface KalshiPriceRange {
  end: string;
  start: string;
  step: string;
}

interface ILimitlessCollateralToken {
  symbol: string;
  address: string;
  decimals: number;
}

interface ILimitlessCreator {
  link: string;
  name: string;
  imageURI: string;
}

interface ILimitlessSettings {
  c: string;
  minSize: string;
  maxSpread: number;
  dailyReward: string;
  rewardsEpoch: string;
}

interface ILimitlessTokens {
  no: string;
  yes: string;
}

interface ILimitlessVenue {
  adapter: null;
  exchange: string;
}

interface ILimitlessMarketsCategoryCountResponse {
  category: { [key: string]: number };
  totalCount: number;
}

interface ILimitlessMarketsCategoryResponse {
  data: ILimitlessMarketsCategoryData[];
  totalMarketsCount: number;
}

interface ILimitlessMarketsCategoryData {
  id: number;
  conditionId?: string;
  negRiskRequestId?: null;
  description?: string;
  collateralToken: ILimitlessCollateralToken;
  title: string;
  proxyTitle?: null;
  expirationDate: string;
  expirationTimestamp: number;
  createdAt: Date;
  updatedAt: Date;
  categories: string[];
  status: string;
  expired: boolean;
  creator: ILimitlessCreator;
  tags: string[];
  volume: string;
  volumeFormatted: string;
  tokens?: ILimitlessTokens;
  prices?: number[];
  isRewardable?: boolean;
  slug: string;
  tradeType: string;
  venue: ILimitlessVenue | null;
  marketType: string;
  priorityIndex: number;
  winningOutcomeIndex?: null;
  metadata: ILimitlessCategoryMetadata;
  trends?: ILimitlessTrends;
  settings?: ILimitlessSettings;
  logo?: null;
  outcomeTokens?: string[];
  ogImageURI?: string;
  negRiskMarketId?: string;
  markets?: ILimitlessMarket[];
  dailyReward?: string;
}

interface ILimitlessMarket {
  id: number;
  conditionId: string;
  negRiskRequestId: string;
  description: string;
  collateralToken: ILimitlessCollateralToken;
  title: string;
  proxyTitle: null;
  expirationDate: string;
  expirationTimestamp: number;
  createdAt: Date;
  updatedAt: Date;
  categories: string[];
  status: string;
  expired: boolean;
  creator: ILimitlessCreator;
  tags: string[];
  volume: string;
  volumeFormatted: string;
  tokens: ILimitlessTokens;
  prices: number[];
  isRewardable: boolean;
  slug: string;
  tradeType: string;
  venue: ILimitlessVenue | null;
  marketType: string;
  priorityIndex: number;
  winningOutcomeIndex: null;
  metadata: ILimitlessMarketMetadata;
  settings: ILimitlessSettings;
  logo: null;
}

interface ILimitlessCategoryMetadata {
  fee: boolean;
  isBannered: boolean;
  isPolyArbitrage: boolean;
}

interface ILimitlessTrends {
  hourly: ILimitlessHourly;
}

interface ILimitlessHourly {
  value: number;
  rank: number;
}

interface ILimitlessSettings {
  minSize: string;
  maxSpread: number;
  dailyReward: string;
  rewardsEpoch: string;
  c: string;
}

interface ILimitlessMarketMetadata {
  fee: boolean;
}
