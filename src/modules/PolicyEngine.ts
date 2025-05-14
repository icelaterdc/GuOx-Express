import { RequestHandler } from 'express';
import Ajv from 'ajv';

export default function PolicyEngine(): RequestHandler {
  const ajv = new Ajv({ allErrors:true });
  let schema:any = {}; // dynamic load from external
  const mw: RequestHandler = (req,res,next)=>{
    if(!ajv.validate(schema, req.body)) return res.status(422).json({errors:ajv.errors});
    next();
  };
  Object.defineProperty(mw,'name',{value:'PolicyEngine'});
  return mw;
}
