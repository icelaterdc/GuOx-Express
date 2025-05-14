import { RequestHandler } from 'express';
import fetch from 'node-fetch';

export default function ThreatIntel(cfg: any): RequestHandler {
  let blocklist: Set<string> = new Set();
  setInterval(async()=>{
    const data=await fetch(cfg.feedUrl).then(r=>r.json());
    blocklist=new Set(data.badIps);
  },cfg.refreshIntervalMs||3600000);
  const mw: RequestHandler = (req,res,next)=>{
    if(blocklist.has(req.ip)) return res.sendStatus(403);
    next();
  };
  Object.defineProperty(mw,'name',{value:'ThreatIntel'});
  return mw;
}
