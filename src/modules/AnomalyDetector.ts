import { RequestHandler } from 'express';
import promClient from 'prom-client';
import { MLIntrusionDetector } from './MLIntrusionDetector';

export default function AnomalyDetector(cfg: any, ml: MLIntrusionDetector): RequestHandler {
  const counter = new promClient.Counter({ name:'guox_request_size_bytes', help:'' });
  const mw: RequestHandler = (req,res,next)=>{
    const size=+req.get('content-length')||0;
    counter.inc(size);
    if(size>(cfg?.thresholdBytes||1e6) || ml.detect(req)) return res.sendStatus(413);
    next();
  };
  Object.defineProperty(mw,'name',{value:'AnomalyDetector'});
  return mw;
}
