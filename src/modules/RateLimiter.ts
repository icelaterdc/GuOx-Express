import rateLimit from 'express-rate-limit';
import { RequestHandler } from 'express';

export default function RateLimiter(cfg?: any): RequestHandler {
  const opts = { windowMs:cfg?.windowMs||60000, max:cfg?.max||100, message:'Too many requests' };
  const mw = rateLimit(opts);
  Object.defineProperty(mw, 'name', { value: 'RateLimiter' });
  return mw;
}
