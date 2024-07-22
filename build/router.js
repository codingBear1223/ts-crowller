"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const contentAnalyzer_1 = __importDefault(require("./contentAnalyzer"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(`<html><body><form method="post" action="/eight">
        <input type="password" name="password"/>
        <button>提交</button>
    </form></body></html>`);
});
router.post("/eight", (req, res) => {
    //expess 类型文件中的 req 类型描述不准确，是 any
    const { password } = req.body;
    if (password === "123456") {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${password}`;
        const analyzer = contentAnalyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send(`${req.userName} success`);
    }
    else {
        res.send("wrong password");
    }
});
exports.default = router;
