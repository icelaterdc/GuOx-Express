import { RequestHandler } from 'express';
import Audit from 'npm-audit-report';
import cron from 'node-cron';

export default function DependencyScanner(cfg: any): RequestHandler|null {
  if(!cfg?.scheduleCron) return null;
  cron.schedule(cfg.scheduleCron,()=>Audit.run().then(r=>{ if(r.vulnerabilities.length) console.warn(r.vulnerabilities); }));
  const mw: RequestHandler = (_req,_res,next)=>next();
  Object.defineProperty(mw,'name',{value:'DependencyScanner'});
  return mw;
}
