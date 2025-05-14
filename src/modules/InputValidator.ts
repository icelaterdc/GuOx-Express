import { celebrate, errors } from 'celebrate';
import { RequestHandler } from 'express';

export default function InputValidator(cfg?: any): RequestHandler {
  const schemas = cfg?.schemas||{};
  const chain = Object.entries(schemas).map(([path,rules])=>celebrate(rules,{req:['body','query','params']}));
  chain.push(errors());
  const mw: RequestHandler = (req,res,next)=>{ let i=0; (function run(err?:any){ if(err) return next(err); if(i>=chain.length) return next(); chain[i++](req,res,run); })(); };
  Object.defineProperty(mw,'name',{value:'InputValidator'});
  return mw;
}
