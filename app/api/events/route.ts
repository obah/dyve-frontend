import { getActiveEvents } from "@/lib/db/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const source = searchParams.get("source") as "polymarket" | "kalshi" | null;

  if (source) {
    // If source is specified, return events from that source only
    const events = await getActiveEvents(source, category);
    return Response.json(events);
  }

  // Otherwise, fetch from both sources
  const [polymarketEvents, kalshiEvents] = await Promise.all([
    getActiveEvents("polymarket", category),
    getActiveEvents("kalshi", category),
  ]);

  return Response.json([...polymarketEvents, ...kalshiEvents]);
}
