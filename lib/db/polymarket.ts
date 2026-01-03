import { redis } from "./redis";

export async function upsertEvents(events: IUnifiedEvent[]) {
  const pipeline = redis.pipeline();

  for (const event of events) {
    const key = `event:${event.source}:${event.id}`;

    pipeline.set(key, JSON.stringify(event), "EX", 60 * 60);

    pipeline.sadd(`events:${event.source}:active`, key);
    pipeline.sadd("events:all", key);
  }

  await pipeline.exec();
}
