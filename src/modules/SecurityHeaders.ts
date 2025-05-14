import helmet, { Directorios } from 'helmet';
import { RequestHandler } from 'express';

export default function SecurityHeaders(opts?: Partial<Directorios>): RequestHandler {
  const config = { contentSecurityPolicy:false, crossOriginEmbedderPolicy:false, ...opts };
  const mw = helmet(config);
  Object.defineProperty(mw, 'name', { value: 'SecurityHeaders' });
  return mw;
}
