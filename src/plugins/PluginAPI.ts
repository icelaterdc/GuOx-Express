import { RequestHandler } from 'express';
import { GuOxConfig, Plugin } from '../types';

export function createPlugin(name:string, init:(cfg:GuOxConfig)=>RequestHandler): Plugin {
  return {
    name,
    onInit(instance) { /* plugin init */ },
    onRegister(mw:RequestHandler) { /* after each module load */ }
  };
}
