import { Express, RequestHandler } from 'express';
import { IRateLimitOptions } from 'express-rate-limit';
import { Directorios } from 'helmet';

export interface GuOxConfig {
  httpsRedirect?: boolean;
  headers?: Partial<Directorios>;
  csp?: { directives?: Record<string,string[]>; reportUri?: string; sandbox?: boolean };
  csrf?: { cookie?: boolean; header?: string };
  rateLimit?: Partial<IRateLimitOptions>;
  slowDown?: { windowMs?: number; delayAfter?: number; delayMs?: number };
  inputSanitizer?: boolean;
  inputValidator?: { schemas?: Record<string,any> };
  oauth?: { jwksUri:string; audience:string|string[]; issuer:string; algorithms?:string[] };
  graphqlShield?: Record<string,any>;
  anomalyDetector?: { thresholdBytes?: number };
  apiAbuse?: { captchaThreshold?: number; enableGeoBlock?: boolean };
  dependencyScanner?: { scheduleCron?: string };
  perfMonitor?: boolean;
  selfHealing?: boolean;
  threatIntel?: { feedUrl:string; refreshIntervalMs?:number };
  wasmSandbox?: boolean;
  securityEdu?: boolean;
  plugins?: Plugin[];
}

export interface Plugin {
  name: string;
  onInit?(instance: GuOx): void;
  onRegister?(mw: RequestHandler): void;
}

export interface Lifecycle {
  on(event: 'start'|'module:load'|'error', listener:(...args:any[])=>void): this;
}

export type GuOxModule = RequestHandler & { name: string };

export default class GuOx implements Lifecycle {
  constructor(config?: GuOxConfig);
  apply(app: Express): void;
  addModule(mw: GuOxModule): this;
  disableModule(name: string): this;
  }
