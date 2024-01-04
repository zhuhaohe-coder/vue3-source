import { effect } from "./effect";
//缓存值不变就走缓存 否则重新获取值
export const computed = <T>(fn: () => T) => {
  let dirty = true;
  let _cacheValue: T;
  const _value = effect(fn, {
    lazy: true,
    scheduler: () => {
      dirty = true;
    },
  });
  class ComputedRefImpl {
    get value() {
      if (dirty) {
        console.log("computed");
        _cacheValue = _value();
        dirty = false;
      }
      return _cacheValue;
    }
  }
  return new ComputedRefImpl();
};
