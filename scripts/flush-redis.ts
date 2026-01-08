// 1. Import and configure dotenv FIRST
import * as dotenv from "dotenv";

// Load .env.local (common in Next.js) or .env
dotenv.config({ path: ".env.local" });
// If your secrets are in a standard .env file, just use: dotenv.config()

import { Redis } from "@upstash/redis";

// 2. Now initialize Redis
export const redis = Redis.fromEnv();

async function flush() {
  console.log("Flushing Redis...");

  // Verify it loaded (Optional debugging)
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
