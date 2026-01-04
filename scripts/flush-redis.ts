import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

async function flush() {
  console.log("Flushing Redis...");
  await redis.flushall();
  console.log("Redis flushed.");
  process.exit(0);
}

flush().catch((e) => {
  console.error(e);
  process.exit(1);
});
