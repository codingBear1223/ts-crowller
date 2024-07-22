"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//express 中间件对 req 或 res 修改之后，并不能修改其类型
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.userName = "bear";
    next();
});
app.use(router_1.default);
app.listen(7001, () => {
    console.log("server is running");
});
