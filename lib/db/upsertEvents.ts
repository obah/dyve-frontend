import { redis } from "./redis";

export async function upsertEvents(events: IUnifiedEvent[]) {
  const pipeline = redis.pipeline();

  for (const event of events) {
    const key = `event:${event.source}:${event.id}`;

    pipeline.set(key, JSON.stringify(event));

    pipeline.sadd(`events:${event.source}:active`, key);
    pipeline.sadd("events:all", key);

    if (event.categories) {
      for (const cat of event.categories) {
        pipeline.sadd(`events:category:${cat.slug}`, key);
        // Add to a set of all known categories to fetch later
        // pipeline.sadd("categories:all", JSON.stringify(cat));
        pipeline.sadd("categories:all", cat.slug);
        pipeline.set(`category:${cat.slug}`, JSON.stringify(cat));
      }
    }
  }

  await pipeline.exec();
}
