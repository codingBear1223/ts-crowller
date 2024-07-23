"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const contentAnalyzer_1 = __importDefault(require("./contentAnalyzer"));
const fs = require("fs");
const path = require("path");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`<html><body><a href='/eight'>爬取内容 </a>
      <a href='/showData'>展示内容 </a>
      <a href='/logout'>退出</a></body></html>`);
        return;
    }
    res.send(`<html><body><form method="post" action="/login">
        <input type="password" name="password"/>
        <button>登录</button>
    </form></body></html>`);
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect("/");
});
router.get("/eight", (req, res) => {
    //expess 类型文件中的 req 类型描述不准确，是 any
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
        const analyzer = contentAnalyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send(`success`);
    }
    else {
        res.send(`<html><body><a href='/login'>未登录，现在登录</a></body></html>`);
    }
});
router.post("/login", (req, res) => {
    //expess 类型文件中的 req 类型描述不准确，是 any
    const isLogin = req.session ? req.session.login : false;
    const { password } = req.body;
    if (isLogin) {
        res.send(`already login`);
        return;
    }
    if (password === "123456") {
        req.session.login = true;
        res.send(`success`);
    }
    else {
        res.send("wrong password");
    }
});
router.get("/showData", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (!isLogin) {
        res.send(`<html><body><a href='/login'>未登录，现在登录</a></body></html>`);
        return;
    }
    try {
        const filePath = path.resolve(__dirname, "../data/course.json");
        const result = fs.readFileSync(filePath, "utf-8");
        res.json(JSON.parse(result));
    }
    catch (_a) {
        res.send("尚未爬取到内容");
    }
});
exports.default = router;
