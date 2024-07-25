"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
exports.get = get;
function controller(target) {
    console.log("controller=>", target.prototype);
    for (let key in target.prototype) {
        console.log(Reflect.getMetadata("path", target.prototype, key));
    }
}
function get(path) {
    return function (target, key) {
        console.log("get=>", target, key);
        Reflect.defineMetadata("path", path, target, key);
    };
}
