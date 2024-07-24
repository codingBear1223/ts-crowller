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

const TestNew = decorateFnc()(
  class Test {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

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
//const fnc = new FncFactory("jio jio");
//fnc.getName = () => "frfr";    //descriptor修饰后不可以修改方法了
//console.log(ins.getName());
//console.log(fnc.getName());

//访问器装饰器
function visitFactory(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log("visitFactory=>", target, key);
  //descriptor.writable = false;  writable是true的话，set name不能赋值
}
class privtFactory {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  //get 和 set 不能同时用装饰器
  get name() {
    return this._name;
  }

  @visitFactory
  set name(name: string) {
    this._name = name;
  }
}

// const visit = new privtFactory("vvvv");
// visit.name = "change";

//属性装饰器
function nameDecorator(target: any, key: string): any {
  console.log("nameDecorator=>", target, key);
  target[key] = "amy"; //不生效，修改的是 prototype 的属性值
  const descriptor: PropertyDescriptor = {
    writable: false,
  };
  return descriptor;
}

class nameTest {
  @nameDecorator
  name: "dell"; //name 的值 dell 是在对象中，不可以通过 prototype 修改对象的属性值
}

const nameIns = new nameTest();
//nameIns.name = "lisa";
console.log((nameIns as any).__proto__.name); //amy
