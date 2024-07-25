"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.post = exports.get = exports.router = void 0;
exports.controller = controller;
var express_1 = require("express");
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            exports.router[method](path, handler);
        }
    }
}
//使用工厂模式处理多种请求类型
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator("get");
exports.post = getRequestDecorator("post");
exports.put = getRequestDecorator("put");
