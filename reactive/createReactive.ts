import { track, trigger } from "./effect";
const createReactive = <T extends object>(
  target: T,
  shallow: boolean = false
): T => {
  return new Proxy(target, {
    /* 
            receiver: 配合Reflect使用
            1. 更加语义化
            2. 更加灵活(Proxy的13个方法均可以使用)
        */
    get(target, key, receiver) {
      if (key === "raw") {
        return target;
      }
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      if (shallow) {
        return res;
      }

      if (typeof res === "object" && res !== null) {
        return createReactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key, value);
      return res;
    },
  });
};

export default createReactive;
