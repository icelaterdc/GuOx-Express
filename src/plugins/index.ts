import { Plugin } from '../types';
export function loadAll(plugins:Plugin[]=[], engine:any) {
  plugins.forEach(p=>{
    p.onInit?.(engine);
  });
}
