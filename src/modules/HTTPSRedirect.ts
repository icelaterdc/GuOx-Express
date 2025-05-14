import { RequestHandler } from 'express';
export default function HTTPSRedirect(): RequestHandler {
  const mw: RequestHandler = (req, res, next) => {
    if (req.secure || req.get('X-Forwarded-Proto')==='https') return next();
    res.redirect(301, `https://${req.get('Host')}${req.originalUrl}`);
  };
  Object.defineProperty(mw, 'name', { value: 'HTTPSRedirect' });
  return mw;
}
