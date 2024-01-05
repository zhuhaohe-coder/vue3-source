import { computed } from "./reactive/computed";
import { effect } from "./reactive/effect";
import reactive from "./reactive/reactive";
import ref from "./reactive/ref";
import shallowReactive from "./reactive/shallowReactive";
import { toRaw } from "./reactive/toRaw";
import { toRef } from "./reactive/toRef";
import watch from "./reactive/watch";

// const obj = reactive({
//   name: "theshy",
//   foo: {
//     bar: {
//       age: 18,
//     },
//   },
// });
// const obj = shallowReactive({
//   name: "theshy",
//   age: 18,
// });
const person = {
  name: "theshy",
  age: 18,
};
const obj = reactive(person);
const name = toRef(obj, "name");
// const obj = ref(person);
// const test = computed(() => {
//   return obj.name + obj.age;
// });

effect(() => {
  console.log("触发", name.value);
  document.querySelector("#app")!.innerHTML = name.value.toString();
});

// watch(
//   () => obj.age,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);
//   }
// );

document.querySelector("#unchanged")!.addEventListener("click", () => {
  //   console.log(test.value);
  obj.age = 18;
  name.value = "zhuhaohe";
  console.log(name.value);
});
document.querySelector("#changed")!.addEventListener("click", () => {
  //   console.log(test.value);
  //   obj.foo.bar.age++;
  obj.age++;
  console.log(toRaw(obj) === person);
});
