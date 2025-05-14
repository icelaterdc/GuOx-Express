import { Express, RequestHandler } from 'express';
import { GuOxConfig, Plugin, GuOxModule } from '../types';
import { LifecycleEmitter } from './Lifecycle';
import { ModuleLoader } from './ModuleLoader';
import * as Mods from '../modules';
import { DIContainer } from './DIContainer';
import { EVENTS } from './events';

export default class GuOx extends LifecycleEmitter {
  private config: GuOxConfig;
  private modules: GuOxModule[] = [];
  private plugins: Plugin[];
  private container = new DIContainer();

  constructor(config: GuOxConfig = {}) {
    super();
    this.config = config;
    this.plugins = config.plugins || [];
    this.emit(EVENTS.START, config);
    this.setupContainer();
    this.registerModules();
    ModuleLoader.load(this.modules, this.plugins, this);
  }

  private setupContainer() {
    // servisleri DI konteynerine kaydet
    this.container.register('logger', () => Mods.CryptoLogger());
    this.container.register('mlEngine', () => Mods.MLIntrusionDetector(this.config));
  }

  private registerModules() {
    const c = this.config;
    this.addIf(()=>c.httpsRedirect!==false, ()=>Mods.HTTPSRedirect());
    this.add(()=>Mods.SecurityHeaders(c.headers));
    this.add(()=>Mods.CSP(c.csp));
    this.add(()=>Mods.CSRF(c.csrf));
    this.add(()=>Mods.RateLimiter(c.rateLimit));
    this.add(()=>Mods.SlowDown(c.slowDown));
    this.addIf(()=>c.inputSanitizer!==false, ()=>Mods.InputSanitizer());
    this.add(()=>Mods.InputValidator(c.inputValidator));
    this.addIf(()=>!!c.oauth, ()=>Mods.OAuthGuard(c.oauth!));
    this.addIf(()=>!!c.graphqlShield, ()=>Mods.GraphQLShield(c.graphqlShield!));
    this.add(()=>Mods.AnomalyDetector(c.anomalyDetector, this.container.resolve('mlEngine')));
    this.add(()=>Mods.APIAbuse(c.apiAbuse));
    this.add(()=>Mods.DependencyScanner(c.dependencyScanner));
    this.addIf(()=>c.perfMonitor===true, ()=>Mods.PerfMonitor());
    this.addIf(()=>c.selfHealing===true, ()=>Mods.SelfHealing(this.container.resolve('logger')));
    this.addIf(()=>!!c.threatIntel, ()=>Mods.ThreatIntel(c.threatIntel!));
    this.addIf(()=>c.wasmSandbox===true, ()=>Mods.WASMSandbox());
    this.add(()=>Mods.PolicyEngine());
    this.add(()=>Mods.SideChannelProtector());
    this.add(()=>Mods.CryptoLogger());
    this.addIf(()=>c.securityEdu!==false, ()=>Mods.SecurityEdu());
  }

  private add(factory: ()=>GuOxModule|null) {
    const mw = factory();
    if (mw) this.modules.push(mw);
    return this;
  }

  private addIf(cond: ()=>boolean, factory: ()=>GuOxModule) {
    return cond() ? this.add(factory) : this;
  }

  public addModule(mw: RequestHandler & {name:string}) { this.modules.push(mw); return this; }
  public disableModule(name:string) { this.modules=this.modules.filter(m=>m.name!==name); return this; }

  public apply(app: Express) { this.modules.forEach(mw=>app.use(mw)); }
  }
      
