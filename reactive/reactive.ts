//reactive 不能处理基本类型，只能处理引用类型

/*
vue2 Object.defineProperty  
缺陷: 
    1. 不能劫持新增的属性
    2. 修改数组的长度，不能劫持(监听数组会有性能问题) 使用$set去解决这个问题
    3. 重写数组的七个方法, 可以劫持

vue3 proxy 解决了上述缺陷
*/
import createReactive from "./createReactive";
const reactive = <T extends object>(target: T) => {
  return createReactive(target);
};

export default reactive;
