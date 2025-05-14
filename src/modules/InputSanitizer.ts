import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { RequestHandler } from 'express';

export default function InputSanitizer(): RequestHandler {
  const sanitize = mongoSanitize();
  const xss = xssClean();
  const mw: RequestHandler = (req, res, next) => { sanitize(req,res,()=>xss(req,res,next)); };
  Object.defineProperty(mw,'name',{value:'InputSanitizer'});
  return mw;
}
