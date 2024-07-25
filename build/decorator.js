"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function decorateFnc() {
    return function (constructor) {
        //构造函数可以有多个任意类型的参数 ...args
        //泛型 T 继承了构造函数，具备了构造函数的能力
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = 24;
                _this.name = "frfr";
                return _this;
            }
            class_1.prototype.getName = function () {
                return this.name;
            };
            return class_1;
        }(constructor));
    };
}
var TestNew = decorateFnc()(/** @class */ (function () {
    function Test(name) {
        this.name = name;
    }
    return Test;
}()));
//函数装饰器
//装饰普通方法时，target 是类的 prototype
//装饰静态方法时， target 是类的构造函数
//定义类的时候就会对类的方法进行装饰
function decorationToFuncs(target, key, descriptor) {
    descriptor.writable = false;
    console.log("fnc=>", target, key);
    //descriptor.value可以修改被装饰方法的值
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return "ssss";
    };
}
var FncFactory = /** @class */ (function () {
    function FncFactory(name) {
        this.name = name;
    }
    FncFactory.prototype.getName = function () {
        return this.name;
    };
    FncFactory.getNum = function () {
        return 134;
    };
    __decorate([
        decorationToFuncs,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FncFactory.prototype, "getName", null);
    __decorate([
        decorationToFuncs,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FncFactory, "getNum", null);
    return FncFactory;
}());
//const ins = new TestNew("lili");
//const fnc = new FncFactory("jio jio");
//fnc.getName = () => "frfr";    //descriptor修饰后不可以修改方法了
//console.log(ins.getName());
//console.log(fnc.getName());
//访问器装饰器
function visitFactory(target, key, descriptor) {
    console.log("visitFactory=>", target, key);
    //descriptor.writable = false;  writable是true的话，set name不能赋值
}
var privtFactory = /** @class */ (function () {
    function privtFactory(name) {
        this._name = name;
    }
    Object.defineProperty(privtFactory.prototype, "name", {
        //get 和 set 不能同时用装饰器
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        visitFactory,
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], privtFactory.prototype, "name", null);
    return privtFactory;
}());
// const visit = new privtFactory("vvvv");
// visit.name = "change";
//属性装饰器
function nameDecorator(target, key) {
    console.log("nameDecorator=>", target, key);
    target[key] = "amy"; //不生效，修改的是 prototype 的属性值
    var descriptor = {
        writable: false,
    };
    return descriptor;
}
var nameTest = /** @class */ (function () {
    function nameTest() {
    }
    return nameTest;
}());
//const nameIns = new nameTest();
//nameIns.name = "lisa";
//console.log((nameIns as any).__proto__.name); //amy
//参数装饰器
function paramDecorator(target, key, index) {
    console.log("paramDecorator=>", target, key, index);
}
var ParamTest = /** @class */ (function () {
    function ParamTest() {
    }
    ParamTest.prototype.getName = function (name) {
        return name;
    };
    __decorate([
        __param(0, paramDecorator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ParamTest.prototype, "getName", null);
    return ParamTest;
}());
// const paramIns = new ParamTest();
// paramIns.getName("frfr");
//用方法装饰器执行异常捕获功能
function catchErrorFunction(msg) {
    return function (target, key, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            }
            catch (e) {
                console.log(msg);
            }
        };
    };
}
// class errTest {
//   userInfo: { name: string; age: number } = undefined;
//   @catchErrorFunction("用户名不存在")
//   getName() {
//     return this.userInfo.name;
//   }
//   @catchErrorFunction("年龄不存在")
//   getAge() {
//     return this.userInfo.age;
//   }
// }
// const errIns = new errTest();
// errIns.getName();
