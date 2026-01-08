import { NextResponse } from "next/server";
import { normalizePolymarketEvent } from "@/lib/normalize/polymarket";
import { upsertEvents } from "@/lib/db/upsertEvents";

export async function GET() {
  const url =
    "https://gamma-api.polymarket.com/events?active=true&closed=false&limit=100";

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; PolymarketIndexer/1.0)",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Gamma API error ${res.status}`);
  }

  const data: GammaPolymarketEventResponse[] = await res.json();

  await upsertEvents(data.map(normalizePolymarketEvent));

  return NextResponse.json({ status: "ok", synced: data.length });
}

// THIS GETS ALL THE data
// const LIMIT = 100;

// export async function GET() {
//   let offset = 0;
//   let total = 0;
//   const MAX_PAGES = 50;

//   for (let page = 0; page < MAX_PAGES; page++) {
//     const url = `https://gamma-api.polymarket.com/events?active=true&closed=false&limit=${LIMIT}&offset=${offset}`;

//     const res = await fetch(url, {
//       headers: {
//         Accept: "application/json",
//         "User-Agent": "Mozilla/5.0 (compatible; PolymarketIndexer/1.0)",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Gamma API error ${res.status}`);
//     }

//     const data: GammaPolymarketEventResponse[] = await res.json();

//     if (!data.length) {
//       if (offset === 0) {
//         throw new Error("Gamma API returned empty first page");
//       }
//       break;
//     }

//     await upsertEvents(data.map(normalizePolymarketEvent));

//     total += data.length;
//     offset += LIMIT;

//     await new Promise((r) => setTimeout(r, 300));
//   }

//   return NextResponse.json({ status: "ok", synced: total });
// }
