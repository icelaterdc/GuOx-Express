import { RequestHandler } from 'express';
import { shield } from 'graphql-shield';

export default function GraphQLShield(cfg: any): RequestHandler {
  const mw = shield(cfg,{allowExternalErrors:false});
  Object.defineProperty(mw,'name',{value:'GraphQLShield'});
  return mw;
}
