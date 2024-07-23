function decorateFnc() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    //构造函数可以有多个任意类型的参数 ...args
    //泛型 T 继承了构造函数，具备了构造函数的能力
    return class extends constructor {
      age = 24;
      name = "frfr";
      getName() {
        return this.name;
      }
    };
  };
}

const Test = decorateFnc()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const ins = new Test("lili");
console.log(ins.getName());
