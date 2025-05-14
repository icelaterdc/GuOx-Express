import { RequestHandler } from 'express';
import { Logger } from './CryptoLogger';

export default function SelfHealing(logger: Logger): RequestHandler {
  const mw: RequestHandler = (err,req,res,next)=>{
    logger.log('error',err.stack);
    if(/<script>/i.test(err.message)) return res.status(400).send('Payload sanitized');
    next(err);
  };
  Object.defineProperty(mw,'name',{value:'SelfHealing'});
  return mw;
}
