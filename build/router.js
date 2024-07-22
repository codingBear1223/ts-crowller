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
    res.send("9999");
});
router.get("/eight", (req, res) => {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
    const analyzer = contentAnalyzer_1.default.getInstance();
    new crowller_1.default(analyzer, url);
    res.send("888");
});
exports.default = router;
