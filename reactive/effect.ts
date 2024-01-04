//副作用函数，用于收集依赖
let activeEffect: Function;
interface Options {
  scheduler?: Function;
  lazy?: boolean;
}
export const effect = (fn: Function, options?: Options) => {
  const _effect = () => {
    activeEffect = _effect;
    return fn();
  };
  _effect.options = options;
  if (options && options.lazy) {
    return _effect;
  } else {
    _effect();
    return _effect;
  }
};

const targetMap = new WeakMap();
//WeakMap 弱引用,key只能是对象

//收集依赖
export const track = (target: object, key: string | symbol) => {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    //设置key为传入的对象,value为Map
    targetMap.set(target, depsMap);
  }
  let deps: Set<Function> = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    //设置key为监听的属性,value为依赖集
    depsMap.set(key, deps);
  }
  //收集副作用函数
  deps.add(activeEffect);
};

//更新依赖
export const trigger = (target: object, key: string | symbol, value: any) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps: Set<any> = depsMap.get(key);
  if (!deps) return;
  deps.forEach((effect) => {
    if (effect?.options?.scheduler) {
      effect.options.scheduler(effect);
    } else {
      effect?.();
    }
  });
};
