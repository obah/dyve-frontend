// import Redis from "ioredis";

// export const redis = new Redis(process.env.REDIS_URL!);

import { Redis } from "@upstash/redis";
export const redis = Redis.fromEnv();
