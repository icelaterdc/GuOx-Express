import helmet from 'helmet';
import { RequestHandler } from 'express';

export default function CSP(cfg?: any): RequestHandler {
  const base = { directives:{ defaultSrc:["'self'"], scriptSrc:["'self'"], ...cfg?.directives }, reportUri:cfg?.reportUri, sandbox:cfg?.sandbox };
  const mw = helmet.contentSecurityPolicy(base);
  Object.defineProperty(mw, 'name', { value: 'CSP' });
  return mw;
}
