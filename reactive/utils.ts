import reactive from "./reactive";

export const isObject = (target: any) => {
  return target !== null && typeof target === "object";
};

export const toReactive = (target: any) => {
  if (isObject(target)) {
    return reactive(target);
  }
  return target;
};
