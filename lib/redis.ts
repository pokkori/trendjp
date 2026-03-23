import { Redis } from '@upstash/redis';

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error('Upstash Redis environment variables are not set');
    }
    _redis = new Redis({ url, token });
  }
  return _redis;
}

export const redis = {
  incr: (key: string) => getRedis().incr(key),
  expire: (key: string, seconds: number) => getRedis().expire(key, seconds),
};

// レートリミットキー（source別・1時間単位）
export function getRateLimitKey(source: string): string {
  const hour = Math.floor(Date.now() / 3600000);
  return `rate_limit:${source}:${hour}`;
}

export async function checkRateLimit(
  source: string,
  limitPerHour: number = 10
): Promise<boolean> {
  const key = getRateLimitKey(source);
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600);
  return count <= limitPerHour;
}
