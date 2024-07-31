"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
var router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata("path", target.prototype, key);
            var method = Reflect.getMetadata("method", target.prototype, key);
            var middlewares = Reflect.getMetadata("middlewares", target.prototype, key);
            var handler = target.prototype[key];
            if (path && method) {
                var fullPath = root === "/" ? path : "".concat(root).concat(path);
                if (middlewares && middlewares.length > 0) {
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([fullPath], middlewares, false), [handler], false));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
