type Factory<T> = (container: DIContainer)=>T;

export class DIContainer {
  private registry = new Map<string, Factory<any>>();
  private cache = new Map<string, any>();

  register<T>(key: string, factory: Factory<T>) {
    this.registry.set(key, factory);
  }

  resolve<T>(key: string): T {
    if (!this.cache.has(key)) {
      const factory = this.registry.get(key);
      if (!factory) throw new Error(`Service ${key} not found`);
      this.cache.set(key, factory(this));
    }
    return this.cache.get(key);
  }
}
