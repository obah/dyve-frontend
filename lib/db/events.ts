import { redis } from "./redis";

export async function getActiveEvents(
  source?: string,
  category?: string,
): Promise<IUnifiedEvent[]> {
  let setKey = "events:all";

  if (category) {
    setKey = `events:category:${category}`;
  } else if (source) {
    setKey = `events:${source}:active`;
  }

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
