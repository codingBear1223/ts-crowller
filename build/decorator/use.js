"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = use;
function use(middleware) {
    return function (target, key) {
        var middlewares = Reflect.getMetadata("middlewares", target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata("middlewares", middlewares, target, key);
    };
}
