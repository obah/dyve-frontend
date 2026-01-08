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

import { NextResponse } from "next/server";
import { normalizeKalshiMarket } from "@/lib/normalize/kalshi";
import { upsertEvents } from "@/lib/db/upsertEvents";

const KALSHI_API_URL =
  "https://api.elections.kalshi.com/trade-api/v2/markets?limit=100";

export async function GET() {
  try {
    const data = await fetch(KALSHI_API_URL);
    const markets = await data.json();
    const normalized = markets.markets.map(normalizeKalshiMarket);
    await upsertEvents(normalized);

    return NextResponse.json({
      status: "ok",
      synced: markets.markets.length,
    });
  } catch (error) {
    console.error("Kalshi sync error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 },
    );
  }
}
