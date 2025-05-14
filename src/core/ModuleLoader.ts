import { Plugin, GuOxModule } from '../types';
import { LifecycleEmitter } from './Lifecycle';
import { EVENTS } from './events';

/** Modül yükleme ve plugin hook tetikleme */
export class ModuleLoader {
  static load(modules: GuOxModule[], plugins: Plugin[], emitter: LifecycleEmitter) {
    modules.forEach(mw => {
      emitter.emit(EVENTS.MODULE_LOAD, mw.name);
      plugins.forEach(p => p.onRegister?.(mw));
    });
  }
}
