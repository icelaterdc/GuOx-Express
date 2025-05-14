import { Express } from 'express';
import GuOx from './core/GuOx';

/** Tek satır enterprise‑grade başlatma */
export default function initGuOx(app: Express, options: any = {}) {
  const engine = new GuOx(options);
  engine.apply(app);
}
