import { track, trigger } from "./effect";
import { toReactive } from "./utils";
const ref = <T>(value: T) => {
  return new RefImpl(value);
};

class RefImpl<T> {
  private _v_isRef = true;
  private _value: T;
  constructor(value: T) {
    this._value = toReactive(value);
  }
  get value() {
    track(this, "value");
    return toReactive(this._value);
  }
  set value(newValue) {
    if (newValue !== this._value) {
      this._value = toReactive(newValue);
      trigger(this, "value", newValue);
    }
  }
}

export default ref;
