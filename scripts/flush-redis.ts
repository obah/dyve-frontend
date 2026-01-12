import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function flush() {
  console.log("Flushing Redis...");
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    throw new Error("Env variables still missing!");
  }

  await redis.flushall();
  console.log("Redis flushed.");
  process.exit(0);
}

flush().catch((e) => {
  console.error(e);
  process.exit(1);
});
