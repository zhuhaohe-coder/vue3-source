import { toRef } from "./toRef";

const toRefs = <T extends object>(target: T) => {
  const map: any = {};
  for (const key in target) {
    map[key] = toRef(target, key);
  }
  return map;
};

export default toRefs;
