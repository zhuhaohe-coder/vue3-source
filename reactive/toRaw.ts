export const toRaw = <T extends object>(target: T) => {
  return target["raw"];
};
