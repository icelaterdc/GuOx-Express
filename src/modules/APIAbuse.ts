import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import svgCaptcha from 'svg-captcha';

export default function APIAbuse(cfg: any): RequestHandler {
  const mw = rateLimit({
    windowMs:60000, max:cfg?.captchaThreshold||200,
    handler:(req,res)=>res.type('svg').status(429).send(svgCaptcha.create().data)
  });
  Object.defineProperty(mw,'name',{value:'APIAbuse'});
  return mw;
}
