function decorateFnc(constructor: any) {
  //类装饰器接收的是构造函数
  constructor.prototype.hello = function () {
    console.log("ddddd");
  };
}

function decorateCFnc(constructor: any) {
  console.log("ccccc");
}

function decorateImdtFnc(flag: boolean) {
  if (flag) {
    return function (constructor: any) {
      console.log("imdt tt");
    };
  } else {
    return function (constructor: any) {
      console.log("imdt ff");
    };
  }
}

@decorateFnc
@decorateCFnc
@decorateImdtFnc(true)
class Test {}
(new Test() as any).hello();
