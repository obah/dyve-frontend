import { redis } from "./redis";

export async function getActiveEvents(
  source?: string,
): Promise<IUnifiedEvent[]> {
  const setKey = source ? `events:${source}:active` : "events:all";

  const keys = await redis.smembers(setKey);

  if (!keys.length) return [];

  const pipeline = redis.pipeline();
  keys.forEach((k) => pipeline.get(k));
  const results = await pipeline.exec();

  if (!results) return [];

  return results
    .map(([_, val]) => val && JSON.parse(val as string))
    .filter(Boolean);
}
