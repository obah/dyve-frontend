import { getActiveEvents } from "@/lib/db/events";

export async function GET() {
  const events = await getActiveEvents("polymarket");
  return Response.json(events);
}
