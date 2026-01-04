import { getActiveEvents } from "@/lib/db/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;

  const events = await getActiveEvents("polymarket", category);
  return Response.json(events);
}
