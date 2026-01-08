//this gets all the data
/**
 * 
 * import { NextResponse } from "next/server";
import { normalizeKalshiMarket } from "@/lib/normalize/kalshi";
import { upsertEvents } from "@/lib/db/upsertEvents";

const KALSHI_API_URL = "https://api.elections.kalshi.com/trade-api/v2/markets";

const LIMIT = 100;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const REQUEST_DELAY_MS = 200;
const REQUEST_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string, timeout = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; KalshiIndexer/1.0)",
      },
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
}

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES,
): Promise<KalshiMarketsResponse> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Kalshi API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries - 1) throw error;

      const delay = RETRY_DELAY_MS * Math.pow(2, attempt);
      console.warn(`Kalshi retry ${attempt + 1}/${retries} after ${delay}ms`);

      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw new Error("Kalshi max retries exceeded");
}

export async function GET() {
  try {
    let cursor: string | null = null;
    let total = 0;
    let page = 0;

    while (true) {
      const url = new URL(KALSHI_API_URL);
      url.searchParams.set("status", "open");
      url.searchParams.set("limit", LIMIT.toString());

      if (cursor) {
        url.searchParams.set("cursor", cursor);
      }

      const data = await fetchWithRetry(url.toString());

      if (!data.markets || !data.markets.length) {
        if (page === 0) {
          throw new Error("Kalshi returned empty first page");
        }
        break;
      }

      const normalized = data.markets.map(normalizeKalshiMarket);
      await upsertEvents(normalized);

      total += data.markets.length;
      page++;

      if (!data.cursor || data.markets.length < LIMIT) break;
      cursor = data.cursor;

      // gentle pacing
      await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
    }

    return NextResponse.json({
      status: "ok",
      synced: total,
    });
  } catch (error) {
    console.error("Kalshi sync error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 },
    );
  }
}

 */

/**
 * FETCH all events from - https://api.elections.kalshi.com/trade-api/v2/events?limit=50&status=open
 * then get each event's ticker
 * then fetch each event's markets from - https://api.elections.kalshi.com/trade-api/v2/events/{event_ticker}
 * then normalize each market
 * and upsert each market
 */

import { NextResponse } from "next/server";
import { normalizeKalshiMarket } from "@/lib/normalize/kalshi";
import { upsertEvents } from "@/lib/db/upsertEvents";

const KALSHI_ALL_EVENTS_API_URL =
  "https://api.elections.kalshi.com/trade-api/v2/events?limit=50&status=open";
const KALSHI_EVENT_MARKETS_API_URL =
  "https://api.elections.kalshi.com/trade-api/v2/events/";

export async function GET() {
  try {
    const data = await fetch(KALSHI_ALL_EVENTS_API_URL);
    const { events }: KalshiEventsResponse = await data.json();

    const unifiedEvents: IUnifiedEvent[] = [];

    // Process events sequentially to respect potential rate limits and order
    for (const event of events) {
      if (!event.event_ticker) continue;

      try {
        const marketsRes = await fetch(
          `${KALSHI_EVENT_MARKETS_API_URL}${event.event_ticker}`,
        );
        const { markets }: KalshiEventMarketsResponse = await marketsRes.json();

        // Kalshi returns multiple markets per event
        // We normalize EACH market as a separate "UnifiedEvent" because
        // normalizeKalshiMarket treats a single Kalshi market as a UnifiedEvent
        for (const market of markets) {
          const unifiedEvent = normalizeKalshiMarket(market, event.category);
          unifiedEvents.push(unifiedEvent);
        }
      } catch (err) {
        console.error(
          `Failed to fetch markets for event ${event.event_ticker}:`,
          err,
        );
        // Continue to next event even if one fails
      }
    }

    if (unifiedEvents.length > 0) {
      await upsertEvents(unifiedEvents);
    }

    return NextResponse.json({
      status: "success",
      eventsProcessed: events.length,
      marketsUpserted: unifiedEvents.length,
    });
  } catch (error) {
    console.error("Kalshi sync error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 },
    );
  }
}
