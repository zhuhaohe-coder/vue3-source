export const toRef = <T extends object>(target: T, key: keyof T) => {
  const wrapper = {
    _v_isRef: true,
    get value() {
      return target[key];
    },
    set value(newValue) {
      target[key] = newValue;
    },
  };
  return wrapper;
};
