import slowDown from 'express-slow-down';
import { RequestHandler } from 'express';

export default function SlowDown(cfg?: any): RequestHandler {
  const opts = { windowMs:cfg?.windowMs||60000, delayAfter:cfg?.delayAfter||50, delayMs:cfg?.delayMs||500 };
  const mw = slowDown(opts);
  Object.defineProperty(mw, 'name', { value: 'SlowDown' });
  return mw;
}
