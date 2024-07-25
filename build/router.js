"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./utils/crowller"));
const contentAnalyzer_1 = __importDefault(require("./utils/contentAnalyzer"));
const util_1 = require("./utils/util");
const fs = require("fs");
const path = require("path");
const router = (0, express_1.Router)();
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "请先登录"));
    }
};
router.get("/", () => { });
router.get("/logout", checkLogin, (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, util_1.getResponseData)(true));
});
router.get("/eight", checkLogin, (req, res) => {
    //expess 类型文件中的 req 类型描述不准确，是 any
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
    const analyzer = contentAnalyzer_1.default.getInstance();
    new crowller_1.default(analyzer, url);
    res.json((0, util_1.getResponseData)(true));
});
router.post("/login", (req, res) => {
    //expess 类型文件中的 req 类型描述不准确，是 any
    const isLogin = req.session ? req.session.login : false;
    const { password } = req.body;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(false, "已经登录"));
        return;
    }
    if (password === "123456") {
        req.session.login = true;
        res.json((0, util_1.getResponseData)(true));
    }
    else {
        res.json((0, util_1.getResponseData)(false, "密码错误"));
    }
});
router.get("/showData", checkLogin, (req, res) => {
    try {
        const filePath = path.resolve(__dirname, "../data/course.json");
        const result = fs.readFileSync(filePath, "utf-8");
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    }
    catch (_a) {
        res.json((0, util_1.getResponseData)(false, "尚未爬取到内容"));
    }
});
exports.default = router;
