"use strict";
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
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.age = 24;
                this.name = "frfr";
            }
            getName() {
                return this.name;
            }
        };
    };
}
const TestNew = decorateFnc()(class Test {
    constructor(name) {
        this.name = name;
    }
});
//函数装饰器
//装饰普通方法时，target 是类的 prototype
//装饰静态方法时， target 是类的构造函数
//定义类的时候就会对类的方法进行装饰
function decorationToFuncs(target, key, descriptor) {
    descriptor.writable = false;
    console.log("fnc=>", target, key);
    //descriptor.value可以修改被装饰方法的值
    descriptor.value = function (...args) {
        return "ssss";
    };
}
class FncFactory {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    static getNum() {
        return 134;
    }
}
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
class privtFactory {
    constructor(name) {
        this._name = name;
    }
    //get 和 set 不能同时用装饰器
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
}
__decorate([
    visitFactory,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], privtFactory.prototype, "name", null);
// const visit = new privtFactory("vvvv");
// visit.name = "change";
//属性装饰器
function nameDecorator(target, key) {
    console.log("nameDecorator=>", target, key);
    target[key] = "amy"; //不生效，修改的是 prototype 的属性值
    const descriptor = {
        writable: false,
    };
    return descriptor;
}
class nameTest {
}
__decorate([
    nameDecorator,
    __metadata("design:type", String)
], nameTest.prototype, "name", void 0);
//const nameIns = new nameTest();
//nameIns.name = "lisa";
//console.log((nameIns as any).__proto__.name); //amy
//参数装饰器
function paramDecorator(target, key, index) {
    console.log("paramDecorator=>", target, key, index);
}
class ParamTest {
    getName(name) {
        return name;
    }
}
__decorate([
    __param(0, paramDecorator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParamTest.prototype, "getName", null);
// const paramIns = new ParamTest();
// paramIns.getName("frfr");
//用方法装饰器执行异常捕获功能
function catchErrorFunction(msg) {
    return function (target, key, descriptor) {
        const fn = descriptor.value;
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
class errTest {
    constructor() {
        this.userInfo = undefined;
    }
    getName() {
        return this.userInfo.name;
    }
    getAge() {
        return this.userInfo.age;
    }
}
__decorate([
    catchErrorFunction("用户名不存在"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], errTest.prototype, "getName", null);
__decorate([
    catchErrorFunction("年龄不存在"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], errTest.prototype, "getAge", null);
const errIns = new errTest();
errIns.getName();
