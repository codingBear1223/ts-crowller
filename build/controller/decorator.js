"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
exports.controller = controller;
exports.put = put;
exports.get = get;
exports.post = post;
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
function put(path) {
    return function (target, key) {
        Reflect.defineMetadata("path", path, target, key);
        Reflect.defineMetadata("method", "put", target, key);
    };
}
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata("path", path, target, key);
        Reflect.defineMetadata("method", "get", target, key);
    };
}
function post(path) {
    return function (target, key) {
        Reflect.defineMetadata("path", path, target, key);
        Reflect.defineMetadata("method", "post", target, key);
    };
}
