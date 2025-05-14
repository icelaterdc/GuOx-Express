import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export default function OAuthGuard(cfg: any): RequestHandler {
  const client = jwksClient({ jwksUri: cfg.jwksUri });
  const getKey = (h:any,cb:any)=>client.getSigningKey(h.kid,(e,key)=>cb(e,key.getPublicKey()));
  const mw: RequestHandler = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,getKey,{audience:cfg.audience,issuer:cfg.issuer,algorithms:cfg.algorithms||['RS256']},(e)=>e?res.sendStatus(401):next());
  };
  Object.defineProperty(mw,'name',{value:'OAuthGuard'});
  return mw;
}
