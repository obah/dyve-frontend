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

  let filteredKeys = keys;
  if (source) {
    filteredKeys = keys.filter((k) => k.includes(`:${source}:`));
  }

  if (!filteredKeys.length) return [];

  const pipeline = redis.pipeline();
  filteredKeys.forEach((k) => pipeline.get(k));
  const results = await pipeline.exec();

  if (!results) return [];

  return results
    .map((val) => {
      if (!val) return null;
      if (typeof val === "object") return val;
      try {
        return JSON.parse(val as string);
      } catch (e) {
        console.error("Failed to parse event:", val);
        return null;
      }
    })
    .filter(Boolean);
}
