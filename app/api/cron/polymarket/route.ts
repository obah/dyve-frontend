import { NextResponse } from "next/server";
import { gammaPolymarketApiClient } from "@/lib/apiClient";
import { normalizePolymarketEvent } from "@/lib/normalize/polymarket";
import { upsertEvents } from "@/lib/db/polymarket";

const LIMIT = 100;

export async function GET() {
  let offset = 0;
  let total = 0;

  while (true) {
    const { data } = await gammaPolymarketApiClient.get<
      GammaPolymarketEventResponse[]
    >(`/events?active=true&closed=false&limit=${LIMIT}&offset=${offset}`);

    if (!data.length) break;

    const normalized = data.map(normalizePolymarketEvent);
    await upsertEvents(normalized);

    total += data.length;
    offset += LIMIT;
  }

  return NextResponse.json({
    status: "ok",
    synced: total,
  });
}
