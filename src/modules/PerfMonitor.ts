import { RequestHandler } from 'express';
import promClient from 'prom-client';

export default function PerfMonitor(): RequestHandler {
  const hist = new promClient.Histogram({ name:'guox_request_duration_seconds', help:'' });
  const mw: RequestHandler = (req,res,next)=>{
    const end=hist.startTimer();
    res.on('finish',end);
    next();
  };
  Object.defineProperty(mw,'name',{value:'PerfMonitor'});
  return mw;
}
