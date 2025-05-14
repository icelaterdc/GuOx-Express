import { RequestHandler } from 'express';

export default function SideChannelProtector(): RequestHandler {
  const mw: RequestHandler = (req,res,next)=>{
    res.setHeader('Timing-Allow-Origin','none');
    next();
  };
  Object.defineProperty(mw,'name',{value:'SideChannelProtector'});
  return mw;
}
