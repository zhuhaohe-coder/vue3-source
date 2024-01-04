import { effect } from "./effect";

interface Options {
  immediate?: boolean;
  flush?: "sync" | "post";
}

const traverse = (target: any, seen = new Set()) => {
  if (typeof target !== "object" || target === null || seen.has(target)) {
    return;
  }
  seen.add(target);
  for (const key in target) {
    traverse(target[key], seen);
  }

  return target;
};

const watch = (source: any, callback: Function, options?: Options) => {
  let getter: Function;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
  let newValue, oldValue;
  //dom更新是异步的,故将回调放入微任务队列中
  const flushPostCallbacks = () => {
    Promise.resolve().then(job);
  };
  const job = () => {
    newValue = effectFn();

    callback(newValue, oldValue);
    oldValue = newValue;
  };
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: options && options.flush === "post" ? flushPostCallbacks : job,
  });

  if (options && options.immediate) {
    options?.flush === "post" ? flushPostCallbacks() : job();
  } else {
    oldValue = effectFn(); //默认值
  }
};

export default watch;
