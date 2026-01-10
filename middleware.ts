
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// --- FIREWALL CONFIGURATION ---
const BLOCKED_COUNTRIES = ['CN', 'RU', 'IR', 'KP']; // High-risk countries
const BLOCKED_USER_AGENTS = ['curl', 'python-requests', 'wget', 'postman']; // Known bots/scrapers
const RATE_LIMIT_WINDOW = 10; // 10 seconds
const RATE_LIMIT_REQUESTS = 20; // 20 requests
const BAN_DURATION = 3600; // 1 hour in seconds

async function logToFirestore(log: object) {
  // In a real-world scenario, you would use the Firebase Admin SDK here
  // For this example, we'll log to the console
  console.log('SECURITY EVENT:', JSON.stringify(log));
}

export async function middleware(req: NextRequest) {
  const { ip, geo, userAgent } = req;
  const country = geo?.country || 'Unknown';
  const ua = userAgent() || 'Unknown';

  // 1. Geo-Fencing
  if (BLOCKED_COUNTRIES.includes(country)) {
    await logToFirestore({
      type: 'GEO_FENCE_BLOCK',
      ip,
      country,
      timestamp: new Date().toISOString(),
    });
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
  }

  // 2. Bot Hunter
  if (BLOCKED_USER_AGENTS.some(agent => ua.toLowerCase().includes(agent))) {
    await logToFirestore({
      type: 'BOT_HUNTER_BLOCK',
      ip,
      userAgent: ua,
      timestamp: new Date().toISOString(),
    });
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
  }

  // 3. DDoS Shield (Rate Limiting)
  if (ip) {
    const key = `rate_limit:${ip}`;
    const bannedKey = `banned:${ip}`;

    const isBanned = await redis.get(bannedKey);
    if (isBanned) {
      return new NextResponse(null, { status: 429, statusText: 'Too Many Requests' });
    }

    const currentRequests = await redis.incr(key);

    if (currentRequests === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    if (currentRequests > RATE_LIMIT_REQUESTS) {
      await redis.setex(bannedKey, BAN_DURATION, '1');
      await redis.del(key); // Clean up the rate limit key

      await logToFirestore({
        type: 'DDOS_SHIELD_BLOCK',
        ip,
        requests: currentRequests,
        window: RATE_LIMIT_WINDOW,
        timestamp: new Date().toISOString(),
      });
      return new NextResponse(null, { status: 429, statusText: 'Too Many Requests' });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to all API routes
};
