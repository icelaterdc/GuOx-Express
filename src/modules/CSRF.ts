import csurf from 'csurf';
import { RequestHandler } from 'express';

export default function CSRF(cfg?: any): RequestHandler {
  const opts = { cookie:cfg?.cookie ?? true, header:cfg?.header ?? 'x-csrf-token' };
  const mw = csurf(opts);
  Object.defineProperty(mw, 'name', { value: 'CSRF' });
  return mw;
}
