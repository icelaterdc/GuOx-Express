import { RequestHandler } from 'express';
import { WasmSandboxEngine } from 'wasm-sandbox-engine';

export default function WASMSandbox(): RequestHandler {
  const engine = new WasmSandboxEngine();
  const mw: RequestHandler = async(req,res,next)=>{
    await engine.executeHooks(req);
    next();
  };
  Object.defineProperty(mw,'name',{value:'WASMSandbox'});
  return mw;
}
