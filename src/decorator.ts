// function decorateFnc() {
//   return function <T extends new (...args: any[]) => {}>(constructor: T) {
//     //构造函数可以有多个任意类型的参数 ...args
//     //泛型 T 继承了构造函数，具备了构造函数的能力
//     return class extends constructor {
//       age = 24;
//       name = "frfr";
//       getName() {
//         return this.name;
//       }
//     };
//   };
// }

// const TestNew = decorateFnc()(
//   class Test {
//     name: string;
//     constructor(name: string) {
//       this.name = name;
//     }
//   }
// );

//函数装饰器
//装饰普通方法时，target 是类的 prototype
//装饰静态方法时， target 是类的构造函数
//定义类的时候就会对类的方法进行装饰
function decorationToFuncs(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.writable = false;
  console.log("fnc=>", target, key);
  //descriptor.value可以修改被装饰方法的值
  descriptor.value = function (...args: any[]) {
    return "ssss";
  };
}

class FncFactory {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @decorationToFuncs
  getName() {
    return this.name;
  }

  @decorationToFuncs
  static getNum() {
    return 134;
  }
}

//const ins = new TestNew("lili");
const fnc = new FncFactory("jio jio");
//fnc.getName = () => "frfr";    //descriptor修饰后不可以修改方法了
//console.log(ins.getName());
console.log(fnc.getName());
