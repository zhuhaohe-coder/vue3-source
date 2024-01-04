import createReactive from "./createReactive";

const shallowReactive = <T extends object>(target: T) => {
  return createReactive(target, true);
};

export default shallowReactive;
