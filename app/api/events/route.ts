import { getActiveEvents } from "@/lib/db/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const source = searchParams.get("source") as
    | "polymarket"
    | "kalshi"
    | "limitless"
    | null;

  if (source) {
    // If source is specified, return events from that source only
    const events = await getActiveEvents(source, category);
    return Response.json(events);
  }

  // Otherwise, fetch from all sources
  const [polymarketEvents, kalshiEvents, limitlessEvents] = await Promise.all([
    getActiveEvents("polymarket", category),
    getActiveEvents("kalshi", category),
    getActiveEvents("limitless", category),
  ]);

  return Response.json([
    ...polymarketEvents,
    ...kalshiEvents,
    ...limitlessEvents,
  ]);
}
