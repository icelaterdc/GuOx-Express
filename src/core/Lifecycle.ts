import { EventEmitter } from 'events';
import { Lifecycle } from '../types';
import { EVENTS } from './events';

export class LifecycleEmitter extends EventEmitter implements Lifecycle {
  constructor() { super(); this.setMaxListeners(100); }
  on(event: keyof typeof EVENTS, listener: (...args:any[])=>void) {
    return super.on(EVENTS[event], listener);
  }
}
